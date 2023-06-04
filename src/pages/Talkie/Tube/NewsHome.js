import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from '../../Deal/B2b/Homeheaderroundbottom';
import NewsSearch from './NewsSearch';
import Modal from 'react-native-modal';
import Loader from '../../../WebApi/Loader';
import VideoPlayer from 'react-native-video-player'
import { VideoModel } from '../../../component/VideoModel';
import LinearGradient from 'react-native-linear-gradient';

import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../component/MyButtons';

const NewsHome = (props) => {
    const [searchValue, setsearchValue] = useState('')
    const [selectedTime, setselectedTime] = useState('1');
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState({ isVisible: false, data: null });
    const [showVideoModal, setShowVideoModal] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState({});
    const [videoDetails, setVideoDetails] = useState([
        { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
        { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
        { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
    ])
    const [upData, setupData] = useState([
        {
            id: '1',
            title: 'Mercedes-Benz GLA',
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
            img: require('../../../assets/images/BMW_X3.png'),
        },
        {
            id: '3',
            title: 'Mercedes-Benz GLA',
            type: 'Sports',
            desc: 'Putin Likens Himself to Peter the Great in Comparing Ukraine War to Imperial Russia',
            time: 'June 16, 2022',
            newstype: 'World',
            img: require('../../../assets/images/Mercedes_Benz_GLA.png'),
        },
        {
            id: '4',
            title: 'BMW X3',
            type: 'Agriculture',
            desc: 'Biden Signs Bill Cracking Down on Price Hikes by Ocean Freight Companies',
            time: 'June 16, 2022',
            newstype: 'World',
            img: require('../../../assets/images/BMW_X3.png'),
        },


    ])
    useEffect(() => {
        // generateThumb()
    }, [])
    const GoToCarDetailsScreen = (items) => {
        // console.log("items",items);
        props.navigation.navigate('CarDetails', {
            CarId: items
        })
    };
    const toggleModal = state => {
        setShowModal({
            isVisible: state.isVisible,
            data: state.data,
        });
    };
    // const generateThumb = async () => {
    //     // setLoading(true)
    //     const thumbs = []
    //     try {
    //         for (let i = 0; i < videoDetails?.length; i++) {
    //             const resp = await createThumbnail({
    //                 url: videoDetails[0].url,
    //                 timeStamp: 10000,
    //                 // cacheName: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
    //             })
    //             thumbs.push(resp.path)
    //         }
    //         // const resp = await createThumbnail({
    //         //   url: videoDetails?.url,
    //         //   timeStamp: 10000,
    //         //   // cacheName: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
    //         // })
    //         const videoDetailsCopy = [...videoDetails]
    //         const updatedVideoDetails = videoDetailsCopy.map((el, index) => {
    //             return { ...el, thumbnail: thumbs[index] }
    //         })
    //         setVideoDetails([...updatedVideoDetails])
    //         // setVideoDetails({...videoDetails, thumbnail: resp.path})
    //     } catch (error) {
    //         console.log('thumbnail creating error', error);
    //     }
    //     // setLoading(false)
    // }


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


                    <View style={{ width: "100%", alignSelf: 'center', marginBottom: 10, marginHorizontal: 15,top: -10 }}>

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


                    {showModal.isVisible ? (
                        <VideoModel
                            isVisible={showModal.isVisible}
                            toggleModal={toggleModal}
                            videoDetail={showModal.data}
                            {...props}
                        />
                    ) : null}
                    <View style={{ width: "100%", alignSelf: 'flex-start', marginTop: 10, marginBottom: 10 }}>
                        <FlatList
                            data={videoDetails}
                            showsHorizontalScrollIndicator={true}
                            horizontal
                            renderItem={({ item }) => (
                                <View style={styles.VideoThumbWrapper}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowModal({
                                                isVisible: true,
                                                data: item,
                                            });
                                        }}>
                                        <View style={styles.PlayIconContainer}>
                                            <View style={styles.PlayIconWrapper}>
                                                {/* <PlayIcon width={28} height={28} /> */}
                                                <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require('../../../assets/TubeNews-play-button.png')} style={{ width: 70, height: 70 }} />
                                                </View>
                                            </View>
                                            <LinearGradient
                                                colors={['#000', 'transparent']}
                                                style={{
                                                    height: 60, width: dimensions.SCREEN_WIDTH - 80, borderRadius: 15, paddingHorizontal: 15,
                                                    justifyContent: 'center'
                                                }}
                                                start={{ x: 0, y: 0.1 }}
                                                end={{ x: 0, y: 0.1 }}
                                            >
                                                <TouchableOpacity onPress={() => { props.navigation.navigate('NewsDetails') }}>
                                                    <View style={{ width: '52%' }}>
                                                        <Text style={{ color: Mycolors.BG_COLOR, fontSize: 12, }}>Pence Takes Center Stage at Jan. 6 Hearing</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 12, marginTop: 5, color: Mycolors.BG_COLOR }}>June 16, 2022</Text>

                                                </TouchableOpacity>
                                            </LinearGradient>
                                        </View>
                                        <Image
                                            style={styles.BackGroundImage}
                                            // theme={theme}
                                            source={{uri: item?.thumbnail}}
                                            // source={require('../../../assets/images/News-image.png')}
                                            resizeMode={'cover'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}

                            keyExtractor={item => item.id}
                        />
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Latest News</Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('NewsViewAll') }}>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#0089CF' }}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
                        <FlatList
                            data={upData}
                            showsHorizontalScrollIndicator={false}
                            numColumns={1}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ width: '100%', marginVertical: 15, height:100 }}>
                                      
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                 
                                                
                                                    <View style={{ alignItems: 'flex-start',width: '75%',paddingHorizontal:4}}>
                                                        
                                                           <Text style={{ fontSize: 14,fontWeight: '400',color: '#455A64'}}>{item.newstype}</Text>
                                                            <Text style={{ fontSize: 14,fontWeight: '400',color: '#263238',marginTop:5,}}>{item.desc}</Text>
                                                       <View style={{flexDirection:"row",marginTop:5,justifyContent:"center",alignItems:"center"}}>
                                                       <Image source={require('../../../assets/CalendarBlank-news.png')} style={{ height: 25, width: 25,   }} />
                                                       <Text style={{ fontSize: 12,fontWeight: '400',color: '#8F93A0',marginLeft:5}}>{item.time}</Text>
                                                        </View>

                                                        {/* <Text style={{ fontSize: 10, fontWeight: '400', color: '#B2B7B9', marginTop: 2, textAlign: 'left', marginLeft: 10 }}>12:00</Text> */}
                                                        
                                                    </View>
                                                 <View style={{height:100,width:80, alignItems:"flex-start",justifyContent:"center"}}>

                                                <Image resizeMode='contain'
                                                source={ item.img} style={{ height: 90, width: 80,  backgroundColor:"gray",borderRadius:10 }} />
                                                </View>
                                            </View>
                                           
                                         <View style={{borderWidth:1,borderBottomColor:'#E0E0E0',marginTop:15}} />
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
                <TouchableOpacity onPress={() => props.navigation.navigate('')} style={{ width: '80%', height: 60, flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', bottom: 40, right: 20, shadowColor: '#FFD037', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.1, elevation: 5 }}>
                    <Image source={require('../../../assets/upload-blue-button.png')} style={{ width: 100, height: 100 }} />
                </TouchableOpacity> 
            </View>
            {loading ? <Loader /> : null}
            {/* <Modal
                isVisible={showVideoModal}
                swipeDirection="down"
                onBackdropPress={() => setShowVideoModal(false)}
                onSwipeComplete={(e) => {
                    setShowVideoModal(false)
                }}
                scrollTo={() => { }}
                scrollOffset={1}
                propagateSwipe={true}
                coverScreen={false}
                backdropColor='transparent'
                style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 30, marginTop: 10 }}>
                            <TouchableOpacity onPress={() => setShowVideoModal(false)} style={{}}>
                                <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        <VideoPlayer
                            video={{ uri: selectedVideo?.url }}
                            // videoWidth={1600}
                            videoWidth={dimensions.SCREEN_WIDTH * 0.9}
                            videoHeight={250}
                            // videoHeight={900}
                            thumbnail={{ uri: selectedVideo?.thumbnail }}
                            style={{ marginRight: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                            customStyles={{
                                thumbnail: { width: dimensions.SCREEN_WIDTH * 0.9, height: 250 },
                                videoWrapper: { width: dimensions.SCREEN_WIDTH * 0.9, height: 250 },
                                // wrapper: {alignSelf:'center'},
                            }}
                        />
                    </ScrollView>

                </View>
            </Modal> */}
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
export default NewsHome 