import React, { useEffect, useState, useRef } from 'react';
import { RefreshControl, View, Image, Text, StyleSheet, Dimensions, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, FlatList, Alert, TouchableOpacity, Pressable, ScrollView, ImageBackground, TouchableWithoutFeedback, StatusBar } from 'react-native';
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
import { baseUrl, delete_Update_Address, user_selectedAddress, selectAddress_id, shop_eat_cart, shop_eat_cart_id, user_address, shop_eat_coupons_userid, shop_eat_cart_apply_coupon, login, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, shop_remove_coupon } from '../../../WebApi/Service'
import Loader from '../../../WebApi/Loader';
import MyAlert from '../../../component/MyAlert';
import { useSelector, useDispatch } from 'react-redux';
import GetLocation from 'react-native-get-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from "react-native-geolocation-service";
import { GoogleApiKey } from '../../../WebApi/GoogleApiKey'
import Geocoder from "react-native-geocoding";
import Toast from 'react-native-toast-message';
import { log } from 'react-native-reanimated';
import Tooltip from 'react-native-walkthrough-tooltip';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
const GOOGLE_MAPS_APIKEY = GoogleApiKey;
Geolocation.setRNConfiguration(GoogleApiKey);
Geocoder.init(GoogleApiKey);

const ShopCart = (props) => {
  const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  const [checkitem, setcheckitem] = useState('')
  const [res, setres] = useState('')
  const User = useSelector(state => state.user.user_details)
  const VenderDetails = useSelector(state => state.user.venderDeatil)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [resData, setresData] = useState([])
  const [promocode, setpromocode] = useState('')
  const [rescopun, setrescopun] = useState([{ "coupon_code": "KINENGO3", "coupon_name": "Dummy Coupon", "coupon_type": "flat", "discount_id": 9, "discount_value": "3.00", "expred_on": "2023-10-31", "image": "http://54.153.75.225/images/app-icons/offer2.jpg", "min_order_value": 10 }])
  const [discount_id, setdiscount_id] = useState(null)
  const [discountPrice, setdiscountPrice] = useState('0.0')
  const [subTotal, setsubTotal] = useState('0.0')
  const [dilivery, setdilivery] = useState('0.0')
  const [vendorCharges, setVendorCharges] = useState('0.0')
  const [isExactAddress, setIsExactAddress] = useState(true)
  const [needRemainingAddress, setNeedRemainingAddress] = useState(true)
  const [addressMethodData, setAddressMethodData] = useState([
    {
      id: '1',
      name1: 'Enter',
      name2: 'Complete Address',
      icon: require('../../../assets/danish_complete.png')
    },
    {
      id: '2',
      name1: 'Search',
      name2: 'Address',
      icon: require('../../../assets/danish_search.png')
    },
    {
      id: '3',
      name1: 'Current',
      name2: 'Address',
      icon: require('../../../assets/danish_current.png')
    },
  ])
  const [taxes, setTaxes] = useState('0.0')
  const [totla, settotal] = useState('0.0')
  const [applyedCoupen, setapplyedCoupen] = useState('')
  const [modlevisual, setmodlevisual] = useState(false)
  const [addressList, setaddressList] = useState(false)
  const [addressListData, setaddressListData] = useState([])
  const [landmark, setlandmark] = useState('');
  const [address_type, setaddress_type] = useState('2');
  const [city, setCity] = useState('');
  const [full_name, setfull_name] = useState('');
  const [area_village, setarea_village] = useState('');
  const [ShippingAddressPopUp, setShippingAddressPopUp] = useState(false);
  const [house_no, sethouse_no] = useState('');
  const [phone, setphone] = useState('');
  const [pincode, setpincode] = useState('');
  const [state, setstate] = useState('');
  const [selectedAddress, setselectedAddress] = useState(null);
  const [lat, setlat] = useState('28.6176')
  const [lan, setlan] = useState('77.422')
  const [ordertype, setordertype] = useState('delivery')
  const [reloades, setreloades] = useState(false)
  const [edit, setedit] = useState(false)
  const [AddressId, setAddressId] = useState(null)
  const [refreshing, setRefreshing] = useState(false);
  const [cookingIns, setcookingIns] = useState('')
  const [googleAddress, setGoogleAddress] = useState('');
  const [googleLatLng, setGoogleLatLng] = useState({});
  const [currentAddress, setCurrentAddress] = useState('');
  // const [currentLatLng, setCurrentLatLng] = useState({});
  const [chooseAddressModeModal, setChooseAddressModeModal] = useState(false);
  const [openGoogleAddressModal, setOpenGoogleAddressModal] = useState(false);
  const [openEnterCompleteAddressModal, setOpenEnterCompleteAddressModal] = useState(false);
  const [addressMode, setAddressMode] = useState(null);
  const [currentAddressData, setCurrentAddressData] = useState({});
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [promoEdit, setpromoEdit] = useState(true)
  const [remainingCompleteAddress, setRemainingCompleteAddress] = useState('')
  const [remainingFloor, setRemainingFloor] = useState('')
  const [remainingLandmark, setRemainingLandmark] = useState('')
  const [toolTipVisible, setToolTipVisible] = useState(false)

  useEffect(() => {
    console.log('hello ji ==>>', User);
    getcart()
    getCopun()
    getAddress()
    getDefaultAddress()
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        // console.log('locations latitude longitude',location);
        setlat(location.latitude)
        setlan(location.longitude)
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }, [])
  const checkcon = () => {
    getcart()
    getCopun()
    getAddress()
    getDefaultAddress()
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
  const putcart = async (item, add) => {

    setLoading(true)
    var data = ''
    if (add == '+') {
      data = {
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity + 1,
      }
    } else {
      if (item.quantity > 1) {
        data = {
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity - 1,
        }
      } else {
        deletcart(item)
      }

    }

    const { responseJson, err } = await requestPostApi(shop_eat_cart_id + item.id, data, 'PUT', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      Toast.show({ text1: responseJson.headers.message })

      getcart()

    } else {
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }

  const putAddress = async (item) => {
    var data = {
      // 'id':item.id
    }
    setLoading(true)
    const { responseJson, err } = await requestPostApi(selectAddress_id + item.id, data, 'PUT', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      Toast.show({ text1: responseJson.headers.message })
      setselectedAddress(item)
      setaddressList(false)
      getcart()
    } else {
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }

  const getDefaultAddress = async () => {

    setLoading(true)
    const { responseJson, err } = await requestGetApi(user_selectedAddress, '', 'GET', User.token)
    setLoading(false)
    console.log('the res get user_selectedAddress ==>>', responseJson)
    if (responseJson.headers.success == 1) {
      setselectedAddress(responseJson.body[0])
    } else {
      //  setalert_sms(err)
      //  setMy_Alert(true)
    }

  }

  const deletcart = async (item) => {

    setLoading(true)

    const { responseJson, err } = await requestPostApi(shop_eat_cart_id + item.id, '', 'DELETE', User.token)
    setLoading(false)
    console.log('the res==>>delete ', responseJson)
    if (responseJson.headers.success == 1) {
      Toast.show({ text1: responseJson.headers.message })
      getcart()
    } else {
      getcart()
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }
  const getcart = async () => {
    // setresData([])
    setLoading(true)
    const { responseJson, err } = await requestGetApi(shop_eat_cart, '', 'GET', User.token)
    setLoading(false)
    // console.log('the res get shop_eat_cart ==>>', responseJson.body.items.length)
    console.log('the res get shop_eat_cart ==>>', responseJson.body)
    if (responseJson.headers.success == 1) {
      if (responseJson.body.items.length == 0) {
        setres([])
        setresData([])
        setsubTotal('')
        setdilivery('')
        setVendorCharges('')
        setTaxes('')
        settotal('0')
        setreloades(!reloades)
      } else {
        if (responseJson.body.items[0].serviceType == 'Take Away') {
          setordertype('take-away')
        }
        setres(responseJson.body)
        var myCartItem = []
        for (let i = 1; i <= responseJson.body.items.length; i++) {
          if (responseJson.body.items[i - 1].serviceType != null) {
            myCartItem.push(responseJson.body.items[i - 1])
          }
        }
        setresData(myCartItem)
        // setresData(responseJson.body.items)
        setsubTotal(responseJson.body.sub_total)
        setdilivery(responseJson.body.delivery_charge)
        setVendorCharges(responseJson.body.vendor_charges)
        setdiscountPrice(responseJson.body.coupon_discount)
        setTaxes(responseJson.body.taxes)
        settotal(responseJson.body.total)
        if (responseJson.body.coupon.coupon_code != null) {
          setapplyedCoupen(responseJson.body.coupon)
          setpromocode(responseJson.body.coupon.coupon_code)
        }
        setreloades(!reloades)
      }
    } else {
      setres([])
      setresData([])
      setsubTotal('')
      setdilivery('')
      setVendorCharges('')
      setTaxes('')
      settotal('0')
      setreloades(!reloades)
    }
  }
  const deletAddress = async (item) => {
    console.log('itemsss', item);
    setLoading(true)

    const { responseJson, err } = await requestPostApi(delete_Update_Address + item.id, '', 'DELETE', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      Toast.show({ text1: responseJson.headers.message })
      getAddress()
      setreloades(!reloades)
    } else {

      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }
  const UpdateAddress = async (item) => {

    var data = {
      "location_name": full_name,
      "location_type": address_type,
      "latitude": lat,
      "longitude": lan,
      "address_line1": house_no,
      "address_line2": area_village,
      "city": city,
      "state": state,
      "country_id": 1,
      "is_default": 1
    }
    setLoading(true)
    const { responseJson, err } = await requestPostApi(delete_Update_Address + AddressId, data, 'PUT', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      Toast.show({ text1: responseJson.headers.message })
      setShippingAddressPopUp(false)
      setaddressList(true)
      setedit(false)
      setAddressId('')
      setfull_name('')
      setaddress_type('')
      sethouse_no('')
      setarea_village('')
      setCity('')
      setstate('')
      getAddress()
    } else {
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }
  const applyCoupan = async () => {
    if (promocode == null || promocode == '') {
      Toast.show({ text1: 'Please select coupon to avail discount' })
    } else {
      setLoading(true)
      var data = {
        discount_id: promocode,
      }
      const { responseJson, err } = await requestPostApi(shop_eat_cart_apply_coupon, data, 'POST', User.token)
      setLoading(false)
      console.log('the res shop_eat_cart_apply_coupon==>>', responseJson)
      if (responseJson.headers.success == 1) {
        Toast.show({ text1: responseJson.headers.message })
        setdiscountPrice(responseJson.body.coupon_discount)
        setsubTotal(responseJson.body.sub_total)
        setdilivery(responseJson.body.delivery_charge)
        setVendorCharges(responseJson.body.vendor_charges)
        setTaxes(responseJson.body.taxes)
        settotal(responseJson.body.total)
        setapplyedCoupen(responseJson.body.coupon)
        setpromoEdit(false)
        setreloades(!reloades)
      } else {
        Toast.show({ text1: responseJson.headers.message })
        // Toast.show({text1:'Invalid Coupon Code. Please try again.'})
      }
    }

  }
  const removeCoupan = async () => {
    setLoading(true)
    var data = {
      discount_id: promocode,
      // discount_id: discount_id,
      // discount_price: pri,
    }
    const { responseJson, err } = await requestPostApi(shop_remove_coupon, data, 'POST', User.token)
    setLoading(false)
    console.log('remove coupon response', responseJson)
    console.log('remove coupon response body', responseJson.body)
    if (responseJson.headers.success == 1) {
      Toast.show({ text1: responseJson.headers.message })
      setdiscountPrice(responseJson.body.coupon_discount)
      setsubTotal(responseJson.body.sub_total)
      setdilivery(responseJson.body.delivery_charge)
      setVendorCharges(responseJson.body.vendor_charges)
      setTaxes(responseJson.body.taxes)
      settotal(responseJson.body.total)
      setapplyedCoupen('')
      setpromocode('')
      setdiscount_id(null)
      setpromoEdit(true)
      setreloades(!reloades)
    } else {
      Toast.show({ text1: responseJson.headers.message })
      // setalert_sms(err)
      // setMy_Alert(true)
    }


  }
  const AddAddress = async () => {
    // if (full_name == '') {
    //   Toast.show({ text1: 'Please Enter Complete Address' })

    // } else if (pincode == '') {
    //   Toast.show({ text1: 'Please Enter Zip code' })

    // } else 
    if (state == '') {
      Toast.show({ text1: 'Please Enter State' })

    } else if (city == '') {
      Toast.show({ text1: 'Please Enter City' })

    } else if (house_no == '') {
      Toast.show({ text1: 'Please Enter Address' })

    } 
    // else if (landmark == '') {
    //   Toast.show({ text1: 'Please Enter Landmark' })
    // }
    // addres (house_no), colony (area_village), landmark (landmark) 
    else {
      setLoading(true)
      var data = {
        "location_name": full_name,
        "location_type": address_type,
        "latitude": lat,
        "longitude": lan,
        "address_line1": house_no,
        "address_line2": area_village,
        "landmark": landmark,
        "city": city,
        "state": state,
        "country_id": 1,
        "is_default": 1
      }
      console.log('Ashush===>>', data);
      const { responseJson, err } = await requestPostApi(user_address, data, 'POST', User.token)
      setLoading(false)
      console.log('the res user_address set==>>', responseJson)
      if (responseJson.headers.success == 1) {
        getAddress()
        setfull_name('')
        setaddress_type('')
        sethouse_no('')
        setarea_village('')
        setlandmark('')
        setCity('')
        setstate('')
        setShippingAddressPopUp(false)
      } else {
        // setalert_sms(err)
        // setMy_Alert(true)
      }

    }


  }
  const getMatches = (str) => {
    var count = (str.match(/,/g) || []).length;
    return count
  }
  const getLastIndex = (str) => {
    return str.lastIndexOf(",")
  }
  const AddAddressUsingGoogleSearch = async () => {
    console.log('googleAddress.terms', googleAddress.terms);
    if (googleAddress === '') {
      Toast.show({ text1: 'Please Add Address' })
      return
    }
    var mylast = googleAddress.terms.length
    let line = ''
    console.log('googleAddress.terms', googleAddress.terms);
    // incomplete address was searched (contained 4 terms)
    // if(needRemainingAddress){
    if (false) {
      let remaining = ''
      remaining += remainingCompleteAddress
      if (remainingFloor) {
        remaining += ', ' + remainingFloor
      }
      if (remainingLandmark) {
        remaining += ', ' + remainingLandmark
      }
      line = [remaining, googleAddress.terms[mylast - 4].value].join(', ')
    } else {
      let remaining = ''
      remaining += remainingCompleteAddress
      if (remainingFloor) {
        remaining += ', ' + remainingFloor
      }
      if (remainingLandmark) {
        remaining += ', ' + remainingLandmark
      }
      // complete address was searched (contained more than 4 terms)
      // 4 to length of googleAddress.terms
      for (let i = googleAddress.terms?.length; i >= 4; i--) {
        if (i !== googleAddress.terms?.length) {
          if (!googleAddress.terms[mylast - i].value.startsWith(', '))
            line += ', '
        }
        line += googleAddress.terms[mylast - i].value
      }
      // line = remaining + ', ' + line
      if (line) {
        line = remaining + ', ' + line
      } else {
        line = remaining
      }
    }

    console.log('imp line', line);
    setLoading(true)
    var data = {
      "location_name": '',
      "location_type": '1',
      "latitude": googleLatLng.lat,
      "longitude": googleLatLng.lng,
      // "address_line1": googleAddress.description,
      "address_line1": line,
      "address_line2": '',
      "city": googleAddress.terms[mylast - 3].value,
      "state": googleAddress.terms[mylast - 2].value,
      "country_id": 1,
      "is_default": 1,
    }
    console.log('google address', data);
    const { responseJson, err } = await requestPostApi(user_address, data, 'POST', User.token)
    setLoading(false)
    setOpenGoogleAddressModal(false)
    console.log('the res google user_address set==>>', responseJson)
    if (responseJson.headers.success == 1) {
      getAddress()
      setRemainingCompleteAddress('')
      setRemainingFloor('')
      setRemainingLandmark('')
      setGoogleLatLng({})
      setGoogleAddress('')
      setShippingAddressPopUp(false)
    } else {
      // setalert_sms(err)
      // setMy_Alert(true)
    }


  }
  const AddAddressUsingCurrentLoation = async (latLng, currentAddress) => {

    let matches = getMatches(currentAddress)
    console.log('matches', matches);
    const addressData = {
      country: '',
      state: '',
      city: '',
      address_line1: '',
    }
    let addressValue = currentAddress
    console.log('currentAddress', currentAddress);
    let lastindex = null
    let partOfString = null
    if (matches > 3) {
      matches = 3
    }
    for (let i = 0; i < matches + 1; i++) {
      lastindex = getLastIndex(addressValue)
      if (i !== 3) {
        partOfString = addressValue.substring(lastindex + 1)
        addressValue = addressValue.substring(0, lastindex)
      }
      // console.log('lastindex', lastindex);
      // console.log('partOfString', partOfString);
      // console.log('addressValue', addressValue);
      if (i == 0) {
        addressData.country = partOfString?.trim()
      } else if (i == 1) {
        addressData.state = partOfString?.trim()
      } else if (i == 2) {
        addressData.city = partOfString?.trim()
      } else if (i == 3) {
        // addressData.address_line1 = addressValue?.trim()
        addressData.address_line1 = addressValue?.trim()?.replace(/[0-9]/g, '')?.trim()
      }
      console.log('addressData', addressData);
      // if(i == 3){
      //   break
      // }
    }
    setLoading(true)
    var data = {
      "location_name": '',
      "location_type": '1',
      "latitude": latLng.lat,
      "longitude": latLng.lng,
      // "address_line1": house_no,
      "address_line2": '',
      // "city": city,
      // "state": state,
      "country_id": 1,
      "is_default": 1,
      ...addressData
    }
    // console.log('addressData', addressData);
    console.log('current address data===>>', data);
    const { responseJson, err } = await requestPostApi(user_address, data, 'POST', User.token)
    setLoading(false)

    console.log('the res current user_address set==>>', responseJson)
    if (responseJson.headers.success == 1) {
      getAddress()
      setfull_name('')
      setaddress_type('')
      sethouse_no('')
      setarea_village('')
      setCity('')
      setstate('')
      setShippingAddressPopUp(false)
    } else {
      // setalert_sms(err)
      // setMy_Alert(true)
    }


  }
  const AddAddressUsingCurrentLoation1 = async (latLng, currentAddress) => {
    console.log('AddAddressUsingCurrentLoation1 inside');
    let matches = getMatches(currentAddress)
    console.log('matches', matches);
    const addressData = {
      country: '',
      state: '',
      city: '',
      address_line2: '',
      area_name: '',
    }
    let addressValue = currentAddress
    console.log('AddAddressUsingCurrentLoation1 currentAddress', currentAddress);
    let lastindex = null
    let partOfString = null
    if (matches > 3) {
      matches = 3
    }
    for (let i = 0; i < matches + 1; i++) {
      lastindex = getLastIndex(addressValue)
      if (i !== 3) {
        partOfString = addressValue.substring(lastindex + 1)
        addressValue = addressValue.substring(0, lastindex)
      }
      // console.log('lastindex', lastindex);
      // console.log('partOfString', partOfString);
      // console.log('addressValue', addressValue);
      if (i == 0) {
        addressData.country = partOfString?.trim()
      } else if (i == 1) {
        addressData.state = partOfString?.trim()
      } else if (i == 2) {
        addressData.city = partOfString?.trim()
      } else if (i == 3) {
        // addressData.address_line1 = addressValue?.trim()
        // addressData.area_name = addressValue?.trim()?.replace(/[0-9]/g, '')?.trim()
        addressData.area_name = addressValue?.trim()
      }
      console.log('AddAddressUsingCurrentLoation1 addressData', addressData);
      // if(i == 3){
      //   break
      // }
    }
    // setLoading(true)
    var data = {
      "location_name": '',
      "location_type": '1',
      "latitude": latLng.lat,
      "longitude": latLng.lng,
      // "address_line1": house_no,
      "address_line1": '',
      "address_line2": '',
      // "city": city,
      // "state": state,
      "country_id": 1,
      "is_default": 1,
      ...addressData
    }
    setCurrentAddressData({ parts: data, full: currentAddress })
    setOpenEnterCompleteAddressModal(true)
    // // console.log('addressData', addressData);
    // console.log('current address data===>>', data);
    // const { responseJson, err } = await requestPostApi(user_address, data, 'POST', User.token)
    // setLoading(false)

    // console.log('the res current user_address set==>>', responseJson)
    // if (responseJson.headers.success == 1) {
    //   getAddress()
    //   setfull_name('')
    //   setaddress_type('')
    //   sethouse_no('')
    //   setarea_village('')
    //   setCity('')
    //   setstate('')
    //   setShippingAddressPopUp(false)
    // } else {
    //   // setalert_sms(err)
    //   // setMy_Alert(true)
    // }


  }
  const AddAddressUsingCurrentLoation2 = async () => {
    let line = ''
    line += remainingCompleteAddress
    if (remainingFloor) {
      line += ', ' + remainingFloor
    }
    if (remainingLandmark) {
      line += ', ' + remainingLandmark
    }
    if (currentAddressData.parts.area_name) {
      line += ', ' + currentAddressData.parts.area_name
    }
    // const line = [remainingCompleteAddress, remainingFloor, remainingLandmark, currentAddressData.parts.area_name].join(', ')
    // setLoading(true)
    const addressDataCopy = { ...currentAddressData.parts }
    addressDataCopy.address_line1 = line
    console.log('current address data===>>', addressDataCopy);
    var data = {
      "location_name": '',
      "location_type": '1',
      // "latitude": latLng.lat,
      // "longitude": latLng.lng,
      // "address_line1": house_no,
      "address_line2": '',
      // "city": city,
      // "state": state,
      "country_id": 1,
      "is_default": 1,
      ...addressDataCopy
    }
    console.log('updated address data', data);
    // console.log('current address data===>>', data);
    const { responseJson, err } = await requestPostApi(user_address, data, 'POST', User.token)
    setLoading(false)

    console.log('current address res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      getAddress()
      setRemainingCompleteAddress('')
      setRemainingFloor('')
      setRemainingLandmark('')
      setOpenEnterCompleteAddressModal(false)
    } else {
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }
  const myposition = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLoading(true)
        let My_cord = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            console.log('The address is', json.results[0].formatted_address);
            setLoading(false)
            // AddAddressUsingCurrentLoation({ lat: position.coords.latitude, lng: position.coords.longitude }, json.results[0].formatted_address)
            AddAddressUsingCurrentLoation1({ lat: position.coords.latitude, lng: position.coords.longitude }, json.results[0].formatted_address)
          })
          .catch(error => {
            setLoading(false)
            Toast.show({ text1: 'Something went wrong while fetching current address' })
            console.warn(error)
          });
      },
      error => {
        setLoading(false)
        Toast.show({ text1: error.message.toString() });
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );
  }
  const getAddress = async () => {
    setLoading(true)
    const { responseJson, err } = await requestGetApi(user_address, '', 'GET', User.token)
    setLoading(false)
    console.log('getAddress response', responseJson.body);
    console.log('the res get user_address get==>>body', responseJson.body.length)
    if (responseJson != null) {
      if (responseJson.headers.success == 1) {
        setaddressListData(responseJson.body)
        setselectedAddress(responseJson.body.find(el => el.is_default == '1'))

        //  setselectedAddress(responseJson.body[responseJson.body.length-1])
      } else {
        // setaddressListData(null)
        setselectedAddress(null)
        //  setalert_sms(err)
        //  setMy_Alert(true)
      }
    } else {
      // setaddressListData(null)
      setselectedAddress(null)
    }

  }
  const getCopun = async () => {

    setLoading(true)

    const { responseJson, err } = await requestGetApi(shop_eat_coupons_userid + VenderDetails.userid, '', 'GET', User.token)
    setLoading(false)
    console.log('the res get shop_eat_coupons_userid ==>>', responseJson)
    if (responseJson.headers.success == 1) {
      setrescopun(responseJson.body)
    } else {
      //  setalert_sms(err)
      //  setMy_Alert(true)
    }

  }
  const openAddressModel = () => {
    // if(addressMode == ''){
    //    setalert_sms('Please select address method')
    //    setMy_Alert(true)
    //   return
    // }
    if (addressMode == '1') {
      setShippingAddressPopUp(true)
    } else if (addressMode == '2') {
      setOpenGoogleAddressModal(true)
    } else if (addressMode == '3') {
      myposition()
    }
    setChooseAddressModeModal(false)
  }
  const flatliistDesign = (item, img, ti, rs, des, mpress, apress, dpress, qty) => {
    return (
      <View style={{
        width: '100%', marginHorizontal: 5, marginVertical: 8, padding: 10, backgroundColor: '#fff',
        // borderColor: '#dee4ec',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 1,
        shadowOpacity: 0.3,
        shadowColor: '#555555',
        // borderWidth: 1,
        elevation: 5, borderRadius: 10, alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
      }}
      >
        <View style={{ width: 120, height: 120, alignSelf: 'center', borderRadius: 10, borderWidth: 3, borderColor: '#dee4ec' }}>
          <Image source={{ uri: img }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 10, resizeMode: 'stretch' }} ></Image>
        </View>
        <View style={{ marginLeft: 15, width: '58%', top: -10 }}>
          <View style={{}}>
            <Text style={{ color: '#C1C1C1', fontWeight: '600', fontSize: 15, marginTop: 0 }} >{item.business_name}</Text>
          </View>

          <Text numberOfLines={2} style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 14, marginTop: 6 }} >{rs}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 14, marginTop: 6 }} >${Number(item.price).toFixed(2)}</Text>

          </View>

        </View>
        <TouchableOpacity style={{ position: 'absolute', width: 20, height: 22, top: 10, right: 10, borderRadius: 3, justifyContent: 'center' }}
          onPress={dpress}>
          <Image source={require('../../../assets/bin.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'stretch' }} ></Image>
        </TouchableOpacity>
        <View style={{ width: 100, height: 30, flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 70, position: 'absolute', bottom: 5, right: 0 }}>
          <TouchableOpacity style={{ width: 28, height: 28, borderRadius: 20, backgroundColor: '#FFE2E6', justifyContent: 'center' }}
            onPress={mpress}>
            <Text style={{ textAlign: 'center', fontSize: 25, color: 'red', top: -4 }}>-</Text>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 10, color: Mycolors.Black }}>{qty}</Text>
          <TouchableOpacity style={{ width: 28, height: 28, borderRadius: 20, backgroundColor: 'red', justifyContent: 'center' }}
            onPress={apress}>
            <Text style={{ textAlign: 'center', fontSize: 25, color: '#fff', top: -3 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View>
        <HomeHeader height={60} paddingHorizontal={15} backgroundColor={'#fff'}
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/arrow.png')} img1width={18} img1height={15}
          press2={() => { }} title2={'Cart'} fontWeight={'500'} img2height={20}
          press3={() => { }} img3width={25} img3height={25} />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}

          />
        }
      >

        <View style={{ width: '92%', alignSelf: 'center', marginTop: 8 }}>

          {resData.length > 0 ?
            resData.map((item, index) => {
              return (
                <View>
                  {flatliistDesign(item, item.image, item.category, item.name, '$' + item.price, () => { putcart(item, '-') }, () => { putcart(item, '+') }, () => { deletcart(item) }, item.quantity)}
                </View>
              )
            }
            )
            : null
          }
          {resData.length > 0 ?
            <View>
              {ordertype != 'take-away' ?
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8, width: '100%', marginTop: 18 }}>
                    <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 14, }} >Choose Delivery Address</Text>
                    {/* <Text style={{ color: Mycolors.RED, fontSize: 13, }} onPress={() => { setShippingAddressPopUp(true) }}>Add Address</Text> */}
                    <Text style={{ color: Mycolors.RED, fontSize: 13, }} onPress={() => { setChooseAddressModeModal(true) }}>Choose Address</Text>
                  </View>
                  {selectedAddress != null ?
                    <View style={{
                      width: '100%', marginHorizontal: 5, marginVertical: 5, padding: 20, backgroundColor: '#fff',
                      // borderColor: '#dee4ec',
                      // borderWidth: 1,
                      shadowOffset: {
                        width: 0,
                        height: 10
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.9,
                      shadowColor: '#555555',
                      elevation: 5, borderRadius: 10, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                    }}
                    >

                      <View style={{ width: '80%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>Location Name : {selectedAddress.location_name}</Text>
                        <Text style={{ fontSize: 13, marginVertical: 5, color: '#000' }}>{selectedAddress.address_line1} , {selectedAddress.city} , {selectedAddress.state}</Text>
                        <Text style={{ fontSize: 13, color: '#000' }}>{selectedAddress.address_line2}</Text>
                      </View>
                      <TouchableOpacity style={{ width: 25, height: 40, alignSelf: 'center', right: 5 }} onPress={() => { setaddressList(true) }}>
                        <Image source={require('../../../assets/arrow_right_black.png')} style={{ width: 25, height: 40, resizeMode: 'stretch' }} ></Image>
                      </TouchableOpacity>
                    </View>
                    : null}

                </View>
                : null}

              <View style={{ width: '100%', marginHorizontal: 5, height: 100, borderRadius: 2, marginTop: 10, alignSelf: 'center' }}>

                <TextInput
                  value={cookingIns}
                  onChangeText={(e) => setcookingIns(e)}
                  placeholder={'Add Cooking Instructions'}
                  placeholderTextColor="#bbbbbb"
                  multiline={true}
                  // maxLength={500}
                  // keyboardType="number-pad"
                  autoCapitalize='none'
                  style={{
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
                  }}
                />

              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, width: '100%' }}>
                <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 14, }} >Coupons</Text>
                <Text style={{ color: Mycolors.RED, fontSize: 13, }} onPress={() => { setmodlevisual(true) }}>View All</Text>
              </View>

              <View style={{ width: dimensions.SCREEN_WIDTH - 30, marginTop: 3, alignSelf: 'center', marginBottom: 15 }}>

                <TextInput
                  value={promocode}
                  onChangeText={(text) => {
                    setpromocode(text)
                  }}
                  placeholder="Promo Code"
                  editable={promoEdit}
                  placeholderTextColor={Mycolors.placeholdercolor}
                  style={[styles.input, { paddingRight: 70 }]}
                />
                <View style={{ position: 'absolute', right: 3, top: 3, backgroundColor: 'red', paddingHorizontal: 10, height: 40, justifyContent: 'center', borderRadius: 5 }}>
                  <TouchableOpacity onPress={() => { applyCoupan() }} style={{ with: '100%', height: '100%', justifyContent: 'center', }}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>



              {applyedCoupen != '' ?
                <View style={{
                  width: '100%', marginHorizontal: 5, marginVertical: 5, padding: 12, backgroundColor: '#fff',
                  borderColor: '#dee4ec', borderWidth: 1, elevation: 5, borderRadius: 7, alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
                }}
                >
                  <View style={{ width: 25, height: 25, alignSelf: 'center', borderRadius: 2, borderWidth: 0.5, borderColor: '#dee4ec' }}>
                    <Image source={{ uri: applyedCoupen.image }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 2, resizeMode: 'stretch' }} ></Image>
                  </View>
                  <View style={{ marginLeft: 10, width: '63%' }}>
                    <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13 }} >{applyedCoupen.coupon_desc}</Text>
                    <Text style={{ color: Mycolors.GREEN, fontSize: 11, marginTop: 5, marginBottom: 5 }} >Save ${applyedCoupen.discount_value} with this code</Text>
                    <MyButtons title={applyedCoupen.coupon_code} height={27} width={'50%'} borderRadius={15} alignSelf="flex-start" press={() => {
                      setpromocode(applyedCoupen.coupon_code)
                      setdiscount_id(applyedCoupen.discount_id)
                    }}
                      // marginHorizontal={20} 
                      fontSize={12}
                      titlecolor={Mycolors.RED} borderColor={Mycolors.RED} borderWidth={0.5} backgroundColor={'transparent'} fontWeight={'300'} />
                  </View>
                  <TouchableOpacity onPress={removeCoupan} style={{ paddingHorizontal: 10, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} >
                    <Text style={{ color: 'red', textAlign: 'center' }}>Remove</Text>
                  </TouchableOpacity>
                  {/* <View style={{ position: 'absolute', right: 10, top: 10 }}>
                    <View style={{ width: 80, }}>
                      <TouchableOpacity onPress={removeCoupan} style={{paddingHorizontal: 10, height: 30, justifyContent: 'center', alignItems:'center', borderRadius: 5}} >
                        <Text style={{color:'red', textAlign:'center'}}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View> */}
                </View>
                : null
              }

              <View style={{
                width: '100%', marginHorizontal: 5, marginVertical: 5, padding: 10, backgroundColor: '#fff',
                elevation: 5, borderRadius: 7, alignSelf: 'center'
              }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                  <Text style={{ color: Mycolors.Black, fontSize: 13, fontWeight: '600' }} >Sub Total</Text>
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginTop: 5 }} >${Number(subTotal).toFixed(2)}</Text>
                </View>
                {ordertype != 'take-away' ?
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 5 }}>
                    <Tooltip
                      isVisible={toolTipVisible}
                      showChildInTooltip={false}
                      content={
                        <View style={{ height: 100 }}>
                          <Text style={{ color: Mycolors.Black, fontSize: 13, }}>Delivery fees is calculated on the basis of the distance covered by driver in miles {'\n'}
                            At present delivery fees has been set to $1 per mile so the total distance is <Text style={{ fontWeight: "bold" }}>{Number(res.delivery_charge).toFixed(2)} miles</Text> and total delivery fees is <Text style={{ fontWeight: "bold" }}>${Number(res.delivery_charge).toFixed(2)}</Text></Text>
                        </View>
                      }
                      onClose={() => setToolTipVisible(false)}
                      placement="top"
                      // below is for the status bar of react navigation bar
                      topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
                    >
                      <TouchableOpacity onPress={() => { setToolTipVisible(true) }} style={{ flexDirection: 'row' }} >
                        <Text style={{ color: Mycolors.Black, fontSize: 13, }} >Delivery Charges</Text>
                        <View style={{ width: 15, height: 15, borderRadius: 20, backgroundColor: Mycolors.BTN_LINEAR_END_COLOR, justifyContent: 'center', left: 5 }}>
                          <Image source={require('../../../assets/info.png')} style={{ width: 10, height: 10, alignSelf: 'center' }}></Image>
                        </View>
                      </TouchableOpacity>
                    </Tooltip>
                    <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginTop: 5 }} >${Number(dilivery).toFixed(2)}</Text>
                  </View>
                  : null}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 5 }}>
                  <Text style={{ color: Mycolors.Black, fontSize: 13, }} >Vendor Charges</Text>
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginTop: 5 }} >${vendorCharges}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 5 }}>
                  <Text style={{ color: Mycolors.Black, fontSize: 13, }} >Taxes</Text>
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginTop: 5 }} >${Number(taxes).toFixed(2)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 5 }}>
                  <Text style={{ color: Mycolors.Black, fontSize: 13, }} >Discount</Text>
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginTop: 5 }} >-${Number(discountPrice).toFixed(2)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#ADC430', height: 46, alignItems: "center", borderRadius: 7, padding: 10 }}>
                  <Text style={{ color: Mycolors.Black, fontSize: 14, fontWeight: '600' }} >Total Cost</Text>
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, fontWeight: '600', textAlign: 'center' }} >${Number(totla).toFixed(2)}</Text>
                </View>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 25 }}>
                <MyButtons title="Proceed to payment" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => {
                  if (selectedAddress != null) {
                    props.navigation.navigate('ShopPayment', { address: selectedAddress, orderType: ordertype, cooking: cookingIns })
                  } else {
                    Toast.show({ text1: 'Please Add Address' })
                  }

                }} marginHorizontal={20} fontSize={14}
                  titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} hLinearColor={['#b10027', '#fd001f']} />
              </View>

            </View>
            :
            <View style={{ justifyContent: 'center', alignSelf: 'center', height: dimensions.SCREEN_HEIGHT - 250 }}>
              <Image style={{ width: 150, height: 150, alignSelf: 'center' }} source={require('../../../assets/Cart.png')}></Image>
              <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 20, color: '#000' }}>Your cart is empty.</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 4, color: '#000' }}> Please add </Text>
                <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 4, color: 'red', textDecorationLine: 'underline' }} onPress={() => { props.navigation.navigate('ShopEat') }}>items </Text>
                <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 4, color: '#000', }}>to order.</Text>

              </View>
            </View>
          }


        </View>


        <View style={{ height: 100 }} />
      </ScrollView>

      {modlevisual ?
        <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH, height: dimensions.SCREEN_HEIGHT, backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', left: 0, top: 0, justifyContent: 'center' }} onPress={() => { setmodlevisual(false) }}>
          <View style={{ height: 300, backgroundColor: '#fff', borderRadius: 30, position: 'absolute', width: '95%', borderColor: '#fff', borderWidth: 0.3, alignSelf: 'center', padding: 10 }}>

            {rescopun.length > 0 ?
              rescopun.map((item, index) => {
                return (
                  <View style={{
                    width: '100%', marginHorizontal: 5, marginVertical: 5, padding: 10, backgroundColor: '#fff',
                    borderColor: '#dee4ec', borderWidth: 1, elevation: 5, borderRadius: 7, alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
                  }}
                  >
                    <View style={{ width: 25, height: 25, alignSelf: 'center', borderRadius: 2, borderWidth: 0.5, borderColor: '#dee4ec' }}>
                      <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 2, resizeMode: 'stretch' }} ></Image>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13 }} >{item.coupon_name}</Text>
                      <Text style={{ color: Mycolors.GREEN, fontSize: 11, marginTop: 5 }} >Save ${item.discount_value} with this code</Text>
                    </View>
                    <View style={{ position: 'absolute', right: 10, top: 10 }}>
                      <View style={{ width: 80, }}>
                        <MyButtons title={item.coupon_code} height={27} width={'100%'} borderRadius={15} alignSelf="center" press={() => {
                          setpromocode(item.coupon_code)
                          setdiscount_id(item.discount_id)
                          setmodlevisual(false)
                        }} marginHorizontal={20} fontSize={12}
                          titlecolor={Mycolors.RED} borderColor={Mycolors.RED} borderWidth={0.5} backgroundColor={'transparent'} fontWeight={'300'} />
                      </View>
                    </View>
                  </View>
                )
              }
              )
              :
              <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: '#000' }}>No Coupons Found</Text>
              </View>
            }







          </View>

        </TouchableOpacity>
        : null
      }

      <Modal
        isVisible={ShippingAddressPopUp}
        swipeDirection="down"
        onBackdropPress={() => setShippingAddressPopUp(false)}
        onSwipeComplete={(e) => {
          setShippingAddressPopUp(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        onModalWillShow={() => { setAddressMode('1') }}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >

        {/* <View style={{ width: dimensions.SCREEN_WIDTH, height: dimensions.SCREEN_HEIGHT, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}> */}

        <View style={{ width: '100%', height: dimensions.SCREEN_HEIGHT * 80 / 100, position: 'absolute', bottom: 0, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: '#fff' }}>
          <KeyboardAwareScrollView>



            <View style={{ marginTop: 15, height: 30, justifyContent: "center", alignItems: 'center' }}>
              {/* <View onPress={()=>{}} style={{borderBottomWidth:1, alignSelf:'center', borderColor: '#000000', marginVertical:5}} /> */}
              <TouchableOpacity
                onPress={() => setShippingAddressPopUp(false)}
                // style={{
                //   width: '20%',
                //   borderWidth: 2,
                //   borderColor: 'grey',
                //   marginBottom:5,
                //   // ...style
                // }}
                style={{ width: 50, height: 4, backgroundColor: Mycolors.GrayColor, borderRadius: 2, alignSelf: 'center', marginBottom: 5 }}
              />
              <Text style={{ marginTop: 2, textAlign: 'center', fontSize: 22, color: '#000000', fontWeight: '500' }}>Add Address</Text>


            </View>
            {/* <TouchableOpacity onPress={() => { setShippingAddressPopUp(false) }}
                style={{ position: "absolute", width: 30, borderRadius: 35, height: 30, right: 10, top: 10 }}>
                <Image
                  source={require('../../../assets/crossed.png')}
                  style={{
                    width: 35,
                    height: 35, alignSelf: 'center'
                  }}

                />
              </TouchableOpacity> */}
            {/* <TextInput style={styles.textInput}
              placeholder='Complete Address'
              placeholderTextColor="#8F93A0"
              label="complete address"
              value={full_name}
              onChangeText={e => setfull_name(e)}
            /> */}
            {/* <TextInput style={styles.textInput}
                                          placeholder='Phone number'
                                          placeholderTextColor="#8F93A0"
                                          maxLength={12}
                                          label="phone"
                                          value={phone}
                                          onChangeText={e => setphone(e)}
                                      /> */}
            <TextInput style={styles.textInput}
              placeholder='State'
              placeholderTextColor="#8F93A0"
              label="state"
              value={state}
              onChangeText={e => setstate(e)}
            />
            <TextInput style={styles.textInput}
              placeholder='City'
              placeholderTextColor="#8F93A0"
              label="ity"
              value={city}
              onChangeText={e => setCity(e)}
            />
            <TextInput style={styles.textInput}
              placeholder='Complete Address'
              placeholderTextColor="#8F93A0"
              value={house_no}
              onChangeText={e => sethouse_no(e)}
            />
            {/* <TextInput style={styles.textInput}
              placeholder='Zip code'
              placeholderTextColor="#8F93A0"
              label="pincode"

              maxLength={9}
              value={pincode}
              onChangeText={e => setpincode(e)}
            /> */}
            <TextInput style={styles.textInput}
              // placeholder='Area Colony'
              placeholder='Colony'
              placeholderTextColor="#8F93A0"
              label="area village"
              value={area_village}
              onChangeText={e => setarea_village(e)}
            />
            <TextInput style={styles.textInput}
              placeholder='Landmark'
              placeholderTextColor="#8F93A0"
              label="landmark"
              value={landmark}
              onChangeText={e => setlandmark(e)}
            />

            <View style={{ height: 45, width: "98%", marginTop: 14, alignItems: 'flex-start', justifyContent: "flex-start", marginLeft: 10 }}>

              <Text style={{ color: 'black', textAlign: "left", fontSize: 16, fontWeight: "400", marginLeft: 10 }}>Address Type</Text>

              <View style={{ height: 45, width: "90%", marginTop: 5, alignItems: 'center', justifyContent: "flex-start", flexDirection: "row" }}>

                <View
                  style={{
                    marginLeft: 10,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setaddress_type('1')
                    }}>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <View style={{ width: 17, height: 17, borderRadius: 15, borderColor: '#000', borderWidth: 0.5, justifyContent: 'center' }}>
                        <View style={{ width: 12, height: 12, borderRadius: 15, justifyContent: 'center', alignSelf: 'center', backgroundColor: address_type == '1' ? '#000' : 'transparent' }} />
                      </View>
                      <Text
                        style={{
                          fontWeight: "500",
                          textAlign: 'left',
                          fontSize: 11,
                          color: "black",
                          marginLeft: 3
                        }}>
                        Home
                      </Text>
                    </View>

                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginLeft: 30,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setaddress_type('2')
                    }}>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <View style={{ width: 17, height: 17, borderRadius: 15, borderColor: '#000', borderWidth: 0.5, justifyContent: 'center' }}>
                        <View style={{ width: 12, height: 12, borderRadius: 15, justifyContent: 'center', alignSelf: 'center', backgroundColor: address_type == '2' ? '#000' : 'transparent' }} />
                      </View>

                      <Text
                        style={{
                          fontWeight: "500",
                          textAlign: 'left',
                          fontSize: 11,
                          color: "black",
                          marginLeft: 4
                        }}>
                        Work
                      </Text>
                    </View>

                  </TouchableOpacity>
                </View>

              </View>
            </View>
            {/* <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 0, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 60 }}>
                                          <TouchableOpacity
                                              onPress={() => {AddAddress()}} >
                                              <View style={{ justifyContent: 'center', width: 200, flex: 1, backgroundColor: '#ffcc00', borderRadius: 50 }}>
                                                  <Text style={{textAlign:'center'}}>Save</Text>
                                              </View>
                                          </TouchableOpacity>
                                      </View> */}
            <View style={{ width: '95%', alignSelf: 'center', marginTop: 55 }}>
              <MyButtons title={edit ? "Update" : "Save"} height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => {
                edit ? UpdateAddress() : AddAddress()
              }}
                // marginHorizontal={20} 
                fontSize={14}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} hLinearColor={['#b10027', '#fd001f']} />
            </View>

            <View style={{ width: '100%', height: 200 }}></View>

            {loading ? <Loader /> : null}
          </KeyboardAwareScrollView>


        </View>


        {/* </View> */}
      </Modal>
      <Modal
        isVisible={openEnterCompleteAddressModal}
        swipeDirection="down"
        onBackdropPress={() => setOpenEnterCompleteAddressModal(false)}
        onSwipeComplete={(e) => {
          setOpenEnterCompleteAddressModal(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >

        {/* <View style={{ width: dimensions.SCREEN_WIDTH, height: dimensions.SCREEN_HEIGHT, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}> */}

        <View style={{ width: '100%', height: dimensions.SCREEN_HEIGHT * 70 / 100, position: 'absolute', bottom: 0, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: '#fff' }}>
          <KeyboardAwareScrollView>



            <View style={{ marginTop: 15, height: 90, justifyContent: "center", alignItems: 'center' }}>
              {/* <View onPress={()=>{}} style={{borderBottomWidth:1, alignSelf:'center', borderColor: '#000000', marginVertical:5}} /> */}
              <TouchableOpacity
                onPress={() => setOpenEnterCompleteAddressModal(false)}
                // style={{
                //   width: '20%',
                //   borderWidth: 2,
                //   borderColor: 'grey',
                //   marginBottom:5,
                //   // ...style
                // }}
                style={{ width: 50, height: 4, backgroundColor: Mycolors.GrayColor, borderRadius: 2, alignSelf: 'center', marginBottom: 5 }}
              />
              <Text style={{ color: Mycolors.RED, textAlign: "center", fontSize: 13, marginHorizontal: 20, marginTop: 10 }}><Text style={{ color: '#000' }}>Current Address:</Text> {currentAddressData.full}</Text>
              <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 18, color: '#000000', fontWeight: '500', }}>Enter Complete Address</Text>


            </View>
            {/* <TouchableOpacity onPress={() => { setShippingAddressPopUp(false) }}
                style={{ position: "absolute", width: 30, borderRadius: 35, height: 30, right: 10, top: 10 }}>
                <Image
                  source={require('../../../assets/crossed.png')}
                  style={{
                    width: 35,
                    height: 35, alignSelf: 'center'
                  }}

                />
              </TouchableOpacity> */}
            <TextInput style={styles.textInput}
              placeholder='Complete Address'
              placeholderTextColor="#8F93A0"
              label="complete address"
              value={remainingCompleteAddress}
              onChangeText={e => setRemainingCompleteAddress(e)}
            />
            <TextInput style={styles.textInput}
              placeholder='Floor (Optional)'
              placeholderTextColor="#8F93A0"
              label="floor"
              value={remainingFloor}
              onChangeText={e => setRemainingFloor(e)}
            />
            <TextInput style={styles.textInput}
              placeholder='Landmark (Optional)'
              placeholderTextColor="#8F93A0"
              label="landmark"
              value={remainingLandmark}
              onChangeText={e => setRemainingLandmark(e)}
            />

            <View style={{ height: 45, width: "98%", marginTop: 14, alignItems: 'flex-start', justifyContent: "flex-start", marginLeft: 10 }}>

              <Text style={{ color: 'black', textAlign: "left", fontSize: 16, fontWeight: "400", marginLeft: 10 }}>Address Type</Text>

              <View style={{ height: 45, width: "90%", marginTop: 5, alignItems: 'center', justifyContent: "flex-start", flexDirection: "row" }}>

                <View
                  style={{
                    marginLeft: 10,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setaddress_type('1')
                    }}>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <View style={{ width: 17, height: 17, borderRadius: 15, borderColor: '#000', borderWidth: 0.5, justifyContent: 'center' }}>
                        <View style={{ width: 12, height: 12, borderRadius: 15, justifyContent: 'center', alignSelf: 'center', backgroundColor: address_type == '1' ? '#000' : 'transparent' }} />
                      </View>
                      <Text
                        style={{
                          fontWeight: "500",
                          textAlign: 'left',
                          fontSize: 11,
                          color: "black",
                          marginLeft: 3
                        }}>
                        Home
                      </Text>
                    </View>

                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginLeft: 30,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setaddress_type('2')
                    }}>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <View style={{ width: 17, height: 17, borderRadius: 15, borderColor: '#000', borderWidth: 0.5, justifyContent: 'center' }}>
                        <View style={{ width: 12, height: 12, borderRadius: 15, justifyContent: 'center', alignSelf: 'center', backgroundColor: address_type == '2' ? '#000' : 'transparent' }} />
                      </View>

                      <Text
                        style={{
                          fontWeight: "500",
                          textAlign: 'left',
                          fontSize: 11,
                          color: "black",
                          marginLeft: 4
                        }}>
                        Work
                      </Text>
                    </View>

                  </TouchableOpacity>
                </View>

              </View>
            </View>
            {/* <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 0, flexDirection: 'row', height: 34, marginHorizontal: 20, marginTop: 60 }}>
                                          <TouchableOpacity
                                              onPress={() => {AddAddress()}} >
                                              <View style={{ justifyContent: 'center', width: 200, flex: 1, backgroundColor: '#ffcc00', borderRadius: 50 }}>
                                                  <Text style={{textAlign:'center'}}>Save</Text>
                                              </View>
                                          </TouchableOpacity>
                                      </View> */}
            <View style={{ width: '95%', alignSelf: 'center', marginTop: 55 }}>
              <MyButtons title={"Save"} height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => {
                if (!remainingCompleteAddress) {
                  Toast.show({ text1: 'Enter Complete Address' })
                  return
                }
                AddAddressUsingCurrentLoation2()
              }}
                // marginHorizontal={20} 
                fontSize={14}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} hLinearColor={['#b10027', '#fd001f']} />
            </View>

            <View style={{ width: '100%', height: 200 }}></View>

            {loading ? <Loader /> : null}
          </KeyboardAwareScrollView>


        </View>


        {/* </View> */}
      </Modal>


      <Modal
        isVisible={addressList}
        swipeDirection="down"
        onBackdropPress={() => setaddressList(false)}
        onSwipeComplete={(e) => {
          setaddressList(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        {/* <View style={{width:dimensions.SCREEN_WIDTH,height:dimensions.SCREEN_HEIGHT,position:'absolute',top:0,bottom:0,left:0,right: 0,backgroundColor:'rgba(0,0,0,0.5)'}}> */}
        <View style={{ width: '100%', height: dimensions.SCREEN_HEIGHT * 80 / 100, position: 'absolute', bottom: 0, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: '#fff' }}>

          <View style={{ flex: 1 }}>
            {/* <TouchableOpacity onPress={() => { setaddressList(false) }}
                                          style={{ position: "absolute", width: 30,  borderRadius: 35, height: 30, right: 10, top: 10 }}>
                                          <Image
                                              source={require('../../../assets/crossed.png')}
                                              style={{
                                                  width: 35,
                                                  height: 35, alignSelf: 'center'
                                              }}

                                          />
                                      </TouchableOpacity> */}
            <TouchableOpacity style={{ width: 50, height: 4, backgroundColor: '#9B9B9B', borderRadius: 2, alignSelf: 'center', marginBottom: 30, marginTop: 10 }} onPress={() => { setaddressList(false) }} />
          
            <Text style={{ fontSize: 22, fontWeight: '700', color: 'black', textAlign: 'center', marginBottom: 25, }}>Select Delivery Address</Text>
         {addressListData.length>0 ? 
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "row",
                height: '78%',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 200
              }}>


              <FlatList
                vertical
                data={addressListData}
                keyExtractor={(item, index) => String(index)}

                renderItem={({ item, index }) => {
                  // console.warn('checked ----------->', item, props?.route?.params?.address)
                  return <View style={{
                    width: '95%',
                    height: 150,
                    marginHorizontal: 10,
                    // marginLeft: 10,
                    // marginRight: 15,
                    shadowColor: '#000000',
                    // shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    shadowOpacity: 0.2,
                    //elevation: 3,
                    borderRadius: 20,
                    // borderColor: "#ffcc00",
                    // borderWidth: 1,
                    backgroundColor: '#f5f5f5',
                    marginTop: 8,
                    marginBottom: addressListData.length - 1 == index ? 100 : 10
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                      <Image source={require('../../../assets/danish_location.png')} style={{ height: 40, width: 40, marginLeft: 15 }} />
                      <View>
                        <View style={{ flexDirection: 'column' }}>
                          <View style={{ height: 30, flexDirection: 'row', marginLeft: 0 }}>
                            {/* <View style={{ width: 25, height: 50, justifyContent: "center", alignItems: 'center', marginTop: 15, left: 6 }} >
                                                             
                                                            </View> */}
                            <View style={{ flex: 1, marginTop: 10, left: 0, marginLeft: 23 }}>
                              <Text style={{ textAlign: 'left', fontSize: 13, color: '#000000', fontWeight: "500", }}>Location Name: {item.location_name}</Text>
                            </View>

                          </View>
                        </View>

                        <View style={{ marginHorizontal: 10, marginLeft: 15, width: "80%", right: -9, height: 65, marginTop: 0, paddingTop: 4 }}>
                          <ScrollView>
                            <Text style={{ textAlign: 'left', fontSize: 13, color: 'black', fontWeight: '400' }}>{item.address_line1},  {item.city}, {item.state},</Text>
                            {item.address_line2 ?
                            <Text style={{ textAlign: 'left', fontSize: 13, color: 'black', fontWeight: '400', marginTop: 4 }}>{item.address_line2}, {item.landmark}</Text>
                            :
                            <Text style={{ textAlign: 'left', fontSize: 13, color: 'black', fontWeight: '400', marginTop: 4 }}>{item.landmark}</Text>
                            }
                          </ScrollView>
                        </View>
                      </View>
                    </View>

                    <View style={{ width: '95%', height: 0.5, backgroundColor: '#9B9B9B', alignSelf: 'center', marginTop: 4 }} />

                    <View style={{ flexDirection: 'row', left: 0, marginTop: 10, position: "absolute", bottom: 10 }}>

                      <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', marginTop: 10, left: 27 }}>
                        <TouchableOpacity onPress={() => {

                          setfull_name(item.location_name)
                          setaddress_type(item.location_type)
                          setlat(item.latitude)
                          setlan(item.longitude)
                          sethouse_no(item.address_line1)
                          setarea_village(item.address_line2)
                          setCity(item.city)
                          setlandmark(item.landmark)
                          setstate(item.state)
                          setAddressId(item.id)
                          setShippingAddressPopUp(true)
                          setaddressList(false)
                          setedit(true)
                        }}>
                          <Image source={require('../../../assets/pen.png')}
                            style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>

                      </View>



                      <View style={{ width: 25, height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 20 / 2, marginTop: 10, left: 57, }}>
                        <TouchableOpacity onPress={() => { deletAddress(item) }}>
                          <Image source={require('../../../assets/bin.png')}
                            style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity style={{ width: 170, height: 30, justifyContent: "center", alignItems: 'center', borderRadius: 20, marginTop: 9, left: 80, backgroundColor: "red" }}
                        onPress={() => {
                          putAddress(item)
                          // setselectedAddress(item)
                          // setaddressList(false)
                        }}>
                        <View style={{}}>
                          {/* <Image source={require('../assets/buttonSave.png')}
                                                    /> */}
                          <Text style={{ color: '#FFFFFF', fontWeight: "600", fontSize: 12, textAlign: 'left' }}>Select Address</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
                }
              />

            </View>
        :
        <Text style={{color:'#000',fontSize:16,textAlign:'center',marginTop:30}}>No Records Found</Text>
      }
          </View>
          {/* <View style={{ width: '90%', alignSelf: 'center', position: 'absolute', bottom: 0 }}>
            <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => {
              // setShippingAddressPopUp(true) 
              setChooseAddressModeModal(true)
              setaddressList(false)
            }} marginHorizontal={20} fontSize={11}
              titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} hLinearColor={['#b10027', '#fd001f']} />
          </View> */}

        </View>
        {/* </View> */}
        {loading ? <Loader /> : null}
      </Modal>
      <Modal
        isVisible={chooseAddressModeModal}
        swipeDirection="down"
        onBackdropPress={() => setChooseAddressModeModal(false)}
        onSwipeComplete={(e) => {
          setChooseAddressModeModal(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        onModalWillShow={() => { setAddressMode('1') }}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '85%', backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20 }}>
          <TouchableOpacity style={{ width: 50, height: 4, backgroundColor: '#9B9B9B', borderRadius: 2, alignSelf: 'center', marginBottom: 30, marginTop: 10 }} onPress={() => { setChooseAddressModeModal(false) }} />
          <Text style={{ fontSize: 22, fontWeight: '700', color: 'black', textAlign: 'center', marginBottom: 25, }}>Choose Address Method</Text>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

            {addressMethodData?.map(el =>
              <TouchableOpacity onPress={() => { setAddressMode(el.id) }} style={[styles.radioButtonContainer, el.id == addressMode ? styles.radioButtonContainerSelected : null]}>
                <View style={[styles.iconContainer, el.id == addressMode ? { backgroundColor: 'white' } : null]}>
                  <Image source={el.icon} style={{ height: 40, width: 40 }} />
                </View>
                <View>
                  <Text style={{ color: '#9B9B9B', fontWeight: '600', fontSize: 14, marginLeft: 10, fontStyle: 'italic' }} >{el.name1}</Text>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginLeft: 10 }} >{el.name2}</Text>
                </View>
                {el.id == addressMode ?
                  <Image source={require('../../../assets/danish_selected.png')} style={styles.selectedCheck} />
                  : null}
              </TouchableOpacity>
            )}

            {/* <TouchableWithoutFeedback style={{marginTop:15}} onPress={()=>{setAddressMode('2')}}>
                          <View style={styles.radioButtonContainer}>
                            <MaterialCommunityIcons name={'2' === addressMode ? "radiobox-marked":"radiobox-blank"} color={'#455A64'} size={24} />
                            <Text style={{ color: '#455A64', fontWeight: '600', fontSize: 14, marginLeft:10}} >Search Address</Text>
                          </View>
                        </TouchableWithoutFeedback>  
                        <TouchableWithoutFeedback style={{marginTop:15}} onPress={()=>{setAddressMode('3')}}>
                          <View style={styles.radioButtonContainer}>
                            <MaterialCommunityIcons name={'3' === addressMode ? "radiobox-marked":"radiobox-blank"} color={'#455A64'} size={24} />
                            <Text style={{ color: '#455A64', fontWeight: '600', fontSize: 14, marginLeft:10}} >Current Address</Text>
                          </View>
                        </TouchableWithoutFeedback> */}

            <View style={{ height: 30 }} />
            <MyButtons title={"Continue"} height={50} width={'100%'} borderRadius={5} alignSelf="center" press={openAddressModel} marginHorizontal={20} fontSize={14}
              titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} hLinearColor={['#b10027', '#fd001f']} />

            {/* <MyButtons title="Submit" height={45} width={'50%'} borderRadius={10} alignSelf="center" press={openAddressModel} marginHorizontal={20} fontSize={11}
                          titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.GREEN}  />   */}

          </ScrollView>

        </View>
      </Modal>
      <Modal
        isVisible={openGoogleAddressModal}
        swipeDirection="down"
        onBackdropPress={() => setOpenGoogleAddressModal(false)}
        onSwipeComplete={(e) => {
          setOpenGoogleAddressModal(false)
        }}
        // onModalWillShow={()=>{setNeedRemainingAddress(false); setIsExactAddress(false)}}
        onModalWillShow={() => { setIsExactAddress(false) }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ width: '100%', height: '70%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#455A64', textAlign: 'center', marginBottom: 20, marginTop: 30 }}>Search Address</Text>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled" >

            <GooglePlacesAutocomplete
              placeholder="Add Location"

              textInputProps={{
                placeholderTextColor: '#000',
                // placeholderTextColor: Colors.BLACK,
                returnKeyType: 'search',
                // onFocus: () => setShowPlacesList(true),
                // onBlur: () => setShowPlacesList(false),
                multiline: true,
                // onTouchStart: ()=>{downButtonHandler()}
                height: 45,
                color: '#000'
                // shadowColor:  'gray',
                //   shadowOffset: {
                //     width:3,
                //     height:3
                //   }, 
                //   shadowRadius: 5,
                //   shadowOpacity: 1.0,
                //   justifyContent: 'center',
                //   elevation: 5

              }}

              enablePoweredByContainer={false}
              listViewDisplayed={'auto'}
              styles={{
                // textInputContainer: {
                //     backgroundColor: 'grey',
                //   },
                description: {
                  color: '#000',
                  // fontWeight: '300'
                },
                poweredContainer: {
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderColor: '#c8c7cc',
                  borderTopWidth: 0.5,
                  color: '#000'
                },
                powered: {},
                listView: {
                  // color:'#000'
                },
                row: {
                  backgroundColor: '#FFFFFF',
                  padding: 13,
                  height: 44,
                  flexDirection: 'row',
                },
                separator: {
                  height: 0.5,
                  backgroundColor: '#c8c7cc',
                  color: '#000'
                },
                textInput: {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  height: 35,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  fontSize: 12,
                  color: '#000',
                  flex: 1,
                },
              }}
              onPress={(data, details = null) => {
                console.log(data, details);
                // 'details' is provided when fetchDetails = true
                // setShowPlacesList(false)    
                setGoogleLatLng({
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                });
                console.log('helloji Ashish==>>', details.geometry.location)
                //setGoogleAddress(data?.description);
                setGoogleAddress(data);
                console.log('data.terms', data.terms);
                console.log('data.description', data.description);
                if (data.terms?.length < 3) {
                  Toast.show({ text1: 'this is not an exact location' })
                  setIsExactAddress(false)
                } else {
                  setIsExactAddress(true)
                }
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


            <View style={{ height: 10, }} />


            {true ?
              // {needRemainingAddress ? 
              <View style={{ width: '100%' }} >
                <TextInput style={[styles.textInput, { marginHorizontal: 0 }]}
                  placeholder='Complete Address'
                  placeholderTextColor="#8F93A0"
                  label="complete address"
                  value={remainingCompleteAddress}
                  onChangeText={e => setRemainingCompleteAddress(e)}
                />
                <TextInput style={[styles.textInput, { marginHorizontal: 0 }]}
                  placeholder='Floor (Optional)'
                  placeholderTextColor="#8F93A0"
                  label="floor"
                  value={remainingFloor}
                  onChangeText={e => setRemainingFloor(e)}
                />
                <TextInput style={[styles.textInput, { marginHorizontal: 0 }]}
                  placeholder='Landmark (Optional)'
                  placeholderTextColor="#8F93A0"
                  label="landmark"
                  value={remainingLandmark}
                  onChangeText={e => setRemainingLandmark(e)}
                />
              </View>
              : null}
          </KeyboardAwareScrollView>
          <View style={{ marginBottom: 20 }}>
            {isExactAddress ?
              <MyButtons title={"Save"} height={40} width={'100%'} borderRadius={5} alignSelf="center" press={() => {
                // if(needRemainingAddress && !remainingCompleteAddress){
                if (!remainingCompleteAddress) {
                  Toast.show({ text1: 'Enter Complete Adress' })
                  return
                }
                AddAddressUsingGoogleSearch()
              }} marginHorizontal={20} fontSize={11}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.RED} marginVertical={0} hLinearColor={['#b10027', '#fd001f']} />
              : null}
          </View>

        </View>
      </Modal>
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 45,
    width: '100%',
    // fontSize: 12,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    color: Mycolors.TEXT_COLOR,
    paddingLeft: 15,

    backgroundColor: Mycolors.BG_COLOR,
    top: 1
  },
  textInput: {
    marginTop: 14, borderRadius: 10, marginHorizontal: 20, paddingLeft: 15,
    flexDirection: 'row',
    height: 45,
    shadowColor: '#11032586',
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: "#D7D7D7",
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: "center", color: 'black',
    fontWeight: '400',
    fontSize: 14,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 2,
    borderColor: '#f5f5f5',
    marginBottom: 20,
    borderRadius: 10,
  },
  radioButtonContainerSelected: {
    backgroundColor: '#F5F5F5',
    borderColor: '#D00100',
    borderWidth: 1,
    borderRadius: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  selectedCheck: {
    position: 'absolute',
    height: 30,
    width: 30,
    top: 10,
    right: 10
  },
  searchbar: {
    description: {
      fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      // top: 50,
      // width: width - 10,
      borderWidth: 0,
      marginTop: 5,
    },
    textInput: {
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
    listView: {
      // backgroundColor: 'rgba(192,192,192,0.9)',
      // top: 23,
    },
  },
});
export default ShopCart









