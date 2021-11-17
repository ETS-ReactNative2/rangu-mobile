import React from 'react';
import { Ionicons, SimpleLineIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View, SafeAreaView, TextInput } from "react-native";

export default function OrderItModal(props) {

    const [comment, onChangeComment] = React.useState('');

    function closePopUp() {

        props.closeModalPopUp()
    }

    function confirmOrder() {

        props.orderConfirmed()
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>

            <View style={styles.foodName}>
                    <Text style={styles.textFoodName} numberOfLines={3}>{props.displayInfo.name}</Text>
                </View>

                <View style={styles.containerTextInput}>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        onChangeText={text => onChangeComment(text)}
                        value={comment}
                        style={ styles.textInput}
                        editable
                        maxLength={255}
                        blurOnSubmit
                        placeholder={'Additional infos'}
                        placeholderTextColor= {"#1e222b"}
                        keyboardAppearance = {'dark'}>
                    </TextInput>
                </View>

                <View style={[styles.containerOrderButtons]}>
                    <TouchableOpacity onPress={confirmOrder} style={styles.btnOrderIt} >
                        <Text style={styles.textOrderIt}>Order It</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={closePopUp} style={styles.btnCancel} >
                        <Text style={styles.textCancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1e222b",
        borderRadius: 10,
        marginBottom: 0,
        height: 350,
    },
    foodName: {
        alignItems:'center',
        marginTop:20,
        marginBottom:5,
    },
    textFoodName: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        overflow: 'scroll',
    },
    containerTextInput: {
        backgroundColor: '#3C404A',
        margin: 15,
        borderRadius: 10,
    },
    textInput:{
        padding: 10,
        height: 150,
        fontSize: 16,
    },
    containerOrderButtons: {
        marginTop: 'auto',
        marginBottom: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    btnOrderIt: {
        backgroundColor: "#2B7320",
        width: "45%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    textOrderIt: {
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