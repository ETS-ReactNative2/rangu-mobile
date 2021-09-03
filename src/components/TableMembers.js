import React from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View } from "react-native";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';



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

export default function Suggestions() {
    return (
        <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingLeft: 16, }}>
            {people.map((person) => (
                <TouchableOpacity style={styles.person} key={person.key}>
                    <Image style={[styles.profileImage, person.autorized == false ? {borderColor: '#D9AC25' } : person.owner == true ? {borderColor: '#0ABF04' } : {borderColor: 'transparent', },  ] } source={person.personProfileImg}/>

                    {person.autorized == false ?
                        <View style={[styles.iconContainer, {backgroundColor: '#D9AC25'}]}>
                            <FontAwesome name="exclamation" size={20} color="white" />
                        </View>
                        :
                        <></>
                    }

                    {person.owner == true ?
                        <View style={[styles.iconContainer, {backgroundColor: '#0ABF04'}]}>
                            {/* <FontAwesome5 name="crown" size={15} color="#FFF" /> */}
                            <MaterialCommunityIcons name="crown" size={20} color="white" />
                        </View>
                        :
                        <></>
                    }

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
        width: 80,
        borderWidth:3,
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
    iconContainer:{
        borderRadius:100,
        position: 'absolute',
        alignItems: 'center',
        justifyContent:'center',
        width:"30%",
        height: "18%",
        alignSelf: 'flex-end',
        bottom: "19%",
    }
});