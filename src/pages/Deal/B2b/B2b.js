import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from './Homeheaderroundbottom';
import B2BSearch from './B2BSearch';

import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../component/MyButtons';
const B2B = (props) => {
  const [searchValue, setsearchValue] = useState('')
  const [selectedTime, setselectedTime] = useState('2')
  const [upData, setupData] = useState([
    {
      id: '1',
      title: 'Mercedes-Benz GLA',
      type: 'Electronics',
      desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
      time: '',
      img: require('../../../assets/images/Mercedes_Benz_GLA.png')
    },
    {
      id: '2',
      title: 'BMW X3',
      type: 'Vehicle',
      desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
      time: '',
      img: require('../../../assets/images/BMW_X3.png'),
    },
    {
      id: '3',
      title: 'Mercedes-Benz GLA',
      type: 'Furniture',
      desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
      time: '',
      img: require('../../../assets/images/Mercedes_Benz_GLA.png'),
    },
    {
      id: '4',
      title: 'BMW X3',
      type: 'Food',
      desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
      time: '',
      img: require('../../../assets/images/BMW_X3.png'),
    },
    {
      id: '5',
      title: 'Mercedes-Benz GLA',
      type: 'Clothes',
      desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
      time: '',
      img: require('../../../assets/images/Mercedes_Benz_GLA.png'),
    },
    {
      id: '6',
      title: 'BMW X3',
      type: 'Chlid Toy',
      desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
      time: '',
      img: require('../../../assets/images/BMW_X3.png'),
    }

  ])
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
        <HomeHeaderRoundBottom height={100} paddingHorizontal={15} backgroundColor={Mycolors.B2B_BLUE}
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={25}
          press2={() => { }} title2={'B2B'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
          press3={() => { }} img3width={25} img3height={25} />



        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={{ top: -40 }}>
            <B2BSearch marginTop={10} placeholder={'Search'}
              serchValue={searchValue}
              onChangeText={(e) => { setsearchValue(e) }}
              press={() => { Alert.alert('Hi') }}
              presssearch={() => { Alert.alert('Search Pressed') }}
              paddingLeft={20} />
          </View>


          <View style={{ width: "100%", alignSelf: 'center', marginBottom: 10, marginHorizontal: 15 }}>

            <FlatList
              data={upData}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: 90, marginHorizontal: 5 }}>
                    <TouchableOpacity style={{ width: 90, height: 40, justifyContent: 'center', borderWidth: 0.5, borderRadius: 50, borderColor: Mycolors.BG_COLOR, backgroundColor: selectedTime == item.id ? Mycolors.B2B_BLUE : Mycolors.BG_COLOR, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.03, elevation: 1 }}
                      onPress={() => { setselectedTime(item.id) }}>
                      <Text style={{ fontSize: 11, color: selectedTime == item.id ? Mycolors.BG_COLOR : Mycolors.GrayColor, textAlign: 'center', fontWeight: '400' }}>{item.type}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
              keyExtractor={item => item.id}
            />

          </View>

          <View style={{ width: '95%', justifyContent: 'space-between', alignSelf: 'center', marginTop: 20 }}>
            <Text style={{ color: Mycolors.B2B_BLUE, fontWeight: '500', fontSize: 18 }}>Explore</Text>
            <Text style={{ color: '#8F93A0', fontWeight: '400', fontSize: 12 }}
              onPress={() => { }}>Suggested cars for you</Text>
          </View>

          <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
            <FlatList
              data={upData}
              // horizontal={true}
              showsHorizontalScrollIndicator={false}

              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: "97%", marginHorizontal: 5,marginVertical:10 }}>
                    <TouchableOpacity style={{
                      width: 25, height: 25,
                      justifyContent: 'center', position: "absolute", top: 12, right: 18, zIndex: 999

                    }}>
                      <Image source={require('../../../assets/Heart.png')} style={{ width: 25, height: 22, alignSelf: 'center' }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { GoToCarDetailsScreen(item) }}
                      style={{ width: "100%", height: 180, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center' }}
                    >
                      <Image source={item.img} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 7 }}></Image>
                    </TouchableOpacity>
                    <View style={{}}>
                      <Text style={{ fontSize: 16, color: Mycolors.Black, marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>{item.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <Text style={{ fontSize: 12, color: '#8F93A0', marginTop: 5, textAlign: 'left', }}>{item.desc}</Text>

                    </View>
                  </View>
                )
              }}
              keyExtractor={item => item.id}
            />
          </View>


        </View>
        <View style={{ height: 40 }} />

      </ScrollView>
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

});
export default B2B 