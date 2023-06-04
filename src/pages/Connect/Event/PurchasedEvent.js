import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const PurchaseEvent = (props) => {
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
                        <View style={{
                            width: '95%', height: 115, borderRadius: 10, backgroundColor: 'white', marginLeft: '4%', marginTop: '8%', shadowRadius: 30,
                            shadowOpacity: 1.0,
                            elevation: 3,
                        }}>
                            <View style={{ marginTop: '5%', marginLeft: '7%', flexDirection: 'row' }}>

                                <Image source={require('../../../assets/UsersPurple.png')} style={{ width: 24, height: 24, overflow: 'hidden', top: 2, }}></Image>
                                <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.BLACK, marginTop: 4, marginLeft: 8 }}>2 Person Only</Text>
                            </View>
                            <View style={{ marginTop: '3%', marginLeft: '7%' }}>
                                <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>Password</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>#rdf@1!hg</Text>
                                    <Image source={require('../../../assets/CopySimple.png')} style={{ width: 37, height: 25, overflow: 'hidden', marginLeft: '3%' }}></Image>
                                </View>

                            </View>

                            <Image source={require('../../../assets/TicketBackground.png')} style={{ width: 105, height: 79, overflow: 'hidden', marginLeft: '60%', marginTop: '-22%' }}></Image>

                        </View>
                        <TouchableOpacity onPress={() => (props.navigation.navigate('FriendsList'))} style={{ width: 370, height: 77, backgroundColor: Mycolors.ServiceHeader, borderRadius: 10, marginLeft: 10, marginTop: '6%', alignSelf: 'center', flexDirection: 'row' }} >
                            <Image source={require('../../../assets/eventPeople.png')} style={{ width: 78, height: 42, overflow: 'hidden', top: 2, marginLeft: '5%', marginTop: '5%' }}></Image>
                            <Text style={{ alignSelf: 'center', marginTop: '-3%', fontFamily: 'Roboto', fontWeight: '500', color: Mycolors.White, marginLeft: 12 }}>10 + View Attendees & Speakers</Text>
                            <Text style={{ marginTop: '12%', marginLeft: '-55%', fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.White }}>See All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShippingAddressPopUp(true)} style={{ width: 370, height: 60, backgroundColor: Mycolors.ServiceHeader, borderRadius: 10, marginLeft: 10, marginTop: '5%', alignSelf: 'center' }} >
                            <Text style={{ alignSelf: 'center', marginTop: '4%', fontWeight: '500', fontFamily: 'Roboto', color: Mycolors.White }}>Send Message</Text>
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
                                    style={{ width: 428, height: 289, backgroundColor: 'white', bottom: 0, marginTop: '100%', borderTopLeftRadius: 50, borderTopRightRadius: 50, }}>
                                    <View style={{ marginLeft: '10%', marginTop: '9%' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 15, color: Mycolors.BLACK }}>Please enter the ticket password</Text>
                                    </View>
                                    <View style={{
                                        width: '85%', height: 60, borderRadius: 5, backgroundColor: 'white', shadowRadius: 40,
                                        shadowOpacity: 1.0,
                                        elevation: 1, alignSelf: 'center'
                                    }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.TXT, marginTop: 20, marginLeft: 24 }}>********</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Messaging')} style={{ width: '85%', height: 60, borderRadius: 6, backgroundColor: Mycolors.ServiceHeader, marginTop: '5%', alignSelf: 'center' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.White, marginTop: 15, alignSelf: 'center' }}>Authentic Password</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setShippingAddressPopUp(false)} style={{ alignSelf: 'center', marginTop: 12 }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 15, color: Mycolors.ServiceHeader }}>Close</Text>
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
export default PurchaseEvent