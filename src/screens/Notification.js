import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, SafeAreaView, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";
import Lottie from 'lottie-react-native';


import animation from '../../assets/animations/general/rising-hand.json';

export default function HomeScreen({ navigation }) {

    const [infoMessage, setInfoMessage] = useState('Erro');
    const [errorOpacityAnim] = useState(new Animated.Value(0));

    function CallWaiter() {
        setInfoMessage('Um garçom foi chamado à mesa');
        Animated.timing(errorOpacityAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()

        setTimeout(() => {

            Animated.timing(errorOpacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start()

        }, 8000);
    }

    return (


        <SafeAreaView style={[styles.background]} >
            <View style={styles.header}>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.textHelp}>Ajuda</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Animated.View style={[styles.containerInfo, { opacity: errorOpacityAnim }]}>
                <Text style={styles.textInfo}>{infoMessage}</Text>
            </Animated.View>
            <Lottie resizemode="contain" source={animation} autoPlay loop />

            <TouchableOpacity onPress={CallWaiter} style={styles.btnWaiter} >
                <Text style={styles.textCallWaiter}>Chamar Garçom</Text>
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
    containerInfo: {
        backgroundColor: "#FFF",
        height: 40,
        width: 330,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 80,
        marginTop: 50
    },
    textInfo: {
        color: "#E65F4C",
        fontWeight: "bold",
    },
    btnWaiter: {
        backgroundColor: "#DF4445",
        width: "90%",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        marginTop: "125%"
    },
    textCallWaiter: {
        color: "#FFF",
        fontSize: 35,
    },
});