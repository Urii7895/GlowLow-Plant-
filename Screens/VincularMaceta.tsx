import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // Ajusta la ruta según tu estructura

const wifiNetworks = [
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

// Define el tipo de navegación
type NavigationProp = StackNavigationProp<RootStackParamList, 'VincularMaceta'>;

const VincularMaceta: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isConnected, setIsConnected] = useState(false);

  const handleVincular = () => {
    setIsConnected(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Utilizar redes Wi-Fi</Text>
      <FlatList
        data={wifiNetworks}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.networkItem}>
            <Text style={styles.networkText}>{item}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleVincular}>
        <Text style={styles.buttonText}>Vincular maceta inteligente</Text>
      </TouchableOpacity>
      {isConnected && (
        <TouchableOpacity 
          style={styles.connectedButton} 
          onPress={() => navigation.navigate('DashMoni')}>
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
