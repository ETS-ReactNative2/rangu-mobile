import React, { useReducer, useRef, useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View } from "react-native";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import apiOrchestrate from '../services/apiOrchestrate.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import imgDefault from '../../assets/images/Profile/DefaultProfileImg.png';

import img1 from '../../assets/images/Profile/FotoPerfil2_Cortada.jpg';
import img2 from '../../assets/images/Profile/40037515.jpg';
import img3 from '../../assets/images/Profile/38963605.jpg';
import img4 from '../../assets/images/Profile/Luiz.jpeg';
import img5 from '../../assets/images/Profile/20191214_8154_iOS.jpg';
import img6 from '../../assets/images/Profile/20191013_00.jpg';
import img7 from '../../assets/images/Profile/20210121_17292.jpg';
import img8 from '../../assets//images//Profile/Leo.jpeg';


const people = [
    {
        key: String(Math.random()),
        personProfileImg: img1,
        personName: 'Leonardo',
        autorized: true,
        owner: true,
    },

    {
        key: String(Math.random()),
        personProfileImg: img5,
        personName: 'Henrrique',
        autorized: false,
        owner: false,
    },
    {
        key: String(Math.random()),
        personProfileImg: img6,
        personName: 'Ricardo',
        autorized: true,
        owner: false,
    },
    {
        key: String(Math.random()),
        personProfileImg: img7,
        personName: 'Andre',
        autorized: true,
        owner: false,
    },
    {
        key: String(Math.random()),
        personProfileImg: img8,
        personName: 'Leozinho',
        autorized: true,
        owner: false,
    },
    {
        key: String(Math.random()),
        personProfileImg: img2,
        personName: 'Gian',
        autorized: false,
        owner: false,
    },
    {
        key: String(Math.random()),
        personProfileImg: img3,
        personName: 'Chinchete',
        autorized: false,
        owner: false,
    },
    {
        key: String(Math.random()),
        personProfileImg: img4,
        personName: 'Luiz',
        autorized: true,
        owner: false,
    },
];

export default function TableMembers(props) {

    const [TableInfo, setTableInfo] = useState({ tableMembers: [{ accepted: true, id: 0, name: '....', owner: false, picture: '' }] });

    let tableId = '';

    useEffect(() => {

        LoadTableMembers();

        if (global.pulling) {
            var intervalId = setInterval(function () {
                if (global.stopPullingToLeave) {
                    clearInterval(intervalId);
                }
                else {
                    LoadTableMembers();
                }

            }, 5 * 1000);
        }

    }, []);

    async function LoadTableMembers() {
        try {

            await AsyncStorage.getItem('tableId')
                .then(value => {
                    tableId = value;
                    console.log('TableMembers TableId: ' + value);

                }).catch(err => {
                    console.log(err);

                });

            let response = await apiOrchestrate.get('/tableDetails', { headers: { tableId: tableId } })

            //console.log(response.data);
            setTableInfo(response.data);
            if (response.data.tableMembers === []) {
                props.leaveTable();

            }
            props.tableNumber(response.data.number);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingLeft: 16, }}>
            {TableInfo.tableMembers.map((person) => (
                <TouchableOpacity style={styles.person} key={person.id}>
                    <Image style={[styles.profileImage, person.accepted == false ? { borderColor: '#D9AC25' } : person.owner == true ? { borderColor: '#0ABF04' } : { borderColor: '#fff', borderWidth: 0.5, },]} source={person.picture ? { uri: person.picture } : imgDefault} />

                    {person.accepted == false ?
                        <View style={[styles.iconContainer, { backgroundColor: '#D9AC25' }]}>
                            <FontAwesome name="exclamation" size={20} color="white" />
                        </View>
                        :
                        <></>
                    }

                    {person.owner == true ?
                        <View style={[styles.iconContainer, { backgroundColor: '#0ABF04' }]}>
                            {/* <FontAwesome5 name="crown" size={15} color="#FFF" /> */}
                            <MaterialCommunityIcons name="crown" size={20} color="white" />
                        </View>
                        :
                        <></>
                    }

                    <Text style={styles.name} numberOfLines={1} >{person.name.split(" ")[0]}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView >
    );
}

//=============================Styles========================================

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e222b',
        height: 130,
    },
    profileImage: {
        borderRadius: 40,
        height: 80,
        width: 80,
        borderWidth: 3,
    },
    person: {
        width: 80,
        marginRight: 16,
        alignItems: 'center',
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 8,
        fontSize: 14,
    },
    iconContainer: {
        borderRadius: 100,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: "30%",
        height: "18%",
        alignSelf: 'flex-end',
        bottom: "19%",
    }
});