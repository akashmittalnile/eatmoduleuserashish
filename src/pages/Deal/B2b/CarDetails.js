import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from './Homeheaderroundbottom';
import B2BSearch from './B2BSearch';
import ViewMoreText from 'react-native-view-more-text';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import Modal from 'react-native-modal';


const CarDetails = (props) => {
  const [searchValue, setsearchValue] = useState('')
  const [selectedTab, setselectedTab] = useState('Description')
  const [modleSeller, setmodleSeller] = useState(false)
  // const [selectedTime, setselectedTime] = useState('2')
  const [upData, setupData] = useState([
    {
      id: '1',
      title: 'Mercedes-Benz GLA',
      type: 'Electronics',
      desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
      time: '',
      price: '$61232',
      img: require('../../../assets/images/Mercedes_Benz_GLA.png'),
    }
  ])
  useEffect(() => {

  }, [])
  const design = (img, ti, tit, w, imgh, imgw, bg, redious) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', width: "40%", marginTop: 10, backgroundColor: "#FBFBFB", borderRadius: 15, height: 50, paddingHorizontal: 10, marginRight: 8 }}>
        <View style={{ width: 40, height: 40, backgroundColor: bg, justifyContent: 'center', borderRadius: redious }}>
          <Image source={img} style={{ width: imgw, height: imgh, overflow: 'hidden', alignSelf: 'center' }}></Image>
        </View>
        <View style={{ marginLeft: 5, width: '85%' }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: Mycolors.Black }}>{ti}</Text>
          <Text style={{ fontSize: 10, color: Mycolors.GrayColor, top: 3 }}>{tit}</Text>
        </View>

      </View>
    )
  }
  console.log("B2BCarDetails:", props?.route?.params?.CarId);
  let CarId = props?.route?.params?.CarId.id

  return (
    <SafeAreaView style={{}}>
      <ScrollView>
        <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor={Mycolors.B2B_BLUE} paddingVertical={20}
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={25}
          press2={() => { }} title2={'B2B'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
          press3={() => { }} img3width={25} img3height={25} />

        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
            <FlatList
              data={upData}
              // horizontal={true}
              showsHorizontalScrollIndicator={false}

              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: "97%", marginHorizontal: 5 }}>
                    <TouchableOpacity style={{
                      width: 25, height: 25,
                      justifyContent: 'center', position: "absolute", top: 12, right: 18, zIndex: 999

                    }}>
                      <Image source={require('../../../assets/Heart.png')} style={{ width: 25, height: 22, alignSelf: 'center' }}></Image>
                    </TouchableOpacity>
                    <View style={{ width: "100%", height: 180, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center' }}
                      onPress={() => { }}>
                      <Image source={item.img} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 7 }}></Image>
                    </View>
                    <View style={{ marginTop: 20 }}>
                      <Text style={{ fontSize: 16, color: Mycolors.Black, marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>{item.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                      <Image source={require('../../../assets/Star.png')} style={{ width: 18, height: 18 }}></Image>
                      <Text style={{ color: '#455A64', fontSize: 14, fontWeight: '600', left: 5 }}>4.78</Text>

                      <TouchableOpacity onPress={() => { setmodleSeller(true) }}
                        style={{ width: 120, height: 34, borderColor: 'white', borderWidth: 0.5, position: 'absolute', right: 5, top: 0, justifyContent: 'center', borderRadius: 50, backgroundColor: Mycolors.B2B_BLUE }}>
                        <Text style={{ fontSize: 11, textAlign: 'center', color: Mycolors.BG_COLOR, fontWeight: '500' }}>
                          See Seller Details</Text>
                      </TouchableOpacity>

                    </View>
                    <Text style={{ color: Mycolors.Black, fontSize: 13, fontWeight: '500', marginVertical: 4 }}>{item.price}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "80%" }}>

                      {design(require('../../../assets/Car.png'), '2020', 'Model', '45%', 25, 28, '#E0F1F9', 20)}
                      {design(require('../../../assets/Gauge.png'), '450Km', 'Range', '45%', 25, 28, '#E0F1F9', 20)}
                      {design(require('../../../assets/GasPump.png'), '450Km', 'Range', '45%', 25, 28, '#E0F1F9', 20)}

                    </View>
                  </View>
                )
              }}
              keyExtractor={item => item.id}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 10, }}>
            <View style={{ width: '32%' }}>
              <MyButtons title="Description" height={37} width={'100%'} borderRadius={5} alignSelf="center" press={() => { setselectedTab('Description') }} fontSize={13}
                titlecolor={selectedTab == 'Description' ? Mycolors.B2B_BLUE : '#263238'} marginVertical={0} hLinearColor={selectedTab == 'Description' ? ['transparent', 'transparent'] : ['transparent', 'transparent']} backgroundColor={'transparent'} />
            </View>

            <View style={{ width: '62%' }}>
              <MyButtons title="Customer Reviews" height={37} width={'100%'} borderRadius={5} alignSelf="center" press={() => { setselectedTab('Customer Reviews') }} fontSize={13}
                titlecolor={selectedTab == 'Customer Reviews' ? Mycolors.B2B_BLUE : '#263238'} marginVertical={0} hLinearColor={selectedTab == 'Customer Reviews' ? ['transparent', 'transparent'] : ['transparent', 'transparent']} backgroundColor={'transparent'} />
            </View>


          </View>

          {selectedTab == 'Description' ?

            <View style={{ width: '95%', alignSelf: 'center', top: 15 }}>
              <ViewMoreText
                numberOfLines={6}
                renderViewMore={(onPress) => {
                  return (
                    <Text onPress={onPress} style={{ color: Mycolors.B2B_BLUE, textDecorationLine: "underline" }}>View more</Text>
                  )
                }}
                renderViewLess={(onPress) => {
                  return (
                    <Text onPress={onPress} style={{ color: Mycolors.B2B_BLUE, textDecorationLine: "underline" }}>View less</Text>
                  )
                }}
                textStyle={{ textAlign: 'left', width: '95%' }}
              >
                <Text>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
              </ViewMoreText>
            </View>
            :
            selectedTab == 'Customer Reviews' ?
              <View style={{ top: 20, width: '95%', alignSelf: 'center', }}>
                <Text>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


                </Text>

              </View>
              :
              null
          }


          <View style={{ top: 25 }}>
            <MyButtons title="Buy Now" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => {props.navigation.navigate('B2BCart')}} fontSize={13}
              titlecolor={ Mycolors.BG_COLOR } marginVertical={0} backgroundColor={Mycolors.B2B_BLUE} />
          </View>




        </View>
        <View style={{ height: 70 }} />

        {/* ##############&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Model1 See Seller Details Clicked &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   */}
        <Modal
          isVisible={modleSeller}
          swipeDirection="down"
          onSwipeComplete={(e) => {
            setmodleSeller(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}
        >
          <TouchableOpacity style={{flex:1}}
        onPress={()=>{setmodleSeller(false)}}/>
          <View style={{ height: '20%', backgroundColor: '#F9F9F9', borderRadius: 10, padding: 20, marginBottom: 30, width: dimensions.SCREEN_WIDTH * 0.95, marginHorizontal: 10 }}>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Image source={require('../../../assets/images/layer_40.png')} style={{ width: 60, height: 60, borderRadius: 60 / 2, alignSelf: 'center' }}></Image>
              </View>

              <View style={{ flex: 4, marginLeft: 20, marginTop: 10 }}>
                <Text style={{ color: '#263238', fontSize: 14, fontWeight: '600', left: 5 }}>Favliy store</Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Image source={require('../../../assets/Star.png')} style={{ width: 18, height: 18 }}></Image>
                  <Text style={{ color: '#455A64', fontSize: 14, fontWeight: '600', left: 5 }}>4.78</Text>

                  <TouchableOpacity onPress={() => { props.navigation.navigate('DatingChat'),
                  setmodleSeller(false)}}
                    style={{ width: 120, height: 34, borderColor: 'white', borderWidth: 0.5, position: 'absolute', right: 5, top: -20, justifyContent: 'center', borderRadius: 50, backgroundColor: Mycolors.B2B_BLUE }}>
                    <Text style={{ fontSize: 11, textAlign: 'center', color: Mycolors.BG_COLOR, fontWeight: '500' }}>
                      Contact seller</Text>
                  </TouchableOpacity>

                </View>
                <View style={{ flexDirection: "row", alignSelf: 'center',justifyContent:"space-between",marginTop:10}}>
                  <MyButtons title="See other items" height={37} width={'45%'} borderRadius={50} alignSelf="center" press={() => {  props.navigation.goBack(),setmodleSeller(false)}} fontSize={12} borderColor={'#FFFFFF'} borderWidth={1} fontWeight={'500'}
                    titlecolor={'#263238'} backgroundColor={'#FFFFFF'} />

                  <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', width: "54%",   backgroundColor: "#FFFFFF", borderRadius: 50, height: 37, paddingHorizontal: 10 ,alignSelf: 'center' }}>
                    <View style={{ width: 30, height: 30,   justifyContent: 'center',  }}>
                      <Image source={require('../../../assets/Heart-gray.png')} style={{ width: 22, height: 18, overflow: 'hidden', alignSelf: 'center' }}></Image>
                    </View>
                    <View style={{ marginLeft: 5, width: '85%' }}>
                      <Text style={{ fontSize: 12, fontWeight: '500', color: Mycolors.Black }}>Save this seller</Text>
                     
                    </View>

                  </TouchableOpacity>
                   


                </View>

              </View>

            </View>


          </View>
        </Modal>
      </ScrollView>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

});
export default CarDetails 