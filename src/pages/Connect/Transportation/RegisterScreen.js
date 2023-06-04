import { style } from 'd3';
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import ConnectHeader from '../../../component/ConnectHeader';
import ServiceHeader from '../../../component/ServiceHeader';
import { Mycolors } from '../../../utility/Mycolors';


const RegisterScreen = (props) => {
    const DATA = [
        {
            id: '1',
            img: require('../../../assets/Car.png'),
            title: 'Standard',
        },
        {
            id: '2',
            img: require('../../../assets/Car.png'),
            title: 'Sedan',
        },
        {
            id: '3',
            img: require('../../../assets/Car.png'),
            title: 'Luxury',
        },

    ];
    const [selected, setSelected] = useState({});
    useEffect(() => {

    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Text>Airplan</Text> */}
            {/* <ServiceHeader
                title={'Service'}
            /> */}

            <ConnectHeader
                title={'Transportation'}
            />
            <ScrollView style={{ backgroundColor: '#F8F8F8' }}>
                <View style={styles.infoView}>
                    <Text style={styles.infoTxt}>Personal Information</Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.paraTxt}>your personal information willl be used for accounting purpose and it might be used to run a background check on your driving record and certain criminal record to help ensure the safety of our drivers and customers. see our</Text>
                </View>

                <View style={{ height: 80 }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="First Name">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 80 }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="Last Name">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 80 }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="Email">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 80 }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="Phone No">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 80 }}>
                    <View style={styles.ViewText}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="Birthday">
                        </TextInput>
                        <Image source={require('../../../assets/CalendarBlank.png')} style={{ width: 24, height: 24, marginLeft: '60%', marginTop: '5%' }}></Image>
                    </View>
                </View>
                <View style={{ height: 80 }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="ZipCode">
                        </TextInput>

                    </View>
                </View>
                <View style={{ height: 80 }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="Driver’s License State">
                        </TextInput>

                    </View>
                </View>
                <View style={{ height: 80 }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="Driver’s License Number">
                        </TextInput>

                    </View>
                </View>
                <View style={{ height: 90, }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="SSN Number">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 18, marginLeft: '7%' }}>
                    <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 13, color: Mycolors.HEADER }}>Vehicle Type</Text>
                </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', width: 112, height: 150 }}>
                        {
                            DATA.length > 0 ?
                                DATA.map((item, index) => {
                                    return (
                                        <View style={{ flexDirection: 'row' }}>
                                            < TouchableOpacity
                                                onPress={() => {
                                                    setSelected(item)
                                                }}
                                                style={{ ...styles.container, borderColor: selected.id == item.id ? '#1F4EA8' : '#FFFFFF' }}>
                                                <View>
                                                    <Image source={item.img} style={{ width: 70, height: 25, }}></Image>
                                                    <Text style={{ color: Mycolors.HEADER, alignSelf: 'center', marginTop: 12 }}>{item.title}</Text>
                                                </View>


                                            </TouchableOpacity>
                                        </View>
                                    )
                                })

                                : <Text>hiii</Text>
                        }
                    </View>
                </ScrollView>
                <View style={{ height: 90, }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="V.I.N Number">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 90, }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="Vehicle registration date">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 90, }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="License number">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 90, }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="License Expiry date">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 70, }}>
                    <View style={styles.View}>
                        <TextInput style={styles.TextInput}
                            placeholderTextColor='#8F93A0'
                            placeholder="Select state issued">
                        </TextInput>
                    </View>
                </View>
                <View style={{ height: 150 }}>

                    <TouchableOpacity onPress={() => { props.navigation.navigate('IntroScreen') }} style={{
                        width: '90%', height: 60, borderRadius: 5, alignSelf: 'center', backgroundColor: Mycolors.DRIVER, marginTop: '10%', shadowRadius: 20,
                        shadowOpacity: 1.0,
                        elevation: 5,
                    }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: 14, color: Mycolors.White, alignSelf: 'center', marginTop: 15 }}>Submit Details</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    infoView: { width: 150, height: 19, marginLeft: '6%', marginTop: '5%' },
    infoTxt: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 16, color: Mycolors.HEADER },
    paraView: { width: '92%', height: 76, marginLeft: '6%', marginTop: '3%' },
    paraTxt: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 13, color: Mycolors.HEADER },
    View: {
        width: '90%', height: 60, borderRadius: 5, alignSelf: 'center', backgroundColor: Mycolors.White, marginTop: '3%', shadowRadius: 20,
        shadowOpacity: 1.0,
        elevation: 1,
    },
    ViewText: {
        width: '90%', height: 60, borderRadius: 5, alignSelf: 'center', backgroundColor: Mycolors.White, marginTop: '3%', shadowRadius: 20,
        shadowOpacity: 1.0,
        elevation: 1, flexDirection: 'row',
    },
    TextInput: { fontFamily: 'Roboto', fontWeight: '400', fontSize: 14, color: Mycolors.HEADER, marginTop: 6, marginLeft: 12 },
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: 104, marginTop: 9, width: '90%',
        backgroundColor: '#FCFCFC', flexDirection: 'row',
        alignSelf: 'center', marginLeft: 17, shadowRadius: 30,
        shadowOpacity: 1.0,
        elevation: 10,
        borderWidth: 1,
        borderRadius: 15
    }
});
export default RegisterScreen