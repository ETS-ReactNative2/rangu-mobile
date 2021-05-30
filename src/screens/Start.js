import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, TouchableOpacity, ImageBackground, Animated, Platform, View } from "react-native";
import store from "../services/Storage"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import InitialLoading from "../loadings/InitialLoading";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const images = [
    require("../../assets/images/backGroundImageLow.jpg"),
    require("../../assets/images/icon0_alpha.png")
];

export default function StartScreen({ navigation, route }) {
    const keyboardOffsetPlataform = Platform.OS === "ios" ? -50 : -240;
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
    const [opacityAnim] = useState(new Animated.Value(0));
    const [opacityAnimBackGround] = useState(new Animated.Value(1));
    const [initialLoading, setInitialLoading] = useState(true);
    const [lateralSlideRight] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    const [lateralSlideLeft] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    const params = route.params;
    // const haddleSignUp = React.useCallback(() => {
    //     navigation.reset([navigation.navigate('SignUpScreen')])
    // }, [navigation]);

    function haddleSignUp() {
        navigation.dispatch(
            CommonActions.reset({
                routes: [{ name: 'SignUpScreen' },],
            })
        );
    }
    function haddleLogin() {
        navigation.dispatch(
            CommonActions.reset({
                routes: [{ name: 'LogintScreen' },],
            })
        );
    }



    //var backgroundColorAnimated1 = opacityAnimBackGround.interpolate({ inputRange: [0, 1], outputRange: ["rgba(215,35,60,0.75)", "rgba(215,35,60,1)"] })

    var delayTimer = 4000


    useEffect(() => {

        //store.save('teste', false)
        //console.log(store.get('teste'));
        //store.delete('teste')

        if (params !== undefined) {
            setInitialLoading(params.loading);
            if (!params.loading) {
                delayTimer = 0;
            }
        }

        setTimeout(function () {


            setInitialLoading(false);


            Animated.parallel([
                Animated.spring(offset.y, {
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
                Animated.timing(opacityAnimBackGround, {
                    toValue: 0.75,
                    delay: 550,
                    duration: 400,
                    useNativeDriver: false,
                }),
            ]).start();
        }, delayTimer);
    }, []);


    function loginPress() {
        //alert("Alhouu");
        Animated.parallel([
            Animated.spring(lateralSlideRight.x, {
                toValue: 400,
                speed: 10,
                useNativeDriver: true,
            }),
            Animated.spring(lateralSlideLeft.x, {
                toValue: -400,
                speed: 10,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnimBackGround, {
                toValue: 1,
                delay: 0,
                duration: 400,
                useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
        setTimeout(haddleLogin, 301);
    }

    function signUpPress() {
        Animated.parallel([
            Animated.spring(lateralSlideRight.x, {
                toValue: 400,
                speed: 10,
                useNativeDriver: true,
            }),
            Animated.spring(lateralSlideLeft.x, {
                toValue: -400,
                speed: 10,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnimBackGround, {
                toValue: 1,
                delay: 0,
                duration: 400,
                useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
        setTimeout(haddleSignUp, 301);

    }
    return (
        <InitialLoading visible={initialLoading}>
            <ImageBackground style={styles.backgroundImage} source={images[0]} transition={false}>

                <Animated.View style={[styles.background, { opacity: opacityAnimBackGround }]}>
                    <LinearGradient style={styles.background} colors={["#D7233C", "#E65F4C"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} />
                </Animated.View>




                <Animated.View style={[styles.containerLogo, { opacity: opacityAnim }]}>
                    {/* <Image style={styles.imglogo} source={images[1]} /> */}
                    <MaterialIcons name="menu-book" size={250} color={'#ffffff'} />
                </Animated.View>

                <Animated.View style={[styles.containerSingUp, { opacity: opacityAnim, transform: [{ translateY: offset.y }, { translateX: lateralSlideRight.x }] },]}>

                    <TouchableOpacity style={styles.btnSingup} onPress={signUpPress}>
                        <Text style={styles.textSingup}>Sign Up</Text>
                    </TouchableOpacity>

                </Animated.View>

                <Animated.View style={[styles.containerLogin, { opacity: opacityAnim, transform: [{ translateY: offset.y }, { translateX: lateralSlideLeft.x }] },]}>

                    <TouchableOpacity style={styles.btnlogin} onPress={loginPress}>
                        <Text style={styles.textLogin}>Login</Text>
                    </TouchableOpacity>

                </Animated.View>



            </ImageBackground>
        </InitialLoading >
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
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    containerLogo: {
        flex: 1,
        justifyContent: "flex-start",
        paddingBottom: "0%",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        paddingBottom: "5%",
    },
    containerSingUp: {
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        paddingBottom: "0%",
        height: "15%",
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
        width: "90%",
    },
    btnSingup: {
        backgroundColor: "transparent",
        width: "90%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        borderColor: "#FFF",
        borderWidth: 3,
        marginBottom: "0%",
    },
    btnlogin: {
        backgroundColor: "#FFF",
        width: "90%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    textSingup: {
        color: "#FFF",
        fontSize: 35,
    },
    textLogin: {
        color: "#C9615D",
        fontSize: 35,
    },
    imglogo: {
        width: 340,
        resizeMode: "contain",
    },
});

/*
{
 <TextInput
  style={styles.input}
  placeholder="E-mail"
  autoCorrect={false}
  onChangeText={() => { }}
  />

  <TextInput
  style={styles.input}
  placeholder="Password"
  autoCorrect={false}
  onChangeText={() => { }}
  />
}
*/

/*<ImageBackground style={styles.background} source={require('./assets/backGroundImage.jpg')}>*/
//<KeyboardAvoidingView style={styles.background} behavior="padding" keyboardVerticalOffset={keyboardOffsetPlataform}>