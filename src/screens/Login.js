import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, ImageBackground, Animated, Platform, SafeAreaView } from "react-native";
import Hoshi from '../inputTexts/Hoshi';
import { AntDesign } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import apiUsers from '../services/apiUsers';
import LoginLoading from '../loadings/LoadingLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';


const images = [
    require("../../assets/images/ranguimagem_Prancheta_1.png")
];


export default function LogintScreen({ navigation }) {

    const keyboardOffsetPlataform = Platform.OS === "ios" ? -50 : -240;
    const [offsetbutton] = useState(new Animated.Value(80));
    const [opacityAnim] = useState(new Animated.Value(0));
    const [errorOpacityAnim] = useState(new Animated.Value(0));
    const [loginLoad, setLoginLoad] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Erro');

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [type, setType] = useState("CLIENT");

    let canLogin = true;

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

        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(errorOpacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(haddleStartScreen, 301);

    }
    async function LoginPress() {
        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        Animated.timing(errorOpacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setTimeout(() => setLoginLoad(true), 300);

        let response;
        response = await apiUsers.post('/login', {
            email,
            password,
            type
        }).catch(error => {
            //console.log(error.response.data)
            canLogin = false;
            if (error.response.data.code == "422.3") {
                setErrorMessage("E-mail or password is invalid.");
                console.log(error.response.data.description);
            }
            else if (error.response.data.code == "422.5") {
                setErrorMessage("User is not active.");
                console.log(error.response.data.description);
            }
            else if (error.response.data.code == "412.5") {
                setErrorMessage("Password is required.");
                console.log(error.response.data.description);
            }
            else if (error.response.data.code == "412.2") {
                setErrorMessage("E-mail is required.");
                console.log(error.response.data.description);
            }
            setTimeout(() => {
                setLoginLoad(false);

                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();

                Animated.timing(errorOpacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start()

            }, 2300);


        });

        if (canLogin) {
            await AsyncStorage.setItem('token', response.data.token);
            setTimeout(haddleScan, 0);
        }
    }


    if (!loginLoad) {
        return (
            <View style={styles.background} >

                <LinearGradient style={styles.backgroundLinearGradiant} colors={["#D7233C", "#E65F4C"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} />

                <Animated.View style={[styles.containerBack, { opacity: opacityAnim }]}>
                    <TouchableOpacity onPress={BackScreen}>
                        <AntDesign name="left" size={45} color="white" />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[styles.containerLogo, { opacity: opacityAnim }]}>
                    <Image style={styles.imglogo} source={images[0]} />
                </Animated.View>

                <Animated.View style={[styles.containerError, { opacity: errorOpacityAnim }]}>
                    <Text style={styles.textError}>{errorMessage}</Text>
                </Animated.View>

                <View style={styles.KeyboardAvoidingView}>
                    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardOffsetPlataform}>
                        <Animated.View style={[styles.containerInputs, { opacity: opacityAnim }]}>
                            <View style={styles.containerInputtext}>
                                <Hoshi label={'E-Mail'} borderColor={'#FFF'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setEmail(value)} boardType={'email-address'} />
                            </View>
                            <View style={styles.containerInputtext}>
                                <Hoshi label={'Password'} borderColor={'#FFF'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setPassword(value)} secureTextEntry={true} boardType={'visible-password'} />
                            </View>
                            <Animated.View style={styles.Containerbtforgotpassword}>
                                <TouchableOpacity >
                                    <Text style={styles.textforgotpassword}>Forgot your password?</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </Animated.View>
                    </KeyboardAvoidingView>
                </View>

                <Animated.View style={[styles.containerLogin, { opacity: opacityAnim, transform: [{ translateY: offsetbutton }] }]}>
                    <TouchableOpacity style={styles.btnlogin} onPress={LoginPress}>
                        <Text style={styles.textLogin}>Login</Text>
                    </TouchableOpacity>
                </Animated.View>

            </View>
        );
    }
    else {
        return (
            <LoginLoading />
        );
    }
}

const styles = StyleSheet.create({
    backgroundLinearGradiant: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: 'absolute',
    },
    background: {
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
    containerLogo: {
        marginBottom: 0,
        marginTop: 10,
    },
    imglogo: {
        width: 340,
        height: 340,

    },
    KeyboardAvoidingView: {
        marginBottom: 210,
        width: 330,
        height: 160,
    },
    containerInputs: {
    },
    containerInputtext: {
    },
    Containerbtforgotpassword: {
        alignItems: "flex-end",
        marginTop: 5,
    },
    textforgotpassword: {
        color: "#FFFF",
        fontSize: 18,
    },
    containerError: {
        backgroundColor: "#FFF",
        height: 40,
        width: 330,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 80,
    },
    textError: {
        color: "#E65F4C",
        fontWeight: "bold",
    },
    containerLogin: {
    },
    btnlogin: {
        backgroundColor: "#FFF",
        height: 66,
        width: 380,
        marginBottom: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 80,
    },
    textLogin: {
        color: "#E65F4C",
        fontSize: 35,
    },

});