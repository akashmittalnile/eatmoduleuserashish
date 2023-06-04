import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from '../../Deal/B2b/Homeheaderroundbottom';
import MovieSearch from './MovieSearch';

import { dimensions, Mycolors } from '../../../utility/Mycolors';


const MovieHome = (props) => {
    const [searchValue, setsearchValue] = useState('')
    const [selectedTime, setselectedTime] = useState('1')
    const [upData, setupData] = useState([
        {
            id: '1',
            title: 'Ambulance',
            type: 'Action',
            desc: '6',
            time: '',
            img: require('../../../assets/images/Ambulance-image.png')
        },
        {
            id: '2',
            title: 'The Lost City',
            type: 'Adventure',
            desc: '5.6',
            time: '',
            img: require('../../../assets/images/The-Lost-City-image.png'),
        },
        {
            id: '3',
            title: 'Uncharted',
            type: 'Comedy',
            desc: '9',
            time: '',
            img: require('../../../assets/images/Uncharted-image.png'),
        },
        {
            id: '4',
            title: 'Ambulance',
            type: 'Animation',
            desc: '4.9',
            time: '',
            img: require('../../../assets/images/Ambulance-image.png'),
        },
        {
            id: '5',
            title: 'The Lost City',
            type: '7',
            desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
            time: '',
            img: require('../../../assets/images/The-Lost-City-image.png'),
        }
    ])
    const [upData1, setupData1] = useState([
        {
            id: '1',
            title: 'The Dark Knight',
            type: 'Action',
            desc: '6.1',
            time: '',
            img: require('../../../assets/images/The-dark-night-image.png')
        },
        {
            id: '2',
            title: 'Joker',
            type: 'Adventure',
            desc: '8',
            time: '',
            img: require('../../../assets/images/Joker-image.png'),
        },
        {
            id: '3',
            title: 'Uncharted',
            type: 'Comedy',
            desc: '4',
            time: '',
            img: require('../../../assets/images/Uncharted-image.png'),
        },
        {
            id: '4',
            title: 'The Dark Knight',
            type: '6.1',
            desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
            time: '',
            img: require('../../../assets/images/The-dark-night-image.png'),
        },
        {
            id: '5',
            title: 'Joker',
            type: 'Adventure',
            desc: '8',
            time: '',
            img: require('../../../assets/images/Joker-image.png'),
        }
    ])
    useEffect(() => {

    }, [])
    const GoToCarDetailsScreen = (items) => {
        // console.log("items",items);
        props.navigation.navigate('MovieDetails')
    }

    return (
        <SafeAreaView style={{}}>
            <ScrollView>
                <HomeHeaderRoundBottom height={100} paddingHorizontal={15} backgroundColor={'#FFD037'}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={25}
                    press2={() => { }} title2={'Movie'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
                    press3={() => { }} img3width={25} img3height={25} />



                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <View style={{ top: -40 }}>
                        <MovieSearch marginTop={10} placeholder={'Search movie'}
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
                                        <TouchableOpacity style={{ width: 90, height: 40, justifyContent: 'center', borderWidth: 0.5, borderRadius: 50, borderColor: Mycolors.BG_COLOR, backgroundColor: selectedTime == item.id ? '#FFD037' : Mycolors.BG_COLOR, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.03, elevation: 1 }}
                                            onPress={() => { setselectedTime(item.id) }}>
                                            <Text style={{ fontSize: 11, color: selectedTime == item.id ? Mycolors.BG_COLOR : '#263238', textAlign: 'center', fontWeight: '500' }}>{item.type}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                            keyExtractor={item => item.id}
                        />

                    </View>

                    <View style={{ width: '95%', justifyContent: 'space-between', alignSelf: 'center', marginTop: 20,flexDirection:"row" }}>
                        <Text style={{ color: '#263238', fontWeight: '500', fontSize: 16 }}>Trending Movies</Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('') }}>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#FFD037' }}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: "100%", alignSelf: 'center', marginTop: 10 }}>
                        <FlatList
                            data={upData}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}

                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        position: 'relative',
                                        marginBottom: 4,
                                        width: dimensions.SCREEN_WIDTH / 2.3,
                                        marginRight: 16,
                                        borderRadius: 24,
                                    }}>
                                        <TouchableOpacity onPress={() => { GoToCarDetailsScreen(item) }}
                                            style={{ width: "100%", height: 180, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center' }}
                                        >
                                            <View style={styles.PlayIconWrapper}>

                                                <Image source={require('../../../assets/VideoGame-play-button.png')} style={{ width: 30, height: 30 }} />
                                            </View>

                                            <Image source={item.img} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 24 }}></Image>
                                        </TouchableOpacity>
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 16, color: Mycolors.Black, marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>{item.title}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
                                                <Image source={require('../../../assets/Star.png')} style={{ width: 15, height: 15, }}></Image>
                                                <Text style={{ color: '#455A64', fontSize: 12, left: 7 }}>{item.desc}</Text>

                                            </View>
                                        </View>

                                    </View>
                                )
                            }}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={{ width: '95%', justifyContent: 'space-between', alignSelf: 'center',flexDirection:"row" }}>
                        <Text style={{ color: '#263238', fontWeight: '500', fontSize: 16 }}>Top picks for you</Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('') }}>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#FFD037' }}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: "100%", alignSelf: 'center', marginTop: 10 }}>
                        <FlatList
                            data={upData1}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}

                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        position: 'relative',
                                        marginBottom: 4,
                                        width: dimensions.SCREEN_WIDTH / 2.3,
                                        marginRight: 16,
                                        borderRadius: 24,
                                    }}>
                                        <TouchableOpacity onPress={() => { GoToCarDetailsScreen(item) }}
                                            style={{ width: "100%", height: 180, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center' }}
                                        >
                                            <View style={styles.PlayIconWrapper}>

                                                <Image source={require('../../../assets/VideoGame-play-button.png')} style={{ width: 30, height: 30 }} />
                                            </View>

                                            <Image source={item.img} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 24 }}></Image>
                                        </TouchableOpacity>
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 16, color: Mycolors.Black, marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>{item.title}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
                                                <Image source={require('../../../assets/Star.png')} style={{ width: 15, height: 15, }}></Image>
                                                <Text style={{ color: '#455A64', fontSize: 12, left: 7 }}>{item.desc}</Text>

                                            </View>
                                        </View>

                                    </View>
                                )
                            }}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={{ height: 50 }} />

            </ScrollView>
            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('UploadMovie')} style={{ width: '80%', height: 60, flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', bottom: 40, right: 20, shadowColor: '#FFD037', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.1, elevation: 5 }}>
                    <Image source={require('../../../assets/Upload-movie.png')} style={{ width: 100, height: 100 }} />
                </TouchableOpacity> 
            </View>
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
    PlayIconWrapper: {
        flex: 1,
        height: 50,
        top: 60,
        position: "absolute",
        alignSelf: "center",
        zIndex: 999
    },
});
export default MovieHome 