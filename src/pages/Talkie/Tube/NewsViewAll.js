import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from '../../Deal/B2b/Homeheaderroundbottom';
import NewsSearch from './NewsSearch';
import Modal from 'react-native-modal';
import Loader from '../../../WebApi/Loader';
 
import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../component/MyButtons';

const NewsViewAll = (props) => {
    const [searchValue, setsearchValue] = useState('')
    
    const [loading, setLoading] = useState(false)
   
    const [upData, setupData] = useState([
        {
            id: '1',
            title: 'Pence Takes Center Stage at Jan. 6 Hearing',
            type: 'General',
            desc: 'Biden Signs Bill Cracking Down on Price Hikes by Ocean Freight Companies',
            time: 'June 16, 2022',
            newstype: 'World',
            img: require('../../../assets/images/news-image1.png'),
        },
        {
            id: '2',
            title: 'BMW X3',
            type: 'Weather',
            desc: 'U.S. Coronavirus Cases Plateau at 100,000 New Infections Each Day',
            time: 'June 16, 2022',
            newstype: 'World',
            img: require('../../../assets/images/news-image1.png'),
        },
        {
            id: '3',
            title: 'Mercedes-Benz GLA',
            type: 'Sports',
            desc: 'Putin Likens Himself to Peter the Great in Comparing Ukraine War to Imperial Russia',
            time: 'June 16, 2022',
            newstype: 'World',
            img: require('../../../assets/images/news-image1.png'),
        },
        {
            id: '4',
            title: 'BMW X3',
            type: 'Agriculture',
            desc: 'Biden Signs Bill Cracking Down on Price Hikes by Ocean Freight Companies',
            time: 'June 16, 2022',
            newstype: 'World',
            img: require('../../../assets/images/news-image1.png'),
        },


    ])
    useEffect(() => {
         
    }, [])
    
    

    return (
        <SafeAreaView style={{}}>
            <ScrollView>
                <HomeHeaderRoundBottom height={100} paddingHorizontal={15} backgroundColor={Mycolors.B2B_BLUE}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={25}
                    press2={() => { }} title2={'B2B'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
                    press3={() => { }} img3width={25} img3height={25} />



                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <View style={{ top: -40 }}>
                        <NewsSearch marginTop={10} placeholder={'Search News'}
                            serchValue={searchValue}
                            onChangeText={(e) => { setsearchValue(e) }}
                            press={() => { Alert.alert('Hi') }}
                            presssearch={() => { Alert.alert('Search Pressed') }}
                            paddingLeft={20} />
                    </View>

                    <View style={{ width: '100%', alignSelf: 'center', marginTop: -20 }}>
            <FlatList
              data={upData}
              // horizontal={true}
              showsHorizontalScrollIndicator={false}

              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: "97%", marginHorizontal: 5,marginVertical:10 }}>
                    
                    <TouchableOpacity onPress={() => {   }}
                      style={{ width: "100%", height: 180, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center' }}
                    >
                      <Image resizeMode='cover'
                      source={item.img} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 30 }}></Image>
                    </TouchableOpacity>
                    <View style={{}}>
                      <Text style={{ fontSize: 16, color: Mycolors.Black, marginTop: 7, textAlign: 'left', fontWeight: 'bold' }}>{item.desc}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <Text style={{ fontSize: 12, color: '#8F93A0', marginTop: 5, textAlign: 'left', }}>{item.time}</Text>

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
            <View>
                
            </View>
            {loading ? <Loader /> : null}
            
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    VideoThumbWrapper: {
        position: 'relative',
        // width: '48%',
        // marginRight: 8,
        marginBottom: 4,

        width: dimensions.SCREEN_WIDTH / 1.5,
        height: 190,
        marginRight: 16,
        borderRadius: 15,
        // shadowColor:'#000',
        // shadowOffset: {width: 0,height: 3},
        // shadowRadius: 1,
        // shadowOpacity: 0.03,
        // elevation: 1,
    },
    PlayIconContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    PlayIconWrapper: {
        flex: 1,
        bottom:-70,
        // flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    BackGroundImage: {
        backgroundColor: "gray",
        width: '100%',
        height: 190,
        justifyContent: 'center',
        borderRadius: 15
    },

});
export default NewsViewAll 