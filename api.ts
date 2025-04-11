import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL base del backend
//const API_URL = "https://backglow.onrender.com/api";
const API_URL = "http://192.168.1.146:5000/api";


//const API_URL = "http://172.20.10.2:5000/api";



// Definición de interfaces
interface LoginResponse {
  token: string;
  usuario: {
    id: string;
    email: string;
    nombre: string;
    id_racha: string;  // Agregamos el id_racha para el usuario
  };
}

interface RegisterResponse {
  message: string;
  usuario: {
    id: string;
    email: string;
    nombre: string;
    id_racha: string;  // Incluimos el id_racha en la respuesta
  };
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/usuarios/login`, {
      email,
      password,
    });
    
    console.log("Respuesta del backend:", response.data);
    
    // Verifica si 'id_racha' está presente
    console.log("ID racha:", response.data.usuario.id_racha);
    
    // Guardar el ID en AsyncStorage
    await AsyncStorage.setItem('id_Usuarios', response.data.usuario.id);

    // Verificar si id_racha tiene un valor válido antes de guardarlo
    const id_racha = response.data.usuario.id_racha || '';  // Asigna una cadena vacía si es undefined o null
    await AsyncStorage.setItem('id_racha', id_racha); // Guardamos también el ID de la racha

    // Verificar si se guardó correctamente
    const idGuardado = await AsyncStorage.getItem('id_Usuarios');
    const rachaGuardada = await AsyncStorage.getItem('id_racha');
    console.log("ID guardado en AsyncStorage:", idGuardado, "ID racha guardado:", rachaGuardada);

    return response.data;
  } catch (error: any) {
    console.error("Error en login:", error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const register = async (
  nombre: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/usuarios/register`,
      { nombre, email, password }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error en registro:", error);
    throw error;
  }
};

export const getSensorData = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}/Sensores/ultimos`);
    
    console.log("Datos crudos recibidos:", response.data); // Para diagnóstico
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Formato de datos incorrecto");
    }

    // Transforma los datos al formato esperado por el frontend
    const formattedData = response.data.map((sensor: any) => {
      return {
        _id: sensor.nombre || sensor._id, // Asegura compatibilidad
        valor: sensor.valor,
        unidad: sensor.unidad || "" // Valor por defecto
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Error en getSensorData:", error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};


// Función para obtener información de la planta
export const getInformacionPlanta = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/informacion-planta`);
    if (!response.ok) {
      throw new Error("Error obteniendo información de la planta");
    }
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo información de la planta:", error);
    return null;
  }
};

// Obtener la racha de un usuario
export const getRachaByUser = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500)); // Espera 500ms antes de leer
    const id_Usuarios = await AsyncStorage.getItem('id_Usuarios');
    console.log("ID recuperado después de esperar:", id_Usuarios);

    if (!id_Usuarios) {
      console.error("No se encontró el ID del usuario en AsyncStorage.");
      return null;
    }

    // Hacer la solicitud al backend usando el ID del usuario
    const response = await fetch(`${API_URL}/racha/${id_Usuarios}/racha`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener la racha');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getRachaByUser:', error);
    return null;
  }
};


export const requestPasswordReset = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/usuarios/forgot-password`, { 
      email 
    });
    return response.data;
  } catch (error: any) {
    // Manejo específico de errores del backend
    if (error.response) {
      throw new Error(error.response.data.message || 'Error al solicitar recuperación');
    } else {
      throw new Error('No se pudo conectar al servidor');
    }
  }
};