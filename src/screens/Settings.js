import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import Hoshi from '../inputTexts/Hoshi';

import img1 from '../../assets/images/Profile/FotoPerfil2_Cortada.jpg';
const user =
{
    key: String(Math.random()),
    personProfileImg: img1,
    personName: 'Leonardo Mariotto',
    personEmail: 'leonardo_mariotto@yahoo.com.br',
    personPhone: '+55 (19)981824269'
}

export default function HomeScreen({ navigation }) {

    return (

        <SafeAreaView style={[styles.background]} >
            <View style={[styles.containerBack]}>
                <TouchableOpacity>
                    <AntDesign name="left" size={45} color="white" />
                </TouchableOpacity>
            </View>

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
                <View style={styles.celulaContainer}>
                    <View style={styles.celula}>
                        <Text style={styles.text}>Nome:</Text>
                        <TouchableOpacity style={styles.editBtn}>
                            <Text style={styles.text}>{user.personName}</Text>
                            <AntDesign name="right" size={20} color="#535357" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.celula}>
                    <Text style={styles.text}>E-Mail:</Text>
                        <TouchableOpacity style={styles.editBtn}>
                            <Text style={styles.text}>{user.personEmail}</Text>
                            <AntDesign name="right" size={20} color="#535357" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.celula}>
                    <Text style={styles.text}>Telefone:</Text>
                        <TouchableOpacity style={styles.editBtn}>
                            <Text style={styles.text}>{user.personPhone}</Text>
                            <AntDesign name="right" size={20} color="#535357" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.celula}>
                        <Text>Nome: Leonardo</Text>
                    </View>
                    <View style={styles.celula}>
                        <Text>Nome: Leonardo</Text>
                    </View>
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
    iconContainer: {
        backgroundColor: '#fff',
        borderRadius: 100,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: "27%",
        height: "25%",
        alignSelf: 'flex-end',
        bottom: "5%",
    },
    body:
    {
        marginTop: 50,
        backgroundColor: "#1e222b",
        borderRadius: 20,
        width: "90%",
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'flex-end',

    },
    celulaContainer:
    {
        marginVertical: 10
    },
    celula:
    {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 15,
        borderBottomWidth: 0.5,
        borderColor: '#3e3d40',
    },
    text:
    {
        fontSize: 15,
        color: '#fff',
    },
    editBtn:
    {
        flexDirection: 'row',
        marginRight:10,
    }
});