import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RootStackParamList } from '../App'; // Importar el tipo para las rutas
import { NavigationProp } from '@react-navigation/native';


type DashMoniProps = {
  navigation: NavigationProp<RootStackParamList, 'Descripcion'>; // Definir el tipo para las props
};



const DashMoni: React.FC<DashMoniProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GrowGlow</Text>
      
      <View style={styles.imageContainer}>
        <Image source={require('../assets/orquidea.jpeg')} style={styles.image} />
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}><Text>Monitoreo</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Descripcion')}>  {/* Usar navigation aquí */}
          <Text>Descripción</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Racha')}>
  <Text>Racha 🔥</Text>
</TouchableOpacity>
      </View>
      
      <View style={styles.grid}>
        <View style={styles.card}><Text>Luz</Text><Text>60%</Text></View>
        <View style={styles.card}><Text>Temperatura</Text><Text>70%</Text></View>
        <View style={styles.card}><Text>Humedad</Text></View>
        <View style={styles.card}><Text>Ph</Text></View>
        <View style={styles.card}><Text>Luces</Text></View>
        <View style={styles.card}><Text>Cuidado</Text></View>
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
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '30%',
    backgroundColor: '#ddd',
    padding: 10,
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default DashMoni;
