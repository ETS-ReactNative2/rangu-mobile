import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ImageBackground, Animated, Platform, } from "react-native";

export default function CheckScreen({ navigation }) {

    return (

        <Animated.View style={[styles.background]} >
            <Text style={styles.text}>CheckScreen - Where will you pay 💵</Text>

        </Animated.View>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    text: {
        color: "#fff",
    },
});