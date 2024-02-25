import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, Image, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Styles';

export const MainComponent = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [name, setName] = useState('');
  const [seunomename, setSeunomename] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [userMarker, setUserMarker] = useState(null);
  const [firebaseMarker, setFirebaseMarker] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('savedData');
        if (savedData) {
          const { name: savedName, seunomename: savedSeunomename } = JSON.parse(savedData);
          setName(savedName);
          setSeunomename(savedSeunomename);
        }
      } catch (error) {
        console.error('Erro ao carregar dados salvos do AsyncStorage:', error);
      }
    };

    loadSavedData();
  }, []);

  const handleShowMap = async () => {
    const currentTime = new Date().getTime();

    if (lastClickTime && currentTime - lastClickTime < 3600000) {
      setShowMap(true);
      return;
    }

    if (!name || !seunomename) {
      Alert.alert('Required fields', 'Please fill in both name and number fields.');
      return;
    }

    try {
      await AsyncStorage.setItem('savedData', JSON.stringify({ name, seunomename }));
    } catch (error) {
      console.error('Erro ao salvar dados no AsyncStorage:', error);
    }

    setLoading(true);

    const firebaseDatabaseUrl = 'https://app-react-native-6b77a-default-rtdb.europe-west1.firebasedatabase.app/';
    try {
      const response = await axios.get(`${firebaseDatabaseUrl}/users.json`);

      if (response.data) {
        const userData = Object.values(response.data).find(user => user.name === seunomename && user.number === name);

        if (userData) {
          const { latitude, longitude, name, number } = userData;

          setFirebaseMarker({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            name: name || 'Aleatório',
            seunomename: number || 'Aleatório',
          });

          setShowMap(true);
          setLastClickTime(currentTime);
        } else {
          Alert.alert('User not found', 'No location data found for the specified user.');
        }
      } else {
        Alert.alert('No Data', 'No location data found in the Firebase database.');
      }
    } catch (error) {
      console.error('Error fetching location data from Firebase:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowMap(false);
  };

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão de localização negada');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      setUserMarker({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []); // Run only once on component mount

  return (
    <ImageBackground source={require('./assets/backft.png')} style={{ flex: 1 }}>
      <View style={styles.container}>
        {!showMap ? (
          <View style={styles.inputContainer}>
            <Text style={styles.inputxt}>Enter his/her number you want to locate:</Text>
            <TextInput
              style={styles.input}
              placeholder="Place the number here"
              placeholderTextColor="#000000"
              value={name}
              onChangeText={(text) => setName(text)}
              keyboardType="numeric"
              maxLength={17}
            />
            <Text style={styles.inputxt1}>(ex: 1 962 248 289)</Text>

            <Text style={styles.inputxt}>Enter His/Her name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the name here"
              placeholderTextColor="#000000"
              value={seunomename}
              onChangeText={(text) => setSeunomename(text)}
              keyboardType="default"
              maxLength={16}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleShowMap}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Finder now!</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <SafeAreaView style={styles.mapContainer}>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: userMarker ? userMarker.latitude : 0,
                longitude: userMarker ? userMarker.longitude : 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {userMarker && (
                <Marker
                  coordinate={{
                    latitude: userMarker.latitude,
                    longitude: userMarker.longitude,
                  }}
                  title={`Your Location`}
                  description={`You are here!!`}
                >
                  <View style={styles.markeryou}>
                    <Text style={styles.markerText}>You</Text>
                  </View>
                </Marker>
              )}
              {firebaseMarker && (
                <Marker
                  coordinate={{
                    latitude: firebaseMarker.latitude,
                    longitude: firebaseMarker.longitude,
                  }}
                  title={`Location of ${firebaseMarker.name}`}
                  description={`Name: ${firebaseMarker.seunomename}, Number: ${firebaseMarker.number}`}
                >
                  <View style={styles.marker}>
                    <Text style={styles.markerText}>{firebaseMarker.seunomename}</Text>
                  </View>
                </Marker>
              )}
            </MapView>
          </SafeAreaView>
        )}
        <Image
          source={require('./assets/fundoft.png')}
          style={styles.footerImage}
        />
      </View>
    </ImageBackground>
  );
};
