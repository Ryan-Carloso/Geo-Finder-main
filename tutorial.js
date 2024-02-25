import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { styles } from './Styles';

export default function Tutorial({ navigation }) {
    const handleOptionSelect1 = () => {
        navigation.navigate('Enter his/her data', { selectedOption: 2 });
      };

      const handleOptionSelect = (option) => {
        navigation.navigate('Find his/her location!', { selectedOption: option });
      };
  return (
    <ImageBackground source={require('./assets/backdarker.png')} style={{ flex: 1 }}>
      <View style={styles.container}>
      <Text style={styles.tutorialtitle}>Ensuring Safety & Locating Loved Ones</Text>

    {/* Ideas for subtitles */}
    <Text style={styles.subtitle}>Your spouse, children, or anyone important to you!</Text>

    
        <Text style={styles.tutorialbody1}>1 - First of all, you need to enter their datas here, number and name.</Text>

        <TouchableOpacity
          style={styles.tutorialbutton1}
          onPress={() => handleOptionSelect1()}
        >
          <Text style={styles.optionButtonText}>Enter his/her data</Text>
        </TouchableOpacity>

        <Text style={styles.tutorialbody3}>2 - all you need to do now, is enter the number and name you had put before!</Text>

        <TouchableOpacity
          style={styles.tutorialbutton2}
          onPress={() => handleOptionSelect()}
        >
          <Text style={styles.optionButtonText}>Find his/her location!</Text>
        </TouchableOpacity>

        <Text style={styles.tutorialtitle5}>That's all you need to do for be always in touch of your lover's!</Text>



        <Image
          source={require('./assets/fundoft.png')}
          style={styles.footerImage}
        />
      </View>
    </ImageBackground>
  );
}
