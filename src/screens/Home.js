import React, { useState } from 'react';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { StyleSheet, ScrollView, SafeAreaView, View, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import Members from '../../src/components/TableMembers';
import RequestedDish from '../components/RequestedDish';



export default function HomeScreen({ navigation }) {

    const [TableNumber, setTableNumber] = useState('');

    function forcedLeaveTabel() {
        global.stopPullingToLeave = true;
        //await AsyncStorage.removeItem('restaurantId');
        //await AsyncStorage.removeItem('tableId');

        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: 'ScanScreen' },
                ],
            })
        )
    }

    return (

        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.textTableMembers}>Membros da Mesa {TableNumber ? TableNumber : '??'}</Text>
                </View>
            </View>
            <View>
                <Members leaveTable={forcedLeaveTabel} tableNumber={(number) => setTableNumber(number)} />
            </View>
            <View style={styles.TableActivity}>
                <Text style={styles.textTableActivity}>Atividade da Mesa</Text>
            </View>
            <RequestedDish />
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
    TableActivity: {
        padding: 16,
        alignItems: 'center',
    },
    textTableMembers: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textTableActivity: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});