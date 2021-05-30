import React from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text } from "react-native";



import img1 from '../../assets/images/Profile/FotoPerfil2_Cortada.jpg';
import img2 from '../../assets/images/Profile/40037515.jpg';
import img3 from '../../assets/images/Profile/38963605.jpg';
import img4 from '../../assets/images/Profile/Luiz.jpeg';
import img5 from '../../assets/images/Profile/20191214_8154_iOS.jpg';
import img6 from '../../assets/images/Profile/20191013_00.jpg';
import img7 from '../../assets/images/Profile/20210121_17292.jpg';
import img8 from '../../assets//images//Profile/Leo.jpeg'


const people = [
    {
        key: String(Math.random()),
        personProfileImg: img1,
        personName: 'Leonardo',
    },

    {
        key: String(Math.random()),
        personProfileImg: img5,
        personName: 'Henrrique',
    },
    {
        key: String(Math.random()),
        personProfileImg: img6,
        personName: 'Ricardo',
    },
    {
        key: String(Math.random()),
        personProfileImg: img7,
        personName: 'Andre',
    },
    {
        key: String(Math.random()),
        personProfileImg: img8,
        personName: 'Leozinho',
    },
    {
        key: String(Math.random()),
        personProfileImg: img2,
        personName: 'Gian',
    },
    {
        key: String(Math.random()),
        personProfileImg: img3,
        personName: 'Chinchete',
    },
    {
        key: String(Math.random()),
        personProfileImg: img4,
        personName: 'Luiz',
    },
];

export default function Suggestions() {
    return (
        <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingLeft: 16, }}>
            {people.map((person) => (
                <TouchableOpacity style={styles.person} key={person.key}>
                    <Image style={styles.profileImage} source={person.personProfileImg} />
                    <Text style={styles.name}>{person.personName}</Text>
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