import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Animated,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { Ionicons } from "@expo/vector-icons";
import { getSensorData, getInformacionPlanta } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = StackNavigationProp<RootStackParamList, "DashMoni">;

interface SensorData {
  luz?: number;
  humedadSuelo?: number;
  temperaturaSuelo?: number;
  lastUpdate?: string;
}

const DashMoni: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<"Monitoreo" | "Descripción" | "Racha">("Monitoreo");
  const [sensorData, setSensorData] = useState<SensorData>({});
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [cardsRefreshing, setCardsRefreshing] = useState(false);

  const [rachaCuidado, setRachaCuidado] = useState({
    diasConsecutivos: 0,
    estado: "¡Comienza tu racha!",
    consejo: "Entra cada día para aumentar tu racha.",
  });

  const [infoPlanta, setInfoPlanta] = useState({
    Descripcion: "",
    Nombre_Cientifico: "",
    Familia: "",
    Reino: "",
    Clase: "",
    Diversidad: ""
  });

  const fetchSensorData = useCallback(async () => {
    try {
      setCardsRefreshing(true);
      const data = await getSensorData();
      console.log("Datos recibidos del backend:", data);

      const findSensor = (name: string) => 
        data.find((s: any) => 
          s.nombre?.toLowerCase().includes(name.toLowerCase()) ||
          s._id?.toLowerCase().includes(name.toLowerCase())
        );

      const luzSensor = findSensor("luz");
      const humedadSensor = findSensor("humedad");
      const tempSensor = findSensor("temperatura");

      const newData: SensorData = {
        luz: luzSensor?.valor !== undefined ? Number(luzSensor.valor) : undefined,
        humedadSuelo: humedadSensor?.valor !== undefined ? Number(humedadSensor.valor) : undefined,
        temperaturaSuelo: tempSensor?.valor !== undefined ? Number(tempSensor.valor) : undefined,
        lastUpdate: new Date().toLocaleTimeString()
      };

      setSensorData(prev => ({ ...prev, ...newData }));
    } catch (error) {
      console.error("Error obteniendo datos:", error);
      Alert.alert("Error", "No se pudieron obtener los datos de los sensores");
    } finally {
      setLoading(false);
      setCardsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 15000);
    return () => clearInterval(interval);
  }, [fetchSensorData]);

  useEffect(() => {
    const fetchInfoPlanta = async () => {
      try {
        const data = await getInformacionPlanta();
        if (data && data.length > 0) {
          setInfoPlanta(data[0]);
        }
      } catch (error) {
        console.error("Error obteniendo información de la planta:", error);
      }
    };

    if (activeTab === "Descripción") {
      fetchInfoPlanta();
    }
  }, [activeTab]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  useEffect(() => {
    const actualizarRacha = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;

        const lastAccessStr = await AsyncStorage.getItem(`rachaLastAccess_${userId}`);
        const currentRachaStr = await AsyncStorage.getItem(`rachaCount_${userId}`);
        
        const lastAccess = lastAccessStr ? new Date(lastAccessStr) : null;
        let currentRacha = currentRachaStr ? parseInt(currentRachaStr) : 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (lastAccess && lastAccess >= today) {
          setRachaCuidado({
            diasConsecutivos: currentRacha,
            estado: currentRacha > 0 ? `Racha de ${currentRacha} días` : "Comienza tu racha",
            consejo: currentRacha > 0 ? "¡Sigue así!" : "Entra cada día para aumentar tu racha",
          });
          return;
        }

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const isConsecutive = lastAccess && lastAccess >= yesterday;
        currentRacha = isConsecutive ? currentRacha + 1 : 1;

        await AsyncStorage.setItem(`rachaLastAccess_${userId}`, today.toISOString());
        await AsyncStorage.setItem(`rachaCount_${userId}`, currentRacha.toString());

        setRachaCuidado({
          diasConsecutivos: currentRacha,
          estado: `Racha de ${currentRacha} días`,
          consejo: currentRacha >= 5 
            ? "¡Excelente trabajo! +1 medalla" 
            : currentRacha >= 3 
              ? "¡Buen trabajo! Sigue así" 
              : "¡Sigue así!",
        });

      } catch (error) {
        console.error("Error al actualizar la racha:", error);
      }
    };

    actualizarRacha();
  }, []);

  const renderSensorCards = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.horizontalCardContainer}>
        <View style={styles.rachaCard}>
          <Ionicons name="sunny" size={30} color="#FFD700" />
          <Text style={styles.rachaCardText}>Luz Ambiente</Text>
          <Text style={styles.rachaCardValue}>
            {sensorData.luz !== undefined ? `${sensorData.luz} lux` : "No disponible"}
          </Text>
          <Text style={styles.sensorStatus}>
            {sensorData.luz !== undefined 
              ? sensorData.luz > 2000 
                ? "🌞 Intensa" 
                : sensorData.luz > 1000 
                  ? "🌤️ Moderada" 
                  : "🌥️ Baja"
              : ""}
          </Text>
        </View>

        <View style={styles.rachaCard}>
          <Ionicons name="partly-sunny" size={30} color="#87CEEB" />
          <Text style={styles.rachaCardText}>Día/Noche</Text>
          <Text style={styles.rachaCardValue}>
            {sensorData.luz !== undefined
              ? sensorData.luz > 1000
                ? "☀️ Día"
                : "🌙 Noche"
              : "No disponible"}
          </Text>
        </View>

   

        <View style={styles.rachaCard}>
        <Ionicons name="water" size={30} color="#1E90FF" />
          <Text style={styles.rachaCardText}>Humedad Suelo</Text>
          <Text style={styles.rachaCardValue}>
            {sensorData.temperaturaSuelo !== undefined ? `${sensorData.temperaturaSuelo}°C` : "No disponible"}
          </Text>
          <Text style={styles.sensorStatus}>
            {sensorData.temperaturaSuelo !== undefined
              ? sensorData.temperaturaSuelo > 4000
                ? "💦 Muy húmedo"
                : sensorData.temperaturaSuelo >  3000
                    ? "💧 Óptimo"
                  : "🏜️ Seco"
              : ""}
          </Text>
        </View>

        <View style={styles.rachaCard}>
          <Ionicons name="time-outline" size={30} color="#9B59B6" />
          <Text style={styles.rachaCardText}>Última Lectura</Text>
          <Text style={styles.rachaCardValue}>
            {sensorData.lastUpdate || "No disponible"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="exit-outline" size={24} color="#CB42C8" /> 
      </TouchableOpacity>

      <Text style={styles.title}>GrowGlow</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/orquidea.jpeg")}
          style={styles.image}
        />
      </View>

      <View style={styles.tabs}>
        {["Monitoreo", "Descripción", "Racha"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "Monitoreo" && (
        <Animated.View style={[styles.monitoreoContainer, { opacity: fadeAnim }]}>
          {loading ? (
            <ActivityIndicator size="large" color="#008060" />
          ) : (
            <>
              {renderSensorCards()}
              {cardsRefreshing && (
                <ActivityIndicator size="small" color="#008060" style={styles.refreshIndicator} />
              )}
            </>
          )}
        </Animated.View>
      )}

      {activeTab === "Descripción" && (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>📖 Descripción:</Text>
            <Text style={styles.descriptionText}>
              {infoPlanta.Descripcion || "No disponible"}
            </Text>

            <Text style={styles.sectionTitle}>🔬 Nombre científico:</Text>
            <Text style={styles.descriptionText}>
              {infoPlanta.Nombre_Cientifico || "No disponible"}
            </Text>

            <Text style={styles.sectionTitle}>🌿 Familia:</Text>
            <Text style={styles.descriptionText}>
              {infoPlanta.Familia || "No disponible"}
            </Text>

            <Text style={styles.sectionTitle}>🌎 Reino:</Text>
            <Text style={styles.descriptionText}>
              {infoPlanta.Reino || "No disponible"}
            </Text>

            <Text style={styles.sectionTitle}>🌱 Clase:</Text>
            <Text style={styles.descriptionText}>
              {infoPlanta.Clase || "No disponible"}
            </Text>

            <Text style={styles.sectionTitle}>🧬 Diversidad:</Text>
            <Text style={styles.descriptionText}>
              {infoPlanta.Diversidad || "No disponible"}
            </Text>
          </View>
        </ScrollView>
      )}

      {activeTab === "Racha" && (
        <Animated.View style={[styles.rachaContainer, { opacity: fadeAnim }]}>
          <View style={styles.rachaInfoContainer}>
            <Text style={styles.rachaTitle}>Racha de Cuidado</Text>
            <Text style={styles.rachaDays}>
              {rachaCuidado.diasConsecutivos} días
            </Text>
            <Text style={styles.rachaStatus}>{rachaCuidado.estado}</Text>
            <Text style={styles.rachaAdvice}>{rachaCuidado.consejo}</Text>
          </View>
          <View style={styles.rachaProgressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(rachaCuidado.diasConsecutivos / 7) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {rachaCuidado.diasConsecutivos}/7 días completados
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6C5B7B",
    marginBottom: 10,
  },
  imageContainer: {
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 75,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C5B7B",
  },
  activeTab: {
    borderBottomColor: "#CB42C8",
  },
  monitoreoContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  horizontalCardContainer: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  rachaCard: {
    width: 140,
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 8,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  rachaCardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6C5B7B",
    marginTop: 5,
    textAlign: "center",
  },
  rachaCardValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 5,
    textAlign: "center",
  },
  sensorStatus: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    fontStyle: "italic",
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  descriptionContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C5B7B",
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#333",
    textAlign: "justify",
    marginTop: 5,
  },
  rachaContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  rachaInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  rachaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6C5B7B",
  },
  rachaDays: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#CB42C8",
    marginVertical: 10,
  },
  rachaStatus: {
    fontSize: 20,
    color: "#008060",
    marginBottom: 10,
  },
  rachaAdvice: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  rachaProgressContainer: {
    width: "100%",
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#CB42C8",
  },
  progressText: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "transparent",
  },
  refreshIndicator: {
    marginTop: 10,
  },
});

export default DashMoni;