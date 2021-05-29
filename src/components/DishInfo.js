import React from 'react';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View } from "react-native";

import img1 from '../../assets/images/Food/o-lanche-big-mac-do-mcdonalds-1574807643968_v2_450x337.png';
import img2 from '../../assets/images/Food/HamburgerComum.jpg';
import img3 from '../../assets/images/Food/Macarrãotop.jpg';
import img4 from '../../assets/images/Food/e88491e60a4f57928fb8a03a44a37c9e.jpg';
import img5 from '../../assets/images/Food/4589_4k.jpg';
import img6 from '../../assets/images/Food/kzXpdQfc.png';
import img7 from '../../assets/images/Food/miniBurgers.jpg';
const foods = [
    {
        key: String(Math.random()),
        foodImg: img1,
        dishName: 'Big Mac',
        eta: '5 min',
        price: 'R$ 35.99',
        description: 'Não existe nada igual. Dois hambúrgueres, alface, queijo e molho especial, cebola e picles num pão com gergelim. O sabor de McDonald’s triplamente delicioso. Com três hambúrgueres de carne 100% bovina, queijo derretido, cebola, picles, ketchup e mostarda.',
    },
];

export default function DishInfo() {
    return (
        <View >
            <View style={styles.foodImageContainer}>
                <Image style={styles.foodImage} source={img1} />
            </View>
            <View style={styles.container}>
                <ScrollView>

                    <View style={styles.foodName}>
                        <Text style={styles.textFoodName} numberOfLines={3}>Big Mac</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.textDescription}>Não existe nada igual. Dois hambúrgueres, alface, queijo e molho especial, cebola e picles num pão com gergelim. O sabor de McDonald’s triplamente delicioso. Com três hambúrgueres de carne 100% bovina, queijo derretido, cebola, picles, ketchup e mostarda.</Text>
                    </View>
                    <View style={styles.price}>

                        <Text style={[styles.textActualPrice, { color: '#00fc6c', }]}>R$35.90</Text>

                    </View>


                </ScrollView>
                <View style={styles.cardFooter}>
                    <Text>Teste</Text>
                </View>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    backGround: {

    },
    container: {

        marginLeft: 20,
        marginRight: 20,

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


    },
    foodImage: {
        //borderRadius: 100,
        overflow: 'hidden',
        width: "100%",
        //height: "70%",
        resizeMode: "contain",

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
        height: 200,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#fff"
    },
    price: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textPrice: {
        color: '#fff',
        fontSize: 19,
    },
    textActualPrice: {
        fontWeight: 'bold',
        fontSize: 20,

    },
    textEta: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 13,
    }

});