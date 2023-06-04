import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const LoginScreen = (props) => {
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
                title={'Transportation Login'}
            />
            <ScrollView style={{ backgroundColor: 'white' }}>


                <View style={{ alignSelf: 'center', marginTop: '13%' }}>
                    <Image source={require('../../../assets/driverLogin.png')} style={{ width: 322, height: 191, borderRadius: 10 }}></Image>
                </View>
                <View style={{ height: 80, marginTop: 23 }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#455A64'
                            placeholder="Mobile number or Username">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 200 }}>
                    <View style={{ height: 80, }}>
                        <View style={styles.View}>
                            <TextInput style={styles.TextInput}
                                placeholderTextColor='#455A64'
                                placeholder="Password">
                            </TextInput>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('HomePage') }} style={{
                        width: '90%', height: 60, borderRadius: 5, alignSelf: 'center', backgroundColor: Mycolors.DRIVER, marginTop: '10%', shadowRadius: 20,
                        shadowOpacity: 1.0,
                        elevation: 5,
                    }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.White, alignSelf: 'center', marginTop: 15 }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    View: {
        width: '90%', height: 60, borderRadius: 5, alignSelf: 'center', backgroundColor: Mycolors.White, marginTop: '3%', shadowRadius: 20,
        shadowOpacity: 1.0,
        elevation: 1,
    },
    TextInput: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.HEADER, marginTop: 6, marginLeft: 12 },
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
export default LoginScreen