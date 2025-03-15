import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

// Definir el tipo de las props con NavigationProp
type RachaScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Racha'>;
};

const RachaScreen: React.FC<RachaScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GrowGlow</Text>
      
      <Image source={require("../assets/orquidea.jpeg")} style={styles.image} />
      
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => navigation.navigate('DashMoni')} // Navegar a DashMoni
        >
          <Text>Monitoreo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Descripcion')}> 
          <Text>Descripción</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Racha 🔥</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.badgesContainer}>
        <Text style={styles.subtitle}>Medallas de cuidado</Text>
        <View style={styles.badges}>
          <View style={styles.badge}>
            <FontAwesome name="star" size={50} color="gold" />
            <Text>7 de Racha</Text>
          </View>
          <View style={styles.badge}>
            <FontAwesome name="trophy" size={50} color="gold" />
            <Text>15 días de Racha</Text>
          </View>
          <View style={styles.badge}>
            <FontAwesome name="certificate" size={50} color="green" />
            <Text>1 mes de Racha</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F1E4',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#008060',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#008060',
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  activeTabText: {
    color: 'white',
  },
  badgesContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  badge: {
    alignItems: 'center',
  },
});

export default RachaScreen;
