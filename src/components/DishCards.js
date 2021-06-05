import React, { useReducer, useRef } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View } from "react-native";


import img1 from '../../assets/images/Food/o-lanche-big-mac-do-mcdonalds-1574807643968_v2_450x337.png';
import img2 from '../../assets/images/Food/HamburgerComum.jpg';
import img3 from '../../assets/images/Food/Macarrãotop.jpg';
import img4 from '../../assets/images/Food/e88491e60a4f57928fb8a03a44a37c9e.jpg';
import img5 from '../../assets/images/Food/4589_4k.jpg';
import img6 from '../../assets/images/Food/kzXpdQfc.png';
import img7 from '../../assets/images/Food/miniBurgers.jpg';
import img8 from '../../assets/images/Food/WICKBOLD_0037_17_POSTS_JUNHO_08.jpg';


const foods = [
    {
        key: String(Math.random()),
        foodImg: img1,
        dishName: 'Big Mac',
        eta: '5 min',
        price: 'R$ 35.99',
        description: "There is nothing like it. Two hamburgers, lettuce, cheese and special sauce, onion and pickles on a sesame bun. The flavor of McDonald's is triply delicious. With three 100% beef burgers, melted cheese, onion, pickles, ketchup and mustard. There is nothing like it. Two hamburgers, lettuce, cheese and special sauce, onion and pickles on a sesame bun.",
    },
    {
        key: String(Math.random()),
        foodImg: img2,
        dishName: 'Generic Burger',
        eta: '15 min',
        price: 'R$ 29.90',
        description: "That's what you expect from a Burger",
    },
    {
        key: String(Math.random()),
        foodImg: img3,
        dishName: 'Spaghetti',
        eta: '10 min',
        price: 'R$ 26.75',
        description: "There's not much to say, but for those who are hungry, it's good",
    },
    {
        key: String(Math.random()),
        foodImg: img4,
        dishName: 'Bloomin’ Onion',
        eta: '30 min',
        price: 'R$ 49.90',
        description: "Our famous giant golden onion with the authentic Outback flavor. With our wonderful Bloom sauce.",
    },
    {
        key: String(Math.random()),
        foodImg: img5,
        dishName: 'Another One',
        eta: '3 horas e 30 min',
        price: 'R$ 199.90',
        description: '',
    },
    {
        key: String(Math.random()),
        foodImg: img6,
        dishName: 'McChicken',
        eta: '2 min',
        price: 'R$ 10.90',
        description: "The flavor you love. Breaded and browned chicken with a smooth, creamy sauce, accompanied by crispy lettuce on a sesame bun.",
    },
    {
        key: String(Math.random()),
        foodImg: img7,
        dishName: 'Mini Burgers',
        eta: '36 min',
        price: 'R$ 48.90',
        description: "Several top burgers! To eat in one bite!",
    },
    {
        key: String(Math.random()),
        foodImg: img8,
        dishName: 'Hot Dog',
        eta: '1 hora e 9 min',
        price: 'R$ 25.99',
        description: "Mustard ketchup and two sausages, for those who like double everything",
    },
];

export default function DishCards(props) {

    return (
        <View style={{ marginBottom: 55 }}>
            <ScrollView>
                {foods.map((food) => (
                    <View style={styles.container} key={food.key}>
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Image style={styles.foodImage} source={food.foodImg} />
                                <View style={styles.foodName}>
                                    <Text style={styles.textFoodName} numberOfLines={3}>{food.dishName}</Text>
                                </View>

                                <View>
                                    <TouchableOpacity onPress={() => props.dishDetailsCallBack(food)}>
                                        <AntDesign name="pluscircle" color="#D7233C" size={35} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            {food.description !== '' ?
                                <View style={styles.cardBody}>
                                    <Text style={styles.textDescription} numberOfLines={4}>{food.description}</Text>
                                </View>
                                : null}

                            <View style={styles.cardFooter}>
                                <View style={styles.price}>
                                    <Text style={styles.textPrice}>Price:</Text>

                                    <Text style={[styles.textActualPrice, { color: '#00fc6c', }]}>{food.price}</Text>

                                </View>
                                <View style={styles.price}>
                                    <Entypo name="time-slot" color="#fff" size={14} />
                                    <Text style={styles.textEta}>{food.eta}</Text>
                                </View>

                            </View>

                        </View>

                    </View>

                ))}

            </ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,

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
    foodImage: {
        borderRadius: 50,
        height: 85,
        width: 85,
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
    cardBody: {
        marginTop: 15,

    },
    textDescription: {
        color: '#fff',
        fontSize: 14,
    },
    cardFooter: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textPrice: {
        color: '#fff',
        fontSize: 14,
    },
    textActualPrice: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 10,

    },
    textEta: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 13,
    },
    modal: {
        //backgroundColor: "rgba(30, 34, 43, 0.8)",
        backgroundColor: "#1e222b",
    }

});