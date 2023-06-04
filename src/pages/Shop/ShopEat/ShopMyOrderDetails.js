import React, { useEffect, useState, useRef } from 'react';
import { RefreshControl, View, Image, Text, Platform, Linking, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import { baseUrl, shop_eat_cart,shop_eat_order_id, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../WebApi/Loader';

const ShopMyOrderDetails = (props) => {
  // console.log('ShopMyOrderDetails data', data);
  const [data, setdata] = useState('')
  const [modlevisual1, setmodlevisual1] = useState(false)
  const [checkitem, setcheckitem] = useState('')
  const [reson, setreson] = useState('')
  const [date, setDate] = useState('')
  const [itemTotal, setItemTotal] = useState(0)
  const User = useSelector(state => state.user.user_details)
  const mapdata = useSelector(state => state.maplocation) 

  const [loading, setLoading] = useState(false)
  const [orderData, setorderData] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
//setdata(props.route.params.data)
   // let localItemTotal = 0
    var ddd=props.route.params.data
    // ddd.items.map(el=>{
    //   localItemTotal += el.quantity * el.amount  
    // })
    // setItemTotal(localItemTotal)
    ordersDetatls(ddd.id)
  }, [])

  const checkcon = () => {
    orderList()
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


const ordersDetatls=async (id)=>{
  setLoading(true)
  const { responseJson, err } = await requestGetApi(shop_eat_order_id + id, '', 'GET', User.token)
  setLoading(false)
  console.log('the res==>>', responseJson)
  if (responseJson.headers.success == 1) {
   console.log('=============>>>>>',responseJson);
   setdata(responseJson.body)
  } else {
    // setalert_sms(err)
    // setMy_Alert(true)
  }
}


  const dialCall = (number) => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + number + '}';
    }
    else {
      phoneNumber = 'telprompt:${' + number + '}';
    }
    Linking.openURL(phoneNumber);
  };

  const orderList = async () => {

    setLoading(true)

    const { responseJson, err } = await requestGetApi(shop_eat_orders, '', 'GET', User.token)
    setLoading(false)
    console.log('the res shop_eat_orders ==>>', responseJson.body[0].items)
    if (responseJson.headers.success == 1) {
      setorderData(responseJson.body)
    } else {
      //  setalert_sms(err)
      //  setMy_Alert(true)
    }
  }

  const cancleDesign = (title, press, check) => {
    return (
      <TouchableOpacity style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', borderRadius: 7, borderColor: check ? Mycolors.RED : Mycolors.GrayColor, borderWidth: 0.5, paddingHorizontal: 10, marginTop: 10 }}
        onPress={press}>
        <View style={{ width: 25, height: 25, borderColor: check ? Mycolors.RED : Mycolors.GrayColor, borderWidth: 0.3, justifyContent: 'center', borderRadius: 20, }}>
          {check ?
            <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: Mycolors.RED, alignSelf: 'center' }} />
            : null
          }
        </View>
        <View>
          <Text style={{ color: Mycolors.Black, fontSize: 13, marginLeft: 10, fontWeight: '300' }}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

      <HomeHeader height={60} paddingHorizontal={15}// backgroundColor={'#fff'}
        press1={() => { props.navigation.goBack() }} img1={require('../../../assets/arrow.png')} img1width={18} img1height={15}
        press2={() => { }} title2={'Order Details'} fontWeight={'500'} img2height={20}
        press3={() => { }} img3width={25} img3height={25} />


      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        <View style={{ width: '90%', alignSelf: 'center' }}>

          <View style={{
            width: '95%', marginHorizontal: 10,
            marginVertical: 10, backgroundColor: '#e6edc0', padding: 15, borderColor: '#F2F5DE', borderWidth: 1,borderTopLeftRadius:10,borderTopRightRadius:10
           
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'column' }}>
<View style={{flexDirection:'row'}}>
 <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 14 }}>Order #{data.id}</Text>
 {/* <Text style={{ color: '#C1C1C1', fontWeight: '400', fontSize: 12,marginLeft:5 }}>Order Date & Time : {data.created_date}</Text> */}
