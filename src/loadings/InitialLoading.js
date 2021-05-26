import React from "react";
import { SafeAreaView, Text } from "react-native";
import Lottie from 'lottie-react-native';

import animation1 from '../../assets/animations/loading/food/drink-n-salad.json';
import animation2 from '../../assets/animations/loading/food/food-choose.json';
import animation3 from '../../assets/animations/loading/food/food-squeeze-with-burger-and-hot-dog.json';
import animation4 from '../../assets/animations/loading/food/prepared-food.json';
import animation5 from '../../assets/animations/loading/food/salad-bowl.json';
import animation6 from '../../assets/animations/loading/food/yellow-ration-food.json';

export default function InitialLoading({ visible, children }) {

  const animations = [animation1, animation2, animation3, animation4, animation5, animation6];
  var randomAnim = animations[Math.floor(Math.random() * animations.length)];


  if (visible) {
    return (

      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(201, 97, 93)" }}>

        <Lottie resizemode="contain" source={randomAnim} autoPlay loop />

      </SafeAreaView>
    );
  }
  else {
    return (
      <>
        {children}
      </>
    );
  }
}