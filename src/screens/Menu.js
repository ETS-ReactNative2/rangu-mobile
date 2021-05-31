import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";
import DishCards from '../components/DishCards';

import { Modalize } from 'react-native-modalize';
import DishInfo from '../components/DishInfo';



export default function HomeScreen({ navigation }) {
    const [food, setFood] = useState();
    const modalizeRef = useRef(null);

    useEffect(() => {

        if (food !== undefined || '') {
            modalizeRef.current?.open();
        }
    }, [food]);

    function onCloseModal() {
        setFood('');
    }

    function closeModal() {
        modalizeRef.current?.close();
        setFood('');
    }
    return (

        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.textMenu}>Menu</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <DishCards dishDetailsCallBack={food => setFood(food)} />

            <Modalize modalStyle={styles.modal} ref={modalizeRef} modalHeight={770} onClose={onCloseModal} scrollViewProps={{ showsVerticalScrollIndicator: false, scrollEnabled: true, }}>
                <DishInfo displayInfo={food} closeModal={closeModal} />
            </Modalize>

        </SafeAreaView >

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
        backgroundColor: "#1e222b",
    },
});