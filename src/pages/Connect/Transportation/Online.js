import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';
//import MapView from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
const Online = (props) => {
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
                title={'Transportation Loginn'}
            />

            <View style={{
                position: 'absolute',
                top: '10.5%',
                left: 0,
                right: 0,
                bottom: '12%',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>

                <MapView
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    initialRegion={{
                        latitude: 30.704649,
                        longitude: 76.717873,
                        latitudeDelta: 0.0902,
                        longitudeDelta: 0.0321,
                    }}


                >
                    <Marker coordinate={{ latitude: 30.704649, longitude: 76.717873 }}>
                        <Image source={require('../../../assets/NavigationArrow.png')} style={{ width: 68, height: 68, }}></Image>
                    </Marker>

                </MapView>
            </View>
            {/* <MapView
                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{
                    height: 400,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
                zoomEnabled={true}
                region={{
                    latitude: 22.258,
                    longitude: 71.19,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: 22.258, longitude: 71.19 }}
                    title={"title"}
                    description={"test"}


                />
            </MapView> */}
            <View style={{ width: '99%', height: '50%', backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50, bottom: 0, marginTop: '100%' }}>
                <View style={{ marginLeft: '8%', marginTop: '10%', flexDirection: 'row' }}>
                    <Image source={require('../../../assets/Rider.png')} style={{ width: 48, height: 48 }}></Image>
                    <View style={{ marginLeft: 12 }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '300', fontSize: 20, color: Mycolors.DRIVER }}>Hello</Text>
                        <Text style={{ color: 'blue', fontFamily: 'Roboto', fontWeight: '600', fontSize: 20, color: Mycolors.HEADER }}>Jerry Smith</Text>
                    </View>
                    <TouchableOpacity style={{
                        width: 103, height: 31, borderRadius: 32, backgroundColor: 'white', shadowRadius: 20,
                        shadowOpacity: 1.0,
                        elevation: 5, marginLeft: '15%'
                    }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.HEADER, alignSelf: 'center', marginTop: 4 }}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{
                        width: 112, height: 80, borderRadius: 15, backgroundColor: 'white', shadowRadius: 20,
                        shadowOpacity: 1.0,
                        elevation: 3, marginTop: 30,
                    }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 20, color: Mycolors.HEADER, alignSelf: 'center', marginTop: 12 }}>30</Text>
                        <Text style={{ alignSelf: 'center', marginTop: 3, fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.HEADER }}>Total Rides</Text>
                    </View>
                    <View style={{
                        width: 112, height: 80, borderRadius: 15, backgroundColor: 'white', shadowRadius: 20,
                        shadowOpacity: 1.0,
                        elevation: 3, marginTop: 30,
                    }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 20, color: Mycolors.HEADER, alignSelf: 'center', marginTop: 12 }}>$490</Text>
                        <Text style={{ alignSelf: 'center', marginTop: 3, fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.HEADER }}>Total Earning</Text>
                    </View>
                    <View style={{
                        width: 112, height: 80, borderRadius: 15, backgroundColor: 'white', shadowRadius: 20,
                        shadowOpacity: 1.0,
                        elevation: 3, marginTop: 30,
                    }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 20, color: Mycolors.HEADER, alignSelf: 'center', marginTop: 12 }}>369KM</Text>
                        <Text style={{ alignSelf: 'center', marginTop: 3, fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.HEADER }}>Total Distance</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <TouchableOpacity style={{ width: 146, height: 52, backgroundColor: Mycolors.GREEN, marginTop: '11%', borderRadius: 32 }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '400', color: 'white', alignSelf: 'center', marginTop: 12 }}>Active Ride</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 146, height: 52, backgroundColor: Mycolors.RED, marginTop: '11%', borderRadius: 32, marginLeft: -35 }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '400', color: 'white', alignSelf: 'center', marginTop: 12 }}>Rejected Riders</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    cateView: {
        marginTop: -5,
        height: 41,
        borderRadius: 30,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        width: 178,
        justifyContent: "center",
        alignItems: "center",
        shadowRadius: 30,
        shadowOpacity: 1.0,
        elevation: 10,
        marginRight: 10,
        marginLeft: -6,

    },
    cateTxt: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, alignSelf: 'center', color: Mycolors.ServiceHeader },
    searchView: {
        width: 337, height: 45, borderRadius: 10, backgroundColor: Mycolors.White, shadowRadius: 10,
        shadowOpacity: 1.0,
        elevation: 10,
        marginTop: 5,
        marginLeft: 10,
    },
    searchTxt: { fontFamily: 'Roboto', fontWeight: '300', fontSize: 15, color: Mycolors.SEARCH_TXT, top: 10, left: 12 },
    exploreView: { marginTop: 25, marginLeft: 15 },
    exploreTxt: { fontFamily: 'Roboto', fontWeight: '400', color: Mycolors.ServiceHeader },
    expTxt: { color: Mycolors.TXT, fontFamily: 'Roboto', fontWeight: '300', fontSize: 14 },
    eventTxt: { paddingHorizontal: 15, paddingVertical: 10, fontFamily: 'Roboto', fontWeight: '400', fontSize: 18, color: Mycolors.HEADER },
    eventTypeTxt: { paddingHorizontal: 15, top: -12, fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.ServiceHeader },
    calendar: { paddingHorizontal: 15, top: -6, flexDirection: 'row' },
    calendarTxt: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 12, color: Mycolors.SEARCH_TXT, left: 5, top: 2 },
    ticketText: { color: Mycolors.White, fontWeight: '400', fontFamily: 'Roboto', fontSize: 14, alignSelf: 'center', top: 2 },
    MilesView: { marginTop: '5%', marginLeft: '40%' },
    MilesText: { fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.BLACK },
    milesTextBoxView: {
        width: 374, height: 62, borderRadius: 10, backgroundColor: Mycolors.White, shadowRadius: 10,
        shadowOpacity: 1.0,
        elevation: 5, marginLeft: 28, marginTop: 40
    },
    milesText: { fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER, left: 24, top: 24 },
    saveView: { width: 374, height: 60, borderRadius: 5, backgroundColor: Mycolors.ServiceHeader, marginTop: 35, alignSelf: 'center' },
    saveTxt: { fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.White, alignSelf: 'center', top: 21 }
});
export default Online