import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Lottie from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import animation from '../../assets/animations/loading/generic/food-loading.json';

export default function LoginLoading() {

    return (

        <LinearGradient style={styles.background} colors={["#D7233C", "#E65F4C"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} >

            <Lottie resizemode="contain" source={animation} autoPlay loop />

        </LinearGradient>
    );

}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: 'absolute',
    },
});