</View>
   <View style={{flexDirection:'row'}}>
   <Text style={{ color: '#000', fontWeight: '600', fontSize: 12 }}>Status :</Text>
   <Text style={{ color: data.status_label=='Pending' ? 'red' :data.status_label=='Delivered' ? 'green' : '#000', fontWeight: '600', fontSize: 12 }}> {data.status_label}</Text>
   </View>
       
         <Text style={{ color: '#C1C1C1', fontWeight: '400', fontSize: 12 }}>Order Date & Time : {data.created_date}</Text>

              </View>
              <View style={{ flexDirection: 'row', left: -10,top:-10 }}>
                <Image source={require('../../../assets/circle-dot.png')} style={{ width: 22, height: 22, alignSelf: 'center', borderRadius: 5, resizeMode: 'stretch', top: 1 }} ></Image>
                <Text style={{ color: '#ADC430', fontSize: 14, textAlign: 'center', lineHeight: 22, marginLeft: 6,fontWeight:'800' }}>Help</Text>
              </View>
            </View>
          </View>
{data.order_type!= "take-away"  ?
          <View style={{
            top: -20,
            marginVertical: 10, backgroundColor: '#FAF9FB', padding: 15, borderRadius: 10,
            borderColor: '#D8E9FA', borderWidth: 1,
          }}>
            <View style={{ flexDirection: 'row', width: '100%', borderRadius: 10, alignSelf: 'center', paddingHorizontal: 10 }}>
              <View style={{ width: 40, height: 40, justifyContent: 'center', borderRadius: 10 }}>
                <Image source={require('../../../assets/ent_location_image.png')} style={{ width: 18, height: 23, overflow: 'hidden', alignSelf: 'center' }}></Image>
              </View>
              <View style={{ marginLeft: 10, width: '80%' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ADC430' }}>{data.business_name}</Text>
                <Text style={{ fontSize: 12, color: Mycolors.GrayColor, top: 3, lineHeight: 18 }}>{data.business_address}</Text>
              </View>

            </View>
            <View style={{ marginLeft: 19, top:-6 }}>
              <View style={{ backgroundColor: '#9B9B9B', height: 4, width: 4, justifyContent: "center", alignItems: "center", marginHorizontal: 9, borderRadius: 4 / 2, marginTop: 7 }} />
              <View style={{ backgroundColor: '#9B9B9B', height: 4, width: 4, justifyContent: "center", alignItems: "center", marginHorizontal: 9, borderRadius: 4 / 2, marginTop: 7 }} />
              <View style={{ backgroundColor: '#9B9B9B', height: 4, width: 4, justifyContent: "center", alignItems: "center", marginHorizontal: 9, borderRadius: 4 / 2, marginTop: 7 }} />
            </View>


            <View style={{ flexDirection: 'row', width: '100%', marginTop: 2, borderRadius: 10, alignSelf: 'center', paddingHorizontal: 10,top:-8 }}>
              <View style={{ width: 40, height: 40, justifyContent: 'center', borderRadius: 10 }}>
                <Image source={require('../../../assets/shape_41.png')} style={{ width: 22, height: 22, overflow: 'hidden', alignSelf: 'center' }}></Image>
              </View>
              <View style={{ marginLeft: 10, width: '80%' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#9B9B9B' }}>Destination Address</Text>
                <Text style={{ fontSize: 12, color: Mycolors.GrayColor, top: 3, lineHeight: 18 }}>{data.destination_address} {data.destination_city} {data.destination_state}</Text>
              </View>
            </View>
           
            {data.delivered_date!=null && data.status!= 11 && data.status!=13 && data.status!=15 && data.order_type!= "take-away"?
  <View>
    <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: '#ADC430', height: 40, alignItems: "center", borderRadius: 7, padding: 6, paddingLeft: 15, marginBottom: 10 }}>
              <Image source={require('../../../assets/Check-white.png')} style={{ width: 20, height: 20, overflow: 'hidden', alignSelf: 'center', marginRight: 8 }}></Image>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }} >Order Delivered on </Text>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '600', textAlign: 'center' }} >{data.delivered_date}</Text>
            </View>
            {/* <View style={{ backgroundColor: '#5867D8', width: 65, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, position: 'absolute', right: 16, bottom: -7,height:17}}>
              <Text style={{ color: 'white', fontSize: 11, fontWeight: '600', textAlign: 'center' }} >On Time</Text>
            </View> */}
  </View>
            : 
            data.status!= 0 && data.driver_name && data.status!= 11 ?
            <View>
             {/* <View style={{width:'100%',height:0.5,backgroundColor:'gray',marginVertical:5}}></View>
            <View style={{ flexDirection: 'row', width: '100%', marginTop: 10, borderRadius: 10, alignSelf: 'center', paddingHorizontal: 10,top:-8 }}>
              <View style={{ width: 40, height: 40, justifyContent: 'center', borderRadius: 10 }}>
                <Image source={require('../../../assets/noRide.png')} style={{ width: 30, height: 30, overflow: 'hidden', alignSelf: 'center' }}></Image>
              </View>
              <View style={{ marginLeft: 10, width: '80%' }}>
                <Text style={{ fontSize: 12, color: '#000', top: 3, lineHeight: 18 }}>{data.driver_name ? data.driver_name +' has been assigned to your order' : ''} </Text>
              </View>
            </View> */}

            </View>
            : 
            data.driver_name && data.status== 11 ?
            <View style={{ marginLeft: 10, width: '80%' }}>
                <Text style={{ fontSize: 12, color: '#000', top: 3, lineHeight: 18 }}>Cancelled Reason : {data.driver_notes ? data.driver_notes :'No reason'}</Text>
              </View>
              : null
             }

          </View>
  : null}        
 {data.status!=0 && data.status!=3 && data.order_type!= "take-away" && data.status!=12  && data.status!=2 ? 
          <View style={{
            top: -10,
            marginBottom: 10, backgroundColor: '#FAF9FB', padding: 15, borderRadius: 10,
             
            borderColor: '#D8E9FA', borderWidth: 1,
          }}>
          
            <View style={{ flexDirection: 'row', width: '100%', borderRadius: 10, alignSelf: 'center', paddingHorizontal: 5, paddingRight: 20,marginBottom:15, }}>
              <View style={{ flexDirection: 'row'}}>
                <View style={{ width: 35, height: 50, justifyContent: 'center', borderRadius: 10 }}>
                <Image source={require('../../../assets/noRide.png')} style={{ width: 40, height: 38, overflow: 'hidden', alignSelf: 'center' }}></Image>
              </View>
              <View style={{ marginLeft: 15, width: '75%' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black',marginTop:5 }}>{data.driver_name}</Text>
                <Text style={{ fontSize: 12, color: Mycolors.GrayColor, top: 3, lineHeight: 18 }}>has been assigned to your order</Text>
                {/* <Text style={{ fontSize: 12, color: Mycolors.GrayColor, top: 3, lineHeight: 18 }}></Text> */}
              </View>
              </View>
              
             
              <View style={{ flexDirection: 'row', top:0,right:24 }}>
                <TouchableOpacity style={{marginRight:5,width:32,height:32,borderRadius:20,borderWidth:0.5,borderColor:'gray',justifyContent:'center',backgroundColor:'#fff'}}
                onPress={()=>{ props.navigation.navigate('Chat',{data:data})}}>
                <Image source={require('../../../assets/ChatCircle-news.png')} style={{ width: 25, height: 25, alignSelf: 'center', borderRadius: 5, resizeMode: 'stretch', }} ></Image>
            {mapdata.messagecount>0 ? 
               <View style={{width:20,height:20,borderRadius:15,position:'absolute',backgroundColor:'red',justifyContent:'center',top:-7,right:-7}}>
                <Text style={{textAlign:'center',color:'#fff',fontSize:10}}>{mapdata.messagecount}</Text>
               </View>
            : null}
                </TouchableOpacity>
                <TouchableOpacity style={{width:32,height:32,borderRadius:20,borderWidth:0.5,borderColor:'gray',justifyContent:'center',backgroundColor:'#fff',marginLeft:5}}
                onPress={()=>{ props.navigation.navigate('Traking', { data: data })}}>
                <Image source={require('../../../assets/layer_9.png')} style={{ width: 17, height: 22, alignSelf: 'center', borderRadius: 5, resizeMode: 'stretch', top: 1 }} ></Image>
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
  : null}

         
          <View style={{
            top: 0,
            backgroundColor: '#FAF9FB', padding: 12, borderRadius: 10,

            borderColor: '#D8E9FA', borderWidth: 1,
          }}>
            {data.items?.map(el=>
            <View style={{ flexDirection: 'row', width: '100%', borderRadius: 10, alignSelf: 'center', paddingHorizontal: 5, paddingRight: 20,marginBottom:15 }}>
              
              <View style={{ width: 22, height: 30, justifyContent: 'center', borderRadius: 10 }}>
                <Image source={require('../../../assets/restaurant.png')} style={{ width: 22, height: 22, overflow: 'hidden', alignSelf: 'center' }}></Image>
              </View>
              <View style={{ marginLeft: 10, width: '80%' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{el.product_name} x {el.quantity}</Text>
                <Text style={{ fontSize: 14, color:'#ADC430', top: 2, lineHeight: 22,fontWeight:'600' }}>${Number(el.amount).toFixed(2)}</Text>
              </View>
              {/* <Text style={{ color: '#ADC430', fontSize: 14, textAlign: 'center', lineHeight: 22, }}>${parseFloat(Number(el.amount).toFixed(2))}</Text> */}
            </View>
            )}
            {/* <View style={{ borderColor: '#E8E7E9', borderWidth: 1, borderStyle: 'solid', }} />

            <View style={{ flexDirection: 'row', width: '100%', borderRadius: 10, alignSelf: 'center', paddingHorizontal: 5, marginTop: 13, paddingRight: 20, marginBottom: 10 }}>
              <View style={{ width: 20, height: 25, justifyContent: 'center', borderRadius: 10 }}>
                <Image source={require('../../../assets/Green-chekbox-icon.png')} style={{ width: 18, height: 18, overflow: 'hidden', alignSelf: 'center' }}></Image>
              </View>
              <View style={{ marginLeft: 10, width: '80%' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Veggie paradise x 1</Text>

              </View>
              <Text style={{ color: '#ADC430', fontSize: 14, textAlign: 'center', lineHeight: 22, }}>$78.00</Text>
            </View> */}

            <View style={{
              width: '100%', marginHorizontal: 5, marginVertical: 5, padding: 10, backgroundColor: '#ADC430',
                borderRadius: 7, alignSelf: 'center'
            }}
            >


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                <Text style={{ color: "white", fontSize: 13,  }} >Item Total</Text>
                <Text style={{ color: 'white', fontSize: 14,  fontWeight: 'bold' }} >${Number(data.amount).toFixed(2)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 5 }}>
                <Text style={{ color: 'white', fontSize: 13, }} >Restaurant Handling Charges</Text>
                <Text style={{ color: 'white', fontSize: 14,  fontWeight: 'bold' }} >${Number(data.vendor_charges).toFixed(2)}</Text>
              </View>
              {data.coupon_code !=null ?
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 5 }}>
                <Text style={{ color: 'white', fontSize: 13, }} >Discount applied <Text style={{ color: 'white', fontSize: 13,fontWeight: 'bold' }} >({data.coupon_code})</Text></Text>
                <Text style={{ color: 'white', fontSize: 14,  fontWeight: 'bold' }} >-${data.discount_amount}</Text>
              </View>
              : null }
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 5 }}>
                <Text style={{ color: 'white', fontSize: 13, }} >Taxes</Text>
                <Text style={{ color: 'white', fontSize: 14,  fontWeight: 'bold' }} >${Number(data.taxes).toFixed(2)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                <Text style={{ color: "white", fontSize: 13,  }} >Delivery Charges</Text>
                <Text style={{ color: 'white', fontSize: 14,  fontWeight: 'bold' }} >${Number(data.delivery_charges).toFixed(2)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#ffff', height: 46, alignItems: "center", borderRadius: 7, padding: 10 }}>
               <View style={{flexDirection:'row'}}>
                <Text style={{ color: Mycolors.Black, fontSize: 13,   }} >Paid Via </Text>
                <Text style={{ color: Mycolors.Black, fontSize: 13,   }} >{data.payment_type}</Text>
               </View>
                <View style={{flexDirection:"column"}}>
                <Text style={{ color: Mycolors.GrayColor, fontSize: 12, fontWeight: '600', textAlign: 'left' }} >Bill Total</Text>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 17, fontWeight: 'bold', textAlign: 'center' }} >${Number(data.paid_amount).toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>

         

        </View>
        <View style={{ height: 100 }} />
      </ScrollView>


      {/* ##############&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Model1 Cancle Clicked &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   */}
      {/* <Modal
        isVisible={modlevisual1}
        swipeDirection="down"
        onSwipeComplete={(e) => {
          setmodlevisual1(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >

        <View style={{ height: '70%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, }}>
          <View style={{ width: '100%', height: 50, backgroundColor: Mycolors.TimingColor, borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '600', fontSize: 14, marginTop: 5, color: Mycolors.Black, textAlign: 'center' }}>Cancel Booking</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, marginTop: 10 }} >Select Specific reason for cancel order</Text>
            <View style={{ width: '100%', alignSelf: 'center', marginTop: 10 }}>
              {
                upData.map((item, index) => {
                  return (
                    <View>
                      {cancleDesign(item.desc, () => { setcheckitem(item) }, checkitem == item ? true : false)}

                    </View>
                  )
                }
                )
              }
            </View>
            <Text style={{ fontWeight: '600', fontSize: 14, marginTop: 20, color: Mycolors.Black, }}>Other Reason</Text>

            <View style={{ width: '100%', height: 100, borderRadius: 2, marginTop: 10, alignSelf: 'center' }}>
              <TextInput
                value={reson}
                onChangeText={(e) => setreson(e)}
                placeholder={'Type here'}
                placeholderTextColor="#bbbbbb"
                multiline={true}
                // maxLength={500}
                // keyboardType="number-pad"
                autoCapitalize='none'
                style={[styles.input]}
              />

            </View>

            <View style={{ width: '100%' }}>
              <MyButtons title="Cancel Booking" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { }} marginHorizontal={20} fontSize={14}
                titlecolor={Mycolors.BG_COLOR} hLinearColor={['#b10027', '#fd001f']} />
            </View>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 20, backgroundColor: Mycolors.TimingColor, borderRadius: 5, padding: 10 }}>
              <View style={{ width: 22, height: 22, backgroundColor: Mycolors.RED, borderRadius: 20, justifyContent: 'center' }}>
                <Image source={require('../../../assets/info.png')} style={{ width: 13, height: 13, alignSelf: 'center' }}></Image>
              </View>
              <View style={{ marginLeft: 10, width: '80%' }}>
                <Text style={{ color: Mycolors.Black, fontWeight: '300', fontSize: 12, lineHeight: 14, fontStyle: 'italic' }}>Note: Cancellation fees of $5.00 for courier's time
                  might apply if 10 minutes had elapsed since your
                  order was placed.</Text>
              </View>
            </View>

            <View style={{ width: 100, height: 100 }} />
          </ScrollView>

        </View>
      </Modal> */}

      {loading ? <Loader /> : null}

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    paddingLeft: 15,
    width: '100%',
    fontSize: 13,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.5,
    // backgroundColor: '#34333a',
    color: '#fff',
    height: 80,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: Mycolors.Black
  },
  // datePickerSelectInput:{
  //   height: 45,
  //   width:'100%',
  //   fontSize: 15,
  //   borderColor: null,
  // //  backgroundColor: '#fff',
  //   borderRadius:10,
  //   color:Mycolors.GrayColor,
  // },
});
export default ShopMyOrderDetails