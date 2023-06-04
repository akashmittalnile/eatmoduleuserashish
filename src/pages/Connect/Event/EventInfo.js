import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const EventInfo = (props) => {
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
                title={'Events info.'}
            />
            <ScrollView>
                <View style={{ backgroundColor: 'rgba(248, 248, 248, 1)' }}>
                    <View style={{ width: 388, height: '100%', backgroundColor: 'white', borderRadius: 15, marginTop: '5%' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={require('../../../assets/event.png')} style={{ width: '96%', height: 261, left: 10, marginTop: '3%', borderRadius: 20 }}></Image>


                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../../assets/eventLogo.png')} style={{ width: 58, height: 58, marginLeft: 15, marginTop: '4%' }}></Image>
                            <View style={{ marginTop: '2%' }}>
                                <Text style={styles.eventTxt}>Music evnet 2021 </Text>
                            </View>
                        </View>
                        <View style={styles.calendar}>
                            <Image source={require('../../../assets/CalendarBlankPurple.png')} style={{ width: 13.7, overflow: 'hidden', }}></Image>
                            <Text style={styles.calendarTxt}>28 oct, 2021(09:30PM to 12:45PM)</Text>
                        </View>
                        <View style={styles.para}>
                            <Text style={styles.paraTxt}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a
                                document or a typeface without relying on meaningful content. See More</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../../assets/eventLocation.png')} style={{ width: 20, height: 26, overflow: 'hidden', marginLeft: '7%' }}></Image>
                            <Text style={styles.locationTxt}>Location</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 15 }}>
                            <Text style={styles.eventTypeTxt}>Disney's Hollywood Studios Main Entrance, Kissimmee, FL 34747, United States</Text>
                            <Image source={require('../../../assets/googleMap.png')} style={{ width: 42, height: 42, overflow: 'hidden', top: 2, marginLeft: '1%' }}></Image>

                        </View>
                        <TouchableOpacity style={{ width: 370, height: 77, backgroundColor: Mycolors.ServiceHeader, borderRadius: 10, marginLeft: 10, marginTop: '12%', alignSelf: 'center', flexDirection: 'row' }} >
                            <Image source={require('../../../assets/eventPeople.png')} style={{ width: 78, height: 42, overflow: 'hidden', top: 2, marginLeft: '5%', marginTop: '5%' }}></Image>
                            <Text style={{ alignSelf: 'center', marginTop: '-3%', fontFamily: 'Roboto', fontWeight: '500', color: Mycolors.White, marginLeft: 12 }}>10 + View Attendees & Speakers</Text>
                            <Text style={{ marginTop: '12%', marginLeft: '-55%', fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.White }}>See All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 370, height: 60, backgroundColor: Mycolors.ServiceHeader, borderRadius: 10, marginLeft: 10, marginTop: '5%', alignSelf: 'center' }} >
                            <Text style={{ alignSelf: 'center', marginTop: '4%', fontWeight: '500', fontFamily: 'Roboto', color: Mycolors.White }}>Join Event</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>

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
    eventTypeTxt: { marginLeft: '18%', top: -4, fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.SEARCH_TXT, width: 263, height: 36 },
    calendar: { paddingHorizontal: 87, marginTop: '-7%', flexDirection: 'row' },
    calendarTxt: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 12, color: Mycolors.HEADER, left: 5, top: 4 },
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
    saveTxt: { fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.White, alignSelf: 'center', top: 21 },
    para: { width: 365, height: 88, left: 25, marginTop: '5%' },
    paraTxt: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.HEADER, alignItems: 'center', },
    locationTxt: { left: 23, fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }
});
export default EventInfo