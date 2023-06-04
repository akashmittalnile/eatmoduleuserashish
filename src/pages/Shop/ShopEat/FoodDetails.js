import React, { useEffect, useState, useRef } from 'react';
import { RefreshControl, View, Image, Text, StyleSheet, SafeAreaView,Linking, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Platform, TouchableWithoutFeedback } from 'react-native';
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
import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_cart_charges, shop_eat_menu, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat } from '../../../WebApi/Service'
import Loader from '../../../WebApi/Loader';
import MyAlert from '../../../component/MyAlert';
import { useSelector, useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import openMap from 'react-native-open-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, AnimatedRegion, Animated } from 'react-native-maps';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

function newAddMinutes(time, minsToAdd) {
  function D(J) { return (J < 10 ? '0' : '') + J; };
  var piece = time.split(':');
  var mins = piece[0] * 60 + +piece[1] + +minsToAdd;
  return D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60);
}

const FoodDetails = (props) => {
  const User = useSelector(state => state.user.user_details)
  const [searchValue, setsearchValue] = useState('')
  const [lat, setlat] = useState('28.6176')
  const [lan, setlan] = useState('77.422')
  const [selectedTab, setselectedTab] = useState('Take Away')
  const [cookingIns, setcookingIns] = useState('')
  const [selectedTime, setselectedTime] = useState('')
  const [selectedTime2, setselectedTime2] = useState('')
  const [counter, setcounter] = useState(1)
  const [date, setDate] = useState('')
  const [toggleValue, setToggleValue] = useState(false);
  const [modlevisual1, setmodlevisual1] = useState(false)
  const [modlevisual2, setmodlevisual2] = useState(false)
  const [modlevisual3, setmodlevisual3] = useState(false)
  const [modlevisual4, setmodlevisual4] = useState(false)
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState({})
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [resData, setresData] = useState([])
  const [menuresData, setmenuresData] = useState([])
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [bannerimg, setbannerimg] = useState('')
  const [allImg, setAllImg] = useState([{ img: '' }])
  const [ClickedItemData, setClickedItemData] = useState('')
  const [diningItens, setdiningItens] = useState([])
  const [diningItens1, setdiningItens1] = useState([])
  const [reloades, setreloades] = useState(false)
  const [cartCount, setcartCount] = useState('0')
  const [futureTimes, setfutureTimes] = useState([])
  const [imgcartCount, setimgcartCount] = useState(1)
  const [timimgs, settimimgs] = useState('')
  const [refreshing, setRefreshing] = useState(false);
  const [selectedValue, setselectedValue] = useState('Regular')
  const [menutypeOpen, setmenutypeOpen] = useState(false);
  const [menutypevalue, setmenutypevalue] = useState(null);
  const [menutypedate, setmenutypedate] = useState([
    { label: 'Regular', value: 'Regular' },
    { label: 'Veggie', value: 'Veggie' },
    { label: 'Vegan', value: 'Vegan' },
    { label: 'Keto', value: 'Keto' },
    { label: 'Paleo', value: 'Paleo' },
  ]);
  const [showda, setshowda] = useState(false)
  const [viewmore, setviewmore] = useState(true)
  const [total, settotal] = useState('0')
  const [subtotal, setsubtotal] = useState('0')
  const [tex, settex] = useState('0')
  const [venderCharg, setvenderCharg] = useState('0')
  const [modlevisual5, setmodlevisual5] = useState(false)
  const [mtype, setmType] = useState('standard')
  const [curentCord, setCurentCord] = useState({
    latitude: 26.4788922,
    longitude: 83.7454171,
  })
  const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242F3E' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242F3E' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#D59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#D59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263C3F' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6B9A76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414E' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212A37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9CA5B3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1F2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#F3D19C' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2F3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#D59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263C' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515C6D' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263C' }],
    },
  ];
  const [badgesData, setBadgesData] = useState([
    {
      id: '1',
      img: require('../../../assets/HygieneFood.png'),
      text: 'Hygiene Food'
    },
    {
      id: '2',
      img: require('../../../assets/VaccinatedFood.png'),
      text: 'Vaccinated Food'
    },
  ])
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      vendorDetail();
      menuList(null);
      diningCharges();
      setmenutypeOpen(false)
    })
    return unsubscribe;
  }, [])

  const checkcon = () => {
    // vendorDetail()
    // menuList(menutypevalue)
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    checkcon()
    wait(2000).then(() => {
      setRefreshing(false)
    });
  }, []);

  const addMinutes = (time, minutes) => {
    var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
    var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
      ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes())
      + ':' + ((date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds());
    return tempTime;
  }

  const setBannerImages = () => {
    console.log('ashish kumar verma');
    var j = 1
    for (j = 1; j <= allImg.length; j++) {
      setTimeout(() => {
        setbannerimg(allImg[j - 1])
        console.log('hii');
      }, 500)
      if (j == allImg.length) {
        j = 1
      }
    }
  }

  const A = () => {
    console.log('heooop');
    setTimeout(() => {
      var imm = allImg
      var total_len = imm.length

      console.log('total_len', total_len);
      if (total_len == imgcartCount) {
        console.log('imgcartCount', imgcartCount);
        setimgcartCount(1)
      } else {
        setimgcartCount(parseInt(imgcartCount) + parseInt(1))
      }
      setbannerimg(imm[imgcartCount - 1])
      setreloades(!reloades)
      console.log('imgggg', imm[parseInt(imgcartCount - 1)]);
      B()
    }, 5000)
  }

  const B = () => {
    A()
  }

  // const bookTables = async () => {
  //   var td = ''
  //   var tt = ''
  //   // if(date==''){
  //   // //  if(selectedTime==''){
  //   //  if(Object.keys(selectedSlot)?.length === 0){
  //   //   setalert_sms('Please Select Time Slot')
  //   //   setMy_Alert(true)
  //   //   // Alert.alert('Please Select Time Slot')
  //   //   // Toast.show('Please Select Time Slot')
  //   //  }else{
  //   //    td=new Date()
  //   //    tt=selectedSlot
  //   //  }
  //   // }

  //   if (Object.keys(selectedSlot)?.length === 0) {
  //       Toast.show({text1: 'Please Select Time Slot'}); 
  //     // setalert_sms('Please Select Time Slot')
  //     // setMy_Alert(true)
  //     return
  //   } else {
  //     tt = selectedSlot
  //   }
  //   if (date == '') {
  //     Toast.show({text1: 'Please Select Date'}); 
  //     // setalert_sms('Please Select Date')
  //     // setMy_Alert(true)
  //     return
  //   } else {
  //     td =  date

  //   }
  //   // else{
  //   //   if(selectedTime2==''){
  //   //     // Toast.show('Please Select Time Slot')
  //   //     setalert_sms('Please Select Time Slot')
  //   //   setMy_Alert(true)
  //   //     // Alert.alert('Please Select Time Slot')
  //   //    }else{
  //   //     td=date
  //   //     tt=selectedTime2
  //   //    }
  //   // }
  //   if (td != '' && tt != '') {
  //     setLoading(true)
  //     var data = {
  //       "business_id": props.route.params.data.business_id,
  //       "no_of_person": counter,
  //       "schedule_date": moment(td).format('YYYY-MM-DD'),
  //       "schedule_time_from": tt?.start,
  //       "schedule_time_to": tt?.end
  //     }
  //     console.log('bookTables data', data);
  //     const { responseJson, err } = await requestPostApi(shop_eat_cart_book_table, data, 'POST', User.token)
  //     setLoading(false)
  //     console.log('the res==>>', responseJson)
  //     if (responseJson.headers.success == 1) {
  //       // setmodlevisual3(false)
  //       // setmodlevisual4(true)
  //       // setmodlevisual1(false)
  //       // setmodlevisual2(false)
  //       setalert_sms('Booking request has been sent successfully you will receive a notification once your table is finalized.')
  //       setMy_Alert(true)
  //       // Toast.show({text1: 'Please Select Date'}); 
  //       // Alert.alert(
  //       //   '',
  //       //   'Booking request has been sent successfully you will receive a notification once your table is finalized.', // <- this part is optional, you can pass an empty string
  //       //   [
  //       //     {text: 'OK', onPress: () => props.navigation.navigate('DiningAndBookTable')},
  //       //   ],
  //       //   // {cancelable: false},
  //       // );
  //       // Alert.alert('Booking request has been sent successfully you will receive a notification once your table is finalized.')
  //     } else {
  //       setalert_sms(err)
  //       setMy_Alert(true)
  //     }
  //   } else {
  //     //Toast.show('Please Select date and time')
  //   }
  // }

  const bookTables = async () => {
    var td = ''
    var tt = ''


    if (date == '') {
      Toast.show({ text1: 'Please Select Date' })

      return
    } else {
      td = date
    }
    if (Object.keys(selectedSlot)?.length === 0) {
      Toast.show({ text1: 'Please Select Time Slot' })

      return
    } else {
      tt = selectedSlot
    }

    // else{
    //   if(selectedTime2==''){
    //     // Toast.show('Please Select Time Slot')
    //     setalert_sms('Please Select Time Slot')
    //   setMy_Alert(true)
    //     // Alert.alert('Please Select Time Slot')
    //    }else{
    //     td=date
    //     tt=selectedTime2
    //    }
    // }
    if (td != '' && tt != '') {
      setLoading(true)
      var data = {
        "business_id": props.route.params.data.business_id,
        "no_of_person": counter,
        "schedule_date": moment(td).format('YYYY-MM-DD'),
        "schedule_time_from": tt?.start,
        "schedule_time_to": tt?.end
      }
      console.log('bookTables data', data);
      const { responseJson, err } = await requestPostApi(shop_eat_cart_book_table, data, 'POST', User.token)
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
        // setmodlevisual3(false)
        // setmodlevisual4(true)
        // setmodlevisual1(false)
        // setmodlevisual2(false)
        Toast.show({text1:'Booking request has been sent successfully you will receive a notification once your table is finalized.'})
        props.navigation.navigate('DiningAndBookTable')
        // setalert_sms('Booking request has been sent successfully you will receive a notification once your table is finalized.')
        // setMy_Alert(true)
             } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    } else {
      //Toast.show('Please Select date and time')
    }

  }

  const bookDiningSlote = async () => {

    setLoading(true)
    var itemss = []
    var dd = diningItens1
    var totals = 0
    for (let i = 1; i <= dd.length; i++) {
      itemss.push({
        'product_id': dd[i - 1].id,
        'product_type': 'simple',
        "quantity": dd[i - 1].cart_quantity,
        "item_total": dd[i - 1].price * dd[i - 1].cart_quantity
      })
      totals = parseInt(totals) + parseInt(dd[i - 1].price * dd[i - 1].cart_quantity)
    }

    var data = {
      "business_id": props.route.params.data.business_id,
      "items": itemss,
      "total": totals,
      "cooking_instruction": cookingIns,
      "taxes": (subtotal * 0.5) / 100,
      "vendor_charges": venderCharg,
      "sub_total": totals,
      "total": (subtotal + ((subtotal * 0.5) / 100) + venderCharg),
    }
    console.log(data);
    const { responseJson, err } = await requestPostApi(shop_eat_cart_book_dining, data, 'POST', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      // Alert.alert(responseJson.headers.message)
      setcookingIns('')
      Toast.show({ text1: responseJson.headers.message });
      // Toast.show(responseJson.headers.message)
      setdiningItens1([])
      setmodlevisual3(false)
      props.navigation.navigate('DiningAndBookTable')
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const putcart = async (item, add) => {

    setLoading(true)
    var data = ''
    if (add == '+') {
      data = {
        id: item.cart_id,
        product_id: item.id,
        quantity: item.cart_quantity + 1,
      }
    } else {
      console.log('item.quantity', item);
      if (item.cart_quantity > 1) {
        data = {
          id: item.cart_id,
          product_id: item.id,
          quantity: item.cart_quantity - 1,
        }
      } else {
        console.log('detel API');
        deletcart(item)
      }
    }

    const { responseJson, err } = await requestPostApi(shop_eat_cart_id + item.cart_id, data, 'PUT', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      //  Toast.show(responseJson.headers.message)
      // Alert.alert(responseJson.headers.message)
      Toast.show({ text1: responseJson.headers.message });
      menuList(menutypevalue)
      setreloades(!reloades)
    } else {
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }

  const deletcart = async (item) => {

    setLoading(true)

    const { responseJson, err } = await requestPostApi(shop_eat_cart_id + item.cart_id, '', 'DELETE', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      // Toast.show(responseJson.headers.message)
      Toast.show({ text1: responseJson.headers.message });
      menuList(menutypevalue)
      setreloades(!reloades)
    } else {
      menuList(menutypevalue)
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }

  const postcart = async (items) => {

    setLoading(true)
    var data = {
      product_id: items.id,
      quantity: 1,
      business_id: props.route.params.data.business_id,
      product_type: items.product_type,
      service_type: items.service_type
      // service_type
    }
    const { responseJson, err } = await requestPostApi(shop_eat_cart, data, 'POST', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      //  Toast.show(responseJson.headers.message)
      Toast.show({ text1: responseJson.headers.message });
      menuList(menutypevalue)
      //  props.navigation.navigate('ShopCart')
    } else {
      Toast.show({ text1: responseJson.headers.message });
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }
  const myfun = (stime, etime) => {
    var starttime = stime;
    var interval = "30";
    var endtime = etime;
    var timeslots = [starttime];
    while (starttime != endtime) {
      starttime = addMinutes(starttime, interval);
      timeslots.push(starttime);
    }
    console.log('hello ji times===>>', timeslots);
    return timeslots;
  }

  function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
      h = hh - 12;
      dd = "PM";
    }
    if (h == 0) {
      h = 12;
    }
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

    var replacement = h + ":" + m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " " + dd;

    return date.replace(pattern, replacement);
  }

  const goToMap = (l, n) => {
   
    openMap(
      {
        latitude: parseInt(l),
        longitude: parseInt(n),
        provider: 'google',
        //  start:'Noida ,Uttar Pradesh,India',
        end: resData.address,
      }
    );
  }

  const vendorDetail = async () => {

    setLoading(true)
    console.log('saurabh url', shop_eat_business_id + props.route.params.data.business_id);
    const { responseJson, err } = await requestGetApi(shop_eat_business_id + props.route.params.data.business_id, '', 'GET', '')
    setLoading(false)
    console.log('the res shop_eat_business_id==>>', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('the res shop_eat_business_id services ==>>', responseJson.body.services)
      console.log('the res features ==>>', responseJson.body.features)
      var updated = 0
      for (let j = 1; j <= responseJson.body.services.length; j++) {
        if (responseJson.body.services[j - 1].attribute_label == 'Book A Table' && responseJson.body.services[j - 1].attribute_value == 'yes') {
          console.log('kumar===>>', responseJson.body.services[j - 1].attribute_detail.substring(0, 5) + ':00');
          console.log('verma===>>', responseJson.body.services[j - 1].attribute_detail.substring(10, 15) + ':00');
          console.log('saurabh===>>', responseJson.body.services[j - 1].attribute_detail);
          const slotDuration = 30
          const breakDuration = 15
          const startTime = responseJson.body.services[j - 1].attribute_detail.substring(0, 5)
          const endTime = responseJson.body.services[j - 1].attribute_detail.substring(6)
          const startInMinutes = startTime.split(':').reduce((a, b) => Number(a) * 60 + Number(b), 0)
          const endInMinutes = endTime.split(':').reduce((a, b) => Number(a) * 60 + Number(b), 0)
          const minutesDifferent = endInMinutes - startInMinutes
          const isAdditionalSlot = (minutesDifferent % (slotDuration + breakDuration)) >= slotDuration
          const slotsWithGap = Math.floor(minutesDifferent / (slotDuration + breakDuration))
          console.log('minutesDifferent', minutesDifferent);
          console.log('slotsWithGap', slotsWithGap);
          console.log('isAdditionalSlot', isAdditionalSlot);
          let allSlots = []
          let start = startTime
          let newTime = ''
          Array.from(Array(slotsWithGap).keys()).map(el => {
            newTime = newAddMinutes(start, slotDuration)
            allSlots.push({ start: start, end: newTime })
            console.log('{start: start, end: newTime}', { start: start, end: newTime });
            start = newAddMinutes(newTime, Math.abs(slotDuration - breakDuration))
          })
          if (isAdditionalSlot) {
            allSlots.push({ start: start, end: newAddMinutes(start, slotDuration) })
          }
          setSlots(allSlots)
          console.log('all slots', allSlots);
          // var stimess= myfun(responseJson.body.services[j-1].attribute_detail.substring(0,5)+':00',responseJson.body.services[j-1].attribute_detail.substring(10,15)+':00')
          //  setfutureTimes(stimess)
          settimimgs(responseJson.body.services[j - 1].attribute_detail.substring(0, 5) + ':00 - ' + responseJson.body.services[j - 1].attribute_detail.substring(10, 15) + ':00')
        }
        if (responseJson.body.services[j - 1].attribute_value == 'yes' && updated == 0) {
          setselectedTab(responseJson.body.services[j - 1].attribute_label)
          updated = 1
        }
      }
      setbannerimg(responseJson.body.bannerImages[0].image)
      var allimgs = [];
      for (let i = 1; i <= responseJson.body.bannerImages.length; i++) {
        allimgs.push({ img: responseJson.body.bannerImages[i - 1].image })
      }
      setAllImg(allimgs)
      setresData(responseJson.body)
      //  A()
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const cart_Count = async () => {
    const { responseJson, err } = await requestGetApi(shop_eat_menu_userid + props.route.params.data.userid, '', 'GET', User.token)
    setLoading(false)
    console.log('the res in_cart cart_Count ==>>', responseJson)
    if (responseJson.headers.success == 1) {
      var counts = 0
      for (let i = 1; i <= responseJson.body.length; i++) {
        if (responseJson.body[i - 1].in_cart == '1') {
          counts = parseInt(counts) + parseInt('1')
        }
      }
      setcartCount(counts)
      setreloades(!reloades)
    } else {
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }

  const menuList = async (dd) => {
    cart_Count()
    setLoading(true)
    var urls = ''
    if (dd == null) {
      // urls=shop_eat_menu+props.route.params.data.userid+'?menu_type='+dd
      urls = shop_eat_menu_userid + props.route.params.data.userid
    } else {
      urls = shop_eat_menu + props.route.params.data.userid + '?menu_type=' + dd
      // urls=shop_eat_menu_userid+props.route.params.data.userid
    }
    console.log('the res in_cart shop_eat_menu_userid urls==>>', urls)
    const { responseJson, err } = await requestGetApi(urls, '', 'GET', User.token)
    setLoading(false)
    console.log('the res in_cart shop_eat_menu_userid ==>>', responseJson)
    if (responseJson.headers.success == 1) {
      // var counts = 0
      // for (let i = 1; i <= responseJson.body.length; i++) {
      //   if (responseJson.body[i - 1].in_cart == '1') {
      //     counts = parseInt(counts) + parseInt('1')
      //   }
      // }
      // setcartCount(counts)
      setmenuresData(responseJson.body)
      // setmenuresData(responseJson.body.filter(el=>el.service_type_value !== "Take Away"))
      // setmenuresData(responseJson.body.filter(el=>el.service_type_value !== "Delivery"))
      // setmenuresData(responseJson.body.filter(el=>el.service_type_value !== "Dining"))
      // setmenuresData(responseJson.body.filter(el=>el.service_type_value !== "Dining" && el.service_type_value !== "Delivery"))
      // console.log('updated data', responseJson.body.filter(el=>el.service_type_value !== "Take Away"));
      setreloades(!reloades)
    } else {
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }

  const searchmenuList = async (tt) => {
    if (tt != '' || tt.trim().length != 0) {
      console.log('hello');
      setLoading(true)

      const { responseJson, err } = await requestGetApi(shop_eat_menu_userid + props.route.params.data.userid + '?name=' + tt, '', 'GET', User.token)
      setLoading(false)
      console.log('the res search shop_eat_menu_userid ==>>', responseJson)
      if (responseJson.headers.success == 1) {
        setmenuresData(responseJson.body)
        // setsearchValue('')
      } else {
        setmenuresData([])
        // Toast.show({text1: responseJson.headers.message})
        // setalert_sms(err)
        // setMy_Alert(true) 
      }
    } else {
      menuList()
     Toast.show({ text1: 'Please enter the item name in search.' })
    }

  }

  const diningCharges = async () => {
    console.log('the res shop_eat_cart_charges==>>//', shop_eat_cart_charges + props.route.params.data.business_id)
    setLoading(true)
    const { responseJson, err } = await requestGetApi(shop_eat_cart_charges + props.route.params.data.business_id, '', 'GET', User.token)
    setLoading(false)
    console.log('the res shop_eat_cart_charges Ashish Kumar==>>', responseJson)
    if (responseJson.headers.success == 1) {
      // {"delivery_charge": 10, "taxes": 0.5, "vendor_charges": 10}
      settex(responseJson.body.taxes)
      setvenderCharg(responseJson.body.vendor_charges)
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const itemloop = (item) => {
    // diningItens.includes(item) ? true : false,
    var rdata = false
    var resdd = diningItens1
    var subtotals = 0
    console.log('klklkl', resdd);
    console.log('lklklklkl', item);
    for (let i = 1; i <= resdd.length; i++) {
      if (resdd[i - 1].id == item.id) {
        rdata = true
      }
      // subtotals = parseInt(subtotals) + parseInt(resdd[i - 1].price * resdd[i - 1].cart_quantity)

    }
    return rdata;
  }

  const itemqty = (item) => {
    // diningItens.includes(item) ? true : false,
    var rdata = 1
    var resdd = diningItens1
    for (let i = 1; i <= resdd.length; i++) {
      if (resdd[i - 1].id == item.id) {
        rdata = resdd[i - 1].cart_quantity
      }
    }
    return rdata;
  }

  const plushqty = (item) => {
    // diningItens.includes(item) ? true : false,
    console.log('state1');
    var resdd = diningItens1
    var subtotals = 0
    for (let i = 1; i <= resdd.length; i++) {
      if (resdd[i - 1].id == item.id) {
        console.log('state2');
        resdd[i - 1].cart_quantity = parseInt(resdd[i - 1].cart_quantity) + 1
      }
      subtotals = parseFloat(subtotals) + parseFloat(resdd[i - 1].price * resdd[i - 1].cart_quantity)
    }

    setsubtotal(subtotals)

    console.log('state3', resdd);
    setdiningItens1(resdd)
    setreloades(!reloades)
  }

  const minus = (item) => {
    // diningItens.includes(item) ? true : false,
    var resdd = diningItens1

    for (let i = 1; i <= resdd.length; i++) {
      if (resdd[i - 1].id == item.id) {
        console.log('state2');
        if (resdd[i - 1].cart_quantity <= 1) {
          const previousSecondElementOfTheArray = resdd.splice(resdd[i - 1], 1);
        } else {
          resdd[i - 1].cart_quantity = parseInt(resdd[i - 1].cart_quantity) - 1
        }
      }
    }
    var subtotals = 0
    for (let i = 1; i <= resdd.length; i++) {
      subtotals = parseFloat(subtotals) + parseFloat(resdd[i - 1].price * resdd[i - 1].cart_quantity)
    }
    if (subtotals == 0) {
      setmodlevisual3(false)
    }
    console.log('state3', resdd);
    setsubtotal(subtotals)
    setdiningItens1(resdd)
    setreloades(!reloades)

  }

  const design = (img, ti, tit, w, imgh, imgw, bg, redious) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', width: w, marginTop: 10 }}>
        <View style={{ width: 50, height: 50, backgroundColor: bg, justifyContent: 'center', borderRadius: redious, borderColor: 'gray', borderWidth: 0.5 }}>
          <Image source={{ uri: img }} style={{ width: imgw, height: imgh, overflow: 'hidden', alignSelf: 'center' }}></Image>
        </View>
        <View style={{ marginLeft: 15, }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: Mycolors.Black }}>{ti}</Text>
          <Text style={{ fontSize: 12, color: Mycolors.GrayColor, top: 3 }}>{tit}</Text>
        </View>

      </View>
    )
  }
  const flatliistDesign = (img, ti, rs, des, press, allpress, item, mpress, apress, boxcolor) => {
    return (
      <TouchableOpacity style={{
        width: '100%', height: 145, marginHorizontal: 5, marginVertical: 8, padding: 10, backgroundColor: '#fff',
        // borderColor: '#dee4ec',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 10,
        shadowOpacity: 0.9,
        // borderWidth: 1,
        overflow: 'hidden',
        elevation: 5, borderRadius: 10, alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
      }}
        onPress={allpress}>
        <View style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 10, borderWidth: 3, borderColor: '#dee4ec' }}>
          <Image source={{ uri: img }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 10, resizeMode: 'stretch' }} ></Image>
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, marginTop: 9 }} >{ti}</Text>
          <View style={{ marginTop: 5, backgroundColor: '#fff', alignItems: 'flex-start', flexDirection: 'row' }}>

            <Rating
              type='custom'
              ratingCount={5}
              imageSize={12}
              startingValue={item.rating}
              // style={{alignSelf:'flex-start',backgroundColor:'red'}}
              // onSwipeRating={(d)=>{setvenderRating(d)}}
              // onFinishRating={(d)=>{setvenderRating(d)}}
              readonly={true}
            />
            <Text style={{ color: 'gray', fontSize: 11, top: -2 }}> {Number(item.total_ratings).toFixed(2)} Ratings</Text>
          </View>
          <Text style={{ color: Mycolors.RED, fontWeight: '600', fontSize: 12, marginTop: 3 }} >{rs}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: Mycolors.GrayColor, fontWeight: '600', fontSize: 12, marginTop: 3 }} >Food Preparation Time:</Text>
            <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, marginTop: 3 }} >{des}</Text>
          </View>


          {item.in_cart != '1' ?
            <View style={{ width: 70 }}>
              <MyButtons title="ADD" height={30} width={'100%'} borderRadius={5} alignSelf="center" press={press} marginHorizontal={20} fontSize={11}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} />
            </View>
            :
            <View style={{ width: 100, height: 30, flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
              <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: '#FFE2E6', justifyContent: 'center' }}
                onPress={mpress}>
                <Text style={{ textAlign: 'center', fontSize: 25, color: 'red', top: -4 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 10, color: Mycolors.Black }}>{item.cart_quantity}</Text>
              <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: 'red', justifyContent: 'center' }}
                onPress={apress}>
                <Text style={{ textAlign: 'center', fontSize: 25, color: '#fff', top: -3 }}>+</Text>
              </TouchableOpacity>
            </View>
          }
        </View>

      </TouchableOpacity>
    )
  }
  const DiningflatliistDesign = (img, ti, rs, des, press, allpress, border, plush, qty, minus, boxcolor) => {
    return (
      <TouchableOpacity style={{
        width: '95%', height: 120, marginHorizontal: 5, marginVertical: 5, padding: 10, backgroundColor: '#fff',
        borderColor: border ? 'green' : '#dee4ec',
        // borderColor: '#dee4ec',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 10,
        shadowOpacity: 0.9,
        // borderWidth: 1,
        overflow: 'hidden',
        elevation: 5, borderRadius: 10, alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
      }}
        onPress={allpress}>
        <View style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 10, borderWidth: 3, borderColor: '#dee4ec' }}>
          <Image source={{ uri: img }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 10, resizeMode: 'stretch' }} ></Image>
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, marginTop: 9 }} >{ti}</Text>
          <Text style={{ color: Mycolors.RED, fontWeight: '600', fontSize: 12, marginTop: 6 }} >{rs}</Text>
          <View style={{ flexDirection: 'row', width: '75%' }}>
            <Text style={{ color: Mycolors.GrayColor, fontWeight: '600', fontSize: 12, marginTop: 6 }} >Food Preparation Time:</Text>
            <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, marginTop: 6 }} >{des}</Text>
          </View>



          {!border ?
            <View style={{ width: 70 }}>
              <MyButtons title="ADD" height={30} width={'100%'} borderRadius={5} alignSelf="center" press={press} marginHorizontal={20} fontSize={11}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} />
            </View>
            :
            <View style={{ width: 100, height: 30, flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
              <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: '#FFE2E6', justifyContent: 'center' }}
                onPress={minus}>
                <Text style={{ textAlign: 'center', fontSize: 25, color: 'red', top: -4 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 10, color: Mycolors.Black }}>{qty}</Text>
              <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: 'red', justifyContent: 'center' }}
                onPress={plush}>
                <Text style={{ textAlign: 'center', fontSize: 25, color: '#fff', top: -3 }}>+</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
        {/* <View style={{position:'absolute',width:20,height:20,top:10,right:10,borderRadius:3,backgroundColor:boxcolor,justifyContent:'center'}}>
  <View style={{width:10,height:10,borderRadius:10,alignSelf:'center',backgroundColor:'#fff'}} />
  </View> */}
      </TouchableOpacity>
    )
  }
  const resetStacks = (page) => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: page }],
    });
  }
  const design1 = (img, ti, tit, w, imgh, imgw, bg, redious, press) => {
    return (
      <View style={{
        alignItems: 'center', width: dimensions.SCREEN_WIDTH*30/100, borderRadius: 15, height: 60, paddingHorizontal: 10, backgroundColor: '#FFFFFF', height: 114, borderRadius: 30, shadowColor: '#455A64',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 1,
        shadowOpacity: 0.8,
        elevation: 5, paddingTop: 10, marginHorizontal: 4,marginVertical:5
      }}>
        <TouchableOpacity onPress={press ? press : () => { }}
          style={{ width: '100%', height: 70, backgroundColor: bg, justifyContent: 'center', borderRadius: redious }}>
          <Image resizeMode='stretch' source={img} style={{ width: imgw, height: imgh, overflow: 'hidden', alignSelf: 'center' }}></Image>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', }}>
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#455A64' }}>{ti}</Text>
        </View>
      </View>

    )
  }
  const dialCall = (num) => {
    console.log('numbers',num);
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:' + num ;
    }
    else {
      phoneNumber = 'tel:' + num ;
      // phoneNumber = 'telprompt:${' + num + '}';
    }
    Linking.openURL(phoneNumber);
  };
  const sendEmail = (myMail) => {
    console.log('sendEmail email', myMail);
    Linking.openURL(`mailto:${myMail}`) 
  }

  const getTakeAwayData = () => {
    return (
    menuresData?.filter(el=>el.service_type_value == 'Take Away')?.length === 0 ? 
    <Text style={{ color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>No Items Found</Text>
    :
      menuresData.map((item, index) => {
        return (
          <View>
            {item.menuType == menutypevalue && item.service_type_value == 'Take Away' ?
              flatliistDesign(item.image, item.name, '$' + Number(item.price).toFixed(2), item.tentative_time, () => { postcart(item) },
                () => {
                  setClickedItemData(item)
                  setmodlevisual1(false)
                },
                item, () => { putcart(item, '-') }, () => { putcart(item, '+') }, 'green'
              )
              :
              item.menuType != menutypevalue && item.service_type_value == 'Take Away' ?
                flatliistDesign(item.image, item.name, '$' + Number(item.price).toFixed(2), item.tentative_time, () => { postcart(item) }, () => {
                  setClickedItemData(item)
                  setmodlevisual1(false)

                },
                  item, () => { putcart(item, '-') }, () => { putcart(item, '+') }, 'red'
                )
                : null
            }
          </View>
        )
      }

      )
      )
  }
  const getDeliveryData = () => {
    return (
      menuresData?.filter(el=>el.service_type_value == 'Delivery')?.length === 0 ? 
        <Text style={{ color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>No Items Found</Text>
        :
        menuresData.map((item, index) => {
          return (
            <View>
              {item.menuType == selectedValue && item.service_type_value == 'Delivery' ?
                flatliistDesign(item.image, item.name, '$' + Number(item.price).toFixed(2), item.tentative_time, () => { postcart(item) },
                  () => {
                    setClickedItemData(item)
                    setmodlevisual1(false)
                  },
                  item, () => { putcart(item, '-') }, () => { putcart(item, '+') }, 'green'
                )
                :
                item.menuType != selectedValue && item.service_type_value == 'Delivery' ?
                  flatliistDesign(item.image, item.name, '$' + Number(item.price).toFixed(2), item.tentative_time, () => { postcart(item) }, () => {
                    setClickedItemData(item)
                    setmodlevisual1(false)
                  },
                    item, () => { putcart(item, '-') }, () => { putcart(item, '+') }, 'red'
                  )
                  : null
              }
            </View>
          )
        }
        )
    )
  }
  const getDiningData = () => {
    return (
      menuresData.filter(el => el.service_type_value == 'Dining')?.length === 0 ?
        <Text style={{ color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>No Items Found</Text>
        :
        menuresData.map((item, index) => {
          return (
            <View>
  
              {item.menuType == menutypevalue && item.service_type_value == 'Dining' ?
                DiningflatliistDesign(item.image, item.name, '$' + Number(item.price).toFixed(2), item.tentative_time,
                  () => {
                    // let arr=diningItens
                    let arr1 = diningItens1
                    if (itemloop(item)) {
  
                    } else {
                      // arr.push(item)
                      arr1.push({
                        "cart_id": item.cart_id,
                        "cart_quantity": 1,
                        "category": item.category,
                        "default_image": item.default_image,
                        "id": item.id,
                        "image": item.image,
                        "in_cart": item.in_cart,
                        "menuType": item.menuType,
                        "name": item.name,
                        "price": item.price,
                        "product_desc": item.product_desc,
                        "service_type_value": item.service_type_value,
                        "status": item.status,
                        "subcategory": item.subcategory,
                        "tentative_time": item.tentative_time
                      })
                      setsubtotal(parseFloat(subtotal) + parseFloat(item.price))
  
                    }
  
                    //setdiningItens(arr)
                    setdiningItens1(arr1)
                    setreloades(!reloades)
                  }, () => {
                    setClickedItemData(item)
                    // setmodlevisual1(false)
                    // setmodlevisual2(true)
                  },
                  itemloop(item),
                  () => { plushqty(item) },
                  itemqty(item),
                  () => { minus(item) }, 'green'
                )
                :
                menuresData.filter(el => el.menuType != menutypevalue && el.service_type_value == 'Dining')?.length === 0 ?
                  <Text style={{ color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>No Items Found</Text>
                  :
                  item.menuType != menutypevalue && item.service_type_value == 'Dining' ?
                    DiningflatliistDesign(item.image, item.name, '$' + Number(item.price).toFixed(2), item.tentative_time,
                      () => {
                        let arr1 = diningItens1
                        if (itemloop(item)) {
  
                        } else {
                          arr1.push({
                            "cart_id": item.cart_id,
                            "cart_quantity": 1,
                            "category": item.category,
                            "default_image": item.default_image,
                            "id": item.id,
                            "image": item.image,
                            "in_cart": item.in_cart,
                            "menuType": item.menuType,
                            "name": item.name,
                            "price": item.price,
                            "product_desc": item.product_desc,
                            "service_type_value": item.service_type_value,
                            "status": item.status,
                            "subcategory": item.subcategory,
                            "tentative_time": item.tentative_time
                          })
                          setsubtotal(parseFloat(subtotal) + parseFloat(item.price))
                        }
  
                        setdiningItens1(arr1)
                        setreloades(!reloades)
                      }, () => {
                        setClickedItemData(item)
                        // setmodlevisual1(false)
                        // setmodlevisual2(true)
                      },
                      itemloop(item),
                      () => { plushqty(item) },
                      itemqty(item),
                      () => { minus(item) }, 'red'
                    )
                    : null
              }
            </View>
          )
        }
        )
    )
  }


  return (
    <SafeAreaView style={{ backgroundColor: Mycolors.BG_COLOR }}>
      <View style={{}}>
        <HomeHeader height={60} paddingHorizontal={15}
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/arrow.png')}
          img1width={30} img1height={30} img1backgroundColor={'#fff'} img1padding={5} img1borderRadius={4}
          press2={() => { }} title2={resData.name} fontWeight={'bold'} img2height={20} color={Mycolors.TEXT_COLOR}
          press3={() => { props.navigation.navigate('ShopCart') }} img3width={45} img3height={45}
          img3={selectedTab != 'Book A Table' && selectedTab != 'Dining' ? require('../../../assets/Cart.png') : ''}
          img3backgroundColor={'transparent'} img3padding={8} img3borderRadius={4} />
        {cartCount != '0' && selectedTab != 'Book A Table' && selectedTab != 'Dining' ?
          <View style={{ position: 'absolute', right: 8, top: 4, width: 20, height: 20, borderRadius: 20, backgroundColor: 'red', justifyContent: 'center', zIndex: 999 }}>
            <Text style={{ fontSize: 11, textAlign: 'center', color: '#fff' }}>{cartCount}</Text>
          </View>
          : null
        }
      </View>


      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        <View style={{ backgroundColor: '#fff', height: dimensions.SCREEN_HEIGHT * 33 / 100, width: '100%' }}>



          <View style={{ overflow: 'hidden', top: 0, width: '100%', alignSelf: 'center', position: 'absolute', zIndex: -999 }}>
            <ImageSlider
              //  localImg={true}'
              data={allImg}
              timer={5000}
              // onClick={(item, index) => {alert('hello'+index)}}
              autoPlay={true}
              indicatorContainerStyle={{ top: -125 }}

              caroselImageStyle={{ resizeMode: 'cover' }}
              // onItemChanged={(item) => console.log("item", item)}
              closeIconColor="#fff"
            />
          </View>
        </View>
        <View style={{ width: '96%', alignSelf: 'center', backgroundColor: Mycolors.BG_COLOR }}>

          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', backgroundColor: '#fff', borderRadius: 9, paddingHorizontal: 22, paddingVertical: 15, top: -30 }}>
            <View>
              <Text style={{ color: Mycolors.Black, fontSize: 22, fontWeight: 'bold' }}>{resData.name}</Text>
              <Text style={{ color: Mycolors.GrayColor, fontSize: 13, fontWeight: '500', marginVertical: 4 }}>Restaurant</Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Image source={require('../../../assets/Star.png')} style={{ width: 18, height: 18 }}></Image>
                <Text style={{ color: Mycolors.Black, fontSize: 14, fontWeight: '600', left: 5 }}>{resData.rating ? resData.rating : '0.0'}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setmodlevisual5(true)} style={{ position: 'absolute', right: 22, top: 22 }}>
            <AntDesign name="infocirlce" color={'#FD001F'} size={24} />
              {/* <Text style={{ color: '#FD001F', fontSize: 13, fontWeight: '500', marginVertical: 4, textDecorationLine: "underline", }}>View Details</Text> */}
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={{
                width: 25, height: 25, borderRadius: 5, backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 1,
                shadowOpacity: 0.3,
                justifyContent: 'center',
                elevation: 5, top: 25
              }} onPress={() => { goToMap(resData.latitude, resData.longitude) }}>
                <Image source={require('../../../assets/layer_9.png')} style={{ width: 10, height: 15, alignSelf: 'center' }}></Image>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: 'gray', padding: 4, borderRadius: 5, marginTop: 25, top: -30, }}
                onPress={() => {
                  menutypevalue ? menuList(menutypevalue) : menuList(null);
                  setmodlevisual1(true)
                }}>
                <Text style={{ color: Mycolors.GrayColor, fontWeight: 'bold', left: 8, fontSize: 16 }}> Search Menu</Text>
                <View style={{ height: 40, flexDirection: 'row' }}>
                  <TouchableOpacity style={{
                    width: 40, height: 40, backgroundColor: 'transparent', justifyContent: 'center', shadowOffset: {
                      width: 0,
                      height: 3
                    },
                    shadowColor: '#F5F5F5',
                    shadowRadius: 1,
                    shadowOpacity: 0.3,
                    // justifyContent: 'center',
                    elevation: 5, paddingTop: 4
                  }}
                    onPress={() => { setmodlevisual1(true) }}>
                    <Image source={require('../../../assets/Search-red.png')} style={{ width: 45, height: 48, overflow: 'hidden', alignSelf: 'center', right: 3 }}></Image>
                  </TouchableOpacity>

                </View>


              </TouchableOpacity>

          <View style={{ width: '96%', alignSelf: 'center', backgroundColor: '#F5F5F5', marginHorizontal: 20, borderRadius: 10, justifyContent: "center", top: -25, }}>
            <FlatList
              data={resData.services}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              // numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <>
                    {item.attribute_value == 'yes' ?
                      <View style={{ width: dimensions.SCREEN_WIDTH * 40 / 100, marginHorizontal: 8, padding: 5 }}>
                        <MyButtons title={item.attribute_label} height={37} width={'100%'} borderRadius={5} alignSelf="center"
                          press={() => { setselectedTab(item.attribute_label) }} marginHorizontal={20} fontSize={15}
                          titlecolor={selectedTab == item.attribute_label ? Mycolors.BG_COLOR : Mycolors.Black} marginVertical={0} hLinearColor={selectedTab == item.attribute_label ? ['#fd001f', '#b10027'] : ['transparent', 'transparent']} backgroundColor={'transparent'} />
                      </View>
                      :
                      <>
                      </>
                    }
                  </>
                )
              }}
              keyExtractor={item => item.id}
            />
          </View>

          
          {selectedTab != 'Book A Table' ?
            <>
              <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', marginBottom: 1, borderWidth: 1, borderColor: 'gray', padding: 4, borderRadius: 5, }}>
                <View style={{ width: '98%', height: 40, zIndex: 999 }}>



                  <DropDownPicker
                    open={menutypeOpen}
                    value={menutypevalue}
                    items={menutypedate}
                    //multiple={true}
                    setOpen={() => { setmenutypeOpen(!menutypeOpen) }}
                    setValue={(v) => { setmenutypevalue(v) }}
                    setItems={(i) => { setmenutypedate(i) }}
                    // listMode="MODAL"
                    placeholder="Select Category Food"
                    onChangeValue={(value) => {
                      setmenutypevalue(value)
                      console.log('hihiihi', value)
                      // getData(makeUrl(value))
                      menuList(value)
                      setselectedValue(value)
                      // setreloades(!reloades)
                    }}
                    dropDownDirection="TOP"
                    placeholderStyle={{
                      color: Mycolors.GrayColor,
                      fontSize: 16,
                      // fontWeight: 'bold'
                    }}
                    textStyle={{
                      color: Mycolors.GrayColor,
                      fontSize: 16,
                      fontWeight: 'bold'
                      //  fontSize:5
                    }}
                    style={{ borderColor: 'transparent', backgroundColor: 'transparent', height: 40, zIndex: 999, top: -5, }}
                    containerStyle={{
                      width: '102%',
                      borderColor: 'red',
                      height: 40,
                      zIndex: 999
                    }}
                    disabledStyle={{
                      opacity: 0.5
                    }}
                    dropDownContainerStyle={{
                      // width: '100%',
                      backgroundColor: "#fff",
                      borderColor: '#000',
                      // height:360,
                      borderWidth: 0.2,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 5,
                      shadowOpacity: 1.0,
                      elevation: 5,
                      zIndex: 999
                    }}
                  />

                </View>

              </View>
              {menuresData.length > 0 ?

                <View style={{ width: '100%', alignSelf: 'center', marginTop: 10, zIndex: -888 }}>
                  {selectedTab != 'Dining' ?
                    selectedTab == 'Take Away' ?
                      getTakeAwayData()
                      :
                      getDeliveryData()
                    :
                    getDiningData()
                  }

                </View>
                :
                // <Text style={{ color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>No Items Found</Text>
                null
              }
            </>
            :
            null
          }
        </View>

        {selectedTab == 'Book A Table' ?
          <>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ paddingHorizontal: 15, top: -40 }}>
              {/* <Text style={{ fontWeight: 'bold', color: Mycolors.Black, marginVertical: 10 }}>Book A Table</Text> */}
              <View style={{ height: 20 }}></View>
              <View style={{
                width: '95%', marginHorizontal: 5, marginVertical: 10, padding: 10, backgroundColor: Mycolors.TimingColor,
                borderColor: Mycolors.RED, borderWidth: 0.2, borderRadius: 7, alignSelf: 'center',
              }}
              >
                <Text style={{ fontSize: 12, fontWeight: '500', color: Mycolors.Black }}>Enter number of person</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 11, fontWeight: '500', color: Mycolors.Black }}>Person</Text>
                    <Text style={{ fontSize: 10, fontWeight: '500', color: Mycolors.RED, marginTop: 4 }}>{counter}</Text>
                  </View>
                  <View style={{ width: 65, right: 5, borderWidth: 0.2, borderColor: Mycolors.RED, borderRadius: 2 }}>
                    {/* <HomeHeader height={21} paddingHorizontal={7}
                      press1={() => { counter <= 0 ? setcounter(1) : setcounter(counter - 1) }} img1={require('../../../assets/remove.png')} img1width={10} img1height={3}
                      press2={() => { }} title2={counter} fontWeight={'500'} img2height={20} fontSize={12}
                      press3={() => { setcounter(counter + 1) }} img3={require('../../../assets/add.png')} img3width={10} img3height={10} /> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <TouchableOpacity style={{ width: 15, height: 15, justifyContent: 'center', padding: 7 }} onPress={() => { counter <= 0 ? setcounter(1) : setcounter(counter - 1) }}>
                        <Image style={{ width: 10, height: 3 }} source={require('../../../assets/remove.png')}></Image>
                      </TouchableOpacity>

                      <Text style={{ color: '#000', fontWeight: '500', fontSize: 12 }}>{counter}</Text>

                      <TouchableOpacity style={{ width: 15, height: 15, justifyContent: 'center' }} onPress={() => { setcounter(counter + 1) }}>
                        <Image style={{ width: 10, height: 10 }} source={require('../../../assets/add.png')}></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {/* <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginVertical: 10 }}>
                <Text style={{ color: Mycolors.Black, fontWeight: '500', fontSize: 13 }}>For Today</Text>
              </View> */}
              <View style={{ width: '97%', alignSelf: 'center' }}>
                <FlatList
                  data={futureTimes}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ width: 90, marginHorizontal: 5 }}>
                        <TouchableOpacity style={{ width: 90, height: 40, justifyContent: 'center', borderWidth: 0.5, borderRadius: 5, borderColor: selectedTime == item ? Mycolors.RED : Mycolors.GrayColor }}
                          onPress={() => {
                            setselectedTime(item)
                            setselectedTime2('')
                          }}>
                          <Text style={{ fontSize: 11, color: selectedTime == item ? Mycolors.RED : Mycolors.GrayColor, textAlign: 'center', fontWeight: 'bold' }}>{item}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                  keyExtractor={item => item}
                />
              </View>
              {/* <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginVertical: 10 }}>
                <Text style={{ color: Mycolors.Black, fontWeight: '500', fontSize: 13 }}>For Later</Text>
              </View> */}

              <View style={{
                width: '95%', height: 50, marginHorizontal: 5, marginVertical: 10, padding: 10, backgroundColor: '#fff',
                borderColor: '#DEE4EC', borderRadius: 7, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
                justifyContent: 'center',
                elevation: 3,
              }}
              >
                {Platform.OS == 'ios' ?
                  <DatePicker
                    customStyles={{
                      dateInput: { borderColor: 'transparent', left: -90 },
                      dateText: { color: Mycolors.Black },
                      dateIcon: styles.dateIcon,
                      dateplaceholder: {
                        alignContent: 'flex-start',
                      },
                      placeholderText: {
                        fontSize: 15,
                        color: Mycolors.GrayColor,
                        marginLeft: '5%',
                        // left:100
                      },
                      zIndex: 99999
                    }}
                    androidMode={'spinner'}
                    readOnly={true}
                    style={[styles.datePickerSelectInput]}
                    date={date}
                    mode="date"
                    placeholder={'Select date'}
                    minDate={new Date()}
                    format='YYYY-MM-DD'
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={require('../../../assets/shape_38.png')}
                    onDateChange={date => {
                      setDate(date)
                    }}
                  />
                  :
                  showda ?
                    <View>
                      <DateTimePicker
                        value={new Date()}
                        mode='calendar'
                        // is24Hour={false}
                        display="spinner"
                        minimumDate={new Date()}
                        onChange={(event, sTime) => {
                          setshowda(false)
                          console.log(sTime.toDateString());
                          setDate(sTime)
                          console.log(event);
                        }}
                      />
                    </View>
                    :
                    <TouchableOpacity style={{ width: '100%', height: 50, justifyContent: 'center', backgroundColor: Mycolors.HEADERCOLOR, borderColor: 'transparent', zIndex: -999, borderRadius: 5 }}>
                      <Text style={{ fontSize: 15, color: '#000', left: 10 }} onPress={() => { setshowda(true) }}>{date ? date.toString().substring(0, 16) : 'Select Date'}</Text>
                    </TouchableOpacity>
                }
              </View>
              <TouchableOpacity style={{
                width: '95%', height: 50, marginHorizontal: 5, marginVertical: 10, padding: 10, backgroundColor: Mycolors.TimingColor,
                borderColor: '#DEE4EC', borderRadius: 7, alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
              }}
              >
                <View style={{ width: 25, height: 25, alignSelf: 'center', top: 8 }}>
                  <Image source={require('../../../assets/shape_42.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 5, resizeMode: 'stretch' }} ></Image>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 11, }} >Timings</Text>
                  <View style={{ width: '95%', flexDirection: 'row' }}>
                    <FlatList
                      data={slots}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      // numColumns={2}
                      keyExtractor={item => item.start}
                      // style={{backgroundColor:'yellow',width:'100%'}}
                      renderItem={({ item, index }) => {
                        return (
                          // <Text>abc</Text>
                          <TouchableWithoutFeedback onPress={() => { setSelectedSlot(item) }}>
                            <View style={[styles.radioButtonContainer]}>
                              <MaterialCommunityIcons name={item.start === selectedSlot.start ? "radiobox-marked" : "radiobox-blank"} color={Mycolors.RED} size={24} />
                              <Text style={{ color: 'black', fontWeight: '600', fontSize: 12, marginLeft: 5 }} >{item.start + ' - ' + item.end}</Text>
                            </View>
                          </TouchableWithoutFeedback>
                        );
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ width: '97%', alignSelf: 'center', marginTop: 10 }}>
                <FlatList
                  data={futureTimes}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ width: 90, marginHorizontal: 5 }}>
                        <TouchableOpacity style={{ width: 90, height: 40, justifyContent: 'center', borderWidth: 0.5, borderRadius: 5, borderColor: selectedTime2 == item ? Mycolors.RED : Mycolors.GrayColor }}
                          onPress={() => {
                            setselectedTime2(item)
                            setselectedTime('')
                          }}>
                          <Text style={{ fontSize: 11, color: selectedTime2 == item ? Mycolors.RED : Mycolors.GrayColor, textAlign: 'center', fontWeight: 'bold' }}>{item}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                  keyExtractor={item => item}
                />
              </View>
              {/* <View style={{ width: '95%', height: 100, borderRadius: 2, marginTop: 5, alignSelf: 'center' }}>
                <TextInput
                  value={cookingIns}
                  onChangeText={(e) => setcookingIns(e)}
                  placeholder={'Add Cooking Instructions'}
                  placeholderTextColor="#BBBBBB"
                  multiline={true}
                  // maxLength={500}
                  // keyboardType="number-pad"
                  autoCapitalize='none'
                  style={[styles.input]}
                />
              </View> */}
              <View style={{ width: '95%', alignSelf: 'center', marginTop: 30, }}>
                <MyButtons title="Confirm & Book a Table" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => {
                  bookTables()
                  //  setmodlevisual3(false)
                  //  setmodlevisual4(true)
                  //  setmodlevisual1(false)
                  //  setmodlevisual2(false)
                }} marginHorizontal={20} fontSize={14}
                  titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} hLinearColor={['#B10027', '#FD001F']} />
              </View>
            </ScrollView>
          </>
          : null
        }

        <View style={{ height: 140 }} />

      </ScrollView>
      {selectedTab == 'Dining' ?
        <View style={{ width: '92%', alignSelf: 'center', position: 'absolute', bottom: 60, height: 80, backgroundColor: '#fff' }}>
          <MyButtons title="Confirm Order" height={45} width={'100%'} borderRadius={5} alignSelf="center"
            press={() => {
              if (diningItens1.length > 0) {
                setmodlevisual4(false)
                setmodlevisual3(true)
                setmodlevisual1(false)
                setmodlevisual2(false)
              } else {
                Toast.show({ text1: 'Please add items from the menu to place an order.', });
              }
            }} marginHorizontal={20} fontSize={12}
            titlecolor={Mycolors.BG_COLOR} marginVertical={0} hLinearColor={['#fd001f', '#b10027']} backgroundColor={'transparent'} />
        </View>
        : null
      }
      {/* ##############&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Model1 Search Clicked &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   */}
      <Modal
        isVisible={modlevisual1}
        swipeDirection="down"
        onSwipeComplete={(e) => {
          setmodlevisual1(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        onBackdropPress={() => {
          menutypevalue ?  menuList(menutypevalue) : menuList(null);
          // setmenutypevalue(null)
          setmodlevisual1(false)
        }}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '70%', backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            <View style={{ paddingHorizontal: 4 }}>
              <SearchInput2 marginTop={10} placeholder={'Search By Item Name'}
                serchValue={searchValue}
                onChangeText={(e) => {
                  setsearchValue(e)
                  searchmenuList(e.text)
                }}
                // press={() => { Alert.alert('Hi') }}
                presssearch={() => { searchmenuList(searchValue.text) }}
                paddingLeft={9} />
            </View>

            {/* <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15, left: 5, color: '#cbcbcb' }}></Text> */}

            <View style={{ width: '100%', alignSelf: 'center', marginTop: 10 }}>
              {menuresData.length > 0 ?
                selectedTab != 'Dining' ?
                  (menuresData.map((item, index) => {
                    return (
                      <View>

                        {selectedTab == 'Delivery' && item.service_type_value == 'Delivery' ?
                          flatliistDesign(item.image, item.name, '$' + Number(item.price).toFixed(2),
                            item.tentative_time,
                            () => { selectedTab == 'Dining' ? '' : postcart(item) },
                            () => { setClickedItemData(item) },
                            item,
                            () => { putcart(item, '-') },
                            () => { putcart(item, '+') }, '#fff'
                          )
                          :
                          selectedTab == 'Take Away' && item.service_type_value == 'Take Away' ?
                            flatliistDesign(item.image, item.name, '$' + Number(item.price).toFixed(2),
                              item.tentative_time,
                              () => { selectedTab == 'Dining' ? '' : postcart(item) },
                              () => { setClickedItemData(item) },
                              item,
                              () => { putcart(item, '-') },
                              () => { putcart(item, '+') }, '#fff'
                            )
                            :
                            null
                        }

                      </View>
                    )
                  }
                  ))
                  :
                  (menuresData.map((item, index) => {
                    return (
                      <View>
                        {
                          item.service_type_value == 'Dining' ?
                            DiningflatliistDesign(item.image, item.name, '$' + Number(item.price).toFixed(2), item.tentative_time,
                              () => {
                                let arr1 = diningItens1
                                if (itemloop(item)) {

                                } else {
                                  arr1.push({
                                    "cart_id": item.cart_id,
                                    "cart_quantity": 1,
                                    "category": item.category,
                                    "default_image": item.default_image,
                                    "id": item.id,
                                    "image": item.image,
                                    "in_cart": item.in_cart,
                                    "menuType": item.menuType,
                                    "name": item.name,
                                    "price": item.price,
                                    "product_desc": item.product_desc,
                                    "service_type_value": item.service_type_value,
                                    "status": item.status,
                                    "subcategory": item.subcategory,
                                    "tentative_time": item.tentative_time
                                  })
                                  setsubtotal(parseFloat(subtotal) + parseFloat(item.price))
                                }

                                setdiningItens1(arr1)
                                setreloades(!reloades)
                              }, () => {
                                setClickedItemData(item)
                                // setmodlevisual1(false)
                                // setmodlevisual2(true)
                              },
                              itemloop(item),
                              () => { plushqty(item) },
                              itemqty(item),
                              () => { minus(item) }, 'red'
                            )
                            : null
                        }
                      </View>
                    )
                  }
                  ))
                :
                <View style={{ width: '100%', justifyContent: 'center', paddingTop: 20, }}>
                  <View style={{ width: '80%', marginLeft: 8 }}>
                    <Text style={{ color: '#B4B4B4', textAlign: 'left', fontWeight: '500', fontSize: 21 }}>Hungry for a</Text>
                    <Text style={{ color: '#ADC430', textAlign: 'left', fontWeight: 'bold', fontSize: 25 }}>Specific Cuisine?</Text>
                    <Text style={{ color: '#000000', textAlign: 'left', fontSize: 14 }}>Just type it in and let our search menu do the rest. </Text>
                  </View>
                  <View style={{ width: 220, height: 220, alignSelf: 'flex-end', marginTop: 20, marginRight: 15 }}>
                    <Image source={require('../../../assets/Shop-eat-empty-cat-image.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 5, resizeMode: 'stretch' }} ></Image>
                  </View>
                </View>
              }
            </View>

            <View style={{ width: 100, height: 100 }} />
          </ScrollView>

        </View>

        {loading ? <Loader /> : null}

      </Modal>

      {/* ##############&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Model2 Product Clicked &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   */}
      <Modal
        isVisible={modlevisual2}
        swipeDirection="down"
        onSwipeComplete={(e) => {
          setmodlevisual2(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        onBackdropPress={() => setmodlevisual2(false)}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

            <TouchableOpacity style={{
              width: '95%', height: 90, marginHorizontal: 5, marginVertical: 5, padding: 10, backgroundColor: '#fff',
              // borderColor: '#dee4ec',
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 10
              },
              shadowRadius: 10,
              shadowOpacity: 0.9,
              // borderWidth: 1,
              overflow: 'hidden',
              elevation: 5, borderRadius: 10, alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
            }}
            >
              <View style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 10, borderWidth: 3, borderColor: '#dee4ec' }}>
                <Image source={{ uri: ClickedItemData.image }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 10, resizeMode: 'stretch' }} ></Image>
              </View>
              <View style={{ marginLeft: 15 }}>
                <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, marginTop: 9 }} >{ClickedItemData.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: Mycolors.GrayColor, fontWeight: '600', fontSize: 12, marginTop: 9 }} >Food Preparation Time:</Text>
                  <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, marginTop: 6 }} > {resData.tentative_time}</Text>
                </View>
              </View>
              <View style={{ position: 'absolute', width: 20, height: 20, top: 10, right: 10, borderRadius: 3, backgroundColor: 'red', justifyContent: 'center' }}>
                <View style={{ width: 10, height: 10, borderRadius: 10, alignSelf: 'center', backgroundColor: '#fff' }} />
              </View>
            </TouchableOpacity>

            <View style={{ width: '95%', height: 100, borderRadius: 2, marginTop: 10, alignSelf: 'center' }}>

              <TextInput
                value={cookingIns}
                onChangeText={(e) => setcookingIns(e)}
                placeholder={'Add Cooking Instructions'}
                placeholderTextColor="#bbbbbb"
                multiline={true}
                // maxLength={500}
                // keyboardType="number-pad"
                autoCapitalize='none'
                style={[styles.input]}
              />

            </View>

            <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginVertical: 15 }}>
              <Text style={{ color: Mycolors.Black, fontWeight: '500' }}>Total Payable Amount</Text>
              <Text style={{ color: Mycolors.Black, fontWeight: '500' }}>${ClickedItemData.price}</Text>
            </View>
            <View style={{ width: '95%', alignSelf: 'center' }}>
              <MyButtons title="Proceed to payment" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { props.navigation.navigate('ShopPayment') }} marginHorizontal={20} fontSize={14}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} hLinearColor={['#b10027', '#fd001f']} />
            </View>

            <View style={{ width: 100, height: 100 }} />
          </ScrollView>

        </View>
      </Modal>

      {/* ##############&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Model3 Book A Table sloat Clicked &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   */}
      <Modal
        isVisible={modlevisual3}
        swipeDirection="down"
        onSwipeComplete={(e) => {
          setmodlevisual3(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        onBackdropPress={() => setmodlevisual3(false)}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '60%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

            <Text style={{ fontWeight: 'bold', color: Mycolors.Black, marginVertical: 10 }}>Review Order</Text>

            {diningItens1.map((item, index) => {
              return (
                //     <TouchableOpacity style={{width:'95%',height:120,marginHorizontal:5,marginVertical:5, padding:10,backgroundColor:'#fff',
                //     borderColor:'#dee4ec',
                //     borderWidth:1,
                //     elevation: 5,borderRadius:10,alignSelf:'center',flexDirection:'row',alignItems:'center'}}
                //     onPress={()=>{}}>
                // <View style={{width:60,height:75,alignSelf:'center',borderRadius:5,borderWidth:3,borderColor:'#dee4ec'}}>
                // <Image source={{uri:item.image}}  style={{width:'100%',height:'100%',alignSelf:'center',borderRadius:5,resizeMode: 'stretch'}} ></Image>
                // </View>
                // <View style={{marginLeft:10}}>
                // <Text style={{color:Mycolors.Black,fontWeight:'600',fontSize:12,marginTop:9}} >{item.name}</Text>
                // <Text style={{color:Mycolors.RED,fontWeight:'600',fontSize:12,marginTop:9}} >{parseFloat(Number(item.price).toFixed(2))}</Text> 

                // </View>
                //   <View style={{position:'absolute',width:20,height:20,top:10,right:10,borderRadius:3,backgroundColor:'red',justifyContent:'center'}}>
                //   <View style={{width:10,height:10,borderRadius:10,alignSelf:'center',backgroundColor:'#fff'}} />
                //   </View>
                // </TouchableOpacity>
                <>
                  {
                    DiningflatliistDesign(item.image, item.name, '$' + Number(item.price).toFixed(2), item.tentative_time,
                      () => {
                        let arr1 = diningItens1
                        if (itemloop(item)) {

                        } else {
                          arr1.push({
                            "cart_id": item.cart_id,
                            "cart_quantity": 1,
                            "category": item.category,
                            "default_image": item.default_image,
                            "id": item.id,
                            "image": item.image,
                            "in_cart": item.in_cart,
                            "menuType": item.menuType,
                            "name": item.name,
                            "price": item.price,
                            "product_desc": item.product_desc,
                            "service_type_value": item.service_type_value,
                            "status": item.status,
                            "subcategory": item.subcategory,
                            "tentative_time": item.tentative_time
                          })
                          setsubtotal(parseFloat(subtotal) + parseFloat(item.price))
                        }

                        setdiningItens1(arr1)
                        setreloades(!reloades)
                      }, () => {
                        setClickedItemData(item)
                        // setmodlevisual1(false)
                        // setmodlevisual2(true)
                      },
                      itemloop(item),
                      () => { plushqty(item) },
                      itemqty(item),
                      () => { minus(item) }, item.menuType == 'Veg' ? 'green' : 'red'
                    )

                  }
                </>

              )
            })

            }


            <View style={{ width: '95%', height: 100, borderRadius: 2, marginTop: 25, alignSelf: 'center' }}>

              <TextInput
                value={cookingIns}
                onChangeText={(e) => setcookingIns(e)}
                placeholder={'Add Cooking Instructions'}
                placeholderTextColor="#bbbbbb"
                multiline={true}
                // maxLength={500}
                // keyboardType="number-pad"
                autoCapitalize='none'
                style={[styles.input]}
              />

            </View>

            {/* <View style={{width:'95%',height:40,borderRadius:10,backgroundColor:'rgba(100,150,100,0.5)',alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20}}>
<Text style={{color:'#000',fontWeight:'bold'}}>Total Amount :</Text>
<Text style={{color:'#000',fontWeight:'bold'}}>$10</Text>
</View> */}

            <View style={{
              width: '100%', marginHorizontal: 5, marginVertical: 5, padding: 10, backgroundColor: '#fff',
              elevation: 5, borderRadius: 7, alignSelf: 'center'
            }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                <Text style={{ color: Mycolors.Black, fontSize: 13, fontWeight: '600' }} >Sub Total</Text>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginTop: 5 }} >${Number(subtotal).toFixed(2)}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 5 }}>
                <Text style={{ color: Mycolors.Black, fontSize: 13, }} >Vendor Charges</Text>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginTop: 5 }} >${venderCharg}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 5 }}>
                <Text style={{ color: Mycolors.Black, fontSize: 13, }} >Taxes</Text>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginTop: 5 }} >${Number(((subtotal * 0.5) / 100).toFixed(2))}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#ADC430', height: 46, alignItems: "center", borderRadius: 7, padding: 10 }}>
                <Text style={{ color: Mycolors.Black, fontSize: 14, fontWeight: '600' }} >Total Cost</Text>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, fontWeight: '600', textAlign: 'center' }} >${ Number((subtotal + ((subtotal * 0.5) / 100) + venderCharg)).toFixed(2)}</Text>
              </View>
            </View>


            <View style={{ width: '95%', alignSelf: 'center', marginTop: 10 }}>
              <MyButtons title="Confirm & Place Order" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { bookDiningSlote() }} marginHorizontal={20} fontSize={14}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} hLinearColor={['#b10027', '#fd001f']} />
            </View>

            <View style={{ width: 100, height: 100 }} />

          </ScrollView>

        </View>
        {loading ?
          <Loader />
          : null}
      </Modal>
      {/* ##############&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Model4 Book A Sloat Clicked &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   */}
      <Modal
        isVisible={modlevisual4}
        swipeDirection="down"
        onSwipeComplete={(e) => {
          setmodlevisual4(false)
        }}
        scrollTo={() => { }}
        onBackdropPress={() => setmodlevisual4(false)}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '48%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

            <Text style={{ fontWeight: 'bold', color: Mycolors.Black, marginVertical: 10 }}>Book A Slot</Text>

            <Text style={{ color: Mycolors.RED, fontWeight: '400', fontSize: 12, marginTop: 20 }}>#KIN876549</Text>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, marginTop: 15 }}>Table Number</Text>
                  <Text style={{ color: Mycolors.GrayColor, fontSize: 11, marginTop: 4 }}>14</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, marginTop: 15 }}>Booking for</Text>
                  <Text style={{ color: Mycolors.GrayColor, fontSize: 11, marginTop: 4 }}>3 person</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 10 }}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 12, marginTop: 15 }}>Table Booking Time</Text>
                  <Text style={{ color: Mycolors.GrayColor, fontSize: 11, marginTop: 4 }}>21 July 2021, 11:00 AM</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <TouchableOpacity style={{ width: 120, height: 40, borderColor: Mycolors.RED, borderWidth: 0.5, borderRadius: 4, justifyContent: 'center', top: 8 }}>
                    <Text style={{ textAlign: 'center', color: Mycolors.RED, fontSize: 12, fontWeight: '600' }}>View Order</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>


            <View style={{ width: '100%', padding: 10, borderRadius: 15, borderColor: Mycolors.GrayColor, borderWidth: 0.3, marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '85%', marginTop: 10 }}>
                <View style={{ width: 40, height: 40, backgroundColor: Mycolors.GREEN, justifyContent: 'center', borderRadius: 20 }}>
                  <Image source={require('../../../assets/shape_39.png')} style={{ width: 25, height: 28, overflow: 'hidden', alignSelf: 'center' }}></Image>
                </View>
                <View style={{ marginLeft: 10, width: '85%' }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: Mycolors.Black }}>Order Status</Text>
                  <Text style={{ fontSize: 13, color: Mycolors.GREEN, marginTop: 7, lineHeight: 18 }}>Accepted by restaurant vour table no 14 is booked</Text>
                </View>

              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ fontWeight: '600', color: Mycolors.Black, fontSize: 12 }}>Note:</Text>
                <Text style={{ fontWeight: '400', color: Mycolors.Black, fontSize: 12 }}> Show your booking number when asked</Text>
              </View>
            </View>

            <View style={{ width: 100, height: 100 }} />
          </ScrollView>

        </View>
      </Modal>
      {/* ##############&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Model5 Book A Sloat Clicked &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   */}
      <Modal
        isVisible={modlevisual5}
        swipeDirection="down"
        onSwipeComplete={(e) => {
          setmodlevisual5(false)
        }}
        scrollTo={() => { }}
        onBackdropPress={() => setmodlevisual5(false)}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '78%', backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', backgroundColor: '#F8F8F8', borderRadius: 9, paddingHorizontal: 10, }}>
              <View>
                <Text style={{ color: Mycolors.Black, fontSize: 22, fontWeight: 'bold' }}>{resData.name}</Text>
                {/* <Text style={{ color: Mycolors.GrayColor, fontSize: 13, fontWeight: '500', marginVertical: 4 }}>Restaurant</Text> */}
                <View style={{ flexDirection: 'row', marginTop: 5, width: '100%', }}>
                  <Image source={require('../../../assets/Star.png')} style={{ width: 18, height: 18 }}></Image>
                  <Text style={{ color: Mycolors.Black, fontSize: 14, fontWeight: '600', left: 5 }}>{resData.rating ? resData.rating : '0.0'}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row',top:9 }}>
              <TouchableOpacity onPress={()=>{
                 dialCall(resData.phone)
              }} style={{height:40,width:40}}>
              <Image source={require('../../../assets/call.png')} style={{height:40,width:40,resizeMode:'stretch'}}></Image>
              </TouchableOpacity>
                  
              <TouchableOpacity onPress={()=>{
                 sendEmail(resData.emailid)
              }} style={{height:40,width:40}}>
              <Image source={require('../../../assets/Envelope.png')} style={{height:40,width:40,resizeMode:'stretch'}}></Image>
              </TouchableOpacity>
                  
              </View>
            </View>
            <View style={{ alignSelf: 'center', width: '99%', marginTop: 10, paddingHorizontal: 6 }}>
              <Text style={{ fontSize: 11, color: Mycolors.TEXT_COLOR }}>{viewmore ? resData.business_info ? resData.business_info.substring(0, 150) : resData.business_info : resData.business_info}</Text>
            {resData.business_info ? 
              <Text onPress={() => { setviewmore(!viewmore) }} style={{ color: 'red', textDecorationLine: "underline", fontSize: 12 }}>{viewmore ? 'View more' : 'View less'}</Text>
           : null}
            </View>

            <View style={{ alignItems: 'center', width: '96%', alignSelf: 'center', borderRadius: 10, overflow: 'hidden', marginTop: 10, }}>
              <MapView
                style={{
                  height: dimensions.SCREEN_HEIGHT * 22 / 100,
                  width: 400,
                  justifyContent: 'flex-end',
                  alignItems: 'center', borderRadius: 10
                }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: resData.latitude,
                  longitude: resData.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                customMapStyle={mapStyle}
                // showsUserLocation={true}
                // userLocationCalloutEnabled={true}
                // showsMyLocationButton={true}
                mapPadding={{ top: 30, right: 30, bottom: 30, left: 40 }}
                showsScale={true}
                // showsCompass={true} 
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
                coordinate={{ latitude: resData.latitude, longitude: resData.longitude}}
                    >
                <Image
                source={require('../../../assets/shape_33.png')}
                style={{width: 26, height: 28,
                  }}
                resizeMode="contain"
               /> 
               </Marker>

              </MapView>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#B2B7B9', borderWidth: 1, height: 70, width: '96%', marginHorizontal: 7, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, top: -6, borderTopColor: 'transparent', paddingLeft: 12 }}>
              <EvilIcons name="location" color={'#FFD037'} size={24} />
              <View style={{ width: '85%', marginLeft: 8 }}>
                <Text numberOfLines={2} style={{ fontSize: 13, fontWeight: '400', color: '#000' }} >{resData.address}</Text>
              </View>
            </View>
            <View style={{ marginTop: 20, marginLeft: 7 }}>
              <Text numberOfLines={2} style={{ fontSize: 16, fontWeight: '500', color: '#455A64', lineHeight: 16 }} >Service Offerings</Text>
            </View>

            <View style={{ width: '100%', alignSelf: 'center', }}>
              <FlatList
                data={resData.services}
                 horizontal={true}
                showsHorizontalScrollIndicator={false}
                // numColumns={3}
                renderItem={({ item, index }) => { 
                  return (    
                    <>
                      {item.attribute_value == 'yes' ?
                      item.attribute_label=='Delivery' ?
                      design1(require('../../../assets/Delivery_icon1.png'), 'Delivery', '', '23%', 42, 45, '', 20,() => {})
                      :
                      item.attribute_label=='Take Away' ?
                      design1(require('../../../assets/Take_away_icon.png'), 'Take Away', '', '23%', 42, 40, '', 20,() => {})
                      :
                      item.attribute_label=='Dining' ?
                     design1(require('../../../assets/dining_icon.png'), 'Dining', '', '23%', 42, 47, '', 20, () => {})
                      :
                      item.attribute_label=='Book A Table' ?
                     design1(require('../../../assets/Booked_table_icon.png'), 'Booked Table', '', '23%', 42, 42, '', 20, () => { })
                      :
                      null
                      :
                      null
                      }
                    </>
                  )
                }}
                keyExtractor={item => item.id}
              />
            </View>

            <View style={{ marginTop: 40, marginLeft: 7, marginBottom: 20 }}>
              <Text numberOfLines={2} style={{ fontSize: 16, fontWeight: '500', color: '#455A64', lineHeight: 16 }} >Badges</Text>
            </View>



            <FlatList
              data={resData.features}
              horizontal={true}
              style={{ marginBottom: 20, }}
              showsHorizontalScrollIndicator={false}
              // numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <ImageBackground source={require('../../../assets/badges_background.png')} style={styles.badgeContainer}>
                    <View style={styles.badgeView}>
                      <Image source={{ uri: item.attribute_image }} style={{ height: 25, width: 25 }} />
                    </View>
                    <Text style={styles.badgeText}>{item.attribute_value}</Text>
                  </ImageBackground>
                )
              }}
              keyExtractor={item => item.id}
            />

            <View style={{ width: 100, height: 100 }} />
          </ScrollView>
        </View>
      </Modal>



      {loading ? <Loader /> : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}

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
  dateIcon: {
    width: 22,
    height: 23,
    // marginRight:20
  },
  datePickerSelectInput: {
    height: 45,
    width: '100%',
    fontSize: 15,
    borderColor: null,
    backgroundColor: '#fff',
    borderRadius: 10,
    color: '#fff',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  badgeContainer: {
    // flexDirection:'row',
    justifyContent: 'center',
    // alignItems:'center',
    // width: '80%',
    width: 173,
    height: 102,
    marginBottom: 20,
    marginLeft: 7,
    backgroundColor: '#FFD037',
    borderRadius: 17,
    padding: 15,
    marginRight: 10
  },
  badgeView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginTop: 10
  },
  badgeTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%'
  }
});
export default FoodDetails 