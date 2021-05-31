/* eslint-disable @typescript-eslint/no-var-requires */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import normalize from 'react-native-normalize';
import Dice from './components/Dice';
import { Audio } from 'expo-av';

export default function App() {
  const [isAnimating, setIsAnimating] = useState(false);

  const [isPressed, setIsPressed] = useState(false);

  const [diceOne, setDiceOne] = useState(1);
  const [diceTwo, setDiceTwo] = useState(1);
  const [diceThree, setDiceThree] = useState(1);
  const [diceFour, setDiceFour] = useState(1);

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./dice-sound.m4a')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync(); }
      : undefined;
  }, [sound]);


  console.log('sound');
  console.log(sound);

  interface Dice {
    number: number,
    set: React.Dispatch<React.SetStateAction<number>>,
    color: string
  }

  const dices: Dice[] = [
    {
      number: diceOne,
      set: setDiceOne,
      color: 'rgba(61, 166, 78, .9)'
    },
    {
      number: diceTwo,
      set: setDiceTwo,
      color: 'rgba(186, 47, 172, .9)'
    },
    {
      number: diceThree,
      set: setDiceThree,
      color: 'rgba(216, 102, 67, .9)'
    },
    {
      number: diceFour,
      set: setDiceFour,
      color: 'rgba(58, 73, 206, .9)'
    },
  ];

  const handleAnimate = () => {
    setIsAnimating(!isAnimating);
    playSound();
  };

  const handlePress = (bool: boolean) => {
    setIsPressed(bool);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={{uri: /*'https://wallpaperaccess.com/full/636565.jpg'*/ 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'}} style={StyleSheet.absoluteFillObject} blurRadius={0} />
      <TouchableOpacity style={styles.content} onPress={handleAnimate} onPressIn={() => handlePress(true)} onPressOut={() => handlePress(false)}>
        <Animated.View style={styles.diceContainer}>
          {dices.map(({number, set, color}: Dice, index) => (
            <Dice key={index} color={color} isAnimating={isAnimating} isPressed={isPressed} index={index} number={number} setDice={set} />
          ))}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  diceContainer: {
    width: normalize(340),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});
