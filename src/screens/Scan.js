import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, SafeAreaView } from "react-native";
import Lottie from 'lottie-react-native';
//import NfcAnim from '../../assets/animations/nfc/phone-tap.json'
import NfcAnim from '../../assets/animations/nfc/scan-menu.json'
import { CommonActions } from '@react-navigation/native';
//import NfcManager, { NfcEvents } from 'react-native-nfc-manager';


const images = [
    require("../../assets/images/icon0_alpha.png"),
];


export default function ScanScreen({ navigation }) {

    function haddleRestaurant() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'Navigation' },
                ],
            })
        )
    }

    function ScanComplete() {

        setTimeout(haddleRestaurant, 0);

    }

    return (
        <SafeAreaView style={[styles.background]}>
            <Animated.View style={styles.container} >
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