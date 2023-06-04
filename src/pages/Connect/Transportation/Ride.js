import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const Ride = (props) => {
    const origin = { latitude: 37.3317876, longitude: -122.0054812 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyACzgsZq8gI9VFkOw_fwLJdmezbc4iUxiM';

    useEffect(() => {

    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Text>Airplan</Text> */}
            {/* <ServiceHeader
                title={'Service'}
            /> */}

            <ConnectHeader
                title={'New Ride request'}
            />
            <View style={{
                position: 'absolute',
                top: '10.5%',
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                >
                    <Marker coordinate={{ latitude: 37.771707, longitude: -122.4053769 }}>
                        <Image source={require('../../../assets/Rider.png')} style={{ width: 34, height: 34, marginTop: 36, left: 0 }}></Image>
                    </Marker>
                    <Marker coordinate={{ latitude: 37.3317876, longitude: -122.0054812 }}>
                        <Image source={require('../../../assets/NavigationArrow.png')} style={{ width: 68, height: 68, }}></Image>
                    </Marker>

                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="#1F4EA8"
                    />
                </MapView>

            </View>

            <View style={styles.view}>
                <View style={styles.cateView}>
                    <Image source={require('../../../assets/Rider.png')} style={styles.img}></Image>
                    <View style={{ marginLeft: 12 }}>
                        <View style={styles.TextView}>
                            <Text style={styles.johnTxt}>John Smith</Text>
                            <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 11, color: Mycolors.TXT }}>Ride user</Text>
                        </View>
                    </View>
                    <View>
                        <Image source={require('../../../assets/callSign.png')} style={styles.imgCall}></Image>
                    </View>
                    <View>
                        <Image source={require('../../../assets/chatSign.png')} style={{ marginLeft: -40, width: 32, height: 32 }}></Image>
                    </View>
                </View>

                <View style={styles.lineView}>
                    <Image source={require('../../../assets/Horizontal.png')} style={styles.line}></Image>
                </View>
                <View>
                    <View style={styles.flexView}>
                        <Image source={require('../../../assets/MapPinGrey.png')} style={styles.locationImg}></Image>
                        <View style={styles.pickView}>
                            <Text style={styles.pickTxt}>Pickup location</Text>
                            <Text style={styles.addTxt}>76 Loisaida Ave, New York, NY 10009, USA</Text>
                            <View style={{ width: 193, height: 40, borderRadius: 5, borderColor: Mycolors.GREEN, borderWidth: 1, marginTop: '5%' }}>
                                <TouchableOpacity style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../../assets/navigationSign.png')} style={styles.navigationImg}></Image>
                                    <View style={{ marginTop: 9, marginLeft: 7 }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 12, color: Mycolors.GREEN }}>Navigate To Pickup Point</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={{ marginTop: '1%' }}>
                    <View style={styles.flexView}>
                        <Image source={require('../../../assets/MapPinBlue.png')} style={styles.locationImg}></Image>
                        <View style={styles.pickView}>
                            <Text style={styles.pickTxt1}>Drop location</Text>
                            <Text style={styles.addTxt}>76 175 E 4th St, New York, NY 10009, USA</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '8%', alignSelf: 'center' }}>
                    <Image source={require('../../../assets/Horizontal.png')} style={styles.line}></Image>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('NewRide')} style={{
                    width: '87%', height: 52, borderRadius: 32, backgroundColor: Mycolors.DRIVER, marginTop: '3%',
                    alignSelf: 'center'
                }}>
                    <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, alignSelf: 'center', color: 'white', marginTop: '5%' }}>Start Ride</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    view: {
        width: '95%', height: 385, borderRadius: 30, backgroundColor: 'white',
        alignSelf: 'center', shadowRadius: 30,
        shadowOpacity: 1.0,
        elevation: 10,
        position: 'absolute', //Here is the trick
        bottom: 0, marginBottom: '10%'
    },
    cateView: { marginLeft: '8%', marginTop: '10%', flexDirection: 'row' },
    img: { width: 48, height: 48 },
    TextView: { marginLeft: '3%', marginTop: '3%' },
    line: { width: 332 },
    lineView: { marginTop: '4%', alignSelf: 'center' },
    flexView: { flexDirection: 'row', marginLeft: '8%', marginTop: '5%' },
    locationImg: { width: 32, height: 32, },
    pickView: { marginLeft: 9 },
    pickTxt: { fontFamily: 'Roboto', fontWeight: '600', fontSize: 14, color: Mycolors.HEADER },
    pickTxt1: { fontFamily: 'Roboto', fontWeight: '600', fontSize: 14, color: Mycolors.DRIVER },
    addTxt: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.TXT },
    johnTxt: { fontFamily: 'Roboto', fontWeight: '600', fontSize: 14, color: Mycolors.HEADER },
    acceptTxt: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: 'white', alignSelf: 'center', marginTop: '11%' },
    buttonView: { width: 146, height: 52, borderRadius: 32, backgroundColor: Mycolors.GREEN },
    buttonView1: { width: 146, height: 52, borderRadius: 32, backgroundColor: Mycolors.RED },
    imgCall: { width: 22, height: 22, marginLeft: '50%', marginTop: 7 },
    chatSign: { width: 32, height: 32, marginLeft: '-32%' },
    navigationImg: { width: 18, height: 18, marginTop: '5%', marginLeft: '6%' }
});
export default Ride