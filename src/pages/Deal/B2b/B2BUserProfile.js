import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import MyButtons from '../../../component/MyButtons';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import messaging from '@react-native-firebase/messaging';
// import { useSelector, useDispatch } from 'react-redux';
import { requestPostApi, requestGetApi } from '../../../WebApi/Service'
import Loader from '../../../WebApi/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyAlert from '../../../component/MyAlert';
// import Toast from 'react-native-simple-toast';
// import HomeHeader from '../../component/HomeHeader';
import HomeHeaderRoundBottom from './Homeheaderroundbottom';

const B2BUserProfile = (props) => {
  // const userdetaile = useSelector(state => state.user.user_details)
  // const dispatch = useDispatch();
  const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  const [datas, setdatas] = useState([]);

  const [loading, setLoading] = useState(false)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [flData, setFtData] = useState([
    { id: '1', img: person_Image, title: 'BMW X3', lable: 'Table Booking', price: '$61232', desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km' },
    { id: '2', img: person_Image, title: 'Mercedes-Benz GLA', lable: 'Table Booking', price: '$61232', desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km' },
    { id: '3', img: person_Image, title: 'BMW X3', lable: 'Table Booking', price: '$61232', desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km' },
    { id: '4', img: person_Image, title: 'Mercedes-Benz GLA', lable: 'Table Booking', price: '$61232', desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km' },
    { id: '5', img: person_Image, title: 'BMW X3', lable: 'Table Booking', price: '$61232', desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km' },
  ])
  useEffect(() => {

  }, [])


  const getProfile = async () => {

    setLoading(true)
    const { responseJson, err } = await requestGetApi(driver_profile, '', 'GET', userdetaile.token)
    setLoading(false)
    if (err == null) {
      if (responseJson.status) {
        console.log('objj==>>', responseJson.data)
        setdatas(responseJson.data)
        // if(responseJson.data.card!=''){ datas.fuel_data.fuel_cost
        setfuleCost(responseJson.data.fuel_data.fuel_cost)
        setCard(responseJson.data.card[0])
        setvehicle(responseJson.data.vehicle[0])
        // Toast.show(responseJson.message);
        if (responseJson.data.profile_status) {
          if (responseJson.data.profile_status != 'active') {
            console.log('false status==>>', responseJson)
            LogoutDriver()
          }
        }
      } else {

        // Toast.show(responseJson.message);
      }
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }
  const PhoneEmailDesign = (img, title, data) => {
    return (
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <View style={{ top: -5 }}>
          <Image source={img} style={{ width: 22, height: 22, }}></Image>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: Mycolors.TEXT_COLOR }}>{title}</Text>
          <View style={{ width: 210 }}>
            <Text numberOfLines={2} style={{ fontSize: 11, color: Mycolors.TEXT_COLOR, marginTop: 5, textAlign: "left" }}>{data}</Text>
          </View>
        </View>

      </View>
    )
  }

  const MyorderDesign = (item) => {
    return (
      <View style={{
        marginVertical: 10, marginHorizontal: 5, borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent: 'center',
        elevation: 5
      }}>
        <View style={{ width: '100%', padding: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 5, overflow: 'hidden' }}>
          <View>
            <Image source={require('../../../assets/images/BMW_X3.png')} style={{ width: 45, height: 45, borderRadius: 25 }}></Image>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: Mycolors.TEXT_COLOR }}>{item.title}</Text>
            <View style={{   alignItems: 'flex-start', marginTop: 7 }}>
              
              <Text style={{   fontSize: 11, fontWeight: '500',color:'#B2B7B9',textAlign:"left" }}>{item.desc}</Text>
            </View>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#000000', marginTop: 8 }}>{item.price}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor={Mycolors.B2B_BLUE}
        press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={6}
        press2={() => { }} title2={'B2B'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
        press3={() => { }} img3width={25} img3height={25} />
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{
          width: '99%', padding: 10, marginTop: 10, borderRadius: 10,
          backgroundColor: '#fff',
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
          justifyContent: 'center',
          elevation: 5, alignSelf: 'center'
        }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../../assets/dating-home-header-left-image.png')} style={{ width: 50, height: 50, borderRadius: 25 }}></Image>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, fontWeight: '600' }}>Favliy store</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Image source={require('../../../assets/Star.png')} style={{ width: 15, height: 15, }}></Image>
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 11, left: 7 }}>4.5</Text>
                </View>
              </View>
            </View>

            <MyButtons title="Edit" height={30} width={60} borderRadius={30} press={() => { }}
              titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.B2B_BLUE} fontWeight={'500'} fontSize={13} marginVertical={10} />
          </View>
          <View style={{ marginLeft: 65, marginTop: 5 }}>
            {PhoneEmailDesign(require('../../../assets/callblue.png'), 'Phone', '+911234567890')}
            {PhoneEmailDesign(require('../../../assets/emailblue.png'), 'Email', 'abc@abc.comhhhhg')}
            {PhoneEmailDesign(require('../../../assets/MapPin_blue.png'), 'Location', '673 Westminster Lane South Plainfield, NJ 07080')}
          </View>
        </View>

        <View style={{ flexDirection: "row", width: '100%', marginTop: 20 }}>

          <View style={{  marginHorizontal: 20 }}>
            <TouchableOpacity style={{ width: 150, height: 40, justifyContent: 'center', borderWidth: 0.5, borderRadius: 50, borderColor: Mycolors.BG_COLOR, backgroundColor: Mycolors.BG_COLOR, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.03, elevation: 1 }}
              onPress={() => { }}>
              <Text style={{ fontSize: 13, color: '#455A64', textAlign: 'center', fontWeight: '400' }}>Listed Product</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={{ width: 150, height: 40, justifyContent: 'center', }}
            onPress={() => { props.navigation.navigate('DatingChat') }}>
            <Text style={{ fontSize: 13, color: '#455A64', textAlign: 'center', fontWeight: '400' }}>Seller Messages</Text>
          </TouchableOpacity>

        </View>

        <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: Mycolors.TEXT_COLOR }}>12 Product listed for sell</Text>
          {/* <Text style={{ fontSize: 12, color: Mycolors.TEXT_COLOR }} onPress={() => { Alert.alert('hi') }}>View All</Text> */}
        </View>

        <ScrollView style={{paddingBottom:30}}>
          {flData.map((item, index) => (

            MyorderDesign(item)
          ))}
        </ScrollView>
        
        <View style={{ width: 100, height: 50 }} />
        {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
        {loading ? <Loader /> : null}
      </ScrollView>
      <View style={{  width: '95%', height: 60, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                    <MyButtons title="Become A Seller" height={50} width={'100%'} borderRadius={5}   press={() => {props.navigation.navigate('B2BBecomeSeller') }} fontSize={13}
                        titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={Mycolors.B2B_BLUE} />
                </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  input: {
    height: 45,
    width: '100%',
    fontSize: 15,
    borderColor: null,
    borderRadius: 10,
    color: Mycolors.TEXT_COLOR,
    paddingLeft: 40,
    paddingRight: 5,
  },
});
export default B2BUserProfile