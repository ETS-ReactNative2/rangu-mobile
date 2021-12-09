import React, { useReducer, useRef, useState, useEffect } from 'react';
import { Ionicons, SimpleLineIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View, SafeAreaView, TextInput, Clipboard } from "react-native";
import apiOrchestrate from '../services/apiOrchestrate.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';

import animationLoadingPayment from '../../assets/animations/waiting/loading-payment.json';
import animationPaymentConfirmation from '../../assets/animations/done/scan-payment-confirmation.json';
import animationLoading from '../../assets/animations/waiting/order-completed.json';

export default function OrderItModal(props) {

    const [comment, onChangeComment] = useState('');
    const [pixCode, setPixCode] = useState('...............................................................................................................................................................................................................................................................................................................');
    const [payed, setPayed] = useState(false);
    const [paymentMode, setPaymentMode] = useState('');
    const [intervalID, setInterID] = useState();

    let userId;
    // let pixId = '18704245508';
    let pixId;
    let letintervalId;
    let tableId;

    useEffect(() => {

        setPaymentMode(props.paymentMode);

        gerarPix();


        letintervalId = setInterval(function () {
            if (global.stopPullingToLeave) {
                clearInterval(letintervalId);
            }
            else {
                verifyPix();
            }

        }, 6 * 1000);
        setInterID(letintervalId);

    }, []);

    function closePopUp() {

        clearInterval(letintervalId);
        props.closeModalPopUp()

    }

    async function gerarPix() {

        try {
            await AsyncStorage.getItem('userid')
                .then(value => {
                    userId = value;
                    console.log('PayModal gerarPix UserId: ' + value);
                    //console.log('UserId: ' + value);

                }).catch(err => {
                    console.log(err);

                });


            let response = await apiOrchestrate.post('/payments', {}, { headers: { clientId: userId, } })
            //console.log(response.data);
            pixId = response.data.id;
            setPixCode(response.data.point_of_interaction.transaction_data.qr_code);

        } catch (error) {
            console.log(error);
        }
    }

    async function verifyPix() {

        try {

            console.log('Pulling pixId: ' + pixId);
            let response = await apiOrchestrate.post('/valid-payments/' + pixId, {},)
            //console.log(response.data);

            console.log('Status: ' + response.data.status);
            if (response.data.status != "pending") {
                setPayed(true);
                clearInterval(letintervalId);

            }

        } catch (error) {
            console.log(error);
        }
    }

    async function leaveBtn() {

        if (paymentMode === 0) {

            try {
                await AsyncStorage.getItem('tableId')
                    .then(value => {
                        tableId = value;
                        console.log('PayModal leaveBtn TableId: ' + value);

                    }).catch(err => {
                        console.log(err);

                    });


                let response = await apiOrchestrate.post('/payments/fishedAll', {}, { headers: { clientTableId: tableId } })
                //console.log(response.data);

            } catch (error) {
                console.log(error);
            }

        }
        else {
            try {
                await AsyncStorage.getItem('userid')
                    .then(value => {
                        userId = value;
                        console.log('PayModal leaveBtn  UserId: ' + value);
                        //console.log('UserId: ' + value);

                    }).catch(err => {
                        console.log(err);

                    });

                await AsyncStorage.getItem('tableId')
                    .then(value => {
                        tableId = value;
                        console.log('PayModal leaveBtn TableId: ' + value);

                    }).catch(err => {
                        console.log(err);

                    });


                let response = await apiOrchestrate.post('/payments/fished', {}, { headers: { clientId: userId, clientTableId: tableId } })
                //console.log(response.data);

            } catch (error) {
                console.log(error);
            }
        }

        props.LeaveTable();
    }

    const copyToClipboard = () => {
        Clipboard.setString(pixCode);
    }

    return (

        <View style={styles.container}>

            <View style={styles.foodName}>
                <Text style={styles.textFoodName} numberOfLines={3}>{paymentMode === 0 ? 'Pagar total da mesa' : 'Pagar meu total'}</Text>
            </View>
            {payed ?
                <View style={styles.containerPayed}>
                    <View style={styles.containerPayedMsg}>
                        <Text style={styles.textPayedMsg} numberOfLines={3}>Pagamento Confirmado!</Text>
                        <Text style={styles.textPayedMsg} numberOfLines={3}>Mostre esta tela para um garçom antes de sair</Text>
                    </View>


                    <View style={styles.containerAnim}>

                        <Lottie speed={0.5} source={animationPaymentConfirmation} autoPlay loop={false} />

                    </View>
                    <View style={[styles.containerOrderButtons]}>
                        <TouchableOpacity onPress={leaveBtn} style={styles.btnLeave} >
                            <Text style={styles.textCancel}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View>
                    <View style={styles.containerPix}>
                        <Text numberOfLines={3} style={styles.textPix}>{pixCode}</Text>
                    </View>

                    <View style={styles.containerAnimLoadingPayment}>
                        <Lottie resizemode="contain" speed={1} source={animationLoadingPayment} autoPlay loop={true} />
                    </View>

                    <View style={styles.containertextWaitingforPayment}>
                        <Text numberOfLines={3} style={styles.textWaitingforPayment}>Aguardando Pagamento</Text>
                    </View>

                    <View style={[styles.containerOrderButtons]}>
                        <TouchableOpacity onPress={copyToClipboard} style={styles.btnCopyCode} >
                            <Text style={styles.textCopyCode}>Copiar Código</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closePopUp} style={styles.btnCancel} >
                            <Text style={styles.textCancel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1e222b",
        borderRadius: 10,
        height: 460,
        alignItems: 'center'

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
    textPayedMsg: {
        color: '#fff',
        fontSize: 15,
        overflow: 'scroll',
        margin: 10
    },
    containerPayed: {
        height: '100%',
        width: '100%',
    },
    containerPayedMsg: {
        alignItems: 'center',

    },
    containerAnim: {
        height: '150%',
        width: '150%',
        marginTop: -225,
        marginLeft: -85

    },
    btnLeave: {
        backgroundColor: "#D7233C",
        width: "90%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    containerPix: {
        margin: 15,
        borderRadius: 10,
        backgroundColor: '#3C404A',
    },
    textPix: {
        padding: 10,
        fontSize: 16,
    },
    containerAnimLoadingPayment: {
        flex: 1,
        marginTop: -30,

    },
    containertextWaitingforPayment: {
        margin: 15,
        borderRadius: 10,
        backgroundColor: '#3C404A',
    },
    textWaitingforPayment: {
        color: '#fff',
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerOrderButtons: {
        marginTop: 'auto',
        marginBottom: 70,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    btnCopyCode: {
        backgroundColor: "#2B7320",
        width: "45%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    textCopyCode: {
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