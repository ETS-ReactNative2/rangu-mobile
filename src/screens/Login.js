import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";
import Hoshi from '../inputTexts/Hoshi';
import { AntDesign } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';


const images = [
    require("../../assets/images/icon0_alpha.png"),
    require("../../assets/images/Icons/Geral/Back_Arrow.png")
];


export default function LogintScreen({ navigation }) {

    const keyboardOffsetPlataform = Platform.OS === "ios" ? -50 : -240;
    const [offsetbutton] = useState(new Animated.Value(80));
    const [opacityAnim] = useState(new Animated.Value(0));

    function haddleStartScreen() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'StartScreen', params: { loading: false } },
                ],
            })
        )
    }
    function haddleScan() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'ScanScreen' },
                ],
            })
        )
    }

    useEffect(() => {

        Animated.parallel([
            Animated.spring(offsetbutton, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: true,
            }),

            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),

        ]).start();

    })

    function BackScreen() {

        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setTimeout(haddleStartScreen, 301);

    }
    function LoginPress() {
        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setTimeout(haddleScan, 301);
    }

    return (

        <Animated.View style={[styles.background]} >

            <Animated.View style={[styles.containerBack, { opacity: opacityAnim }]}>
                <TouchableOpacity style={styles.btBack} onPress={BackScreen}>
                    <AntDesign name="left" size={45} color="white" />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.containerLogo, { opacity: opacityAnim }]}>
                <Image style={styles.imglogo} source={images[0]} />
            </Animated.View>

            <KeyboardAvoidingView style={styles.KeyboardAvoidingView} behavior="padding" keyboardVerticalOffset={keyboardOffsetPlataform}>


                <Animated.View style={[styles.containerInputs, { opacity: opacityAnim }]}>

                    <View style={styles.containerInputtext}>

                        <Hoshi style={styles.input} label={'E-Mail'} borderColor={'#b76c94'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} />

                    </View>
                    <View style={styles.containerInputtext}>
                        <Hoshi style={styles.input} label={'Password'} borderColor={'#b76c94'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} />
                    </View>
                    <Animated.View style={styles.Containerbtforgotpassword}>

                        <TouchableOpacity style={styles.btforgotpassword}>
                            <Text style={styles.textforgotpassword}>Forgot your password?</Text>
                        </TouchableOpacity>

                    </Animated.View>

                </Animated.View>

            </KeyboardAvoidingView>

            <Animated.View style={[styles.containerLogin, { opacity: opacityAnim, transform: [{ translateY: offsetbutton }] }]}>

                <TouchableOpacity style={styles.btnlogin} onPress={LoginPress}>
                    <Text style={styles.textLogin}>Login</Text>
                </TouchableOpacity>

            </Animated.View>


        </Animated.View>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(201, 97, 93, 1)',
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    containerLogo: {
        flex: 1,
        justifyContent: "flex-start",
        paddingBottom: "0%",
    },
    containerInputs: {
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        paddingBottom: "0%",
        height: "50%",
    },
    containerInputtext: {
        alignItems: "center",
        width: "100%",
        paddingTop: '5%'
    },
    containerLogin: {
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        paddingBottom: "0%",
        marginTop: "10%",
        height: "15%",
    },
    input: {
        width: "80%",
    },
    btnlogin: {
        backgroundColor: "#FFF",
        width: "90%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    textLogin: {
        color: "#C9615D",
        fontSize: 35,
    },
    imglogo: {
        width: 340,
        resizeMode: "contain",
    },
    textforgotpassword: {
        color: "#FFFF",
        fontSize: 18,
        paddingBottom: '3%'

    },
    Containerbtforgotpassword: {
        width: "80%",
        height: "15%",
        paddingTop: '3%',
        alignItems: "flex-end",

    },
    btforgotpassword: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    containerBack: {
        position: 'absolute',
        top: "7.1%",
        left: "1.5%",
        zIndex: 1,
    },
    btBack: {
        height: "100%",
        width: "100%",
    },
    KeyboardAvoidingView: {
        width: "100%",
        justifyContent: "center",
    },
});