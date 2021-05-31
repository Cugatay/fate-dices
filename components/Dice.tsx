import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';
import normalize from 'react-native-normalize';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    color: string,
    isAnimating: boolean,
    isPressed: boolean
    index: number,
    number: number,
    setDice: React.Dispatch<React.SetStateAction<number>>
}

const Dice = ({color, isAnimating, isPressed, index, number, setDice}: Props) => {
  const AnimValue = useRef(new Animated.Value(0)).current;

  const scaleInterpolate = AnimValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1.2, 1.3],
    // extrapolate: 'clamp'
  });

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(AnimValue, {
        toValue: 1,
        duration: 110,
        useNativeDriver: true,
      }).start(() => {
        setDice(Math.floor(Math.random() * 3));
        Animated.timing(AnimValue, {
          toValue: 0,
          duration: 110,
          useNativeDriver: true
        }).start();
      });
    }, (index + 1) * 50);
  }, [isAnimating]);

  useEffect(() => {
    if(isPressed) {
      Animated.timing(AnimValue, {
        toValue: 2,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
    else {
      Animated.timing(AnimValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }).start();
    }
  }, [isPressed]);

  console.log(number);

  return (
    <Animated.View style={[styles.dice, {backgroundColor: color, transform: [{scale: scaleInterpolate}]}]}>
      {
        number !== 1 &&
      <Ionicons name={number === 2 ? 'add' : 'remove'} color="white" size={80} />
      }
    </Animated.View>
  );
};

export default Dice;

const styles = StyleSheet.create({
  dice: {
    width: normalize(150),
    height: normalize(150),
    margin: normalize(10),
    borderRadius: normalize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }
});
