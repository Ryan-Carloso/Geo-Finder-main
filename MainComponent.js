// MainComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Styles';  // Make sure to import styles from Styles.js
import { AsyncStorage as Storage } from './AsyncStorage';

export function MainComponent() {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState('');
  const [seunomename, setSeunomename] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [randomMarker, setRandomMarker] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await Storage.getItem('savedData');
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

    if (!name || !seunomename || !/^\d{8,}$/.test(name)) {
      Alert.alert('Required fields', 'please fill in numbers only, nothing else.');
      return;
    }

    try {
      await Storage.setItem('savedData', JSON.stringify({ name, seunomename }));
    } catch (error) {
      console.error('Erro ao salvar dados no AsyncStorage:', error);
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permissão de localização negada');
      return;
    }

    try {
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      const isNearby = Math.random() < 0.5;
      const distanceMultiplier = isNearby ? 0.02 : 0.2;

      const randomLatitude =
        userLocation.coords.latitude + (Math.random() - 0.5) * distanceMultiplier;
      const randomLongitude =
        userLocation.coords.longitude + (Math.random() - 0.5) * distanceMultiplier;

      setRandomMarker({
        latitude: randomLatitude,
        longitude: randomLongitude,
        name: name || 'Aleatório',
        seunomename: seunomename || 'Aleatório',
      });

      setShowMap(true);
      setLastClickTime(currentTime);

      setLoading(true);

      const firebaseDatabaseUrl = 'https://app-react-native-6b77a-default-rtdb.europe-west1.firebasedatabase.app/';
      const locationData = {
        latitude: randomLatitude,
        longitude: randomLongitude,
        name: seunomename,
        number: name,
      };

      await axios.post(`${firebaseDatabaseUrl}/users/${name}.json`, locationData);

    } catch (error) {
      console.error('Error handling location:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowMap(false);
  };

  return (
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
          <TouchableOpacity
            style={styles.buttonback}
            onPress={handleBack}>
            <Text style={styles.buttonTextback}>Back</Text>
          </TouchableOpacity>
          {location && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title={`${seunomename}`}
                description={`You are here!!`}
              >
                <View style={styles.markeryou}>
                  <Text style={styles.markerText}>You</Text>
                </View>
              </Marker>
              {randomMarker && (
                <Marker
                  coordinate={{
                    latitude: randomMarker.latitude,
                    longitude: randomMarker.longitude,
                  }}
                  title={`Maker of ${randomMarker.name}`}
                  description={`his/her location`}
                >
                  <View style={styles.marker}>
                    <Text style={styles.markerText}>{seunomename}</Text>
                  </View>
                </Marker>
              )}
            </MapView>
          )}
        </SafeAreaView>
      )}
      <Image
        source={require('./assets/fundoft.png')}
        style={styles.footerImage}
      />
    </View>
  );
}
