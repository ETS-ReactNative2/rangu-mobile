import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";
import DishCards from '../components/DishCards';

import { Modalize } from 'react-native-modalize';
import DishInfo from '../components/DishInfo';



export default function HomeScreen({ navigation }) {
    const modalizeRef = useRef(null);
    function onOpen() {
        modalizeRef.current?.open();
    }
    return (

        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={onOpen}>
                        <Text style={styles.textMenu}>Menu</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <DishCards />

            <Modalize modalStyle={styles.modal} ref={modalizeRef} modalHeight={770} scrollViewProps={{ showsVerticalScrollIndicator: false, scrollEnabled: false }}>
                <DishInfo />
            </Modalize>


        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#000',
        flex: 1,
    },
    header: {
        height: 55,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textMenu: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modal: {
        //backgroundColor: "rgba(30, 34, 43, 0.8)",
        backgroundColor: "#1e222b",
    }
});