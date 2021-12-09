import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground, Animated, Platform, RefreshControl } from "react-native";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import apiUsers from '../services/apiUsers.js';
import { RNS3 } from 'react-native-aws3';
import { optionsProfileS3 } from '../services/s3Config';
import Lottie from 'lottie-react-native';

import img1 from '../../assets/images/Profile/DefaultProfileImg.png';
import animationDone from '../../assets/animations/done/done.json';

/*const user =
{
    key: String(Math.random()),
    personProfileImg: img1,
    personName: 'Leonardo M. Mariotto',
    personEmail: 'leonardo_mariotto@yahoo.com.br',
    personPhone: '+55 (19) 981824269',
    personStreet: 'Rua Dr. Ruy Viccente de Mello, 687',
    personDistrict: 'Cidade Univercitária',
    personState: 'São Paulo',
    personZip: '13083-745',
    personCity: 'Campinas'
}
*/

export default function HomeScreen({ navigation, route }) {

    const params = route.params;
    const [fromScan, setfromScan] = useState(false);

    const [uploadProgress, setuploadProgress] = useState();
    const [uploadComplete, setuploadComplete] = useState(true);
    const [profileLoaded, setprofileLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [personProfileImg, setpersonProfileImg] = useState();
    const [personName, setpersonName] = useState('....');
    const [personEmail, setpersonEmail] = useState('....');
    const [personPhone, setpersonPhone] = useState('....');
    const [personStreet, setpersonStreet] = useState('....');
    const [personDistrict, setpersonDistrict] = useState('....');
    const [personState, setpersonState] = useState('....');
    const [personZip, setpersonZip] = useState('....');
    const [personCity, setpersonCity] = useState('....');

    let userId = '';


    useEffect(() => {


        LoadUserProfile();

    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        LoadUserProfile().then(() => setRefreshing(false));
    }, []);

    async function LoadUserProfile() {
        try {
            await AsyncStorage.getItem('userid')
                .then(value => {
                    userId = value;
                    console.log('Settings UserId: ' + value);

                }).catch(err => {
                    console.log(err);

                });

            let response
            response = await apiUsers.get('/clients/' + userId, {});
            //console.log(response.data);
            setpersonProfileImg(response.data.picture);
            setpersonName(response.data.name);
            setpersonEmail(response.data.email);
            setpersonPhone(response.data.phone);
            setpersonStreet(response.data.address.street);
            setpersonDistrict(response.data.address.district);
            setpersonState(response.data.address.state);
            setpersonZip(response.data.address.postalCode);
            setpersonCity(response.data.address.city);

            setprofileLoaded(true);

        } catch (error) {
            console.log(error);
        }
    }

    function haddleScanScreen() {
        if (uploadComplete) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'ScanScreen' },
                    ],
                })
            )
        }

    }

    async function LogOut() {
        if (profileLoaded && uploadComplete) {
            global.stopPullingToLeave = true;
            await AsyncStorage.removeItem('userid');
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'StartScreen', params: { loading: false } },
                    ],
                }))
        }

    }

    function haddleEdit(item, id, currentValue) {
        if (profileLoaded && uploadComplete) {
            navigation.push('EditInfoScreen', { item: item, id: id, currentValue: currentValue, preParams: params, getback: (value, id) => editProfile(value, id) })
        }
    }

    async function editProfile(value, id) {

        if (profileLoaded) {

            let personProfileImgLet = personProfileImg;
            let personNameLet = personName;
            let personEmailLet = personEmail;
            let personPhoneLet = personPhone;
            let personStreetLet = personStreet;
            let personDistrictLet = personDistrict;
            let personStateLet = personState;
            let personZipLet = personZip;
            let personCityLet = personCity;

            if (value || !value === '') {
                console.log('Editing Infos');
                switch (id) {
                    case 0:
                        setpersonName(value);
                        personNameLet = value;
                        break;

                    case 1:
                        setpersonEmail(value);
                        personEmailLet = value;
                        break;

                    case 2:
                        setpersonPhone(value);
                        personPhoneLet = value;
                        break;

                    case 3:
                        setpersonStreet(value);
                        personStreetLet = value;
                        break;

                    case 4:
                        setpersonDistrict(value);
                        personDistrictLet = value;
                        break;

                    case 5:
                        setpersonState(value);
                        personStateLet = value;
                        break;

                    case 6:
                        setpersonZip(value);
                        personZipLet = value;
                        break;

                    case 7:
                        setpersonCity(value);
                        personCityLet = value;
                        break;
                    case 8:
                        setpersonProfileImg(value);
                        personProfileImgLet = value;
                        console.log('Image Update: ', personProfileImgLet);
                        break;

                    default:
                        console.log('Id Inexisteste')
                        break;
                }

                try {
                    await AsyncStorage.getItem('userid')
                        .then(value => {
                            userId = value;

                        }).catch(err => {
                            console.log(err);

                        });

                    let response
                    response = await apiUsers.put('/clients/' + userId, {
                        addressUpdate: {
                            city: personCityLet,
                            district: personDistrictLet,
                            number: "0000",
                            postalCode: personZipLet,
                            state: personStateLet,
                            street: personStreetLet,
                        },
                        name: personNameLet,
                        phone: personPhoneLet,
                        picture: personProfileImgLet,
                    }
                    );
                    console.log('Done Editing Infos');
                    setuploadComplete(true);

                } catch (error) {
                    console.log(error.response.data.code);
                }

            }
        }

    }


    async function changeProfileImage() {
        if (profileLoaded && uploadComplete) {

            setuploadComplete(false);

            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            //console.log(result);

            if (!result.cancelled) {

                await AsyncStorage.getItem('userid')
                    .then(value => {
                        userId = value;
                        //console.log('UserId: ' + value);

                    }).catch(err => {
                        console.log(err);

                    });


                let numberImg
                if (personProfileImg) {
                    let currentName = personProfileImg;
                    numberImg = currentName.replace('https://rangu-ohio.s3.amazonaws.com/profileImg%2F' + userId, "").replace(".jpg", "").replace("-", "");
                    numberImg++;
                }
                else {
                    numberImg = 0;
                }

                setpersonProfileImg(result.uri);

                const file = {
                    uri: result.uri,
                    name: userId + '-' + numberImg + '.jpg',
                    type: "image/jpeg"
                }
                console.log('Eviando imagem para S3');

                try {

                    await RNS3.put(file, optionsProfileS3).progress((progress) => {
                        console.log('Uploading: ', progress.percent)
                        if (progress.percent) {
                            setuploadProgress(progress.percent);
                        }
                    })
                        .then(response => {
                            if (response.status !== 201) {
                                console.log("Failed to upload image to S3");
                            }
                            editProfile(response.body.postResponse.location, 8);
                            setTimeout(() => {
                                setuploadProgress();
                            }, 2000);

                        });
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                setuploadComplete(true);
            }
        }

    }

    useEffect(() => {

        if (params !== undefined) {

            if (params.fromScan) {
                setfromScan(true);
            }
        }

    }, []);


    return (

        <SafeAreaView style={[styles.background]} >

            {fromScan &&
                <View style={[styles.containerBack]}>
                    <TouchableOpacity onPress={haddleScanScreen}>
                        <AntDesign name="left" size={45} color="white" />
                    </TouchableOpacity>
                </View>
            }


            <View style={styles.header}>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.textSettings}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.profileImageContainer}>
                <Image style={[styles.profileImage]} source={personProfileImg ? { uri: personProfileImg /*uri: `data:image/gif;base64,${personProfileImg}`*/ } : img1} />
                <TouchableOpacity onPress={changeProfileImage} style={[styles.iconContainer]}>
                    <View style={styles.icon}>
                        {uploadProgress ?
                            uploadProgress === 1 ?
                                <Lottie style={styles.animDone} source={animationDone} autoPlay loop={false} />
                                :
                                <Text style={styles.percentValueText}>{(uploadProgress * 100).toFixed(0)}<Text style={styles.percentCharText}>%</Text></Text>
                            :
                            <MaterialIcons name="edit" size={30} color="black" />
                        }

                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={[styles.scroll]} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors='#fff' tintColor='#fff' />}>

                <View style={styles.body}>
                    <View style={styles.celulaContainer}>
                        <View style={styles.celula}>
                            <Text style={styles.text}>Name:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('Name', 0, personName)}>
                                <Text style={styles.textInfo} numberOfLines={1}>{personName}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>E-Mail:</Text>
                            <TouchableOpacity style={styles.editBtn} /*onPress={() => haddleEdit('E-Mail', 1, personEmail )}*/>
                                <Text style={[styles.textInfo, { color: '#919197' }]} numberOfLines={1}>{personEmail}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>Phone:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('Phone', 2, personPhone)}>
                                <Text style={styles.textInfo} numberOfLines={1}>{personPhone}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.nextBody}>
                    <View style={styles.celulaContainer}>
                        <View style={styles.celula}>
                            <Text style={styles.text}>Street:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('Street', 3, personStreet)}>
                                <Text style={styles.textInfo} numberOfLines={1}>{personStreet}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>District:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('District', 4, personDistrict)}>
                                <Text style={styles.textInfo} numberOfLines={1}>{personDistrict}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>State:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('State', 5, personState)}>
                                <Text style={styles.textInfo} numberOfLines={1}>{personState}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>CEP:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('CEP', 6, personZip)}>
                                <Text style={styles.textInfo} numberOfLines={1}>{personZip}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celula}>
                            <Text style={styles.text}>City:</Text>
                            <TouchableOpacity style={styles.editBtn} onPress={() => haddleEdit('City', 7, personCity)}>
                                <Text style={styles.textInfo} numberOfLines={1}>{personCity}</Text>
                                <AntDesign name="right" size={20} color="#535357" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.containerLogOut}>
                    <TouchableOpacity onPress={LogOut}>
                        <Text style={styles.textLogOut}>Log Out</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>

        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        alignItems: 'center',
    },
    containerBack: {
        position: 'absolute',
        top: "7.1%",
        left: "1.5%",
        zIndex: 1,
    },
    header: {
        height: 55,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSettings: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileImageContainer: {
        alignItems: "center",
        marginHorizontal: 140,

    },
    profileImage: {
        borderRadius: 100,
        height: 140,
        width: 140,
    },
    iconContainer: {
        backgroundColor: '#fff',
        borderRadius: 100,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: "27%",
        height: "25%",
        alignSelf: 'flex-end',
        bottom: "5%",
    },
    icon: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animDone: {
        height: '120%',
        width: '120%',
        left: -1.2,
        top: -1.35
    },
    percentValueText: {
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center'
    },
    percentCharText: {
        fontSize: 9,
        fontWeight: '900',
    },
    scroll:
    {
        width: '100%',
        marginTop: 35,
    },
    body:
    {
        backgroundColor: "#1e222b",
        borderRadius: 20,
        width: "90%",
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'flex-end',

    },
    nextBody:
    {
        marginTop: 20,
        backgroundColor: "#1e222b",
        borderRadius: 20,
        width: "90%",
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'flex-end',

    },
    celulaContainer:
    {
        marginVertical: 10
    },
    celula:
    {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 15,
        borderBottomWidth: 0.5,
        borderColor: '#3e3d40',
    },
    text:
    {
        fontSize: 15,
        color: '#fff',
    },
    textInfo:
    {
        textAlign: 'right',
        width: 235,
        fontSize: 15,
        color: '#fff',
    },
    editBtn:
    {
        flexDirection: 'row',
        marginRight: 10,
    },
    containerLogOut:
    {
        marginTop: 55,
        marginBottom: 30
    },
    textLogOut:
    {
        textAlign: 'center',
        fontSize: 20,
        color: '#D7233C',
    },
});