import React from 'react';
import { Ionicons, SimpleLineIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View } from "react-native";

export default function DishInfo(props) {

    function order() {


        props.closeModal()
    }

    return (
        <View styles={{ justifyContent: 'space-between', flexDirection: 'column' }} >




            <View style={styles.foodImageContainer}>
                <Image style={styles.foodImage} source={props.displayInfo.foodImg} />
            </View>

            <View style={styles.description}>


                <View style={styles.foodName}>
                    <Text style={styles.textFoodName} numberOfLines={3}>{props.displayInfo.dishName}</Text>
                </View>

                <View style={styles.cardBody}>
                    <Text style={styles.textDescription}>{props.displayInfo.description}</Text>
                </View>

                <View style={styles.price}>
                    <Text style={[styles.textActualPrice, { color: '#00fc6c', }]}>{props.displayInfo.price}</Text>
                </View>

            </View>

            <View style={styles.cardFooter}>

                <View style={styles.order}>
                    <Text style={styles.textOrder}>Order this Dish</Text>
                </View>

                <TouchableOpacity onPress={order} >
                    <View style={styles.cartIcon}>
                        {/* <Ionicons name="ios-cart-sharp" color="#fff" size={30} /> */}
                        {/* <SimpleLineIcons name="note" color="#fff" size={25} /> */}
                        {/* <MaterialIcons name="border-color" color="#fff" size={30} /> */}
                        <AntDesign name="form" color="#fff" size={30} />
                    </View>
                </TouchableOpacity>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    description: {
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#3C404A",
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 15,
        borderRadius: 15,
        marginTop: 15,
    },
    card: {
        backgroundColor: "#1e222b",
        borderRadius: 8,
        marginBottom: 0,
        padding: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    foodImageContainer: {
        borderRadius: 100

    },
    foodImage: {
        overflow: 'hidden',
        height: 250,
        width: "100%",
        resizeMode: "cover",
    },
    foodName: {
        flex: 1,

    },
    textFoodName: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        overflow: 'scroll',

    },
    cardBody: {
        marginTop: 15,

    },
    textDescription: {
        color: '#fff',
        fontSize: 17,
    },
    cardFooter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 15,
        borderRadius: 15,
        height: 60,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: "#3C404A",

    },
    order: {
        flex: 1,
        marginLeft: 20,

    },
    textOrder: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    cartIcon:
    {
        height: 40,
        width: 90,
        backgroundColor: "#D7233C",
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: "center",
    },
    price: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textActualPrice: {
        fontWeight: 'bold',
        fontSize: 20,

    },

});