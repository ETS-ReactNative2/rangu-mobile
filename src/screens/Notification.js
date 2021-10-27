import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, SafeAreaView, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";
import Lottie from 'lottie-react-native';


import animation from '../../assets/animations/general/rising-hand.json';

export default function HomeScreen({ navigation }) {

    return (


        <SafeAreaView style={[styles.background]} >
            <View style={styles.header}>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.textHelp}>Help</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Lottie resizemode="contain" source={animation} autoPlay loop />

            <TouchableOpacity style={styles.btnWaiter} >
                <Text style={styles.textCallWaiter}>Call Waiter</Text>
            </TouchableOpacity>
        </SafeAreaView >


    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        alignItems: 'center',
    },
    header: {
        height: 55,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHelp: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    btnWaiter: {
        backgroundColor: "#DF4445",
        width: "90%",
        height:60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        marginTop: "140%"
    },
    textCallWaiter: {
        color: "#FFF",
        fontSize: 35,
    },
});