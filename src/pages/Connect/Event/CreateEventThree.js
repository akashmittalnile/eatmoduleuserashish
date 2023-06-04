import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const CreateEventThree = (props) => {
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
                title={'Create Event'}
            />
            <ScrollView style={{ backgroundColor: 'rgba(248, 248, 248, 1)' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >

                    <View style={{ width: 43, height: 43, backgroundColor: Mycolors.ServiceHeader, marginTop: 12, borderRadius: 21 }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.White, alignSelf: 'center', marginTop: 10 }}>1</Text>
                    </View>
                    <View style={{ width: 43, height: 43, backgroundColor: Mycolors.ServiceHeader, marginTop: 12, borderRadius: 21 }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.White, alignSelf: 'center', marginTop: 10 }}>2</Text>
                    </View>
                    <View style={{ width: 43, height: 43, backgroundColor: Mycolors.ServiceHeader, marginTop: 12, borderRadius: 21 }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.White, alignSelf: 'center', marginTop: 10 }}>3</Text>
                    </View>


                </View>
                <View style={{ marginTop: 15, marginLeft: '12%' }}>
                    <Text>Select Event Ticket Type</Text>
                </View>
                <View style={{ marginTop: '5%', marginLeft: '12%' }}>
                    <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.BLACK }}>Want to sell Ticket?</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 7 }}>
                    <Image source={require('../../../assets/CheckedEvent.png')} style={{ width: 19, height: 19, marginLeft: '12%', }}></Image>
                    <Text style={{ marginLeft: 7, fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.HEADER }}>Yes</Text>


                    <Image source={require('../../../assets/UncheckedEvent.png')} style={{ width: 19, height: 19, marginLeft: '12%', marginTop: 4 }}></Image>
                    <Text style={{ marginLeft: 7, marginTop: 4, fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.HEADER }}>No</Text>

                </View>
                <View style={{ height: 280, }}>
                    <View style={{
                        width: 374, height: 241, borderRadius: 10, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 10, marginTop: '5%', alignSelf: 'center'
                    }}>
                        <View style={{ width: 275, height: 39, marginLeft: 12, marginTop: 5 }}>
                            <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 16, color: Mycolors.HEADER }}>Select Ticket Quantity you want to allot to this event</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '6%', marginLeft: 13 }}>
                            <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>Ticket</Text>
                            <View style={{ marginLeft: '62%', width: 82, height: 27, borderColor: Mycolors.LIGHT_GRAY, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity style={{ marginTop: '12%' }}>
                                    <Image source={require('../../../assets/minus.png')} style={{ width: 14 }}></Image>
                                </TouchableOpacity>
                                <Text>465</Text>
                                <TouchableOpacity style={{ marginTop: '5%' }}>
                                    <Image source={require('../../../assets/Plus.png')} style={{ width: 13, height: 13 }}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginLeft: 14 }}>
                            <Text>465</Text>
                            <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER, marginTop: 10 }}>Ticket Price</Text>
                            <View style={{ width: 337, height: 42, borderRadius: 5, borderColor: Mycolors.BORDER_GRAY, borderWidth: 1, marginTop: 6 }}>
                                <Text style={{ marginLeft: 12, marginTop: 7, fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.TXT }}>$ 100.00</Text>
                            </View>
                        </View>
                        <View style={{ width: 337, height: 33, borderRadius: 30, backgroundColor: Mycolors.BACKGROUND, alignSelf: 'center', marginTop: 12, flexDirection: 'row' }}>
                            <Image source={require('../../../assets/eventInfo.png')} style={{ width: 18, height: 18, marginLeft: '5%', marginTop: 6 }}></Image>
                            <Text style={{ marginTop: 5, marginLeft: 8, fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>Ticket cost $ 100 per person</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 90 }}>
                    <View style={{
                        width: 368, height: 60, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, marginTop: '5%', alignSelf: 'center', flexDirection: 'row'
                    }} >
                        <Text style={{ marginLeft: 12, marginTop: 15 }}>Event Beneficiary bank account details</Text>
                        <Image source={require('../../../assets/leftArrow.png')} style={{ width: 10, height: 7, marginLeft: '12%', marginTop: 20 }}></Image>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setShippingAddressPopUp(true)} style={{ width: 370, height: 60, borderRadius: 5, backgroundColor: Mycolors.ServiceHeader, alignSelf: 'center', marginTop: 12 }}>
                    <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.White, alignSelf: 'center', marginTop: '5%' }}> Submit</Text>
                </TouchableOpacity>
                {
                    ShippingAddressPopUp ? (
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={ShippingAddressPopUp}
                            onRequestClose={() => {
                                setShippingAddressPopUp(false);
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(140, 141, 142, 0.3)',
                                }}>

                                <View
                                    style={{ width: 428, height: 355, backgroundColor: 'white', bottom: 0, marginTop: '100%', borderTopLeftRadius: 50, borderTopRightRadius: 50, }}>
                                    <Image source={require('../../../assets/eventsCreated.png')} style={{ width: 62, height: 62, alignSelf: 'center', marginTop: '5%' }}></Image>
                                    <View style={{ width: 271, height: 90, alignSelf: 'center', marginLeft: '19%', marginTop: 13 }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '300', fontSize: 24, color: Mycolors.HEADER, lineHeight: 28, marginLeft: 20 }}>Event Created </Text>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '300', fontSize: 24, color: Mycolors.HEADER, lineHeight: 28, marginLeft: '10%' }}>Successfully</Text>

                                    </View>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Event')} style={{ width: 321, height: 60, borderRadius: 5, backgroundColor: Mycolors.ServiceHeader, alignSelf: 'center' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: 'white', alignSelf: 'center', marginTop: 15 }}>View Created Event</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setShippingAddressPopUp(false)}>
                                        <Text style={{ alignSelf: 'center', fontWeight: '500', fontFamily: 'Roboto', fontSize: 14, color: Mycolors.HEADER, marginTop: 12 }}>Close</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Modal>
                    ) : null
                }

            </ScrollView>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    input: { marginLeft: 12, marginTop: 4, fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.TXT },
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
export default CreateEventThree