import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const EventInfoPrivate = (props) => {
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
                                <Text style={styles.eventTxt}>ESPA Annual Conference </Text>
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
                            <Image source={require('../../../assets/ent_location.png')} style={{ width: 32, height: 30, overflow: 'hidden', marginLeft: '4%' }}></Image>
                            <Text style={styles.locationTxt}>Location</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 15 }}>
                            <Text style={styles.eventTypeTxt}>Disney's Hollywood Studios Main Entrance, Kissimmee, FL 34747, United States</Text>
                            <Image source={require('../../../assets/googleMap.png')} style={{ width: 42, height: 42, overflow: 'hidden', top: -12, marginLeft: '1%' }}></Image>

                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '7%' }}>
                            <Image source={require('../../../assets/eventTickets.png')} style={{ width: 37, height: 25, overflow: 'hidden', marginLeft: '3%' }}></Image>
                            <Text style={styles.locationTxt}>Tickets</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 15 }}>
                            <Text style={styles.eventTypeTxt}>400+ Tickets Available</Text>
                            <TouchableOpacity onPress={() => { props.navigation.navigate('PurchaseTicket') }}>
                                <Image source={require('../../../assets/eventInfo.png')} style={{ width: 29, height: 30, overflow: 'hidden', top: -12, marginLeft: '1%' }}></Image>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ width: 370, height: 77, backgroundColor: Mycolors.ServiceHeader, borderRadius: 10, marginLeft: 10, marginTop: '12%', alignSelf: 'center', flexDirection: 'row' }} >
                            <Image source={require('../../../assets/eventPeople.png')} style={{ width: 78, height: 42, overflow: 'hidden', top: 2, marginLeft: '5%', marginTop: '5%' }}></Image>
                            <Text style={{ alignSelf: 'center', marginTop: '-3%', fontFamily: 'Roboto', fontWeight: '500', color: Mycolors.White, marginLeft: 12 }}>10 + View Attendees & Speakers</Text>
                            <Text style={{ marginTop: '12%', marginLeft: '-55%', fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.White }}>See All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShippingAddressPopUp(true)} style={{ width: 370, height: 60, backgroundColor: Mycolors.ServiceHeader, borderRadius: 10, marginLeft: 10, marginTop: '5%', alignSelf: 'center' }} >
                            <Text style={{ alignSelf: 'center', marginTop: '4%', fontWeight: '500', fontFamily: 'Roboto', color: Mycolors.White }}>Join Event</Text>
                        </TouchableOpacity>
                    </View>

                </View>
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
                                    style={{ width: 428, height: 458, backgroundColor: 'white', bottom: 0, marginTop: '100%', borderTopLeftRadius: 50, borderTopRightRadius: 50, }}>
                                    <View style={{ marginLeft: '10%', marginTop: '4%' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.BLACK }}>Purchase A Ticket</Text>
                                    </View>
                                    <View style={{
                                        width: 362, height: 144, borderRadius: 10, backgroundColor: 'white', shadowRadius: 30,
                                        shadowOpacity: 1.0,
                                        elevation: 3, alignSelf: 'center', marginTop: 10
                                    }}>
                                        <View style={{ marginLeft: 20, marginTop: 9 }}>
                                            <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>Purchase a ticket</Text>
                                        </View>
                                        <View style={{ marginLeft: 22, marginTop: '3%' }}>
                                            <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>Person</Text>
                                        </View>
                                        <View style={{ marginLeft: 24, flexDirection: 'row' }}>
                                            <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.ServiceHeader }}>02</Text>
                                            <View style={{ marginLeft: '62%', width: 82, height: 27, borderColor: Mycolors.LIGHT_GRAY, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <TouchableOpacity style={{ marginTop: '12%' }}>
                                                    <Image source={require('../../../assets/minus.png')} style={{ width: 14 }}></Image>
                                                </TouchableOpacity>
                                                <Text>02</Text>
                                                <TouchableOpacity style={{ marginTop: '5%' }}>
                                                    <Image source={require('../../../assets/Plus.png')} style={{ width: 13, height: 13 }}></Image>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', height: 33, marginTop: 12, backgroundColor: Mycolors.BACKGROUND, }}>
                                            <View style={{ flexDirection: 'row', marginLeft: 23, marginTop: 5 }}>
                                                <Image source={require('../../../assets/InfoTickets.png')} style={{ width: 18, height: 18 }}></Image>
                                                <Text style={{ marginLeft: 8, fontFamily: 'Roboto', fontWeight: '500', color: Mycolors.HEADER }}>Ticket cost $ 100 per person</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: '6%', marginLeft: '9%', flexDirection: 'row' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.BLACK }}>Total  Amount </Text>
                                        <View style={{ marginLeft: '50%' }}>
                                            <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.BLACK }}>$200.00</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: '4%', marginLeft: '9%', flexDirection: 'row' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.TXT }}>Tax </Text>
                                        <View style={{ marginLeft: '69%' }}>
                                            <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.TXT }}>$10.00</Text>
                                        </View>
                                    </View>
                                    <Image source={require('../../../assets/horizontalLine.png')} style={{ width: '80%', marginLeft: '10%', marginTop: '3%', borderRadius: 20 }}></Image>
                                    <View style={{ marginTop: '6%', marginLeft: '9%', flexDirection: 'row' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.BLACK }}>Total Payable Amount  </Text>
                                        <View style={{ marginLeft: '38%' }}>
                                            <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.BLACK }}>$210.00</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Payment') }} style={styles.saveView}>
                                        <Text style={styles.saveTxt}>Confirm & Make Payment</Text>
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
    eventTypeTxt: { marginLeft: '18%', top: -10, fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.SEARCH_TXT, width: 263, height: 36 },
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
export default EventInfoPrivate