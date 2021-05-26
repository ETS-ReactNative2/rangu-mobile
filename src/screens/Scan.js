import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, SafeAreaView } from "react-native";
import Lottie from 'lottie-react-native';
import NfcAnim from '../../assets/animations/nfc/phone-tap.json'
import { CommonActions } from '@react-navigation/native';
//import NfcAnim from '../../assets/animations/which-one/healthy-or-junk-food.json'

const images = [
    require("../../assets/images/icon0_alpha.png"),
    require("../../assets/images/Icons/Geral/Back_Arrow.png")
];


export default function ScanScreen({ navigation }) {

    const keyboardOffsetPlataform = Platform.OS === "ios" ? -50 : -240;
    const [opacityAnim] = useState(new Animated.Value(0));

    function haddleRestaurant() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'Navigation' },
                ],
            })
        )
    }

    useEffect(() => {

        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();


    })

    function BackScreen() {

        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setTimeout(function () { navigation.navigate('StartScreen', { ShowLoading: false }) }, 301);

    }
    function ScanComplete() {

        setTimeout(haddleRestaurant, 0);

    }

    return (
        <SafeAreaView style={[styles.background]}>
            <Animated.View style={[styles.container, { opacity: opacityAnim }]} >
                <TouchableOpacity styles={styles.touch} onPress={ScanComplete}>
                    <Lottie style={[styles.anim]} source={NfcAnim} autoPlay loop />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(201, 97, 93, 1)',
        alignItems: "center",
        justifyContent: "center",

    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",

    },
    touch: {

        alignItems: "center",
        justifyContent: "center",
        //height: "50%",
        //width: "50%",

    },
    anim: {
        //display: 'flex',
        //alignItems: "center",
        //justifyContent: "center",
        //height: "100%",
        width: "100%"

        //aspectRatio: 1
    },

});