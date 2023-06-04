import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const CreateEventTwo = (props) => {
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
                    <View style={{ width: 43, height: 43, backgroundColor: Mycolors.SEARCH_TXT, marginTop: 12, borderRadius: 21 }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.BLACK, alignSelf: 'center', marginTop: 10 }}>3</Text>
                    </View>


                </View>
                <View style={{ marginTop: 15, marginLeft: '12%' }}>
                    <Text>Upload Event Media and Event Detail</Text>
                </View>
                <View style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    borderRadius: 1,
                    height: 236,
                    width: 368,
                    marginTop: '5%',
                    alignSelf: 'center',

                    flexDirection: 'row',
                    borderColor: Mycolors.ServiceHeader
                }}>
                    <Image source={require('../../../assets/Image.png')} style={{ width: 80, height: 80, marginLeft: '35%' }}></Image>
                    <View style={{ marginTop: '23%', width: 249, height: 50, marginLeft: '-35%' }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '300', fontSize: 19 }}>Click Here To Upload A</Text>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '300', fontSize: 19, marginLeft: '10%' }}>    Photo or video.</Text>
                    </View>
                    <TouchableOpacity style={{ width: 171, height: 40, borderRadius: 36, backgroundColor: Mycolors.ServiceHeader, marginTop: '43%', marginLeft: '-63%' }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.White, alignSelf: 'center', marginTop: 6 }}>Upload Media</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: 360, height: 169, alignSelf: 'center', marginTop: '4%' }}>
                    <Text style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.HEADER }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                </View>
                <TouchableOpacity onPress={() => { props.navigation.navigate('CreateEventThree') }} style={{ width: 370, height: 60, borderRadius: 5, backgroundColor: Mycolors.ServiceHeader, alignSelf: 'center', marginTop: 12 }}>
                    <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.White, alignSelf: 'center', marginTop: '5%' }}> Continue</Text>
                </TouchableOpacity>
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
export default CreateEventTwo