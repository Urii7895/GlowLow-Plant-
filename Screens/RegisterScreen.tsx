import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
    RecupContra: undefined;
};

type RegisterScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const handleRegister = () => {
    Alert.alert('Registro', 'Cuenta creada exitosamente');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GrowGlow</Text>
      <View style={styles.card}>
        {/* Imagen eliminada */}
        <TextInput placeholder="Nombres" placeholderTextColor="#aaa" style={styles.input} />
        <TextInput placeholder="Correo electrónico" placeholderTextColor="#aaa" style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Contraseña" placeholderTextColor="#aaa" style={styles.input} secureTextEntry />
        <TextInput placeholder="Confirmar Contraseña" placeholderTextColor="#aaa" style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <View style={styles.footerLinks}>
        <TouchableOpacity onPress={() => navigation.navigate('RecupContra')}>
  <Text style={styles.linkText}>¿Olvidó su contraseña?</Text>
</TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF6EC',
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: '#00A86B',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    color: '#000',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 14,
  },
});

export default RegisterScreen;
