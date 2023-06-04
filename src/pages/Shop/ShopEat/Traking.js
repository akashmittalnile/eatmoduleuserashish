import React, { useEffect, useState } from 'react';
import {View,Image,Text,StyleSheet,SafeAreaView,TextInput,FlatList,BackHandler, TouchableOpacity,Platform, Alert, PermissionsAndroid, ScrollView, Linking} from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker,Polyline,AnimatedRegion, Animated } from 'react-native-maps';
import {Mycolors,dimensions} from '../../../utility/Mycolors';
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import MapViewDirections from 'react-native-maps-directions';
import {GoogleApiKey} from '../../../WebApi/GoogleApiKey'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {  useSelector, useDispatch } from 'react-redux';
// import {setCurentAdderss,setStartAddress,setStartPosition,setCurentPosition,setDestnationAddress,setDestnationPosition} from '../../redux/actions/latLongAction';
import MyButtons from '../../../component/MyButtons';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
import firestore from '@react-native-firebase/firestore'
// import storage from '@react-native-firebase/storage'
// import MyMapView from '../../component/MyMapView'
import messaging from '@react-native-firebase/messaging';
import {baseUrl,common_vehicle_type,booking_ride_payment,booking_ride_request,requestPostApi,requestGetApi} from '../../../WebApi/Service'
import Loader from '../../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyAlert from '../../../component/MyAlert'
// User Home 5

 Geolocation.setRNConfiguration(GoogleApiKey); 
 Geocoder.init(GoogleApiKey);
