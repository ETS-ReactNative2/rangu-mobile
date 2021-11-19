import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, Keyboard } from "react-native";
import Hoshi from '../inputTexts/Hoshi';
import { AntDesign } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginLoading from '../loadings/LoadingLogin';
import apiUsers from '../services/apiUsers.js';


const images = [
    require("../../assets/images/ranguimagem_Prancheta_1.png"),
];
var btpressed = false;
export default function LogintScreen({ navigation }) {

    const keyboardOffsetPlataform = Platform.OS === "ios" ? 10 : -240;
    const [logosize] = useState(new Animated.ValueXY({ x: 250, y: 250 }));
    const [logoOffSet] = useState(new Animated.Value(5));
    const [offsetbutton] = useState(new Animated.Value(80));
    const [opacityAnim] = useState(new Animated.Value(0));
    const [errorOpacityAnim] = useState(new Animated.Value(0));
    const [NamesOffSet] = useState(new Animated.Value(0));
    const [AdressOffSet] = useState(new Animated.Value(500));
    const [signUpLoad, setSignUpLoad] = useState(false);
    const [btText, setBtText] = useState("Next");
    const [errorMessage, setErrorMessage] = useState('All fields must be filled');

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [street, setStreet] = useState();
    const [district, setDistrict] = useState();
    const [state, setState] = useState();
    const [postalCode, setPostalCode] = useState();
    const [city, setCity] = useState();
    const [number, setNumber] = useState("6969");

    let canSignUp = true;



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

        keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', keyboardDidHide);

        Animated.parallel([
            Animated.spring(offsetbutton, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: true,
            }),

            // Animated.spring(logoOffSet, {
            //     toValue: -40,
            //     speed: 4,
            //     bounciness: 0,
            //     useNativeDriver: true,
            // }),

            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),

        ]).start();

    })

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logosize.x,
                {
                    toValue: 165,
                    duration: 200,
                    useNativeDriver: false
                }),
            Animated.timing(logosize.y,
                {
                    toValue: 165,
                    duration: 200,
                    useNativeDriver: false
                }),
            Animated.timing(logoOffSet,
                {
                    toValue: 15,
                    duration: 200,
                    useNativeDriver: true
                }),

        ]).start();

    }

    function keyboardDidHide() {

        Animated.parallel([
            Animated.timing(logosize.x,
                {
                    toValue: 250,
                    duration: 200,
                    useNativeDriver: false
                }),
            Animated.timing(logosize.y,
                {
                    toValue: 250,
                    duration: 200,
                    useNativeDriver: false
                }),
            Animated.timing(logoOffSet,
                {
                    toValue: 5,
                    duration: 200,
                    useNativeDriver: true
                }),

        ]).start();
    }

    async function SignUpPress() {
        if (!btpressed) {
            btpressed = true
            setBtText("Sign Up")
            Animated.parallel([
                Animated.spring(NamesOffSet, {
                    toValue: -500,
                    speed: 3,
                    bounciness: 3,
                    useNativeDriver: true,
                }),

            ]).start();
        }
        else {
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

            setTimeout(() => setSignUpLoad(true), 300);

            let response
            response = await apiUsers.post('/clients/sign-up', {
                name,
                email,
                phone,
                password,
                address: {
                    district,
                    city,
                    state,
                    postalCode,
                    number,
                    street
                }
            }).catch(error => {
                canSignUp = false;
                /*
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
                */
                setTimeout(() => {
                    btpressed = false;
                    setBtText("Next");
                    setSignUpLoad(false);

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

                    Animated.spring(NamesOffSet, {
                        toValue: 0,
                        speed: 3,
                        bounciness: 3,
                        useNativeDriver: true,
                    }).start();

                }, 2300);

            });

            if (canSignUp) {
                //await AsyncStorage.setItem('token', response.data.token);
                setTimeout(haddleScan, 0);
            }

        }

    }

    function AlreadyHavePress() {

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

        setTimeout(function () { navigation.navigate('LogintScreen') }, 301);
    }

    function BackScreen() {
        if (btpressed) {
            btpressed = false
            setBtText("Next")
            Animated.parallel([
                Animated.spring(NamesOffSet, {
                    toValue: 0,
                    speed: 3,
                    bounciness: 3,
                    useNativeDriver: true,
                }),

            ]).start();
        }
        else {
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
            setTimeout(haddleStartScreen, 301);
        }
    }
    if (!signUpLoad) {
        return (

            <LinearGradient style={styles.background} colors={["#D7233C", "#E65F4C"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} >

                <Animated.View style={[styles.containerBack, { opacity: opacityAnim }]}>
                    <TouchableOpacity style={styles.btBack} onPress={BackScreen}>
                        <AntDesign name="left" size={45} color="white" />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[styles.containerLogo, { transform: [{ translateY: logoOffSet }], }, { opacity: opacityAnim }]}>
                    <Animated.Image style={{ width: logosize.x, height: logosize.y, resizeMode: "contain" }} source={images[0]} />
                </Animated.View>
                <KeyboardAvoidingView style={styles.KeyboardAvoidingView} behavior="padding" keyboardVerticalOffset={keyboardOffsetPlataform}>
                    <Animated.View style={[styles.containerInputs, { opacity: opacityAnim }]}>
                        <Animated.View style={[styles.containerInputtext, { transform: [{ translateX: NamesOffSet }], }]}>
                            <Hoshi style={styles.input} label={'Name'} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setName(value)} boardType={'default'} />
                            <Animated.View style={[styles.containerInputtextAdress, { transform: [{ translateX: AdressOffSet }], }]} >
                                <Hoshi style={styles.input} label={'Street'} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setStreet(value)} boardType={'default'} />
                            </Animated.View>
                        </Animated.View>
                        <Animated.View style={[styles.containerInputtext, { transform: [{ translateX: NamesOffSet }], }]}>
                            <Hoshi style={styles.input} label={'E-Mail'} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setEmail(value)} boardType={'email-address'} />
                            <Animated.View style={[styles.containerInputtextAdress, { transform: [{ translateX: AdressOffSet }], }]}>
                                <Hoshi style={styles.input} label={'District'} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setDistrict(value)} boardType={'default'} />
                            </Animated.View>
                        </Animated.View>
                        <Animated.View style={[styles.containerInputtext, { transform: [{ translateX: NamesOffSet }], }]}>
                            <Hoshi style={styles.input} label={'Phone'} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setPhone(value)} boardType={'numeric'} />
                            <Animated.View style={[styles.containerInputtextAdress, { transform: [{ translateX: AdressOffSet }], }]}>
                                <Hoshi style={styles.input} label={'State'} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setState(value)} boardType={'default'} />
                            </Animated.View>
                        </Animated.View>
                        <Animated.View style={[styles.containerInputtext, { transform: [{ translateX: NamesOffSet }], }]}>
                            <Hoshi style={styles.input} label={'Password'} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setPassword(value)} secureTextEntry={true} boardType={'visible-password'} />
                            <Animated.View style={[styles.containerInputtextAdress, { transform: [{ translateX: AdressOffSet }], }]}>
                                <Hoshi style={styles.input} label={'Postal Code'} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setPostalCode(value)} boardType={'numeric'} />
                            </Animated.View>
                        </Animated.View>
                        <Animated.View style={[styles.containerInputtext, { transform: [{ translateX: NamesOffSet }], }]}>
                            <Hoshi style={styles.input} label={'Repeat Password'} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setRePassword(value)} secureTextEntry={true} boardType={'visible-password'} />
                            <Animated.View style={[styles.containerInputtextAdress, { transform: [{ translateX: AdressOffSet }], }]}>
                                <Hoshi style={styles.input} label={'City'} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} onChangeText={(value) => setCity(value)} boardType={'default'} />
                            </Animated.View>
                        </Animated.View>

                    </Animated.View>
                </KeyboardAvoidingView>


                <Animated.View style={[styles.ContainerbtAlreadyHave, { opacity: opacityAnim }]}>

                    <TouchableOpacity style={styles.btAlreadyHave} onPress={AlreadyHavePress}>
                        <Text style={styles.textAlreadyHave}>Already have an account?</Text>
                    </TouchableOpacity>

                </Animated.View>

                <Animated.View style={[styles.containerError, { opacity: errorOpacityAnim }]}>
                    <Text style={styles.textError}>{errorMessage}</Text>
                </Animated.View>

                <Animated.View style={[styles.containerSignUp, { opacity: opacityAnim, transform: [{ translateY: offsetbutton }] }]}>

                    <TouchableOpacity style={styles.btnSignUp} onPress={SignUpPress} >
                        <Text style={styles.textSignUp} >{btText}</Text>
                    </TouchableOpacity>

                </Animated.View>


            </LinearGradient >

        );
    }
    else {
        return (
            <LoginLoading />
        );
    }

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    KeyboardAvoidingView: {
        width: "100%",
        justifyContent: "flex-end",
    },
    containerLogo: {
        flex: 1,
        justifyContent: "flex-start",
        paddingBottom: "0%",
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
    containerInputs: {
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        paddingBottom: "0%",
        height: "60%",
    },
    containerInputtext: {
        alignItems: "center",
        width: "100%",
        paddingTop: '5%',
    },
    containerInputtextAdress: {
        alignItems: "center",
        width: "100%",
        paddingTop: '5%',
        position: 'absolute',

    },
    containerSignUp: {
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
    btnSignUp: {
        backgroundColor: "#FFF",
        width: "90%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    textSignUp: {
        color: "#E65F4C",
        fontSize: 35,
    },
    textAlreadyHave: {
        color: "#FFFF",
        fontSize: 18,
        paddingBottom: '3%'

    },
    ContainerbtAlreadyHave: {
        width: "80%",
        height: "5%",
        paddingBottom: "2%",
        alignItems: "flex-end",
        justifyContent: "center",

    },
    btAlreadyHave: {
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
        zIndex: 1,
    },
});