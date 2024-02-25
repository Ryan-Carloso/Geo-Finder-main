import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './Styles';
import axios from 'axios';
import * as Location from 'expo-location';

export default function Catch() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [showValues, setShowValues] = useState(false);

  useEffect(() => {
    // Inicia o temporizador para obter a localização a cada 20 minutos
    const locationTimer = setInterval(() => {
      getLocationAndSave();
    }, 20 * 60 * 1000); // 20 minutos em milissegundos

    // Obtém a localização imediatamente ao carregar o componente
    getLocationAndSave();

    // Limpa o temporizador ao desmontar o componente
    return () => clearInterval(locationTimer);
  }, []); // A dependência vazia garante que o efeito seja executado apenas uma vez

  const getLocationAndSave = async () => {
    try {
      // Solicita permissão para obter a localização do usuário
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão de localização negada');
        return;
      }

      // Obtém a posição atual do usuário
      let userLocation = await Location.getCurrentPositionAsync({});
      
      // Envia a localização para o Firebase junto com nome e número
      const firebaseDatabaseUrl = 'https://app-react-native-6b77a-default-rtdb.europe-west1.firebasedatabase.app/';
      const locationData = {
        name: input1,
        number: input2,
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };

      await axios.post(`${firebaseDatabaseUrl}/users.json`, locationData);

    } catch (error) {
      console.error('Erro ao obter ou enviar localização:', error);
    }
  };

  const handleSave = () => {
    // Check if input2 is not equal to 0 before showing the values
    if (input2 !== '0') {
      setShowValues(true);
    }
    try {
      // Obtém a localização e salva imediatamente
      getLocationAndSave();
      
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  return (
    <ImageBackground source={require('./assets/backft.png')} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.inputxt}>Componente Catch</Text>
        <TextInput
          style={styles.input}
          placeholder="put here his/her name"
          placeholderTextColor="#000000"
          value={input1}
          onChangeText={(text) => setInput1(text)}
          keyboardType="default"
          maxLength={16}
        />
        <TextInput
          style={styles.input}
          placeholder="put here his/her number"
          placeholderTextColor="#000000"
          value={input2}
          onChangeText={(text) => setInput2(text)}
          keyboardType="numeric"
          maxLength={16}
        />
        <TouchableOpacity
          style={{ backgroundColor: 'lightblue', padding: 10, marginVertical: 10 }}
          onPress={handleSave}
        >
          <Text>Save</Text>
        </TouchableOpacity>

        {/* Displaying the values conditionally */}
        {showValues && (
          <Text style={styles.inputxt}>{`It's Saved! name: ${input1} and number ${input2}`}</Text>
        )}
      </View>
    </ImageBackground>
  );
}
