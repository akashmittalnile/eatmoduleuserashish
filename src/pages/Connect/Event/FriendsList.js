import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';

const DATA = [
    {
        id: '1',
        img: require('../../../assets/frProfile.png'),
        title: 'Chetan Manne',
        status: 'Attendee',

    },
    {
        id: '1',
        img: require('../../../assets/frProfile2.png'),
        title: 'Parth Singe',
        status: 'Attendee'

    }, {
        id: '1',
        img: require('../../../assets/frProfile2.png'),
        title: 'Parth Singe',
        status: 'Attendee'

    }, {
        id: '1',
        img: require('../../../assets/frProfile3.png'),
        title: 'Elisa Cinelli',
        status: '@cinelliElisa',
        img1: require('../../../assets/SpeakerHigh.png'),


    }, {
        id: '1',
        img: require('../../../assets/frProfile4.png'),
        title: 'Neeraj Jat',
        status: 'Attendee'

    }, {
        id: '1',
        img: require('../../../assets/frProfile5.png'),
        img1: require('../../../assets/SpeakerHigh.png'),
        title: 'Miley Cyrus',
        status: '@mileycyrus'

    }, {
        id: '1',
        img: require('../../../assets/frProfile6.png'),
        title: 'Sethuramani Hubballi',
        status: 'Attendee'

    },
    {
        id: '1',
        img: require('../../../assets/frProfile7.png'),
        title: 'Ilamaran Sabharwal',
        status: 'Attendee'

    },



];
const FriendsList = (props) => {
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
                title={'2 Speakers & 5 Attendees'}
            />
            <View style={{ backgroundColor: 'rgba(248, 248, 248, 1)' }}>
                <View style={{
                    width: '80%', height: 45, borderRadius: 10, backgroundColor: Mycolors.White, shadowRadius: 30,
                    shadowOpacity: 1.0,
                    elevation: 10, marginTop: '5%', marginLeft: '7%', flexDirection: 'row'
                }}>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNameHandler}
                        // value={name}
                        placeholder="Search"
                    //keyboardType="numeric"
                    />
                    <Image source={require('../../../assets/MagnifyPurple.png')} style={{ width: 70, height: 70, marginLeft: '75%' }}></Image>
                </View>
                <View style={{ height: '90%', }}>
                    <FlatList
                        vertical
                        data={DATA}
                        renderItem={({ item, index }) => {
                            return <>
                                <View style={styles.contList}>
                                    <View style={{ marginLeft: 23, marginTop: 15, flexDirection: 'row' }}>
                                        <Image source={(item.img)} style={{ width: 47, height: 47, }}></Image>
                                        <View style={{ flexDirection: 'column', marginLeft: 23 }}>
                                            <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.HEADER }}>{item.title}</Text>
                                            <Text style={{ marginTop: 6, fontFamily: 'Roboto', fontWeight: '300', fontSize: 14, color: Mycolors.BLACK }}>{item.status}</Text>
                                        </View>
                                        <Image source={(item.img1)} style={{ width: 32, height: 32, marginLeft: '27%', marginTop: 12 }}></Image>
                                    </View>
                                </View>


                            </>
                        }} />
                </View>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    input: { marginLeft: 12 },
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
    saveTxt: { fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.White, alignSelf: 'center', top: 21 },
    contList: {
        marginHorizontal: 6,
        marginTop: 20,
        height: 82,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        width: '90%',
        shadowColor: '#000000',
        shadowRadius: 15,
        shadowOpacity: 1.0,
        elevation: 3,
        marginLeft: 20

    },
});
export default FriendsList