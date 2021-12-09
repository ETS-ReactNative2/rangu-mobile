import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView, TouchableOpacity, ImageBackground, Animated, Platform, RefreshControl, } from "react-native";
import { CommonActions } from '@react-navigation/native';
import apiOrchestrate from '../services/apiOrchestrate.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import Lottie from 'lottie-react-native';

import PayModal from '../components/PayModal';
import animationLoading from '../../assets/animations/loading/generic/loadingSpinner.json';



import img1 from '../../assets/images/Food/o-lanche-big-mac-do-mcdonalds-1574807643968_v2_450x337.png';
import img2 from '../../assets/images/Food/HamburgerComum.jpg';
import img3 from '../../assets/images/Food/Macarrãotop.jpg';
import img4 from '../../assets/images/Food/e88491e60a4f57928fb8a03a44a37c9e.jpg';
import img5 from '../../assets/images/Food/4589_4k.jpg';
import img6 from '../../assets/images/Food/kzXpdQfc.png';
import img7 from '../../assets/images/Food/miniBurgers.jpg';
import img8 from '../../assets/images/Food/WICKBOLD_0037_17_POSTS_JUNHO_08.jpg';

const command = [
    {
        key: String(Math.random()),
        foodImg: img1,
        dishName: 'Big Mac',
        price: 'R$ 35.99',
    },
    {
        key: String(Math.random()),
        foodImg: img2,
        dishName: 'Generic Burger',
        price: 'R$ 29.90',
    },
    {
        key: String(Math.random()),
        foodImg: img3,
        dishName: 'Spaghetti',
        price: 'R$ 26.75',
    },
    {
        key: String(Math.random()),
        foodImg: img4,
        dishName: 'Bloomin’ Onion',
        price: 'R$ 49.90',
    },
    {
        key: String(Math.random()),
        foodImg: img5,
        dishName: 'Another One',
        price: 'R$ 199.90',
    },
    {
        key: String(Math.random()),
        foodImg: img6,
        dishName: 'McChicken',
        price: 'R$ 10.90',
    },
    {
        key: String(Math.random()),
        foodImg: img7,
        dishName: 'Mini Burgers',
        price: 'R$ 48.90',
    },
    {
        key: String(Math.random()),
        foodImg: img8,
        dishName: 'Hot Dog',
        price: 'R$ 25.99',
    },
];

