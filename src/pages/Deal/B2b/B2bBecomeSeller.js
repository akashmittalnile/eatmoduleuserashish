import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from './Homeheaderroundbottom';
import DropDownPicker from 'react-native-dropdown-picker';

import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
const B2BBecomeSeller = (props) => {
    const [searchValue, setsearchValue] = useState('');
    const [selectedTime, setselectedTime] = useState('2');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [address, setAddress] = useState('');

    const [zipcode, setZipCode] = useState('');

    const [openState, setopenState] = useState(false);
    const [state, setState] = useState('')
    const [valueState, setValueState] = useState('');

    const [opencity, setOpencity] = useState(false);
    const [city, setCity] = useState('');
    const [valuecity, setValuecity] = useState();
    useEffect(() => {

    }, [])
    const GoToCarDetailsScreen = (items) => {
        // console.log("items",items);
        props.navigation.navigate('CarDetails', {
            CarId: items
        })
    }

    return (
        <SafeAreaView style={{}}>
            <ScrollView>
                <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor={Mycolors.B2B_BLUE}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={6}
                    press2={() => { }} title2={'Become a seller'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
                    press3={() => { }} img3width={25} img3height={25} />
                <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center', alignSelf: "center", }}>

                    <View style={{ width: "97%", alignSelf: "center", marginTop: 20 }}>
                        <Text style={{ color: '#263238', fontWeight: '500', fontSize: 16 }}>Please enter your seller profile details</Text>
                    </View>


                    <View style={styles.addCommentContainer}>
                        <View style={styles.addCommentView}>
                            <TextInput
                                value={firstName}
                                onChangeText={(text) => {
                                    setFirstName(text)
                                }}
                                placeholder="First Name"
                                placeholderTextColor={'#B2B7B9'}
                                style={[styles.input, { width: '95%', }]}
                                multiline
                            />
                            {/* <TouchableOpacity onPress={sendMessage} style={styles.sendButtonView}>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#fff' }}>Send</Text>
                    </TouchableOpacity> */}
                        </View>
                        <View style={styles.addCommentView}>
                            <TextInput
                                value={lastName}
                                onChangeText={(text) => {
                                    setLastName(text)
                                }}
                                placeholder="Last Name"
                                placeholderTextColor={'#B2B7B9'}
                                style={[styles.input, { width: '95%', }]}
                                multiline
                            />

                        </View>
                    </View>

                    <View style={styles.BoxView}>
                        <TextInput
                            value={emailId}
                            onChangeText={(text) => {
                                setEmailId(text)
                            }}
                            placeholder="Email Address"
                            placeholderTextColor={'#B2B7B9'}
                            style={[styles.input, { width: '95%', }]}
                            multiline
                        />
                    </View>

                    <View style={styles.addCommentContainer2}>
                        <View style={{ width: 30, height: 30, justifyContent: 'flex-end', right: -40, zIndex: 999, }}>
                            <Image source={require('../../../assets/MapPin_gray.png')} style={{ width: 22, height: 18, overflow: 'hidden', alignSelf: 'center' }}></Image>
                        </View>
                        <View style={styles.BoxViewImg}>
                            <TextInput
                                value={address}
                                onChangeText={(text) => {
                                    setAddress(text)
                                }}
                                placeholder="Enter Address"
                                placeholderTextColor={'#B2B7B9'}
                                style={[styles.input, { width: '80%', }]}
                                multiline
                            />
                        </View>
                    </View>


                    <View style={{
                        marginTop: 15,
                        width: '93%',
                        backgroundColor: '#fff',
                        marginHorizontal: 15,
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'center',
                        marginBottom: 20,
                         zIndex: 999,
                    }}>
                        <DropDownPicker

                            items={[
                                { label: 'Rajasthan', value: 'Rajasthan' },
                                { label: 'Delhi', value: 'Delhi' },
                                { label: 'Gujart', value: 'Gujart' },
                                { label: 'Goa', value: 'Goa' },
                            ]}
                            listParentContainerStyle={{
                                justifyContent: "center",
                                alignItems: "center", paddingLeft: 22
                            }}
                            listParentLabelStyle={{
                                fontWeight: "400", fontSize: 15,
                            }}

                            backgroundColor='white'
                           
                            placeholder="Select State"
                            placeholderTextColor={'#B2B7B9'}
                            containerStyle={{ height: 50 , paddingLeft: 4}}
                            dropDownDirection="BOTTOM"
                            bottomOffset={100}
                            // defaultValue={changeCountry}
                            itemStyle={{ justifyContent: 'flex-start', }}
                            textStyle={{
                                fontSize: 14
                            }}
                            // listMode="MODAL"
                            open={openState}
                            setOpen={setopenState}
                            value={valueState}
                            setValue={setValueState}
                            scrollViewProps={{
                                decelerationRate: "medium", ScrollView: "#ffcc00"
                            }}
                            onChangeValue={(values) => {
                                setValueState(values)

                            }}
                            // onChangeText={(item) => setValueState(item)}
                            defaultValue={null}
                            dropDownContainerStyle={{
                                backgroundColor: 'white',
                                zIndex: 999,
                                elevation: 10,
                                borderColor: '#8F93A0',
                                borderRadius: 15,
                                marginTop: 6,
                                

                            }}
                            style={{
                                borderColor: 'white',
                                backgroundColor: 'white',
                                borderRadius: 5, 
                                // shadowColor: '#000',
                                // shadowOffset: { width: 0, height: 2 },
                                // shadowOpacity: 0.2,
                                // elevation: 2,
                                // alignItems: "center"
                                // , justifyContent: "center",
                                zIndex: 1,
                                paddingLeft: 20
                            }}
                        />
                    </View>

                    <View style={{
                         
                        width: '93%',
                        backgroundColor: '#fff',
                        marginHorizontal: 15,
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'center',
                       marginBottom: 5, 
                        zIndex:2
                    }}>
                        <DropDownPicker

                            items={[
                                { label: 'Chirawa', value: 'chirawa' },
                                { label: 'Pilani', value: 'pilani' },
                                { label: 'jaipur', value: 'jaipur' },
                                { label: 'Goa', value: 'goa' },


                            ]}
                            listParentContainerStyle={{
                                justifyContent: "center",
                                alignItems: "center", paddingLeft: 22
                            }}
                            listParentLabelStyle={{
                                fontWeight: "400", fontSize: 15,
                            }}

                            backgroundColor='white'
                            // loading={loading}
                            placeholder="Select City"
                            containerStyle={{ height: 50, paddingLeft: 4, }}
                            dropDownDirection="BOTTOM"
                            bottomOffset={100}
                            // defaultValue={changeCountry}
                            itemStyle={{ justifyContent: 'flex-start', }}
                            textStyle={{
                                fontSize: 14
                            }}
                            // listMode="MODAL"
                            open={opencity}
                            setOpen={setOpencity}
                            value={valuecity}
                            setValue={setValuecity}
                            scrollViewProps={{
                                decelerationRate: "medium", ScrollView: "#ffcc00"
                            }}
                            onChangeValue={(values) => {
                                setValuecity(values)

                            }}
                            // onChangeText={(item) => setValuecity(item)}
                            defaultValue={null}
                            dropDownContainerStyle={{
                                backgroundColor: 'white',
                                // zIndex: 999,
                                elevation: 10,
                                borderColor: '#8F93A0',
                                borderRadius: 15,
                                marginTop: 6,
                                // backgroundColor:"red",
                                // borderColor: '#8F93A0',
                                // color: '#8F93A0',
                                // alignItems: "center",
                                // justifyContent: "center",
                                // fontSize: 16,
                                // borderWidth: 1,
                                // borderRadius: 10,
                                // shadowColor: '#000000',
                                // shadowOffset: {
                                //     width: 0,
                                //     height: 3
                                // },
                                // shadowRadius: 5,
                                // shadowOpacity: 1.0,
                                // elevation: 5,
                                // zIndex: 999,

                            }}
                            style={{
                                borderColor: 'white',
                                backgroundColor: 'white',
                                borderRadius: 5, 
                                // shadowColor: '#000',
                                // shadowOffset: { width: 0, height: 2 },
                                // shadowOpacity: 0.2,
                                // elevation: 2,
                                // alignItems: "center"
                                // , justifyContent: "center",
                                zIndex: 2,
                                paddingLeft: 20
                            }}
                        />
                    </View>

                    <View style={styles.BoxView}>
                        <TextInput
                            value={zipcode}
                            onChangeText={(text) => {
                                setZipCode(text)
                            }}
                            placeholder="Zip/Pin Code"
                            placeholderTextColor={'#B2B7B9'}
                            style={[styles.input, { width: '95%',zIndex: 3,  }]}
                            multiline
                        />
                    </View>
                </View>




                <View style={{ height: 100 }} />

            </ScrollView>
            <View style={{ width: '95%', height: 60, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: -40, alignSelf: 'center',zIndex: -999 }}>
                <MyButtons title="Continue" height={50} width={'100%'} borderRadius={5} press={() => { props.navigation.navigate('B2BBecomeSellerChoosePlan') }} fontSize={13}
                    titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={Mycolors.B2B_BLUE} />
            </View>
            {/* <View style={{ width: '95%', height: 60, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 5, alignSelf: 'center' }}>
        <View style={{ width: '47%' }}>
          <MyButtons title="Dining & Booked Table" height={45} width={'100%'} borderRadius={10} alignSelf="center" press={() => { }} marginHorizontal={20} fontSize={11}
            titlecolor={Mycolors.BG_COLOR} hLinearColor={['#fd001f', '#b10027']} />
        </View>

        <View style={{ width: '47%' }}>
          <MyButtons title="My Orders" height={45} width={'100%'} borderRadius={10} alignSelf="center" press={() => { props.navigation.navigate('ShopMyOrder') }} marginHorizontal={20} fontSize={11}
            titlecolor={Mycolors.BG_COLOR} hLinearColor={['#000000', '#000000']} />

        </View>

      </View> */}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    addCommentContainer: {
        flexDirection: 'row',
        marginTop: 20,
        padding: 5,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopWidth:0.5, 
        // borderTopColor:'#ffb0ba', 
    },
    addCommentContainer2: {
        left: -13,
        flexDirection: 'row',
        padding: 5,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopWidth:0.5, 
        // borderTopColor:'#ffb0ba', 
    },
    addCommentView: {
        width: '45%',
        backgroundColor: '#fff',
        // padding:15, 
        // flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 5,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 3
        // },
        // shadowRadius: 1,
        // shadowOpacity: 0.3,
        // elevation: 5,
    },
    BoxView: {
        marginTop: 15,
        width: '93%',
        backgroundColor: '#fff',
        // padding:15, 
        // flexDirection: 'row',
        marginHorizontal: 15,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 3
        // },
        // shadowRadius: 1,
        // shadowOpacity: 0.3,
        // elevation: 5,
    },
    BoxViewImg: {
        marginTop: 15,
        width: '95%',
        backgroundColor: '#fff',
        // padding:15, 
        // flexDirection: 'row',
        marginHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 3
        // },
        // shadowRadius: 1,
        // shadowOpacity: 0.3,
        // elevation: 5,
    },
    input: {
        paddingLeft: 20,
        fontSize: 13,
        fontWeight: '400',
        color: '#000',
    },
});
export default B2BBecomeSeller 