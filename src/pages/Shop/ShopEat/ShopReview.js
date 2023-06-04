import React, { useEffect,useState ,useRef} from 'react';
import {RefreshControl,View,Image,Text,StyleSheet,SafeAreaView,TextInput,FlatList,Alert,TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider,ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { CardField,CardFieldInput, useStripe,StripeContainer,} from '@stripe/stripe-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl,shop_eat_cart,user_payment_method, shop_eat_cart_place_order,vendor_reviews,shop_eat_business_id,shop_eat_menu_userid, requestPostApi,requestGetApi,shop_eat, driver_reviews } from '../../../WebApi/Service'
import Toast from 'react-native-toast-message';
import Loader from '../../../WebApi/Loader';
import MyAlert from '../../../component/MyAlert';

const ShopReview = (props) => {
  const [checkitem,setcheckitem]=useState('')
  const [reson,setreson]=useState('')
  const dispatch = useDispatch();
  const User = useSelector(state => state.user.user_details)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [itemdata,setitemdata]=useState('')
  const [venderRating,setvenderRating]=useState('0')
  const [subItemData,setsubItemData]=useState([])
  const [dumyValue,setdumyValue]=useState('')
  const [drvRating, setdrvRating] = useState('0')
  const [drv_Review, setdrv_Review] = useState('')
  const [drvReviewData, setdrvReviewData] = useState('')
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [My_Alert2, setMy_Alert2] = useState(false)
  const [alert_sms2, setalert_sms2] = useState('')
  const [showDriverRating, setShowDriverRating] = useState(false)
  useEffect(()=>{
    setitemdata(props.route.params.data)
    setdrvReviewData(props.route.params.data)
    console.log('testing===>>>',props.route.params.data);
    if(props.route.params.data?.order_type_label === 'Delivery' && props.route.params.data?.status == 12 && props.route.params.data?.driver_rating == null){
      setShowDriverRating(true)
    }else{
      setShowDriverRating(false)
    }
    setsubData();
 },[])
 
 const setsubData=()=>{
  var ddd=[]
  var tdd=props.route.params.data
  for(let i=1;i<=tdd.items.length;i++){
   ddd.push({
    "product_id": tdd.items[i-1].product_id,
    "rating": 0,
    "comments": ""
   })
  }
  setsubItemData(ddd)
 }

 const submitRewiew = async () => {
 
     setLoading(true);
     var data={
      "business_id": itemdata.business_id,
      "rating": venderRating,
      "order_id":itemdata.id,
      "comments": reson,
      "items_review": subItemData
  }
   console.log('the form data==>>', data)
     const { responseJson, err } = await requestPostApi(vendor_reviews, data, 'POST', User.token)
     setLoading(false)
     console.log('the res shop_eat_cart_place_order==>>', responseJson)
     if (responseJson.headers.success == 1) {
       setsubData()
       setvenderRating('0')
       setreson('') 
       Toast.show({text1:responseJson.headers.message})
      props.navigation.navigate('ShopMyOrder')
     } else {
     // setalert_sms(err)
     // setMy_Alert(true)
     }
 };

 const submitDriverRewiew = async () => {
  console.log('drvReviewDatadrvReviewDatadrvReviewData', drvReviewData);
  if (drvRating == 0) {
    Toast.show({ text1: 'Please add ratings to submit the review.' })
  } else {
    setLoading(true);
    var data = {
      "object_id": drvReviewData.driver_id,
      "object_type": "driver",
      "star": drvRating,
      "comments": drv_Review,
      'order_id' :drvReviewData.id
    }
    console.log('the form data==>>', data)
    const { responseJson, err } = await requestPostApi(driver_reviews, data, 'POST', User.token)
    setLoading(false)
    console.log('the res shop_eat_cart_place_order==>>', responseJson)
    if (responseJson.headers.success == 1) {
      myorderList()
      Toast.show({ text1: responseJson.headers.message })
    } else {
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }
};

 const checkcon=()=>{
 
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


  return(
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
    <HomeHeader height={60}  paddingHorizontal={15}// backgroundColor={'#fff'}
   press1={()=>{props.navigation.goBack()}} img1={require('../../../assets/arrow.png')} img1width={18} img1height={15} 
   press2={()=>{}} title2={itemdata.business_name} fontWeight={'500'} img2height={20}
   press3={()=>{}} img3width={25} img3height={25} />

<View style={{width:'90%',alignSelf:'center'}}>
<Text style={{fontWeight:'600',fontSize:16,marginTop:5,color:Mycolors.Black,lineHeight:20}}>Rate your experience</Text>
<View style={{marginTop:20}}>
<Image source={{uri:itemdata.banner_image}} style={{width:'100%',height:160,alignSelf:'center',borderRadius:10,overflow:'hidden',resizeMode:'stretch'}} ></Image>
</View>

<Text style={{fontWeight:'500',fontSize:13,marginTop:20,color:Mycolors.Black,lineHeight:20}}>Please provide rating for the restaurant here.</Text>
<View style={{marginTop:20,paddingHorizontal:5,backgroundColor:'#fff',alignItems:'flex-start'}}>

       <Rating
                 type='custom'
                 ratingCount={5}
                 imageSize={35}
                 startingValue={0}
               // style={{alignSelf:'flex-start',backgroundColor:'red'}}
                onSwipeRating={(d)=>{setvenderRating(d)}}
                onFinishRating={(d)=>{setvenderRating(d)}}
                //readonly={true}
              />
</View>
{venderRating>0 ? 
<View>
<Text style={{fontWeight:'500',fontSize:13,marginTop:20,color:Mycolors.Black,lineHeight:20}}>Write a review for restaurant</Text>
<View style={{width:'100%',height:50,borderRadius:2,marginTop:10,alignSelf:'center'}}>
    <TextInput
       value={reson}
       onChangeText={(e) => setreson(e)}
       placeholder={'Type here.....'}
       placeholderTextColor="#bbbbbb"
       multiline={true}
       autoCapitalize = 'none'
       style={[styles.input,{ height:50,}]}
     />

 </View>  
</View>
: null }

{venderRating>0 ? 
 <View style={{width:'100%',alignSelf:'center',marginTop:20}}>
 <Text style={{fontWeight:'500',fontSize:13,marginTop:5,color:Mycolors.Black,lineHeight:20}}>Please provide rating and review for the item(s) :-</Text>
        
{itemdata.items.map((sitem,index)=>{
return(
  <View style={{marginVertical:10}}>
  <Text style={{color:Mycolors.Black,fontWeight:'500',fontSize:12,}} >{sitem.product_name}</Text>
  <View style={{marginVertical:10,paddingHorizontal:5,backgroundColor:'#fff',alignItems:'flex-start'}}>
<Rating
          type='custom'
          ratingCount={5}
          imageSize={20}
          startingValue={0}
        // style={{alignSelf:'flex-start',backgroundColor:'red'}}
         onSwipeRating={(d)=>{subItemData[index].rating=d}}
         onFinishRating={(d)=>{subItemData[index].rating=d}}
         //readonly={true}
       />
</View>

<View>
<View style={{width:'100%',height:50,borderRadius:2,marginTop:10,alignSelf:'center'}}>
    <TextInput
       value={ subItemData[index].comments}
       onChangeText={(e) => {
        subItemData[index].comments=e
        setdumyValue(e)
      }}
       placeholder={'Write a review for '+sitem.product_name}
       placeholderTextColor="#bbbbbb"
       multiline={true}
     // maxLength={500}
     // keyboardType="number-pad"
       autoCapitalize = 'none'
       style={[styles.input,{ height:50,}]}
     />

 </View>  
</View>
  </View>
    )
    })}
   </View>
: null }





    {showDriverRating ?
      <View>
          <View style={{ width: '100%', height: 50, backgroundColor: Mycolors.TimingColor, borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'center', marginTop:20 }}>
            <Text style={{ fontWeight: '600', fontSize: 14, marginTop: 5, color: Mycolors.Black, textAlign: 'center' }}>Submit {drvReviewData?.driver_name ? drvReviewData?.driver_name : 'Driver'} Review</Text>
          </View>
            {/* <Text style={{fontWeight:'500',fontSize:13,marginTop:20,color:Mycolors.Black,lineHeight:20}}>Please provide rating for the restaurant here.</Text> */}
            <View style={{ marginTop: 20, paddingHorizontal: 5, backgroundColor: '#fff', alignItems: 'flex-start', alignSelf: 'center' }}>

              <Rating
                type='custom'
                ratingCount={5}
                imageSize={25}
                startingValue={0}
                // style={{alignSelf:'flex-start',backgroundColor:'red'}}
                onSwipeRating={(d) => { setdrvRating(d) }}
                onFinishRating={(d) => { setdrvRating(d) }}
              //readonly={true}
              />
            </View>

            <View style={{ width: '100%', alignSelf: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: 13, marginTop: 20, color: Mycolors.Black, lineHeight: 20 }}>Write a review for driver</Text>
              <View style={{ width: '100%', height: 50, borderRadius: 2, marginTop: 10, alignSelf: 'center' }}>
                <TextInput
                  value={drv_Review}
                  onChangeText={(e) => setdrv_Review(e)}
                  placeholder={'Type here.....'}
                  placeholderTextColor="#bbbbbb"
                  multiline={true}
                  autoCapitalize='none'
                  style={[{
                    paddingLeft: 15,
                    width: '100%',
                    fontSize: 13,
                    borderColor: 'rgba(0,0,0,0.2)',
                    borderWidth: 0.5,
                    // backgroundColor: '#34333a',
                    color: '#fff',
                    height: 60,
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    color: Mycolors.Black,
                  }]}
                />

              </View>
            </View>

            {/* <View style={{ width: '100%', marginTop: 20 }}>
              <MyButtons title="Submit" height={45} width={'70%'} borderRadius={5} alignSelf="center" press={() => {
                submitDriverRewiew()
              }} marginHorizontal={20} fontSize={14}
                titlecolor={Mycolors.BG_COLOR} hLinearColor={['#b10027', '#fd001f']} />
            </View> */}
            <View style={{ width: 10, height: 50 }}></View>
        </View>
         :null}






 <View style={{width:'100%',marginTop:20}}>
 <MyButtons title="Submit" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={()=>{
  if(!(venderRating>0)){
    Toast.show({ text1: 'Please add restaurant ratings to submit the review.' })
    return
  }
  if(showDriverRating){
    if(!(drvRating>0)){
      setalert_sms2(`Are you sure you don't want to rate driver`)
      setMy_Alert2(true)
    }else{
      submitRewiew()
      submitDriverRewiew()
    }
  }else{
    submitRewiew()
  }
  // if(venderRating>0){
  //    submitRewiew()

  //    if(drvRating>0){
  //       submitDriverRewiew()
  //    }
  // }else{
  //   Toast.show({ text1: 'Please add ratings to submit the review.' })
  // }
}} marginHorizontal={20} fontSize={14}
   titlecolor={Mycolors.BG_COLOR}  hLinearColor={venderRating>0 ? ['#b10027','#fd001f'] : ['gray','gray']}/>
 </View>



</View>
<View style={{height:100}} />
</ScrollView>

{loading ? <Loader />  : null }
{My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
{My_Alert2 ? <MyAlert sms={alert_sms2} okPress={()=>{ submitRewiew() }} canclePress={()=>{setMy_Alert2(false)}}/> : null }
    </SafeAreaView>
     );
  }
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
export default ShopReview