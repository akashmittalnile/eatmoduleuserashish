import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from './Homeheaderroundbottom';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import MyButtons from '../../../component/MyButtons';


const B2BCart = (props) => {
    const [searchValue, setsearchValue] = useState('')
    let selectedIndex = -1;
    let row = [];
    let prevOpenedRow;
    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            title: 'Mercedes-Benz GLA',
            type: 'Electronics',
            desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
            price: '$6943',
            img: require('../../../assets/images/Mercedes_Benz_GLA.png'),
        },
        {
            id: '2',
            title: 'BMW X3',
            type: 'Vehicle',
            desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
            price: '$9043',
            img: require('../../../assets/images/BMW_X3.png'),
        },
        {
            id: '2',
            title: 'BMW X3',
            type: 'Vehicle',
            desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
            price: '$9043',
            img: require('../../../assets/images/BMW_X3.png'),
        },
        {
            id: '2',
            title: 'BMW X3',
            type: 'Vehicle',
            desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
            price: '$9043',
            img: require('../../../assets/images/BMW_X3.png'),
        }
    ])

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
    useEffect(() => {

    }, [])
    const deleteItem = ({ item, index }) => {
        // console.log('deleteItem item', item);
        const cartItemsCopy = [...cartItems]
        const remainingItems = cartItemsCopy.filter(el => el.id !== item.id)
        setCartItems(remainingItems)
    }

    const renderItem = ({ item, index }, onClick) => {
        // const closeRow = (index) => {
        //     console.log('closerow');
        //     selectedIndex = index;
        //     if (prevOpenedRow && prevOpenedRow !== row[index]) {
        //       prevOpenedRow.close();
        //     }
        //     prevOpenedRow = row[index];
        //   };

        return (
            <View style={{ width: '90%', height: 120, marginBottom: 25, alignItems: "center", marginHorizontal: 20, justifyContent: "center" }}>

                <View
                    style={{
                        width: '100%',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        backgroundColor: 'white',
                        borderRadius: 15,
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ marginRight: 20, justifyContent: 'flex-start', borderRadius: 20, height: 100, width: 100, }}>
                        <Image source={item.img} resizeMode='contain' style={{ width: 100, height: 100, marginHorizontal: 1 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, color: '#263238' }}>{item.title}</Text>
                        <Text style={{ fontSize: 16, color: '#263238', marginTop: 5 }}>{item.price}</Text>
                        <View style={{ paddingVertical: 10, width: '100%' }}>
                        </View>
                        <MyButtons title="Remove" height={30} width={100} borderRadius={50} alignSelf="auto" press={() => { }} fontSize={13}
                            titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={Mycolors.RED} />
                    </View>
                </View>

            </View>
        )
    }

    return (
        <SafeAreaView style={{ }}>
            <ScrollView>
                <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor={Mycolors.B2B_BLUE}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={25}
                    press2={() => { }} title2={'B2B'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
                    press3={() => { }} img3width={25} img3height={25} />

                <View style={{ width: '96%', alignSelf: 'center', marginTop: 20 }}>

                    {/* <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:15}}>
    <Text style={{fontSize:16,color:Mycolors.Black,marginTop:5, fontWeight:'bold'}}>Total 3 items</Text>
    <Text style={{fontSize:13,color:'#FFC40C',marginTop:5, textDecorationColor:'#FFC40C', textDecorationLine:'underline'}}>Select All</Text>
</View> */}

                    <View style={{width: "100%", alignSelf: 'center', marginBottom: 10, marginHorizontal: 15}}>
                        <FlatList
                            data={cartItems}
                            numColumns={1}
                            keyExtractor={item => item.id}
                            renderItem={(v) =>
                                renderItem(v, () => {
                                    //   console.log('Pressed', v);
                                    deleteItem(v);
                                })
                            }
                        />

                    </View>

                   
                </View>
                
                <View style={{ height: 100,width:100 }} />

               
            </ScrollView>
            <View style={{ width: '95%', height: 60, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                    <MyButtons title="Buy Now" height={50} width={'100%'} borderRadius={5}   press={() => {props.navigation.navigate('ShopPayment') }} fontSize={13}
                        titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={Mycolors.B2B_BLUE} />
                </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

});
export default B2BCart 