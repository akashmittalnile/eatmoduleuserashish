import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const HomePage = (props) => {
    const [ShippingAddressPopUp, setShippingAddressPopUp] = useState(false);
    useEffect(() => {

    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Text>Airplan</Text> */}
            {/* <ServiceHeader
                title={'Service'}
            /> */}

            <ConnectHeader
                title={'Transportation'}
            />
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View>
                    <View style={{ height: 120 }}>
                        <View style={styles.mainView}>
                            <View style={styles.header}>
                                <View style={styles.bikeImg}>
                                    <Image source={require('../../../assets/noRide.png')} style={styles.bike}></Image>
                                </View>

                                <View style={styles.textView}>
                                    <Text style={styles.text}>DUTY</Text>
                                </View>
                                <TouchableOpacity onPress={() => props.navigation.navigate('HomePageOnline')} style={styles.imgView}>
                                    <Image source={require('../../../assets/toggleOff.png')} style={styles.img2}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Image source={require('../../../assets/flatBox.png')} style={styles.FlatBoxImg}></Image>
                    </View>
                    <View>
                        <Image source={require('../../../assets/noRide.png')} style={styles.noRideImg}></Image>
                    </View>
                    <View style={styles.noRideView}>
                        <Text style={styles.noRideText}>You’re currently OFF DUTY, Please
                            go ON DUTY to Start Earning</Text>


                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    mainView: {
        width: '90%', backgroundColor: 'white', height: 88, alignSelf: 'center', shadowRadius: 20,
        shadowOpacity: 1.0,
        elevation: 10, marginTop: '5%', borderRadius: 20,
    },

    header: { flexDirection: 'row', justifyContent: 'space-around', marginTop: '3%' },
    bike: { width: 73, height: 60, borderRadius: 10 },
    img2: { width: 46, height: 24, borderRadius: 10 },
    bikeImg: { marginLeft: '-4%' },
    textView: { alignSelf: 'center' },
    text: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 18, color: Mycolors.GRAY },
    imgView: { marginTop: '5%' },
    FlatBoxImg: { width: 384, height: 150, marginTop: '2%' },
    noRideImg: { width: 257, height: 199, alignSelf: 'center' },
    noRideView: { width: 296, height: 60, alignSelf: 'center', marginTop: '4%' },
    noRideText: { fontFamily: 'Roboto', textAlign: 'center', fontWeight: '300', fontSize: 18, color: Mycolors.HEADER }
});
export default HomePage