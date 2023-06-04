import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';
import MapView, { Marker } from 'react-native-maps';

const HomePageOnline = (props) => {
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

            <View style={styles.view}>
                <View style={styles.cateView}>
                    <Image source={require('../../../assets/Rider.png')} style={styles.img}></Image>
                    <View style={styles.TextView}>
                        <Text style={styles.johnTxt}>John Smith</Text>
                    </View>
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
                    </View>
                </View>

            </View>
            <View style={{ marginTop: '4%' }}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%' }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Ride') }} >
                    <View style={styles.buttonView}>
                        <Text style={styles.acceptTxt}>Accept</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.buttonView1}>
                        <Text style={styles.acceptTxt}>Reject</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    view: {
        width: '95%', height: 353, borderRadius: 30, backgroundColor: 'white',
        top: '34%', alignSelf: 'center', shadowRadius: 30,
        shadowOpacity: 1.0,
        elevation: 10,

    },
    cateView: { marginLeft: '8%', marginTop: '10%', flexDirection: 'row' },
    img: { width: 48, height: 48 },
    TextView: { marginLeft: '3%', marginTop: '3%' },
    line: { width: 332 },
    lineView: { marginTop: '-4%', alignSelf: 'center' },
    flexView: { flexDirection: 'row', marginLeft: '8%', marginTop: '5%' },
    locationImg: { width: 32, height: 32, },
    pickView: { marginLeft: 9 },
    pickTxt: { fontFamily: 'Roboto', fontWeight: '600', fontSize: 14, color: Mycolors.HEADER },
    pickTxt1: { fontFamily: 'Roboto', fontWeight: '600', fontSize: 14, color: Mycolors.DRIVER },
    addTxt: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.TXT },
    johnTxt: { fontFamily: 'Roboto', fontWeight: '600', fontSize: 14, color: Mycolors.HEADER },
    acceptTxt: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: 'white', alignSelf: 'center', marginTop: '11%' },
    buttonView: { width: 146, height: 52, borderRadius: 32, backgroundColor: Mycolors.GREEN },
    buttonView1: { width: 146, height: 52, borderRadius: 32, backgroundColor: Mycolors.RED }
});
export default HomePageOnline