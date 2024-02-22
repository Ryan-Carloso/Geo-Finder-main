// App.js
import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, View, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainComponent } from './MainComponent';
import { styles } from './Styles';  // Make sure to import styles from Styles.js


export default function App() {
  return (
    <ImageBackground source={require('./assets/backft.png')} style={styles.background}>
      <MainComponent />
    </ImageBackground>
  );
}
