import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // Ajusta la ruta según tu estructura

// Define el tipo de navegación
type NavigationProp = StackNavigationProp<RootStackParamList, 'VincularMaceta'>;

const VincularMaceta: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [wifiNetworks, setWifiNetworks] = useState<string[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Simular la búsqueda de redes Wi-Fi
  const handleSearchNetworks = () => {
    const networks = [
      'DIGIFIBRA-24-xdUh',
      'MIWIFI_2G_azJW',
      'MIWIFI_5G_azJW',
      'MIWIFI_pYU3_2G',
      'MiFibra-D1E0',
      'DIGIFIBRA-5-xdUh',
      'MIWIFI_uMPw',
      'MOVISTAR_DCBE',
      'vodafone6CA0',
    ];
    setWifiNetworks(networks);
  };

  // Simular la conexión a una red Wi-Fi
  const handleConnectToNetwork = (network: string) => {
    setSelectedNetwork(network);
    Alert.alert(
      'Conectar a red',
      `¿Deseas conectarte a la red "${network}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Conectar',
          onPress: () => {
            setIsConnected(true);
            Alert.alert('Conexión exitosa', `Conectado a "${network}".`);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Utilizar redes Wi-Fi</Text>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearchNetworks}>
        <Text style={styles.buttonText}>Buscar redes</Text>
      </TouchableOpacity>

      <FlatList
        data={wifiNetworks}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.networkItem} onPress={() => handleConnectToNetwork(item)}>
            <Text style={styles.networkText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (selectedNetwork) {
            Alert.alert('Vincular maceta', `Conectado a "${selectedNetwork}".`);
            navigation.navigate('DashMoni');
          } else {
            Alert.alert('Error', 'Selecciona una red Wi-Fi primero.');
          }
        }}
      >
        <Text style={styles.buttonText}>Vincular maceta inteligente</Text>
      </TouchableOpacity>

      {isConnected && (
        <TouchableOpacity
          style={styles.connectedButton}
          onPress={() => navigation.navigate('DashMoni')}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F1E4',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
  },
  searchButton: {
    marginBottom: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  networkItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  networkText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  connectedButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VincularMaceta;
