import React, { useEffect, useState, useRef } from 'react';
import { RefreshControl, View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, StatusBar, Platform } from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import { baseUrl, login, shop_eat_business, requestPostApi, requestGetApi, shop_eat } from '../../../WebApi/Service'
import Loader from '../../../WebApi/Loader';
import Toast from 'react-native-toast-message';
import MyAlert from '../../../component/MyAlert';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserResult, saveUserToken, setVenderDetail,onLogoutUser, setUserType } from '../../../redux/actions/user_action';
import {setRestorentLocation } from '../../../redux/actions/latLongAction';
import GetLocation from 'react-native-get-location'
import Geocoder from "react-native-geocoding";
import { GoogleApiKey } from '../../../WebApi/GoogleApiKey';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { log } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {setNotificationData,setMessageCount} from '../../../redux/actions/latLongAction';

Geocoder.init(GoogleApiKey);
const GOOGLE_MAPS_APIKEY = GoogleApiKey;

const ShopEat = (props) => {
  const [searchValue, setsearchValue] = useState('')
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [upData, setupData] = useState([
    {
      id: '1',
      title: 'Hair Cut',
      desc: '',
      time: '',
      img: require('../../../assets/images/images.png'),
    },
    {
      id: '2',
      title: 'Shaving',
      desc: '',
      time: '',
      img: require('../../../assets/images/images.png'),
    },
    {
      id: '3',
      title: 'Facial',
      desc: '',
      time: '',
      img: require('../../../assets/images/images.png'),
    },
    {
      id: '4',
      title: 'Hair Color',
      desc: '',
      time: '',
      img: require('../../../assets/images/images.png'),
    },
    {
      id: '5',
      title: 'Hair wash',
      desc: '',
      time: '',
      img: require('../../../assets/images/images.png'),
    },
    {
      id: '6',
      title: 'Beard style',
      desc: '',
      time: '',
      img: require('../../../assets/images/images.png'),
    },
    {
      id: '7',
      title: 'Facial',
      desc: '',
      time: '',
      img: require('../../../assets/images/images.png'),
    },
  ])
  const [resData, setresData] = useState(null)
  const [venderdata, setvenderdata] = useState(null)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [My_Alert2, setMy_Alert2] = useState(false)
  const [alert_sms2, setalert_sms2] = useState('')
  const [My_Alert3, setMy_Alert3] = useState(false)
  const [alert_sms3, setalert_sms3] = useState('')
  const [lat, setlat] = useState('28.6176')
  const [lan, setlan] = useState('77.422')
  const [refreshing, setRefreshing] = useState(false);
  const [addre, setaddre] = useState(' ');
  const [cartCount, setcartCount] = useState('0')
  const mapdata = useSelector(state => state.maplocation) 
  const [googleAddress, setGoogleAddress] = useState('');
  const [googleLatLng, setGoogleLatLng] = useState({});
  const [remoteMessageData, setRemoteMessageData] = useState('');

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }) 
      .then(location => {
        console.log('locations latitude longitude', location);
        setlat(location.latitude)
        setlan(location.longitude) 
        let My_cord = { latitude: '28.5355', longitude: '77.3910' }
       // let My_cord = { latitude: location.latitude, longitude: location.longitude }
        dispatch(setRestorentLocation(My_cord))
        //  homePage(location.latitude,location.longitude) 
        homePage('28.5355','77.3910') 
         
        LatlongTo_address(My_cord)
      })  
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
   
    // venderList()
  }, [])

  const rateOrder = () => {
    props.navigation.navigate('ShopReview',{ data: remoteMessageData })
  }
  
  messaging().onMessage(remoteMessage => {
    const data = remoteMessage.data
    console.log('onMessage remoteMessage',remoteMessage)
   if(remoteMessage.notification.body=='Order Delivered Successfully!') {
    setalert_sms3('Do you want to rate order?')
    setMy_Alert3(true)
    setRemoteMessageData(remoteMessage.data)
   }else if(remoteMessage.notification.body=='new message'){
       dispatch(setMessageCount(mapdata.messagecount+1))
       props.navigation.navigate('ShopMyOrderDetails',{ data: remoteMessage.data })

   }
   
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    const data = remoteMessage.data
    console.log('Notification caused app to open from background state:',remoteMessage)
    if(remoteMessage.notification.title=='Kinengo'){
      if(remoteMessage.notification.body=='Order Delivered Successfully!') {
        setalert_sms3('Do you want to rate order?')
        setMy_Alert3(true)
        setRemoteMessageData(remoteMessage.data)
       }else{
        props.navigation.navigate('ShopMyOrderDetails',{ data: remoteMessage.data })
       } 
      
     }else if(remoteMessage.notification.body=='new message'){
      props.navigation.navigate('ShopMyOrderDetails',{ data: remoteMessage.data })
      dispatch(setMessageCount(mapdata.messagecount+1))
    }
  });
  

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log('====================================');
      console.log(remoteMessage);
      console.log('====================================');
      if(remoteMessage.notification.title=='Kinengo'){
        if(remoteMessage.notification.body=='Order Delivered Successfully!') {
          setalert_sms3('Do you want to rate order?')
          setMy_Alert3(true)
          setRemoteMessageData(remoteMessage.data)
         }else{
          props.navigation.navigate('ShopMyOrderDetails',{ data: remoteMessage.data })
         }         
       }else if(remoteMessage.notification.body=='new message'){
        dispatch(setMessageCount(mapdata.messagecount+1))
        props.navigation.navigate('ShopMyOrderDetails',{ data: remoteMessage.data })

      }
    });



  const LatlongTo_address = async (latlong) => {
    // var courentlocation = mapdata.curentPosition
    // dispatch(setStartPosition(courentlocation))
    Geocoder.from(latlong.latitude, latlong.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log('The address is', json.results[0].formatted_address);
        setaddre(addressComponent)
        // UpdateLocation(latlong,addressComponent)
      })
      .catch(error => console.warn(error));
  }

  const checkcon = () => {
    homePage()
  }
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    // fetchSuccessDetails()
    checkcon()
    wait(2000).then(() => {

      setRefreshing(false)

    });
  }, []);

  const homePage = async (l,lo) => {
    console.log('the res==>>Home')
    setLoading(true)

    const { responseJson, err } = await requestGetApi(shop_eat+ '?lat=' + l + '&long=' + lo, '', 'GET', '')
    setLoading(false)
    console.log('the res==>>Home', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('the res==>>Home.body.vendors', responseJson.body)
      setresData(responseJson.body)
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const homePageSearch = async () => {
    //  if(searchValue==''){
    //   Toast.show('Please input ')
    //  }
    setLoading(true)
    const { responseJson, err } = await requestGetApi(shop_eat + '?name=' + searchValue.text + '&lat=' + lat + '&long=' + lan, '', 'GET', '')
    setLoading(false)
    console.log('the res==>>Home ?name=', responseJson)
    if (responseJson.headers.success == 1) {
      props.navigation.navigate('ShopSearch', { datas: responseJson.body.vendors })
      setresData(responseJson.body)
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const venderList = async () => {
    setLoading(true)
    const { responseJson, err } = await requestGetApi(shop_eat_business, '', 'GET', '')
    setLoading(false)
    console.log('the res==>>shop_eat_business', responseJson)
    if (responseJson.headers.success == 1) {
      setvenderdata(responseJson.body)
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const logoutDriver=async()=>{
    AsyncStorage.clear(); 
    dispatch(onLogoutUser())
}

function renderDescription(rowData) {
  const title = rowData.structured_formatting.main_text;
  const address = rowData.structured_formatting.secondary_text;
  // console.log('renderDescription', address);
  return (
    <View style={{}}>
      <Text style={{color:'gray'}}>
        {title}
      </Text>
      <Text style={{color:'gray'}}>
        {address}
      </Text>
    </View>
  );
}

  return (
    <SafeAreaView style={{}}>
      <ScrollView
        style={{flexGrow: 1}}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
      <View>
        <HomeHeader height={60} paddingHorizontal={15}
          press1={() => { props.navigation.goBack() }}  img1width={18} img1height={15}
          press2={() => { }} title2={'Food'} fontWeight={'500'} img2height={20}
          press3={() => {
             props.navigation.navigate('ShopEatNotificationList') 
           
          //   AsyncStorage.clear(); 
          // dispatch(onLogoutUser())
            }} img3width={20} img3height={20} img3={require('../../../assets/Bell.png')} />
        {cartCount != '0' ?
          <View style={{ position: 'absolute', right: 8, top: 8, width: 20, height: 20, borderRadius: 20, backgroundColor: 'red', justifyContent: 'center', zIndex: 999 }}>
            <Text style={{ fontSize: 11, textAlign: 'center', color: '#fff' }}>{cartCount}</Text>
          </View>
          : null
        }
        <View style={{position:'absolute',right:40,top:21}}>
          <TouchableOpacity onPress={()=>{
 setalert_sms2('Are you sure want to logout?')
 setMy_Alert2(true)
          }}>
          <Image source={require('../../../assets/dating-logout-image.png')} style={{width:18,height:18}}></Image>
          </TouchableOpacity>
        </View>
      </View>


        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginHorizontal: 10,
          // backgroundColor: 'rgba(0,0,0,0.025)',
          paddingHorizontal: 5,
          // paddingVertical: 5,
          // alignSelf: 'center',
          // alignItems: 'center',
          backgroundColor: '#fff',
          width: '94%',
          borderRadius: 10, 
         
        }}>
          <TouchableOpacity style={{ justifyContent: 'center', position: 'absolute', height: 55, left: 15 }}>
            <Image source={require('../../../assets/shape_33.png')} style={{ width: 12, height: 15 }}></Image>
          </TouchableOpacity>
          <View style={{ width: '86%', justifyContent: 'center', alignItems: 'center', }}>
            <GooglePlacesAutocomplete
             // placeholder={addre.substring(0, 45)}
              placeholder={'Noida, Uttar Pradesh, India'}
              textInputProps={{
                placeholderTextColor: '#000',
                top:Platform.OS=='ios' ? 15 : 0,
                // width: '95%',
                // placeholderTextColor: Colors.BLACK,
                returnKeyType: 'search',
                // onFocus: () => setShowPlacesList(true),
                // onBlur: () => setShowPlacesList(false),
                multiline: true,
                numberOfLines: 3,
                // onTouchStart: ()=>{downButtonHandler()}
                height: 50,
                color: '#000'
              }}
              renderRow={rowData => {
                return (
                  <View>
                    {renderDescription(rowData)}
                  </View>
                )
              }}
              enablePoweredByContainer={false}
              listViewDisplayed={'auto'}
              styles={{
                textInputContainer: {
                  width: '100%',
                  marginLeft: 0,
                  // backgroundColor: 'grey',
                },
                description: {
                  color: '#000',
                  width: '74%',
                  // fontWeight: '300'
                },
                poweredContainer: {
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderColor: '#C8C7CC',
                  borderTopWidth: 0.5,
                  color: '#000'
                },
                powered: {},
                listView: {
                  // color:'#000'
                  borderWidth:0.5,
                  borderColor:'gray',
                  // borderRadius:10,
                  overflow:'hidden',
                  paddingBottom:10,
                  padding:3
                },
                row: {
                  // backgroundColor: '#FFFFFF',
                  paddingVertical: 10,
                  height: 50,
                  flexDirection: 'row',
                },
                separator: {
                  height: 0.5,
                  backgroundColor: '#C8C7CC',
                  color: '#000',
                  marginTop:10
                },
                textInput: {
                  backgroundColor: 'transparent',
                  height: 40,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: '#000',
                  flex: 1,
                  // paddingHorizontal: 5,
                },
              }}
              onPress={(data, details = null) => {
              console.log(data, details);
            // 'details' is provided when fetchDetails = true
            // setShowPlacesList(false)
            homePage(details.geometry.location.lat,details.geometry.location.lng)
            dispatch(setRestorentLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            }))

            setGoogleLatLng({
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
            });
            setGoogleAddress(data?.description);
            }}
              GooglePlacesDetailsQuery={{
                fields: 'geometry',
              }}
              fetchDetails={true}
              // currentLocation={true}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
              }}
            />
          </View>
          <View style={{
            height: 55, position: 'absolute', right: -10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            marginHorizontal: 8, top: 0,
            backgroundColor: '#ADC430',
            paddingVertical: 5,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            borderTopRightRadius: 10, borderBottomRightRadius: 10
          }}>
            <TouchableOpacity onPress={() => { props.navigation.navigate('ShopEatFilter') }}>
              <Image source={require('../../../assets/shape_32.png')} style={{ width: 25, height: 25 }}></Image>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: '96%', alignSelf: 'center' }}>
         
          <TouchableOpacity style={{ width: '98%', height: 50, borderRadius: 10, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 10,justifyContent:"space-between" }}
            onPress={() => { props.navigation.navigate('ShopSearch', { datas: [], from: 'search' }) }}>
            
            <View style={{ padding: 5 }}>
              <Text style={{ color: 'gray', fontSize: 12, left:9 }}>Search By Vendor Name</Text>
            </View>
            <View style={{ padding: 5, }}>
              <Image source={require('../../../assets/Search-red.png')} style={{ width: 45, height: 49 }}></Image>
            </View>
          </TouchableOpacity>

          <View style={{ width: '100%', alignSelf: 'center', marginTop: 15 }}>
            {resData != null ?
              <FlatList
                data={resData.coupons}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // numColumns={2}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ width: dimensions.SCREEN_WIDTH * 75 / 100, marginHorizontal: 5, borderRadius: 10}}>
                      <TouchableOpacity style={{ width: '100%', height: 120, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center', alignSelf:'center' }}
                        onPress={() => { props.navigation.navigate('ShopSearch', { datas: [], from: '' }) }}>
                        <Image resizeMode='stretch' source={{ uri: item.image }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 10,  }}></Image>
                      </TouchableOpacity>
                    </View>
                  )
                }}
                keyExtractor={item => item.id}
              />
              : null}
          </View>


          <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 30 }}>
            <Text style={{ color: Mycolors.Black, fontWeight: 'bold',fontSize:22}}>Explore Nearby</Text>
{resData?.vendors?.length>0 ?  
            <Text style={{ color: Mycolors.RED, fontWeight: '500', textDecorationLine: "underline",fontSize:14, }}
              onPress={() => { props.navigation.navigate('ShopSearch', { datas: [], from: 'search' }) }}>View More</Text>
: null}
          </View>


          <View style={{ width: '100%', alignSelf: 'center', marginTop: 10 }}>
          {resData?.vendors?.length>0 ?  
              <FlatList
                data={resData.vendors}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // numColumns={2}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ width: 190, marginHorizontal: 6,
                    // borderColor:'#DEDEDE',borderWidth:1,
                    borderRadius:15,backgroundColor:'#FFFF', }}>
                      <TouchableOpacity style={{ width: "100%", height: 130, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center' ,padding:1}}
                        onPress={() => {
                          props.navigation.navigate('FoodDetails', { data: item })
                          dispatch(setVenderDetail(item))
                        }}>
                        <Image source={{ uri: item.banner_image }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 8, resizeMode: 'stretch' }}></Image>
                      </TouchableOpacity>
                      <View style={{left: 9 }}>
                        <Text style={{ fontSize: 12, color: Mycolors.Black, marginTop: 2, fontWeight: 'bold', left: 2 }}>{item.name}</Text>
                        <Text style={{ fontSize: 12, color: '#9B9B9B', marginTop: 2, fontWeight: '500', left: 2,fontStyle: 'italic',}}>Cuisine Name: Italian +2</Text>
                      </View>
                      <View style={{ padding: 5,left: 5,top:-3 }}>
                        <View style={{ flexDirection: 'row', }}>
{item.rating > 0 ? 
                        <View style={{ flexDirection: 'row', }}>
                          <Image source={require('../../../assets/Star.png')} style={{ width: 13, height: 13 }}></Image>
                          <Text style={{ fontSize: 12, color: Mycolors.Black, left: 2 }}>{Number(item.rating).toFixed(1)}</Text>
                         </View>
: 
<Text style={{ fontSize: 11, color: Mycolors.Black, left: 2 }}>No Rating Yet</Text>
}
                          <View style={{backgroundColor:'transparent',height:4,width:4,justifyContent:"center",alignItems:"center",marginHorizontal:9,borderRadius:4/2,marginTop:7}} />
                         {item.tentative_time ?
                          <Image source={require('../../../assets/Clock.png')} style={{ width: 13, height: 13, marginLeft: -1, top: 1 }}></Image>
                        : null
                        }
                          <Text style={{ fontSize: 12, color: Mycolors.Black, left: 2 }}>{item.tentative_time}</Text>
                        </View>
                       {/* <TouchableOpacity style={{width:25,height:25,borderRadius:5,backgroundColor:'#fff',shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 1,
      shadowOpacity: 0.3,
      justifyContent: 'center',
      elevation: 5,}}>
          <Image source={require('../../../assets/layer_9.png')} style={{width:10,height:15,alignSelf:'center'}}></Image>
          </TouchableOpacity> */}
                      </View>
                    </View>
                  )
                }}
                keyExtractor={item => item.id}
              />
              : 
              <Text style={{ color: Mycolors.RED, fontWeight: 'bold', fontSize: 18, textAlign:'center' }}>No Vendors Found</Text>
              }
          </View>

          <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 30 }}>
            <Text style={{ color: Mycolors.Black, fontWeight: 'bold',fontSize:22, width: '70%', }}>Eat what makes you <Text style={{ color: '#0EA00E', fontWeight: 'bold',fontSize:22, width: '70%', }}> HAPPY!</Text></Text>
            <Text style={{ color: Mycolors.RED, fontWeight: '500', textDecorationLine: "underline",fontSize:14,top:10 }}
              onPress={() => { props.navigation.navigate('CatSearch', { datas: resData.categories, from: '' }) }}>View More</Text>
          </View>

          <View style={{ width: '100%', alignSelf: 'center', marginTop: 10 }}>
            {resData != null ?
              <FlatList
                data={resData.categories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // numColumns={2}
                renderItem={({ item, index }) => {
                  return (
                    

                 
                    <View style={{ width: 140, height: 200, marginHorizontal: 0, marginVertical: 5, }}>
                      <ImageBackground source={require('../../../assets/Food-Cover-image.png')}style={{width:'100%',height:'95%',  borderRadius: 10, }}resizeMode='cover'> 
                      <TouchableOpacity style={{ paddingTop:20
                        // width: 100, height: 120, padding: 10, backgroundColor: '#fff',
                        // shadowOffset: {
                        //   width: 0,
                        //   height: 3
                        // },
                        // shadowRadius: 1,
                        // shadowOpacity: 0.3,
                        // // justifyContent: 'center',
                        // elevation: 5, borderRadius: 10
                      }} onPress={() => { props.navigation.navigate('ShopSearch', { datas: [item], from: 'CatClick' }) }}>
                        <View style={{ width: 60, height: 60, alignSelf: 'center',borderRadius:60/2,shadowOffset: {
                          width: 0,
                          height: 3
                        },
                        shadowRadius: 1,
                        shadowOpacity: 0.5,
                       elevation: 10,
                       }}>
                          <Image source={{ uri: item.category_image }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 50, overflow: 'hidden' }}></Image>
                        </View>
                        <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, textAlign: 'center', marginTop: 9 }} >{item.category_name}</Text>
                        <Text style={{ color: '#0EA00E', fontWeight: '400', fontSize: 12, textAlign: 'center', marginTop: 9, }} >{item.total_vendors==0 ? 'No Places NearBy' : item.total_vendors+' Places NearBy'} </Text>
                      </TouchableOpacity>
                      </ImageBackground>
                    </View>
                    
                  )
                }}
                keyExtractor={item => item.id}
              />
              : null}

          </View>

        </View>
        <View style={{ height: 100 }} />

      </ScrollView>
      <View style={{ width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, alignSelf: 'center',backgroundColor:'#fff', height:80,paddingHorizontal:'3%'}}>
        <View style={{ width: '47%' }}>
          <MyButtons title="Dining & Booked Table" height={45} width={'100%'} borderRadius={10} alignSelf="center" press={() => { props.navigation.navigate('DiningAndBookTable') }} marginHorizontal={20} fontSize={11}
            titlecolor={Mycolors.BG_COLOR} hLinearColor={['#fd001f', '#b10027']} />
        </View>

        <View style={{ width: '47%' }}>
          <MyButtons title="My Orders" height={45} width={'100%'} borderRadius={10} alignSelf="center" press={() => { props.navigation.navigate('ShopMyOrder') }} marginHorizontal={20} fontSize={11}
            titlecolor={Mycolors.BG_COLOR} hLinearColor={['#000000', '#000000']} />

        </View>

      </View>
      {loading ? <Loader /> : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
     
      {My_Alert2 ? <MyAlert sms={alert_sms2} sms2={'Logout'} okPress={()=>{ logoutDriver() }} canclePress={()=>{setMy_Alert2(false)}}/> : null }
      
      {My_Alert3 ? <MyAlert sms={alert_sms3} okPress={rateOrder} canclePress={()=>{setMy_Alert3(false)}}/> : null }

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

});
export default ShopEat 