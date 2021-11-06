import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";



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
                <ScrollView>
                    {command.map((food) => (
                        <View style={styles.celulaContainer} key={food.key}>
                            <View style={styles.celula}>
                                <Image style={styles.foodImage} source={food.foodImg} />
                                <View style={styles.foodName}>
                                    <Text style={styles.textFoodName} numberOfLines={3}>{food.dishName}</Text>
                                </View>
                                <View style={styles.price}>
                                    <Text style={[styles.textActualPrice, { color: '#00fc6c', }]}>{food.price}</Text>
                                </View>
                            </View>

                        </View>

                    ))}

                </ScrollView>
            </View>
            <View style={[styles.containerTotal]}>
                <View style={[styles.containerTableTotal]}>
                    <Text style={styles.textTableTotal} numberOfLines={3}>Table total :</Text>
                    <Text style={styles.textActualTableTotal} numberOfLines={3}>R$: 459.90</Text>
                </View>
                <View style={[styles.containerMyTotal]}>
                    <Text style={styles.textMyTotal} numberOfLines={3}>My total :</Text>
                    <Text style={styles.textActualMyTotal} numberOfLines={3}>R$: 129.28</Text>
                </View>
            </View>

            <View style={[styles.containerPayButtons]}>
                <TouchableOpacity style={styles.btnPayTable} >
                    <Text style={styles.textPayTable}>Pay Table Total</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnPayMy} >
                    <Text style={styles.textPayMy}>Pay My Total</Text>
                </TouchableOpacity>
            </View>

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
        marginBottom:20,
        flexDirection: 'row',
        width:'100%',
        justifyContent:'space-around'
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