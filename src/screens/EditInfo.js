import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import Hoshi from '../inputTexts/Hoshi';


export default function HomeScreen({ navigation, route }) {

    const [fromScan, setfromScan] = useState(false);
    const params = route.params;

    function haddleSettingsScreen() {
        // if(fromScan)
        // {
        //     navigation.dispatch(
        //         CommonActions.reset({
        //             index: 1,
        //             routes: [{ name: 'SettingsScreen', params: { fromScan: fromScan } },],
        //         })
        //     )
        // }
        // else
        // {
        //     navigation.pop();
        // }

        navigation.pop();

    }

    useEffect(() => {
        if (params.preParams !== undefined) {
           
            if (params.preParams.fromScan) {
                setfromScan(true);
            }
        }
        
    }, []);

    return (

        <SafeAreaView style={[styles.background]} >
            <View style={[styles.containerBack]}>
                <TouchableOpacity onPress={haddleSettingsScreen}>
                    <AntDesign name="left" size={45} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.textEdit}>Edit Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={[styles.scroll]} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={[styles.inputContainer]}>
                    <Hoshi style={styles.input} label={params.item} borderColor={'#fff'} borderHeight={3} inputPadding={16} backgroundColor={'transparent'} /*onChangeText={(value) => setName(value)}*/ boardType={'default'} />
                </View>
                <View style={[styles.textInfoContainer]} >
                    <Text style={[styles.textInfo]}>Change the information you want and click the save button</Text>
                </View>
                <TouchableOpacity style={[styles.saveBtn]}>
                    <Text style={[styles.textSave]}>Save</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        alignItems: 'center',
    },
    containerBack: {
        position: 'absolute',
        top: "7.1%",
        left: "1.5%",
        zIndex: 1,
    },
    header: {
        height: 55,
        padding: 16,
        flexDirection: 'row',

    },
    textEdit: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scroll:
    {
        width: '100%',
    },
    inputContainer: {
        alignItems: "center",
        width: "100%",
        marginTop:20,
    },
    input: {
        width: "90%",
    },
    textInfoContainer:
    {
        marginBottom: 30,
        marginTop:10,
        textAlign: 'left',
    },
    textInfo:
    {
        fontSize: 12,
        color: '#fff',
    },
    saveBtn:
    {
        backgroundColor: "#2B7320",
        width: "90%",
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    textSave:
    {
        fontSize: 22,
        color: '#fff',
    },
});