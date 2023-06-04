import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';

const DATA = [
    {
        id: '1',
        img: require('../../../assets/GroupTicket.png'),
        title: 'Music Events 2021',
        quantity: '02 Person Only ',
        date: '02 Feb 2021',
        location: " Disney's Hollywood Studios Main Entrance,  Kissimmee, FL 34747, United States ",
        Pament: 'Amount paid via paypal ($210)',
        duration: '10:00AM',
        password: '#rdf@1!hg'
    },
    {
        id: '1',
        img: require('../../../assets/GroupTicket.png'),
        title: 'Music Events 2021',
        quantity: '02 Person Only ',
        date: '02 Feb 2021',
        location: " Disney's Hollywood Studios Main Entrance, Kissimmee, FL 34747, United States ",
        Pament: 'Amount paid via paypal ($210)',
        duration: '10:00AM',
        password: '#rdf@1!hg'
    },

];
const PurchaseTicket = (props) => {
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
                title={'Purchase Tickets'}
            />
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>

                <View style={{ height: '90%', }}>
                    <FlatList
                        vertical
                        data={DATA}
                        renderItem={({ item, index }) => {
                            return <>

                                <View style={styles.contList}>

                                    <View style={{ flexDirection: 'row', marginLeft: 23, marginTop: '5%' }}>
                                        <Image source={(item.img)} style={{ width: 79, height: 79, }}></Image>
                                        <View style={{ flexDirection: 'column', marginTop: '6%', marginLeft: '5%' }}>
                                            <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 20, color: Mycolors.HEADER }}>{item.title}
                                            </Text>
                                            <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 15, color: Mycolors.HEADER }}>{item.quantity}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '5%', justifyContent: 'space-around', marginLeft: '-10%' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>Date </Text>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>Time</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '2%', justifyContent: 'space-around', marginLeft: '-10%' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER, marginLeft: '5%' }}>{item.date} </Text>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>{item.duration}</Text>
                                    </View>
                                    <View style={{ marginLeft: '12%', marginTop: '7%' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>Location</Text>

                                    </View>
                                    <View style={{ width: 337, height: 36, marginLeft: '11%' }}>
                                        <Text style=
                                            {{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.SEARCH_TXT }}>
                                            {item.location}
                                        </Text>
                                    </View>
                                    <View style={{ marginTop: '5%', marginLeft: '12%' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.LIGHT_BLUE }}>Payment</Text>
                                        <Text style=
                                            {{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.SEARCH_TXT }}>{item.Pament}</Text>
                                    </View>
                                    <View>
                                        <Image source={require('../../../assets/dottedLine.png')} style={{ width: '90%', alignSelf: 'center', marginTop: '5%' }}></Image>
                                    </View>
                                    <View style={{ marginTop: '5%', marginLeft: '12%' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>Password</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style=
                                                {{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.SEARCH_TXT, marginTop: 4 }}>{item.password}</Text>
                                            <Image source={require('../../../assets/CopySimple.png')} style={{ width: 20, height: 20 }}></Image>
                                        </View>
                                        <View style={{ marginLeft: -5, marginTop: 3 }}>
                                            <Text style={{ fontFamily: 'Roboto', fontSize: 12, fontWeight: '400', color: Mycolors.ServiceHeader }}>   Note: Enter this password when required</Text>
                                        </View>

                                    </View>
                                    <View>
                                        <Image source={require('../../../assets/dottedLine.png')} style={{ width: '90%', alignSelf: 'center', marginTop: '5%' }}></Image>
                                    </View>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('PurchaseEvent')} style={{
                                        width: 323, height: 50, borderRadius: 5, backgroundColor: Mycolors.ServiceHeader, marginTop: '7%', alignSelf: 'center', shadowRadius: 30,
                                        shadowOpacity: 1.0,
                                        elevation: 10,
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.White, alignSelf: 'center', marginTop: '5%',
                                        }}>View Event</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: 323, height: 50, borderRadius: 5, backgroundColor: Mycolors.White, marginTop: '3%', alignSelf: 'center', shadowRadius: 30,
                                        shadowOpacity: 1.0,
                                        elevation: 10,
                                    }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.RED, alignSelf: 'center', marginTop: '5%' }}>Cancel Event</Text>
                                    </TouchableOpacity>
                                </View>

                            </>
                        }} />
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
    contList: {
        marginHorizontal: 6,
        marginTop: 20,
        height: 570,
        borderRadius: 30,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        width: '90%',


        shadowColor: '#000000',
        shadowRadius: 6,
        shadowOpacity: 1.0,
        elevation: 3,
        marginLeft: 20

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
export default PurchaseTicket