import React, { useReducer, useRef, useState, useEffect } from 'react';
import { Ionicons, SimpleLineIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View, SafeAreaView, TextInput } from "react-native";
import apiOrders from '../services/apiOrders.js';
import apiOrchestrate from '../services/apiOrchestrate.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';

import animationLoading from '../../assets/animations/waiting/order-completed.json';
import animation from '../../assets/animations/loading/generic/food-loading.json';

export default function OrderItModal(props) {

    const [comment, onChangeComment] = useState('');
    const [sending, setsending] = useState(false);

    let tableId;
    let restaurantId;
    let userId;

    useEffect(() => {



    }, []);

    function closePopUp() {

        props.closeModalPopUp()
    }

    async function confirmOrder() {


        try {
            await AsyncStorage.getItem('restaurantId')
                .then(value => {
                    restaurantId = value;
                    console.log('OrderItModal RestaurantId: ' + value);
                    //console.log('BearerToken: ' + value);

                }).catch(err => {
                    console.log(err);

                });

            await AsyncStorage.getItem('tableId')
                .then(value => {
                    tableId = value;
                    console.log('OrderItModal TableId: ' + value);
                    //console.log('BearerToken: ' + value);

                }).catch(err => {
                    console.log(err);

                });

            await AsyncStorage.getItem('userid')
                .then(value => {
                    userId = value;
                    console.log('OrderItModal UserId: ' + value);
                    //console.log('UserId: ' + value);

                }).catch(err => {
                    console.log(err);

                });

            console.log('UserId: ' + userId);
            console.log('Request: ' + props.displayInfo.id);
            console.log('Comment: ' + comment);
            setsending(true);
            let response = await apiOrchestrate.post('/orders', { dishes: [props.displayInfo.id], comment: comment }, { headers: { "clientId": userId, "restaurantId": restaurantId, "tableId": tableId } })
            //console.log(response.data);

        } catch (error) {
            console.log(error);
        }

        setTimeout(() => {
            props.orderConfirmed();
        }, 1800);

    }

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <View style={styles.foodName}>
                    <Text style={styles.textFoodName} numberOfLines={3}>{props.displayInfo.name}</Text>
                </View>
                {sending ?
                    <View style={styles.containerAnim}>
                        <Lottie resizemode="center" speed={0.2} source={animationLoading} autoPlay loop={false} />
                    </View>
                    :
                    <View style={{ height: 290, }}>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                multiline
                                numberOfLines={4}
                                onChangeText={text => onChangeComment(text)}
                                value={comment}
                                style={styles.textInput}
                                editable
                                maxLength={255}
                                blurOnSubmit
                                placeholder={'Informações adicionais'}
                                placeholderTextColor={"#1e222b"}
                                keyboardAppearance={'dark'}>
                            </TextInput>
                        </View>

                        <View style={[styles.containerOrderButtons]}>
                            <TouchableOpacity onPress={confirmOrder} style={styles.btnOrderIt} >
                                <Text style={styles.textOrderIt}>Pedir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closePopUp} style={styles.btnCancel} >
                                <Text style={styles.textCancel}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1e222b",
        borderRadius: 10,
        marginBottom: 0,
        height: 350,
    },
    foodName: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
    },
    textFoodName: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        overflow: 'scroll',
    },
    containerAnim: {
        height: '100%',
        width: '100%'
    },
    containerTextInput: {
        backgroundColor: '#3C404A',
        margin: 15,
        borderRadius: 10,
    },
    textInput: {
        padding: 10,
        height: 150,
        fontSize: 16,
    },
    containerOrderButtons: {
        marginTop: 'auto',
        marginBottom: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    btnOrderIt: {
        backgroundColor: "#2B7320",
        width: "45%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    textOrderIt: {
        color: "#FFF",
        fontSize: 20,
    },
    btnCancel: {
        backgroundColor: "#D7233C",
        width: "45%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    textCancel: {
        color: "#FFF",
        fontSize: 20,
    },

});