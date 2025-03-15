import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Descripcion: undefined;
  DashMoni: undefined;
  Racha: undefined;
};

const DescripcionScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GrowGlow</Text>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/orquidea.jpeg')} style={styles.image} />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => navigation.navigate('DashMoni')}
        >
          <Text>Monitoreo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Descripcion')}
        >
          <View>  
            <Text>Descripción</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Racha')}>
         <Text>Racha 🔥</Text>
       </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.boldText}>Descripción:</Text>
        <Text>
          Las orquídeas son una familia de plantas monocotiledóneas con flores complejas e interacciones ecológicas únicas.
        </Text>
        <Text style={styles.boldText}>Nombre científico:</Text>
        <Text>Orchidaceae</Text>
        <Text style={styles.boldText}>Familia:</Text>
        <Text>Orchidaceae; Juss., nom. cons.</Text>
        <Text style={styles.boldText}>Reino:</Text>
        <Text>Plantae</Text>
        <Text style={styles.boldText}>Clase:</Text>
        <Text>Liliopsida</Text>
        <Text style={styles.boldText}>División:</Text>
        <Text>Magnoliophyta</Text>
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
  infoContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default DescripcionScreen;
