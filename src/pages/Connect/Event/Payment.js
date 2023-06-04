import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const Payment = (props) => {
    const [ShippingAddressPopUp, setShippingAddressPopUp] = useState(false);
    useEffect(() => {

    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <Text>Airplan</Text> */}
            {/* <ServiceHeader
                title={'Service'}
            /> */}

            <ConnectHeader
                title={'Payment'}
            />

            <View style={{ backgroundColor: '#ffffff', }}>
                <View style={{ flexDirection: 'row', marginTop: '6%' }}>

                    <Text style={{ fontFamily: 'Roboto', fontWeight: '300', fontSize: 16, color: Mycolors.HEADER, left: 13 }}>Choose payment option</Text>
                    <Text style={{ fontFamily: 'Roboto', fontWeight: '300', fontSize: 14, color: Mycolors.ServiceHeader, marginLeft: '16%' }}>Add payment method</Text>
                </View>
                <View style={{
                    width: '90%', height: 85, borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 1)', marginLeft: 15, shadowRadius: 20,
                    shadowOpacity: 0.1,
                    elevation: 9,
                    marginTop: '12%',

                }}>
                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        <Image source={require('../../../assets/circle.png')} style={{ width: 67, height: 41, alignSelf: 'center', overflow: 'hidden', marginLeft: 23 }}></Image>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.HEADER, marginLeft: 23 }}>*** *** *** 5967</Text>
                    </View>
                    <Text style={{ marginLeft: '32%', bottom: '18%', fontFamily: 'Roboto', fontWeight: '300', fontSize: 14, color: Mycolors.TXT }}>Expires 24/22</Text>
                </View>
                <View style={{
                    width: '90%', height: 85, borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 1)', marginLeft: 15, shadowOpacity: 0.1,
                    elevation: 9,
                    marginTop: '12%',
                    marginTop: '12%'
                }}>
                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        <Image source={require('../../../assets/visa.png')} style={{ width: 76, height: 24, alignSelf: 'center', overflow: 'hidden', marginLeft: 23, marginTop: 15 }}></Image>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.HEADER, marginLeft: 17 }}>*** *** *** 5967</Text>
                    </View>
                    <Text style={{ marginLeft: '32%', bottom: '18%', fontFamily: 'Roboto', fontWeight: '300', fontSize: 14, color: Mycolors.TXT }}>Expires 24/22</Text>
                </View>
                <View style={{
                    width: '90%', height: 85, borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 1)', marginLeft: 15, shadowOpacity: 0.1,
                    elevation: 9,
                    marginTop: '12%',
                    marginTop: '12%'
                }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Image source={require('../../../assets/phonePay.png')} style={{ width: 63, height: 63, alignSelf: 'center', overflow: 'hidden', marginLeft: 23, marginTop: '2%' }}></Image>
                        <View style={{ marginTop: '8%' }}>
                            <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.BLACK, marginLeft: 17 }}>John.doe@email.com</Text>
                        </View>
                    </View>

                </View>
                <View style={{ marginTop: '8%', marginLeft: 23 }}>
                    <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.HEADER }}>Current Method</Text>
                </View>
                <View style={{ width: '93%', height: 85, borderRadius: 15, borderColor: Mycolors.ServiceHeader, borderWidth: 1, left: 12, marginTop: 12 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../assets/money.png')} style={{ width: 52, height: 52, alignSelf: 'center', overflow: 'hidden', marginLeft: 23 }}></Image>
                        <Text style={{ marginTop: '5%', fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.HEADER, left: 23 }}>Cash Payment</Text>
                        <Image source={require('../../../assets/CheckSquare.png')} style={{ width: 22, height: 22, alignSelf: 'center', overflow: 'hidden', marginLeft: '40%' }}></Image>
                    </View>
                    <View style={{ marginLeft: '28%', marginTop: '-4%' }}>
                        <Text>Default method</Text>
                    </View>
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
export default Payment