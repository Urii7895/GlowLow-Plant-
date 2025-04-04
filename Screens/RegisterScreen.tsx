import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { register } from "../api"; // Importamos la función register desde api.ts

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RecupContra: undefined;
};

type RegisterScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      const data = await register(nombre, email, password); // Llamamos a la función de api.ts
      Alert.alert("Éxito", data.message);
      navigation.navigate("Login");
    } 
    
    catch (error: any) {
      console.error("Error en login:", error);
    
      const errorMessage =
        error.response?.data?.message || "Algo salió mal. Intenta nuevamente";
    
      Alert.alert("Error", errorMessage);
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GrowGlow</Text>
      <View style={styles.card}>
        <TextInput
          placeholder="Nombres"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirmar Contraseña"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("RecupContra")}>
            <Text style={styles.linkText}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6E6FA",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6C5B7B",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#80CB",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerLinks: {
    marginTop: 15,
    alignItems: "center",
  },
  linkText: {
    color: "#6C5B7B",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
});

export default RegisterScreen;