const Traking = (props) => {
    const dispatch =  useDispatch();
    const userdetaile  = useSelector(state => state.user.user_details)
    const [loading,setLoading]=useState(false)
    const [modlevisual1, setmodlevisual1] = useState(false);
    const mapdata  = useSelector(state => state.maplocation)
    const mapStyle = [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}],
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}],
        },
      ];
      const [modlevisual, setmodlevisual] = useState(false);
      const [mtype,setmType]=useState('standard')
      const [rideSterted,setrideSterted]=useState(false)
      const [estimatedTime,setestimatedTime]=useState('')
      const [estimatedDestTime,setestimatedDestTime]=useState('')
      const [curentCord,setCurentCord]=useState({
        latitude: 26.4788922, 
        longitude: 83.7454171,
      })
      const [angle,setangle]=useState(45)
      const [watch,setWatch]=useState('1')
      const [payments,setpayments]=useState(false)
      const [close,setClose]=useState(false)
      const [driverCord,setDriverCord]=useState({
        latitude: 26.4788922, 
        longitude: 83.7454171,
      })
      const [driverAngle,setDriverAngle]=useState(45)
      const [myreson,setmyReson]=useState({
        latitude: 26.4788922, 
        longitude: 83.7454171,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }) 
      const [newsms,setNewsms]=useState(0)
      const [My_Alert, setMy_Alert] = useState(false)
      const [alert_sms, setalert_sms] = useState('')

      // useEffect(() => {
      //   const subscriber = firestore()
      //     .collection('DriverLocation') 
      //     .doc('5')
      //     .onSnapshot(documentSnapshot => {
      //       console.log('User data: ', documentSnapshot.data());
      //     });
    
      //   // Stop listening for updates when no longer required
      //   return () => subscriber();
      // }, ['5']);


      useEffect(()=>{
        console.log('dssssssss',props.route.params.data.driver_id);
         frist() 
         getAllRealtimeLocation()
      //   const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {console.log('hiii')})
      //  if(mapdata.notificationdata.payment_status =='pending' && mapdata.notificationdata.ride_status=='completed'){
      //   setmodlevisual(false)
      //   setmodlevisual1(true)
      //  } 
      //  if(mapdata.notificationdata.ride_status =='started'){
      //   setClose(true)
      //   setrideSterted(true)
      //  } 
      //   return () => backHandler.remove()
    },[])
 
    // messaging().onMessage(async remoteMessage => {
    //   const data = remoteMessage.data
    //   if(remoteMessage.notification.body=='Ride Completed'){
    //     setmodlevisual(false)
    //     setmodlevisual1(true)
    //   }else if(remoteMessage.notification.body=='Ride Started'){
    //     setrideSterted(true)
    //   }else if(remoteMessage.notification.body=='Ride Cancelled By Driver'){
    //     AsyncStorage.removeItem('userRide'); 
    //     props.navigation.navigate('Home')
    //   }
    // });

    const payAmount =async()=>{
      let formdata = new FormData();
      formdata.append("ride_id",mapdata.notificationdata.ride_id);
      formdata.append("current_screen",'BookRidePaymentH5');
      setLoading(true)
      const{responseJson,err}  = await requestPostApi(booking_ride_payment,formdata,'POST',userdetaile.token) 
      setLoading(false)
      console.log('The res is==>>',responseJson)
      if(err==null){
      if(responseJson.status){
        if(responseJson.data.card==false){
        props.navigation.navigate('AddBusinessCard',{from:'Home5',item:''})
        }else{
        AsyncStorage.removeItem('userRide'); 
        setpayments(true)
        setmodlevisual1(false)
        Alert.alert(responseJson.message)
        // Toast.show(responseJson.message)
        }
        // props.navigation.navigate('ReviewRating',{from:'Home5'})
      }else{
        if(responseJson.data){
          if(responseJson.data.card==false){
            props.navigation.navigate('AddBusinessCard',{from:'Home5',item:''})
            }
          }
          Alert.alert(responseJson.message)
        // setalert_sms(responseJson.message)
        // setMy_Alert(true)
        // Toast.show(responseJson.message)
      }
    }else{  
      console.log('The error is==>>',err)
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

    const getAllRealtimeLocation=()=>{
      // const docid  =mapdata.notificationdata.driver_id   props.route.params.data.driver_id
       const docid  = props.route.params.data.driver_id.toString()
    
      const messageRef = firestore().collection('DriverLocation')
      .doc(docid)
      // .collection('messages')
      // .orderBy('createdAt',"desc")
                   messageRef.onSnapshot((querySnap)=>{
          //  const allmsg =   querySnap._data.Angle
          // .map(docSanp=>{
          //  const data = docSanp.data() 
          // //  return {
          // //           ...docSanp.data()
          // //       }
          // console.log('The location is==>',data)
          // })
            console.log('The allmsg is==>',querySnap._data)
  let My_drv_cord = { latitude: querySnap._data.Location.latitude, longitude: querySnap._data.Location.longitude }

          setDriverAngle(querySnap._data.Angle)
          
          setDriverCord(My_drv_cord)
      })
    }
    

    const myposition = () => {
        Geolocation.getCurrentPosition(
          position => {
            let My_cord = { latitude: position.coords.latitude, longitude: position.coords.longitude }
            setCurentCord(My_cord)
            setangle(position.coords.heading)
            setmyReson({
              latitude: position.coords.latitude, 
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            })
           // setDriverLocation('driver1',My_cord,position.coords.heading)
           // console.log('The curent popsition is',position);
          },
          error => {
            // Alert.alert(error.message.toString());
          },
          {
            showLocationDialog: true,
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
          }
        );
      }


    const frist=()=>{
      
       if(watch=='1'){
         myposition()
          second()  
       }
       
    }
    const second=()=>{
          setTimeout(()=>{
            frist()
          },20000)  
        }

  

     const dialCall = () => {
 console.log('theddggc===>>',mapdata.notificationdata.driver_phone_no)
      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = 'tel:${'+mapdata.notificationdata.driver_phone_no+'}';
      }
      else {
        phoneNumber = 'telprompt:${'+mapdata.notificationdata.driver_phone_no+'}';
      }
      Linking.openURL(phoneNumber);
    };

    const c_pos_click=()=>{
      // setmyReson({
      //   latitude: mapdata.curentPosition.latitude, 
      //   longitude: mapdata.curentPosition.longitude,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // })
     }
  

    return(
    <SafeAreaView style={styles.container}>
        
  <View style={styles.mymapcontainer}>
  <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={myreson}
          customMapStyle={mapStyle}
          showsUserLocation={true}
          userLocationCalloutEnabled={true}
          showsMyLocationButton={true}
          mapPadding={{ top: 0, right: 0, bottom: modlevisual? 150 : 0 , left: 0 }}
          showsScale={true}
          showsCompass={true}
          rotateEnabled={true}
       // onRegionChange={data=>console.log('the resion change',data)}
       // onPress={(data)=>onMapPress(data)}
          mapType={mtype}
          zoomEnabled={true}
          pitchEnabled={true}
          followsUserLocation={true} 
          // showsCompass={true}
          showsBuildings={true}
          //showsTraffic={true}
          showsIndoors={true}
          showsIndoorLevelPicker={true}
          >
         
          <Marker
                coordinate={curentCord}
                title={'Start Address'}
                // description={mapdata.startAddress}
                image={require('../../../assets/shape_33.png')}
                
            />
          <Marker
            coordinate={driverCord}
            title={'Destination Address'}
            image={require('../../../assets/shape_33.png')}
            // description={mapdata.destnationAddress}
          />
     
         <MapViewDirections
          origin={curentCord}     // driver position with new update
          destination={driverCord} // destination position
          apikey={GoogleApiKey}
          strokeWidth={4}
          strokeColor={Mycolors.ORANGE}
          optimizeWaypoints={true}
          onStart={(params) => {
          }}
          onReady={result => {
          }}
          precision="high"
          onError={(errorMessage) => {
           console.log('GOT AN ERROR');
          }}
        />  
   
        </MapView>
   </View>

   
<SafeAreaView>
<View style={{position:'absolute',top:10,backgroundColor:Mycolors.BG_COLOR,borderRadius:12,width:40,height:40,justifyContent:'center',paddingHorizontal:5,left:10}}>
   <TouchableOpacity style={{}} onPress={()=>{props.navigation.goBack()}}>
    <Image source={Mycolors.BG_COLOR=='#fff'? require('../../../assets/ArrowLeft.png'):require('../../../assets/shape_33.png')} style={{ width: 25, height: 15,alignSelf:'center'}}></Image>
    </TouchableOpacity>
    </View>
   </SafeAreaView> 
    {/* <SafeAreaView>
     <View style={{position:'absolute',top:10,left:15,backgroundColor:Mycolors.BG_COLOR,borderRadius:12,width: 40, height: 40,justifyContent:'center'}}>
   <TouchableOpacity onPress={()=>{}}>
    <Image source={Mycolors.BG_COLOR=='#fff'? require('../../../assets/shape_33.png'):require('../../../assets/shape_33.png')} style={{ width: 20, height: 16,alignSelf:'center'}}></Image>
    </TouchableOpacity>
    </View> 
   </SafeAreaView> */}
  



{modlevisual ?
        <View style={{ height: 150, backgroundColor: Mycolors.BG_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, position: 'absolute', bottom: 0, width: '100%' }}>

          <View style={{ width: 100, height: 30, position: 'absolute', top: 0, zIndex: 999, alignSelf: 'center', borderRadius: 5 }}>
            <TouchableOpacity onPress={() => { setmodlevisual(false) }} style={{ width: 50, height:4,backgroundColor:Mycolors.GrayColor,borderRadius:17,marginTop:10 ,alignSelf:'center'}}>
              {/* <Image source={Mycolors.BG_COLOR == '#fff' ? require('../../assets/download.png') : require('../../assets/down-arrowW.png')} style={{ width: 18, height: 18, alignSelf: 'center' }}></Image> */}
            </TouchableOpacity>
          </View>

          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 0 }}>
            <View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
                    {/* <Image
                        source={{ uri: userdetaile.profile_image }}
                        style={{
                            height: 64,
                            width: 64,
                            borderRadius: 35,
                            borderWidth:0.1,
                            borderColor:Mycolors.BG_COLOR
                        }}
                    /> */}
              <View style={{marginLeft:15}}>
              <Text style={{color:Mycolors.TEXT_COLOR,fontWeight:'bold',fontSize:16}}>{userdetaile.first_name} {userdetaile.last_name}</Text>
              <Text style={{color:Mycolors.TEXT_COLOR,fontSize:12,marginTop:5}}>Status:- Done</Text>
              </View> 

              <View style={{width:'auto',height:60,backgroundColor:Mycolors.BG_COLOR,alignSelf:'flex-end',position:'absolute',right:0,top:0}}>
              <View style={{flexDirection:'row',alignItems:'flex-end',position:'absolute',right:15,}}>
          
            <TouchableOpacity style={{width: 38, height: 38,marginLeft:53,backgroundColor:'transparent',justifyContent:'center',borderRadius:5,borderColor:Mycolors.ORANGE,borderWidth:1}}
            onPress={()=>{props.navigation.navigate('Chat',{from:'home3'})}}
            >
            <Image source={require('../../../assets/shapmessage.png')} style={{width: 25, height: 25,alignSelf:'center' }}></Image>
            </TouchableOpacity>
          <TouchableOpacity style={{width: 38, height: 38,marginLeft:3,backgroundColor:'transparent',justifyContent:'center',borderRadius:5,borderColor:Mycolors.TEXT_COLOR,borderWidth:1}}
          onPress={()=>{dialCall()}}
          >
            {mapdata.messagecount > 0 ?
              <View style={{position:'absolute',width:18,height:18,backgroundColor:'red',borderRadius:9,justifyContent:'center',top:0,left:-22}}>
            <Text style={{fontSize:8,textAlign:'center',color:'white'}}>{mapdata.messagecount}</Text>
              </View>
              :
              null
            }
          <Image source={require('../../../assets/shapeCall.png')} style={{width: 25, height: 25,alignSelf:'center' }}></Image>
          </TouchableOpacity>
         
            </View>
              </View>
            </View>

          </KeyboardAwareScrollView>

        </View>
        : null
      }

{My_Alert ?
<MyAlert sms={alert_sms} okPress={()=>{setMy_Alert(false)}} />
: null
}

{loading ?
<Loader />
: null
}
    </SafeAreaView>
     );
  }
const styles = StyleSheet.create({

  container: {
    flex: 1,  
    backgroundColor:Mycolors.BG_COLOR
  },
  mymapcontainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  input: {
    height: 45,
    width: '100%',
    fontSize: 13,
    borderColor: null,
    borderRadius: 10,
    color: Mycolors.TEXT_COLOR,
    paddingLeft: 50,
    paddingRight:10,
  },
  inputBoxStyle:{
    width: '100%',
    height: 47,
     borderRadius: 28, 
     marginTop: 10 ,
     backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
        width: 0,
        height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent:'center',
        elevation: 5
  },
  textcolor:{
   color: Mycolors.TEXT_COLOR
  },
  modalview:{
    width:dimensions.SCREEN_WIDTH,
    backgroundColor:Mycolors.BG_COLOR,
    position:'absolute',
    bottom:0,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    height:dimensions.SCREEN_HEIGHT*42/100,
    padding:20,
  },
  
});
export default Traking