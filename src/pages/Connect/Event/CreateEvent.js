import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const CreateEvent = (props) => {
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
                    <View style={{ width: 43, height: 43, backgroundColor: Mycolors.SEARCH_TXT, marginTop: 12, borderRadius: 21 }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.BLACK, alignSelf: 'center', marginTop: 10 }}>2</Text>
                    </View>
                    <View style={{ width: 43, height: 43, backgroundColor: Mycolors.SEARCH_TXT, marginTop: 12, borderRadius: 21 }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 16, color: Mycolors.BLACK, alignSelf: 'center', marginTop: 10 }}>3</Text>
                    </View>


                </View>

                <View style={{ marginTop: '5%', marginLeft: '12%' }}>
                    <Text>Fill your event information</Text>
                </View>
                <View style={{ height: 90 }}>
                    <View style={{
                        width: '90%', height: 60, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, alignSelf: 'center', marginTop: '3%'
                    }}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNameHandler}
                            // value={name}
                            placeholder="Event Title"
                        //keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={{ height: 150 }}>
                    <View style={{
                        width: '90%', height: 137, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, alignSelf: 'center', marginTop: '3%'
                    }}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNameHandler}
                            // value={name}
                            placeholder="Event  Description"
                        //keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={{ height: 90 }}>
                    <View style={{
                        width: '90%', height: 60, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, alignSelf: 'center', marginTop: '3%', flexDirection: 'row'
                    }}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNameHandler}
                            // value={name}
                            placeholder="21 Jul 2021"
                        //keyboardType="numeric"
                        />
                        <Image source={require('../../../assets/CalendarEvent.png')} style={{ width: 24, height: 24, borderRadius: 10, marginLeft: '55%', marginTop: '7%' }}></Image>
                    </View>
                </View>
                <View style={{ height: 90 }}>
                    <View style={{
                        width: '90%', height: 60, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, alignSelf: 'center', marginTop: '3%', flexDirection: 'row'
                    }}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNameHandler}
                            // value={name}
                            placeholder="10:00 AM"
                        //keyboardType="numeric"
                        />
                        <Image source={require('../../../assets/Clock.png')} style={{ width: 24, height: 24, borderRadius: 10, marginLeft: '61%', marginTop: '7%' }}></Image>
                    </View>
                </View>
                <View style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    borderRadius: 1,
                    height: 50,
                    width: 354,
                    alignSelf: 'center',
                    marginTop: 5,
                    flexDirection: 'row',
                    borderColor: Mycolors.ServiceHeader
                }}>
                    <Image source={require('../../../assets/Image.png')} style={{ width: 24, height: 24, borderRadius: 10, marginTop: 12, marginLeft: 12 }}></Image>
                    <View style={{ marginTop: 13, marginLeft: 9 }}>
                        <Text>Upload Event profile Cover Photo</Text>
                    </View>
                    <Image source={require('../../../assets/UploadSimple.png')} style={{ width: 24, height: 24, borderRadius: 10, marginTop: 12, marginLeft: '17%' }}></Image>
                </View>
                <View style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    borderRadius: 1,
                    height: 50,
                    width: 354,
                    alignSelf: 'center',
                    marginTop: 17,
                    flexDirection: 'row',
                    borderColor: Mycolors.ServiceHeader
                }}>
                    <Image source={require('../../../assets/Image.png')} style={{ width: 24, height: 24, borderRadius: 10, marginTop: 12, marginLeft: 12 }}></Image>
                    <View style={{ marginTop: 13, marginLeft: 9 }}>
                        <Text>Upload Cover Photo</Text>
                    </View>
                    <Image source={require('../../../assets/UploadSimple.png')} style={{ width: 24, height: 24, borderRadius: 10, marginTop: 12, marginLeft: '40%' }}></Image>
                </View>
                <View style={{ height: 90 }}>
                    <View style={{
                        width: '90%', height: 60, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, alignSelf: 'center', marginTop: '3%', flexDirection: 'row'
                    }}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNameHandler}
                            // value={name}
                            placeholder="Select Event Type"
                        //keyboardType="numeric"
                        />
                        <Image source={require('../../../assets/dropDown.png')} style={{ width: 15, height: 8, borderRadius: 10, marginTop: 12, marginLeft: '50%', marginTop: '7%' }}></Image>
                    </View>
                </View>
                <View style={{ height: 90 }}>
                    <View style={{
                        width: '90%', height: 60, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, alignSelf: 'center', marginTop: '-2%', flexDirection: 'row'
                    }}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNameHandler}
                            // value={name}
                            placeholder="Select Event Category"
                        //keyboardType="numeric"
                        />
                        <Image source={require('../../../assets/dropDown.png')} style={{ width: 15, height: 8, borderRadius: 10, marginTop: 12, marginLeft: '42%', marginTop: '7%' }}></Image>
                    </View>
                </View>
                <View style={{ height: 90 }}>
                    <View style={{
                        width: '90%', height: 60, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, alignSelf: 'center', marginTop: '-5%', flexDirection: 'row'
                    }}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNameHandler}
                            // value={name}
                            placeholder="Select State"
                        //keyboardType="numeric"
                        />
                        <Image source={require('../../../assets/dropDown.png')} style={{ width: 15, height: 8, borderRadius: 10, marginTop: 12, marginLeft: '59%', marginTop: '7%' }}></Image>
                    </View>
                </View>
                <View style={{ height: 90 }}>
                    <View style={{
                        width: '90%', height: 60, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, alignSelf: 'center', marginTop: '-5%', flexDirection: 'row'
                    }}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNameHandler}
                            // value={name}
                            placeholder="Select City"
                        //keyboardType="numeric"
                        />
                        <Image source={require('../../../assets/dropDown.png')} style={{ width: 15, height: 8, borderRadius: 10, marginTop: 12, marginLeft: '59%', marginTop: '7%' }}></Image>
                    </View>
                </View>
                <View style={{ height: 90 }}>
                    <View style={{
                        width: '90%', height: 60, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, alignSelf: 'center', marginTop: '-5%', flexDirection: 'row'
                    }}>
                        <Image source={require('../../../assets/eventLocation.png')} style={{ width: 32, height: 32, borderRadius: 10, marginTop: 12, marginTop: '4%', marginLeft: 12 }}></Image>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNameHandler}
                            // value={name}
                            placeholder="New York- Home"
                        //keyboardType="numeric"
                        />
                        <Image source={require('../../../assets/leftArrow.png')} style={{ width: 12, height: 7, marginTop: 12, marginLeft: '35%', marginTop: '7%' }}></Image>
                    </View>
                </View>
                <View style={{ height: 150 }}>
                    <View style={{
                        width: '90%', height: 137, borderRadius: 5, backgroundColor: 'white', shadowRadius: 30,
                        shadowOpacity: 1.0,
                        elevation: 3, alignSelf: 'center', marginTop: '-9%'
                    }}>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNameHandler}
                            // value={name}
                            placeholder="Type Venue  here"
                        //keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={{ height: 90, marginTop: '-4%' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('CreateEventTwo')} style={{ width: '85%', height: 60, borderRadius: 5, backgroundColor: Mycolors.ServiceHeader, alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: 'white', alignSelf: 'center', marginTop: 16 }}>Continue</Text>
                    </TouchableOpacity>
                </View>
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
export default CreateEvent