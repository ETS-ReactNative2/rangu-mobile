import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Members from '../../src/components/TableMembers';
import Lottie from 'lottie-react-native';
import ScanAnim from '../../assets/animations/scanning/qrcode/qr-code-scan.json'


export default function QrCodeScanner(props) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        if(type ===  "org.iso.QRCode")
        {
            props.CodeScanned(data);
            props.closeModal();
        }
        else
        {
            setTimeout(function () {
                setScanned(false);
            }, 1000);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>

            <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject}>



                <View style={styles.layerTop} />
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom} />

                <View style={[styles.anim]}>
                    <Lottie source={ScanAnim} autoPlay loop />
                </View>

            </BarCodeScanner>



        </View>
    );
}

const opacity = 'rgba(0, 0, 0, .6)';

const styles = StyleSheet.create({
    container: {
        // width: "100%",
        // height: "100%",
        width: 414,
        height: 840,
    },
    camera: {

    },
    button: {
        backgroundColor: "#fff",
        width: "100%",
    },
    anim: {
        width: "100%",
        height: "100%",
        //justifyContent:"center",
    },
    layerTop: {
        flex: 2,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 1,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 10
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 2,
        backgroundColor: opacity

    }
});