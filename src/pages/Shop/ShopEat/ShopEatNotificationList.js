import React, { useEffect, useState, useRef } from 'react';
import { RefreshControl, View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Platform ,TouchableWithoutFeedback} from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import { Rating } from 'react-native-ratings';
import ViewMoreText from 'react-native-view-more-text';
import Toggle from "react-native-toggle-element";
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setSelectedCarTab } from '../../../redux/actions/user_action';
import DatePicker from 'react-native-datepicker';
import { baseUrl, requestPostApi,notification_list, requestGetApi, shop_eat } from '../../../WebApi/Service'
import Loader from '../../../WebApi/Loader';
import MyAlert from '../../../component/MyAlert';
import { useSelector, useDispatch } from 'react-redux';

const ShopEatNotificationList = (props) => {
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [menutypedate, setmenutypedate] = useState(null);
  const User = useSelector(state => state.user.user_details)

  useEffect(() => {
     getAllNotificationsList();
  }, []);

 const getAllNotificationsList = async () => {
    setLoading(true)
    const { responseJson, err } = await requestGetApi(notification_list, '', 'GET', User.token)
    setLoading(false)
    console.log('the res in_cart notification_list ==>>', responseJson)
    if (responseJson.headers.success == 1) {
      // var counts = 0
      // for (let i = 1; i <= responseJson.body.length; i++) {
      //   if (responseJson.body[i - 1].in_cart == '1') {
      //     counts = parseInt(counts) + parseInt('1')
      //   }
      // }
      // setcartCount(counts)
      setNotificationData(responseJson.body)
  
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  };



  return (
    <SafeAreaView style={styles.container}>
    <View style={{}}>
        <HomeHeader height={60} paddingHorizontal={15}
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/arrow.png')}
          img1width={30} img1height={30}  img1padding={5} img1borderRadius={4}
          press2={() => { }} title2={'Notifications'} fontWeight={'bold'} img2height={20} color={Mycolors.TEXT_COLOR}
          press3={() => {  }} img3width={45} img3height={45}
          img3backgroundColor={'transparent'} img3padding={8} img3borderRadius={4} />
      </View>
  <ScrollView>
  <View style={{ width: '100%', alignSelf: 'center', marginTop: 10,paddingHorizontal:10 }}>

{menutypedate !=null ?
    menutypedate.map((item, index) => {
    return (
      <View style={{width:'95%',alignSelf:'center',backgroundColor:'#fff',borderRadius:5,marginVertical:10}}>
      <View style={{padding:10}}>
        <Text style={{fontWeight:'600',color:"#000",fontSize:13}}>Fish Sticks and Lemon Caper Sauce</Text>
        <Text style={{fontWeight:'400',color:"gray",fontSize:11,lineHeight:16}}>Fish Sticks and Lemon Caper Sauce. This weeks recipe is perfect for those of you celebrating Lent. Find it now on the Premium version of the Brand NUE appl</Text>

<View style={{alignSelf:'flex-end',flexDirection:'row',marginTop:10}}>
<Image source={require('../../../assets/calendar.png')} style={{width:15,height:15}}></Image>
<Text style={{fontWeight:'400',color:"gray",fontSize:11,lineHeight:16,marginHorizontal:5}}>08:49:08 am, 11 Mar 2023</Text>
</View>

</View>
<View style={{width:'100%',height:5,backgroundColor:'green',position:'absolute',bottom:0,alignSelf:'center',borderBottomLeftRadius:4,borderBottomRightRadius:4}}></View>

      </View>
    )
  }
  )
  :
  <View style={{alignSelf:'center'}}>
  <Image source={require('../../../assets/Group6273.png')} style={{width:200,height:300,resizeMode:'stretch'}}></Image>
  <Text style={{fontWeight:'600',color:"#000",fontSize:14,lineHeight:16,marginHorizontal:5,textAlign:'center'}}>No Notifications Yet</Text>

    <View style={{ width: '95%', alignSelf: 'center', marginTop: 25 }}>
                <MyButtons title="Go To Home" height={35} width={'100%'} borderRadius={5} alignSelf="center" 
                press={() => {
                 props.navigation.navigate('ShopEat')
                }}  fontSize={14} paddingHorizontal={10}
                  titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} hLinearColor={['#b10027', '#fd001f']} />
              </View>

  </View>
}

</View>

<View style={{width:10,height:150}}></View>
</ScrollView>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    input: {
      paddingLeft: 15,
      width:'100%',
      fontSize: 13,
      borderColor: 'rgba(0,0,0,0.2)',
      borderWidth:0.5,
     // backgroundColor: '#34333a',
      color:'#fff',
      height:100,
      borderRadius:5,
      paddingHorizontal:15,
      paddingVertical:10,
      color:Mycolors.Black
    },
    
  });
  

export default ShopEatNotificationList;

