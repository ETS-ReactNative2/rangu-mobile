import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import img1 from '../../assets/images/Profile/FotoPerfil2_Cortada.jpg';
const user =
{
    key: String(Math.random()),
    personProfileImg: img1,
    personName: 'Leonardo M. Mariotto',
    personEmail: 'leonardo_mariotto@yahoo.com.br',
    personPhone: '+55 (19) 981824269',
    personStreet: 'Rua Dr. Ruy Viccente de Mello, 687',
    personDistrict: 'Cidade Univercitária',
    personState: 'São Paulo',
    personZip: '13083-745',
    personCity: 'Campinas'
}

export default function HomeScreen({ navigation, route }) {

    const params = route.params;
    const [fromScan, setfromScan] = useState(false);

    function haddleEdit(item) {
        navigation.push('EditInfoScreen', { item: item, preParams:params})
    }

    function haddleScanScreen() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'ScanScreen' },
                ],
            })
        )
    }

    async function LogOut(){
        await AsyncStorage.removeItem('token')
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'StartScreen', params: { loading: false } },
                ],
            }))
    }

    useEffect(() => {

        if (params !== undefined) {
           
            if (params.fromScan) {
                setfromScan(true);
            }
        }
        
    }, []);


    return (

        <SafeAreaView style={[styles.background]} >

            {fromScan &&
                <View style={[styles.containerBack]}>
                    <TouchableOpacity onPress={haddleScanScreen}>
                        <AntDesign name="left" size={45} color="white" />
                    </TouchableOpacity>
                </View>
            }


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

            <ScrollView style={[styles.scroll]} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>

                <View style={styles.body}>
                    <View style={styles.celulaContainer}>
                        <View style={styles.celula}>
                            <Text style={styles.text}>Name:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('Name')}>
                                <Text style={styles.textInfo} numberOfLines={1}>{user.personName}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>E-Mail:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('E-Mail')}>
                                <Text style={styles.textInfo} numberOfLines={1}>{user.personEmail}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>Phone:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('Phone')}>
                                <Text style={styles.textInfo} numberOfLines={1}>{user.personPhone}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.nextBody}>
                    <View style={styles.celulaContainer}>
                        <View style={styles.celula}>
                            <Text style={styles.text}>Street:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('Street')}>
                                <Text style={styles.textInfo} numberOfLines={1}>{user.personStreet}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>District:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('District')}>
                                <Text style={styles.textInfo} numberOfLines={1}>{user.personDistrict}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>State:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('State')}>
                                <Text style={styles.textInfo} numberOfLines={1}>{user.personState}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>CEP:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('CEP')}>
                                <Text style={styles.textInfo} numberOfLines={1}>{user.personZip}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>City:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('City')}>
                                <Text style={styles.textInfo} numberOfLines={1}>{user.personCity}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.containerLogOut}>
                    <TouchableOpacity  onPress={LogOut}>
                        <Text style={styles.textLogOut}>Log Out</Text>
                    </TouchableOpacity>
                </View>


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
    scroll:
    {
        width: '100%',
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
    nextBody:
    {
        marginTop: 20,
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
    textInfo:
    {
        textAlign: 'right',
        width: 235,
        fontSize: 15,
        color: '#fff',
    },
    editBtn:
    {
        flexDirection: 'row',
        marginRight: 10,
    },
    containerLogOut:
    {
        marginTop: 25,
        marginBottom:30
    },
    textLogOut:
    {
        textAlign: 'center',
        fontSize: 20,
        color: '#D7233C',
    },
});