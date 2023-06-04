import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const Event = (props) => {
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
                title={'Events'}
            />
            <ScrollView>
                <View style={{ backgroundColor: 'rgba(248, 248, 248, 1)' }}>


                    <View style={{ marginTop: 23, marginLeft: 17, flexDirection: 'row' }}>
                        <View style={styles.cateView}>
                            <Text style={styles.cateTxt}>View Joined Event</Text>
                        </View>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('JoinedEvent') }} style={styles.cateView}>
                            <Text style={styles.cateTxt}>Show Purchase Tickets</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.searchView}>
                            <Text style={styles.searchTxt}>What’s on your mind</Text>
                        </View>
                        <TouchableOpacity onPress={() => setShippingAddressPopUp(true)} >
                            <Image source={require('../../../assets/filterOption.png')} style={{ width: 45, height: 45, borderRadius: 10 }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.exploreView}>
                        <Text style={styles.exploreTxt}>Explore</Text>
                        <Text style={styles.expTxt}>Suggested events for you</Text>
                    </View>
                    <View style={{ width: 388, height: 363, backgroundColor: 'white', borderRadius: 15 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('EventInfo')} style={{ flexDirection: 'row', }}>
                            <Image source={require('../../../assets/event.png')} style={{ width: '96%', height: 261, left: 10, marginTop: '3%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                            <Image source={require('../../../assets/save.png')} style={{ width: 32, height: 32, overflow: 'hidden', borderRadius: 10, marginTop: '6%', left: -37 }}></Image>

                        </TouchableOpacity>
                        <Text style={styles.eventTxt}>Music evnet 2021 </Text>
                        <View style={{ flexDirection: 'row', height: 15 }}>
                            <Text style={styles.eventTypeTxt}>Public Event</Text>
                            <Image source={require('../../../assets/googleMap.png')} style={{ width: 42, height: 42, overflow: 'hidden', top: -28, marginLeft: '60%' }}></Image>

                        </View>
                        <View style={styles.calendar}>
                            <Image source={require('../../../assets/CalendarBlank.png')} style={{ width: 13.7, overflow: 'hidden', }}></Image>
                            <Text style={styles.calendarTxt}>28 oct, 2021(09:30PM to 12:45PM)</Text>
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity onPress={() => { props.navigation.navigate('EventInfoPrivate') }} style={{ flexDirection: 'row', }}>
                            <Image source={require('../../../assets/eventTwo.png')} style={{ width: '96%', height: 261, left: 10, marginTop: '3%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                            <View style={{ position: 'absolute', marginTop: 25, marginLeft: '7%', width: 163, height: 27, backgroundColor: Mycolors.ServiceHeader }}>
                                <Text style={styles.ticketText}>400+ Ticket Available</Text>
                            </View>
                            <Image source={require('../../../assets/save.png')} style={{ width: 32, height: 32, overflow: 'hidden', borderRadius: 10, marginTop: '6%', left: -37 }}></Image>

                        </TouchableOpacity>
                        <View style={{ position: 'absolute', marginTop: '25%', marginLeft: '83%' }}>
                            <Image source={require('../../../assets/addPlus.png')} style={{ width: 74, height: 74, overflow: 'hidden', borderRadius: 10, }}></Image>
                        </View>
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
                                    style={{ width: 428, height: 330, backgroundColor: 'white', bottom: 0, marginTop: '100%', borderTopLeftRadius: 50, borderTopRightRadius: 50, }}>
                                    <View style={styles.MilesView}>
                                        <Text style={styles.MilesText}>Choose Miles</Text>
                                    </View>
                                    <View style={{ marginTop: 29 }}>
                                        <Image source={require('../../../assets/slider.png')} style={{ width: 375, height: 36, overflow: 'hidden', alignSelf: 'center', }}></Image>
                                    </View>
                                    <View style={styles.milesTextBoxView}>
                                        <Text style={styles.milesText}>15 Miles</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => setShippingAddressPopUp(false)} style={styles.saveView}>
                                        <Text style={styles.saveTxt}>Save</Text>
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
export default Event