import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from './Homeheaderroundbottom';
import Modal from 'react-native-modal';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';

const B2BBecomeSellerChoosePlan = (props) => {
    const [modlevisual1, setmodlevisual1] = useState(false)

    const [upData, setupData] = useState([
        {
            id: '1',
            title: 'Plan1',
            type: 'month',
            desc: ' ',
            time: '',
            price: '20',
            img: require('../../../assets/images/Mercedes_Benz_GLA.png'),
        },
        {
            id: '2',
            title: 'Plan2',
            type: 'weekly',
            desc: ' ',
            time: '',
            price: '10',
            img: require('../../../assets/images/BMW_X3.png'),
        },
        {
            id: '3',
            title: 'Plan3',
            type: 'Year',
            desc: ' ',
            time: '',
            price: '70',
            img: require('../../../assets/images/Mercedes_Benz_GLA.png'),
        },
        {
            id: '4',
            title: 'Plan4',
            type: 'month',
            desc: ' ',
            time: '',
            price: '25',
            img: require('../../../assets/images/BMW_X3.png'),
        }


    ])

    useEffect(() => {

    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor={Mycolors.B2B_BLUE}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={6}
                    press2={() => { }} title2={'Become a seller'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
                    press3={() => { }} img3width={25} img3height={25} />

                <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center', alignSelf: "center", }}>

                    <View style={{ backgroundColor: Mycolors.B2B_BLUE, width: '85%', height: 200, borderRadius: 30, top: 20, marginRight: 30 }}>
                        <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
                            <Text style={{ color: Mycolors.BG_COLOR, fontWeight: '500', fontSize: 14 }}>Let’s Start</Text>
                            <Text style={{ color: Mycolors.BG_COLOR, fontWeight: '500', fontSize: 18 }}>Choose Plan</Text>
                        </View>

                    </View>

                    <View style={{ marginTop: 4, width: '90%', height: 370, top: -100 }}>
                        <FlatList
                            data={upData}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            numColumns={1}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ width: 240, marginHorizontal: 5, backgroundColor: Mycolors.BG_COLOR, borderRadius: 24 }}>
                                        {/* <TouchableOpacity style={{ width: 160, height: 130, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center' }}
                                      onPress={() => { props.navigation.navigate('FoodDetails') }}>
                                      <Image source={item.img} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 7 }}></Image>
                                    </TouchableOpacity> */}
                                        <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: "#F2FAFE", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingVertical: 10 }}>
                                            <Text style={{ fontSize: 18, color: Mycolors.B2B_BLUE, marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>{item.title}</Text>

                                            <Text style={{ fontSize: 14, color: '#B2B7B9', marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>$<Text style={{ fontSize: 18, color: '#455A64', marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>{item.price}/<Text style={{ fontSize: 14, color: '#B2B7B9', marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>{item.type}</Text></Text></Text>
                                        </View>
                                        <View style={{ width: 35, height: 35, alignSelf: 'center', marginTop: 8 }}>
                                            <Image source={require('../../../assets/B2B_seller_blue_tick.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 7 }}>

                                            </Image>
                                        </View>

                                        <View style={{ ustifyContent: 'center', alignItems: "center", padding: 5 }}>
                                            <Text style={{ fontSize: 15, color: '#455A64', marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>Post 5 Ads</Text>
                                            <Text style={{ fontSize: 12, color: '#455A64', marginTop: 5, textAlign: 'left', fontWeight: 'bold', paddingHorizontal: 10 }}>Reference site about Lorem Ipsum, giving information on its origins</Text>
                                        </View>

                                        <View style={{ width: 35, height: 35, alignSelf: 'center', marginTop: 8 }}>
                                            <Image source={require('../../../assets/B2B_seller_blue_tick.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 7 }}>

                                            </Image>
                                        </View>

                                        <View style={{ ustifyContent: 'center', alignItems: "center", padding: 5 }}>
                                            <Text style={{ fontSize: 15, color: '#455A64', marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>24/7 Support</Text>
                                            <Text style={{ fontSize: 12, color: '#455A64', marginTop: 5, textAlign: 'left', fontWeight: 'bold', paddingHorizontal: 10 }}>Reference site about Lorem Ipsum, giving information on its origins</Text>
                                        </View>

                                        <View style={{ width: '60%', height: 60, justifyContent: 'center', position: 'absolute', bottom: 8, marginHorizontal: 10, alignSelf: "center" }}>
                                            <MyButtons title="Select Now" height={34} width={'100%'} borderRadius={5} press={() => {props.navigation.navigate('CreatePostAds')}} fontSize={13}
                                                titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={Mycolors.B2B_BLUE} />
                                        </View>
                                    </View>
                                )
                            }}

                        />

                    </View>




                </View>

                <Modal
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
                    
                    <View style={{ height: '48%', backgroundColor: '#fff', borderRadius: 30, padding: 20, marginBottom: 20, marginHorizontal: 10, }}>
                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

                            <View style={{ width: 60, height: 60, alignSelf: 'center', marginTop: 8 }}>
                                <Image source={require('../../../assets/B2B_seller_green_tick.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 7 }}>

                                </Image>
                            </View>

                            <View style={{ ustifyContent: 'center', alignItems: "center", padding: 5 }}>
                                <Text style={{ fontWeight: 'bold', color: '#455A64', marginVertical: 10, paddingHorizontal: 10, textAlign: "center" }}>Your Seller Profile Is been Created
                                    Successfully</Text>

                                <Text style={{ color: '#455A64', fontWeight: '400', fontSize: 12, marginTop: 6, textAlign: "center" }}>Your Seller Profile Is been Created Successfully You can now list your selling product and receive inquiries from interested buyers</Text>
                            </View>

                            <View style={{ width: '65%', height: 60, justifyContent: 'center', position: 'absolute', bottom: 20, marginHorizontal: 10, alignSelf: "center", }}>
                                <MyButtons title="View Your Profile" height={40} width={'100%'} borderRadius={5} press={() => { props.navigation.navigate('B2BUserProfile'),
                                setmodlevisual1(false) }} fontSize={13}
                                    titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={Mycolors.B2B_BLUE} />

                                <TouchableOpacity onPress={() => setmodlevisual1(false)} >
                                    <Text style={{ fontWeight: '500', color: '#455A64', marginVertical: 10, paddingHorizontal: 14, textAlign: "center" }}>Close</Text>
                                </TouchableOpacity>

                            </View>




                            <View style={{ width: 100, height: 100 }} />
                        </ScrollView>

                    </View>
                </Modal>

                <View style={{ width: '95%', height: 60, justifyContent: 'flex-end',marginHorizontal: 10, alignSelf: "center", }}>
                <MyButtons title="Continue" height={50} width={'100%'} borderRadius={5} press={() => { setmodlevisual1(true) }} fontSize={13}
                    titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={Mycolors.B2B_BLUE} />
            </View>

                <View style={{ height: 100 }} />

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
    addCommentContainer: {
        flexDirection: 'row',
        marginTop: 20,
        padding: 5,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopWidth:0.5, 
        // borderTopColor:'#ffb0ba', 
    },
    addCommentContainer2: {
        left: -13,
        flexDirection: 'row',
        padding: 5,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopWidth:0.5, 
        // borderTopColor:'#ffb0ba', 
    },
    addCommentView: {
        width: '45%',
        backgroundColor: '#fff',
        // padding:15, 
        // flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 5,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 3
        // },
        // shadowRadius: 1,
        // shadowOpacity: 0.3,
        // elevation: 5,
    },
    BoxView: {
        marginTop: 15,
        width: '93%',
        backgroundColor: '#fff',
        // padding:15, 
        // flexDirection: 'row',
        marginHorizontal: 15,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 3
        // },
        // shadowRadius: 1,
        // shadowOpacity: 0.3,
        // elevation: 5,
    },
    BoxViewImg: {
        marginTop: 15,
        width: '95%',
        backgroundColor: '#fff',
        // padding:15, 
        // flexDirection: 'row',
        marginHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 3
        // },
        // shadowRadius: 1,
        // shadowOpacity: 0.3,
        // elevation: 5,
    },
    input: {
        paddingLeft: 20,
        fontSize: 13,
        fontWeight: '400',
        color: '#000',
    },
});
export default B2BBecomeSellerChoosePlan 