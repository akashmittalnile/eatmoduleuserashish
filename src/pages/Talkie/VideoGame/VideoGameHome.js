import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
// import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import MyButtons from '../../../component/MyButtons';
import B2BSearch from '../../Deal/B2b/B2BSearch';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
// import Toast from 'react-native-simple-toast';
import Loader from '../../../WebApi/Loader';
import VideoPlayer from 'react-native-video-player'
import { VideoModel } from '../../../component/VideoModel';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
 

const VideoGameHome = (props) => {
    const [searchValue, setsearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState({ isVisible: false, data: null });
    const [showVideoModal, setShowVideoModal] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState({})
    const [pick, setpick] = useState('')
    const [filepath, setfilepath] = useState(null)
    const [videoDetails, setVideoDetails] = useState([
        { url: `https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcQt8LDJP9sEZiwlMAGvs8I-s0yXRX3nZtkjfQ` },
        { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
        { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
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
    const [courseData, setCourseData] = useState([
        {
            id: '1',
            title: 'Sandbox',
            desc: '',
            time: '',
            img: require('../../../assets/images/Sandboximage.png'),
        },
        {
            id: '2',
            title: 'Battle Games',
            desc: '',
            time: '',
            img: require('../../../assets/images/BattleGames.png'),
        },
        {
            id: '3',
            title: 'Puzzlers',
            desc: '',
            time: '',
            img: require('../../../assets/images/Puzzlers.png'),
        },
        {
            id: '4',
            title: 'Sandbox',
            desc: '',
            time: '',
            img: require('../../../assets/images/Sandboximage.png'),
        },
        {
            id: '5',
            title: 'Battle Games',
            desc: '',
            time: '',
            img: require('../../../assets/images/BattleGames.png'),
        },
    ])
    useEffect(() => {
        // generateThumb()
    }, [])

    const openLibrary = async () => {

        let options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option'
                },
            ],
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (image) => {
            if (!image.didCancel) {
                console.log('the ddd==', image.assets[0].uri)
                var photo = {
                    uri: image.assets[0].uri,
                    type: "image/jpeg",
                    name: image.assets[0].fileName
                };
                console.log("photo", photo);
                setpick(photo)
                setfilepath(image)
            }
        })


    }
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
        <SafeAreaView style={{ backgroundColor: '#000', height: dimensions.SCREEN_HEIGHT * 100 / 100, width: '100%' }}>
            <ScrollView>
                <View style={{ backgroundColor: '#fff', height: dimensions.SCREEN_HEIGHT * 28 / 100, width: '100%' }}>
                    <ImageBackground source={require('../../../assets/images/Gamewallpaper.png')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} resizeMode='stretch'>
                        <HomeHeader height={60} paddingHorizontal={15}
                            press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')}
                            img1width={30} img1height={30} img1backgroundColor={'transparent'} img1padding={5} img1borderRadius={4}
                            press2={() => { }} title2={'Game Video'} fontWeight={'bold'} img2height={20} color={Mycolors.BG_COLOR}
                            press3={() => { }} img3width={25} img3height={25} />

                    </ImageBackground>
                </View>
                <View style={{ width: '96%', alignItems: 'flex-start', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 10, top: -130 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: '600' }}>Browse the</Text>
                    <Text style={{ color: 'red', fontSize: 26, fontWeight: '600' }}>Games Videos</Text>
                </View>

                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <View style={{ top: -140, position: "absolute" }}>
                        <B2BSearch searchIcon={require('../../../assets/Search-icon-red.png')}
                            marginTop={10} placeholder={'Search video'}
                            serchValue={searchValue}
                            onChangeText={(e) => { setsearchValue(e) }}
                            press={() => { Alert.alert('Hi') }}
                            presssearch={() => { Alert.alert('Search Pressed') }}
                            paddingLeft={20} />
                    </View>

                    <View style={{ width: dimensions.SCREEN_WIDTH * 0.99, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, top: -40 }}>
                        <FlatList
                            data={courseData}
                            showsHorizontalScrollIndicator={true}
                            horizontal
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <LinearGradient
                                        colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                                        style={{ width: dimensions.SCREEN_WIDTH / 3.2, marginRight: 10, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.03, elevation: 1, }}
                                    >
                                        <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH / 3.2, height: 130, alignItems: 'center', borderRadius: 15, paddingHorizontal: 10, justifyContent: "center" }}
                                            onPress={() => { }}>

                                            <Image source={item.img} style={{ width: 75, height: 75 }} resizeMode='contain'></Image>


                                            <Text style={{ fontSize: 13, fontWeight: '500', color: '#263238', marginTop: 5, textAlign: 'center' }}>{item.title}</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                )
                            }}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#FFFFFF' }}>Latest Videos</Text>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: '#ED1C24' }}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    {showModal.isVisible ? (
                        <VideoModel
                            isVisible={showModal.isVisible}
                            toggleModal={toggleModal}
                            videoDetail={showModal.data}
                            {...props}
                        />
                    ) : null}

                    <View style={{ width: dimensions.SCREEN_WIDTH * 0.97, alignSelf: 'flex-start', marginTop: 20, marginBottom: 10 }}>
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
                                                <View style={{ width: 55, height: 55, borderRadius: 55 / 2, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require('../../../assets/VideoGame-play-button.png')} style={{ width: 30, height: 30 }} />
                                                </View>
                                            </View>
                                            <LinearGradient
                                                colors={['#000', 'transparent']}
                                                style={{
                                                    height: 60, width: dimensions.SCREEN_WIDTH - 80, borderRadius: 15, paddingHorizontal: 15,
                                                    justifyContent: 'center'
                                                }}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0.2, y: 0 }}
                                            >
                                                <TouchableOpacity onPress={()=>{props.navigation.navigate('VideoGamedetails')}}>
                                                    <View style={{ width: '52%' }}>
                                                        <Text style={{ color: Mycolors.BG_COLOR, fontSize: 12, }}>Pubg Squad Play Video</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 12, marginTop: 14, color: Mycolors.BG_COLOR }}>John Doe</Text>

                                                </TouchableOpacity>
                                            </LinearGradient>
                                        </View>
                                        <Image
                                            style={styles.BackGroundImage}
                                            // theme={theme}
                                            source={{ uri: item?.thumbnail }}
                                            resizeMode={'cover'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}

                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={{ height: 170 }} />

            </ScrollView>
            <View style={{ width: '95%', height: 60, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 100, alignSelf: 'center', zIndex: 999 }}>
                <MyButtons title="Upload Video" height={50} width={'100%'} borderRadius={5} press={() => { props.navigation.navigate('VideoUpload') }} fontSize={13}
                    titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#ED1C24'} />

            </View>
            {loading ? <Loader /> : null}
            <Modal
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
            </Modal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    VideoThumbWrapper: {
        position: 'relative',
        // width: '48%',
        // marginRight: 8,
        marginBottom: 4,

        width: dimensions.SCREEN_WIDTH / 2.3,
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BackGroundImage: {
        backgroundColor:"gray",
        width: '100%',
        height: 190,
        justifyContent: 'center',
        borderRadius: 15
    },
});
export default VideoGameHome