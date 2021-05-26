import React from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text } from "react-native";



import img1 from '../../assets/images/Profile/FotoPerfil2_Cortada.jpg';
import img2 from '../../assets/images/Profile/40037515.jpg';
import img3 from '../../assets/images/Profile/38963605.jpg';
import img4 from '../../assets/images/Profile/Luiz.jpeg';
import img5 from '../../assets/images/Profile/20191214_8154_iOS.jpg';
import img6 from '../../assets/images/Profile/20191013_00.jpg';
import img7 from '../../assets/images/Profile/20210121_17292.jpg';


const people = [
    {
        key: String(Math.random()),
        img: img1,
        name: 'Leonardo',
    },

    {
        key: String(Math.random()),
        img: img5,
        name: 'Henrrique',
    },
    {
        key: String(Math.random()),
        img: img6,
        name: 'Ricardo',
    },
    {
        key: String(Math.random()),
        img: img7,
        name: 'Andre',
    },
    {
        key: String(Math.random()),
        img: img2,
        name: 'Gian',
    },
    {
        key: String(Math.random()),
        img: img3,
        name: 'Chinchete',
    },
    {
        key: String(Math.random()),
        img: img4,
        name: 'Luiz',
    },
];

export default function Suggestions() {
    return (
        <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingLeft: 16, }}>
            {people.map((person) => (
                <TouchableOpacity style={styles.person} key={person.key}>
                    <Image style={styles.profileImage} source={person.img} />
                    <Text style={styles.name}>{person.name}</Text>
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
        width: 80

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
    }
});