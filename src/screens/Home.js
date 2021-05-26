import React from 'react';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { StyleSheet, ScrollView, SafeAreaView, View, Text } from 'react-native';

import Members from '../../src/components/TableMembers';
import RequestedDish from '../components/RequestedDish';


export default function HomeScreen({ navigation }) {

    return (

        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.textTableMembers}>Table Members</Text>
                </View>
            </View>
            <View>
                <Members />
            </View>
            <View style={styles.TableActivity}>
                <Text style={styles.textTableActivity}>Table Activity</Text>
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
    },
    textTableMembers: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textTableActivity: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});