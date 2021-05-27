import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";
import DishCards from '../components/DishCards';

export default function HomeScreen({ navigation }) {

    return (

        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.textMenu}>Menu</Text>
                </View>
            </View>

            <DishCards />

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#000',
        flex: 1,
    },
    header: {
        height: 61,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textMenu: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
});