import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const Messaging
    = (props) => {
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
                    title={'Aaryav Nadkarni'}
                />

                <ScrollView style={{ backgroundColor: 'rgba(248, 248, 248, 1)' }}>
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: '7%', borderRadius: 20, height: 67 }}>

                            <Image source={require('../../../assets/frProfile6.png')} style={{ width: 28, height: 28, left: 10, marginTop: '3%', borderRadius: 20, }}></Image>
                            <View style={{
                                width: 235, height: 61, borderRadius: 15, backgroundColor: Mycolors.White, shadowRadius: 30,
                                shadowOpacity: 1.0,
                                elevation: 3, marginLeft: '5%'
                            }}>
                                <Text style={{ width: 206, height: 45, fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.HEADER, alignSelf: 'center', top: 4 }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: '10%' }}>
                            <Text tyle={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 10, color: Mycolors.SEARCH_TXT }}>12:50PM</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: '7%', borderRadius: 20, height: 67 }}>

                            <Image source={require('../../../assets/frProfile6.png')} style={{ width: 28, height: 28, left: 10, marginTop: '3%', borderRadius: 20, }}></Image>
                            <View style={{
                                width: 235, height: 61, borderRadius: 15, backgroundColor: Mycolors.White, shadowRadius: 30,
                                shadowOpacity: 1.0,
                                elevation: 3, marginLeft: '5%'
                            }}>
                                <Text style={{ width: 206, height: 45, fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.HEADER, alignSelf: 'center', top: 4 }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: '10%' }}>
                            <Text tyle={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 10, color: Mycolors.SEARCH_TXT }}>12:50PM</Text>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', marginTop: '7%', borderRadius: 20, marginLeft: '27%', height: 67 }}>

                                <Image source={require('../../../assets/frProfile5.png')} style={{ width: 28, height: 28, left: 10, marginTop: '3%', borderRadius: 20, }}></Image>
                                <View style={{
                                    width: 235, height: 61, borderRadius: 15, backgroundColor: Mycolors.White, shadowRadius: 30,
                                    shadowOpacity: 1.0,
                                    elevation: 3, marginLeft: '5%'
                                }}>
                                    <Text style={{ width: 206, height: 45, fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.HEADER, alignSelf: 'center', top: 4 }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: '37%' }}>
                                <Text tyle={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 10, color: Mycolors.SEARCH_TXT }}>12:50PM</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: '7%', borderRadius: 20, height: 67 }}>

                                <Image source={require('../../../assets/frProfile6.png')} style={{ width: 28, height: 28, left: 10, marginTop: '3%', borderRadius: 20, }}></Image>
                                <View style={{
                                    width: 235, height: 61, borderRadius: 15, backgroundColor: Mycolors.White, shadowRadius: 30,
                                    shadowOpacity: 1.0,
                                    elevation: 3, marginLeft: '5%'
                                }}>
                                    <Text style={{ width: 206, height: 45, fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.HEADER, alignSelf: 'center', top: 4 }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: '10%' }}>
                                <Text tyle={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 10, color: Mycolors.SEARCH_TXT }}>12:50PM</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: '7%', borderRadius: 20, marginLeft: '27%', height: 67 }}>

                                <Image source={require('../../../assets/frProfile5.png')} style={{ width: 28, height: 28, left: 10, marginTop: '3%', borderRadius: 20, }}></Image>
                                <View style={{
                                    width: 235, height: 61, borderRadius: 15, backgroundColor: Mycolors.White, shadowRadius: 30,
                                    shadowOpacity: 1.0,
                                    elevation: 3, marginLeft: '5%'
                                }}>
                                    <Text style={{ width: 206, height: 45, fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.HEADER, alignSelf: 'center', top: 4 }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: '37%' }}>
                                <Text tyle={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: 10, color: Mycolors.SEARCH_TXT }}>12:50PM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 74, backgroundColor: Mycolors.White, marginTop: 45, flexDirection: 'row' }}>
                        <Text style={{ marginTop: 12, marginLeft: 13 }}>Type a message</Text>
                        <View style={{ width: 89, height: 38, borderRadius: 32, backgroundColor: Mycolors.ServiceHeader, marginLeft: '45%', marginTop: 12 }}>
                            <Text style={{ top: 10, alignSelf: 'center', color: 'white' }}>Send</Text>
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
export default Messaging