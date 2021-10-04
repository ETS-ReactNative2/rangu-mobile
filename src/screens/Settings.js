import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons,Feather } from '@expo/vector-icons';

import img1 from '../../assets/images/Profile/FotoPerfil2_Cortada.jpg';
const user =
{
    key: String(Math.random()),
    personProfileImg: img1,
    personName: 'Leonardo',
}

export default function HomeScreen({ navigation }) {

    return (

        <SafeAreaView style={[styles.background]} >
            <View style={styles.header}>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.textSettings}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.profileImageContainer}>
                <Image style={[styles.profileImage]} source={user.personProfileImg} />
                <TouchableOpacity style={[styles.iconContainer]}>
                    <View>
                        <MaterialIcons name="edit" size={30} color="black" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <View style={styles.celula}>
                    <Text>Nome: Leonardo</Text>
                </View>
                <View style={styles.celula}>
                    <Text>Nome: Leonardo</Text>
                </View>
                <View style={styles.celula}>
                    <Text>Nome: Leonardo</Text>
                </View>
                <View style={styles.celula}>
                    <Text>Nome: Leonardo</Text>
                </View>
                <View style={styles.celula}>
                    <Text>Nome: Leonardo</Text>
                </View>
            </View>


        </SafeAreaView>

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
    textSettings: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileImageContainer: {
        alignItems: "center",
        marginHorizontal: 140,

    },
    profileImage: {
        borderRadius: 100,
        height: 140,
        width: 140,
    },
    iconContainer:{
        backgroundColor: '#fff',
        borderRadius:100,
        position: 'absolute',
        alignItems: 'center',
        justifyContent:'center',
        width:"27%",
        height: "25%",
        alignSelf: 'flex-end',
        bottom: "5%",
    },
    body:
    {
        marginTop:50,
        backgroundColor: "#1e222b",
        borderRadius:30,
        width: "90%",
    },
    celula:
    {
        height: 40,
        justifyContent:'center',
        marginHorizontal:20,
        marginBottom:10,
        borderBottomWidth:1,
        borderColor:'#fff',
    }
});