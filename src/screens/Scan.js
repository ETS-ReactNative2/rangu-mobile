import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, SafeAreaView } from "react-native";
import Lottie from 'lottie-react-native';
//import NfcAnim from '../../assets/animations/nfc/phone-tap.json'
import NfcAnim from '../../assets/animations/nfc/scan-menu.json'
import { CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUsers from '../services/Api';

import QrCodeScanner from '../components/QrCodeScanner';


const images = [
    require("../../assets/images/icon0_alpha.png"),
];


export default function ScanScreen({ navigation }) {

    const [BearerToken, setBearerToken] = useState();
    useEffect(() => {
        (async () => {
            setBearerToken(await AsyncStorage.getItem('token'));
        })();
    },);

    const modalizeRef = useRef(null);

    function haddleRestaurant() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'Navigation' },
                ],
            })
        )
    }

    function haddleSettings() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'SettingsScreen', params: { fromScan: true } },
                ],
            })
        )
    }

    async function ScanComplete(data) {
        console.log(data);
        console.log(BearerToken);

        // let response;
        // response = await apiUsers.post(
        //     '/login', 
        //     {
        //         email,
        //         password,
        //         type
        //     },
        //     {
        //         headers: { Authorization: BearerToken }
        //     }
        // ).catch(error => {
        //     //console.log(error.response.data)
        //     canLogin = false;
        //     if (error.response.data.code == "422.3") {
        //         setErrorMessage("E-mail or password is invalid.");
        //         console.log(error.response.data.description);
        //     }
        // });

        setTimeout(haddleRestaurant, 0);
    }

    function OpenModalScanner() {
        modalizeRef.current?.open();
    }

    function CloseModalScanner() {
        modalizeRef.current?.close();
    }

    return (
      
        <LinearGradient style={styles.background} colors={["#D7233C", "#E65F4C"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} >
            
                <Animated.View style={styles.container} >
                    <Animated.View style={[styles.containeSettings]}>
                        <TouchableOpacity onPress={haddleSettings}>
                            <AntDesign name="setting" size={45} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                    <TouchableOpacity styles={styles.touch} onPress={haddleRestaurant}>
                        <Lottie style={[styles.anim]} source={NfcAnim} autoPlay loop />
                    </TouchableOpacity>
                    <Animated.View style={[styles.containeQrBt]}>
                        <TouchableOpacity style={styles.qrButton} onPress={OpenModalScanner}>
                            <MaterialCommunityIcons name="qrcode-scan" size={60} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.qrButton}/*onPress={BackScreen}*/>
                            <MaterialCommunityIcons name="qrcode-edit" size={60} color="white" />
                        </TouchableOpacity>
                    </Animated.View>

                </Animated.View>

                <Modalize modalStyle={styles.modal} ref={modalizeRef} /*modalHeight={770} onClose={ }*/ scrollViewProps={{ showsVerticalScrollIndicator: false, scrollEnabled: false, }}>
                    <QrCodeScanner CodeScanned={ScanComplete} closeModal={CloseModalScanner} />
                </Modalize>
            
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
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",

    },
    containeSettings: {
        position: 'absolute',
        top: "7.1%",
        left: "85%",
        zIndex: 1,
    },
    touch: {

        alignItems: "center",
        justifyContent: "center",
    },
    anim: {
        width: "100%"
    },
    containeQrBt: {
        flexDirection: 'row',
    },
    qrButton: {
        padding: "10%"
    },
    modal: {
        backgroundColor: "#1e222b",
    },
});