export default function CheckScreen({ navigation }) {

    const [Checkout, setCheckout] = useState({ allOrders: [] });
    const [refreshing, setRefreshing] = useState(false);
    const [myTotal, setmyTotalg] = useState();
    const [tableTotal, setTableTotalg] = useState();
    const modalizeRef = useRef(null);
    const [isModalPopUpVisible, setModalPopUpVisible] = useState(false);
    const [animationOut, setanimationOut] = useState("slideOutDown");
    const [loading, setloading] = useState(true);
    const [paymentMode, setPaymentMode] = useState('');

    let tableId = '';
    let userid = '';

    useEffect(() => {

        LoadCheckout();

        if (global.pulling) {
            var intervalId = setInterval(function () {
                if (global.stopPullingToLeave) {
                    clearInterval(intervalId);
                }
                else {
                    LoadCheckout();
                }

            }, 10 * 1000);
        }

    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        LoadCheckout().then(() => setRefreshing(false));
    }, []);

    function closeModalPopUp() {
        setModalPopUpVisible(false);
    }

    function openModalPopUp() {
        setModalPopUpVisible(true);
    }

    function PayTableTotalPress() {
        setPaymentMode(0);
        openModalPopUp();
    }


    function PayMyTotalPress() {
        setPaymentMode(1);
        openModalPopUp();

    }

    async function LeaveTable() {
        global.stopPullingToLeave = true;
        setanimationOut("slideOutUp");
        closeModalPopUp();
        //await AsyncStorage.removeItem('restaurantId');
        //await AsyncStorage.removeItem('tableId');

        setanimationOut("slideOutDown");

        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'ScanScreen' },
                ],
            })
        )

    }

    async function LoadCheckout() {
        try {

            await AsyncStorage.getItem('tableId')
                .then(value => {
                    tableId = value;
                    console.log('Check TableId: ' + value);

                }).catch(err => {
                    console.log(err);

                });

            await AsyncStorage.getItem('userid')
                .then(value => {
                    userid = value;
                    console.log('Check UserId: ' + value);

                }).catch(err => {
                    console.log(err);

                });

            let response = await apiOrchestrate.get('/checkout', { headers: { clientTableId: tableId, clientId: userid } })

            //console.log(response.data);
            setCheckout(response.data);
            setloading(false);
            CalculateTotals(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    function CalculateTotals(values) {

        //console.log(values);
        let LocalMyTotal = 0;
        let LocalTableTotal = 0;

        values.clientOrders.map(value => LocalMyTotal += value.totalPrice);
        values.allOrders.map(value => LocalTableTotal += value.totalPrice);

        setmyTotalg(LocalMyTotal);
        setTableTotalg(LocalTableTotal);
    }


    return (
        <SafeAreaView style={[styles.background]} >
            <View style={styles.header}>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.textCheckOut}>Check Out</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.containerCommand]}>
                {loading ?
                    <View style={styles.loadingContainer}>
                        <Lottie style={styles.loadingAnim} source={animationLoading} autoPlay loop />
                    </View>
                    :
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors='#fff' tintColor='#fff' />}>
                        {Checkout.allOrders.map((food) => (
                            <View style={styles.celulaContainer} key={food.id}>
                                <View style={styles.celula}>
                                    <Image style={styles.foodImage} source={food.dishes.map((dish, index) => { if (index == 0) { return { uri: dish.image } } })} />
                                    <View style={styles.foodName}>
                                        <Text style={styles.textFoodName} numberOfLines={3}>{food.dishes.map((dish, index) => { if (index == 0) { return dish.name } })}</Text>
                                        <Text style={styles.textClientName} numberOfLines={3}>{food.clientName}</Text>
                                    </View>
                                    <View style={styles.price}>
                                        <Text style={[styles.textActualPrice, Checkout.clientOrders.filter(order => order.id === food.id).length == 0 ? { color: '#00fc6c', } : { color: '#D7233C', }]}>R$ {food.totalPrice ? food.totalPrice.toFixed(2) : '????'}</Text>
                                    </View>
                                </View>

                            </View>

                        ))}

                    </ScrollView>

                }

            </View>
            <View style={[styles.containerTotal]}>
                <View style={[styles.containerTableTotal]}>
                    <Text style={styles.textTableTotal} numberOfLines={3}>Table total :</Text>
                    <Text style={styles.textActualTableTotal} numberOfLines={3}>R$ {tableTotal ? tableTotal.toFixed(2) : '????'}</Text>
                </View>
                <View style={[styles.containerMyTotal]}>
                    <Text style={styles.textMyTotal} numberOfLines={3}>My total :</Text>
                    <Text style={styles.textActualMyTotal} numberOfLines={3}>R$ {myTotal ? myTotal.toFixed(2) : '????'}</Text>
                </View>
            </View>

            <View style={[styles.containerPayButtons]}>
                <TouchableOpacity onPress={PayTableTotalPress} style={styles.btnPayTable} >
                    <Text style={styles.textPayTable}>Pay Table Total</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={PayMyTotalPress} style={styles.btnPayMy} >
                    <Text style={styles.textPayMy}>Pay My Total</Text>
                </TouchableOpacity>
            </View>


            <Modal animationOut={animationOut} isVisible={isModalPopUpVisible} avoidKeyboard={true} animationInTiming={400} animationOutTiming={400} >
                <PayModal paymentMode={paymentMode} closeModalPopUp={closeModalPopUp} LeaveTable={LeaveTable} />
            </Modal>

        </SafeAreaView >
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
    textCheckOut: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerCommand: {
        marginTop: 20,
        backgroundColor: "#1e222b",
        borderRadius: 20,
        width: "90%",
        height: "50%",
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    loadingContainer: {
        height: '100%',
        width: '100%'
    },
    loadingAnim: {
        marginBottom: 0,
    },
    celulaContainer:
    {
        marginVertical: 10
    },
    celula:
    {
        flexDirection: 'row',
        height: 75,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 5,
        marginRight: 15,
        borderBottomWidth: 0.5,
        borderColor: '#3e3d40',
    },
    foodImage: {
        borderRadius: 15,
        height: 70,
        width: 70,
    },
    foodName: {
        flex: 1,
    },
    textFoodName: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 15,
        marginRight: 15,
        fontWeight: 'bold',
        overflow: 'scroll',
    },
    textClientName: {
        color: '#fff',
        fontSize: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        overflow: 'scroll',
    },
    price: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    textActualPrice: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 10,

    },
    containerTotal: {
        marginTop: 15,
        width: '90%',
    },
    containerTableTotal: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textTableTotal: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        overflow: 'scroll',
    },
    textActualTableTotal: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 15,
        fontWeight: 'bold',
        overflow: 'scroll',
    },
    containerMyTotal: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textMyTotal: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        overflow: 'scroll',
    },
    textActualMyTotal: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 15,
        fontWeight: 'bold',
        overflow: 'scroll',
    },
    containerPayButtons: {
        marginTop: 'auto',
        marginBottom: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    btnPayTable: {
        backgroundColor: "#2B7320",
        width: "45%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    textPayTable: {
        color: "#FFF",
        fontSize: 20,
    },
    btnPayMy: {
        backgroundColor: "#D7233C",
        width: "45%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    textPayMy: {
        color: "#FFF",
        fontSize: 20,
    },
});