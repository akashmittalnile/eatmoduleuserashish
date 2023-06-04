import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Animated, Dimensions, StatusBar } from 'react-native';
import MusicCumstomHeader from './MusicCustomHeader';
// import TrackPlayer, {
//     Capability,
//     Event,
//     RepeatMode,
//     State,
//     usePlaybackState,
//     useProgress,
//     useTrackPlayerEvents,
// } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import MyButtons from '../../../component/MyButtons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
// import Toast from 'react-native-simple-toast';
import Loader from '../../../WebApi/Loader';
import Share from 'react-native-share';

import { Rating, AirbnbRating } from 'react-native-ratings';
const { width, height } = Dimensions.get('window');

const MusicPlayScreen = (props) => {

    const [modlevisual1, setmodlevisual1] = useState(false)
    const [userMessage, setUserMessage] = useState('')
    const [replyingTo, setReplyingTo] = useState('')
    const [loading, setLoading] = useState(false);
    const [postDecs, setPostDesc] = useState('');

    const playBackState = usePlaybackState();
    const progress = useProgress();
    //   custom states
    const [songIndex, setsongIndex] = useState(0);
    const [repeatMode, setRepeatMode] = useState('off');
    const [trackTitle, setTrackTitle] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [trackArtwork, setTrackArtwork] = useState();
    // custom referecnces
    const scrollX = useRef(new Animated.Value(0)).current;
    const songSlider = useRef(null);
    const data = [
        'https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1484876065684-b683cf17d276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'


    ]
    const songs = [
        {
            id: 1,
            title: 'Something is Going On',
            artist: 'Godmode',
            artwork: require('../../../assets/images/Despacito-music.png'),
            url: require('../../../assets/images/Despacito-music.png')
        },
        {
            id: 2,
            title: 'Awful',
            artist: 'josh pan',
            artwork: require('../../../assets/images/The-dark-night-image.png'),
            url: require('../../../assets/images/The-dark-night-image.png'),
        },
        {
            id: 3,
            title: 'Something is Going On',
            artist: 'Godmode',
            artwork: require('../../../assets/images/Childhood-music.png'),
            url: require('../../../assets/images/Despacito-music.png'),
        },

    ];
    const setupPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    // Capability.SkipToNext,
                    // Capability.SkipToPrevious,
                    Capability.Stop,
                ],

            });
            await TrackPlayer.add(songs);
        } catch (error) {
            console.log(error);
        }
    };

    const togglePlayBack = async (playBackState) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        console.log(currentTrack, playBackState, State.Playing);
        if (currentTrack != null) {
            if (playBackState == State.Paused) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    };

    const MycustomonShare = async () => {
        const shareOptions = {
            title: 'KinenGo Contents',
            icon: 'data:<data_type>/<file_extension>;base64,<base64_data>',
            // type: 'data:image/png;base64,<imageInBase64>',
            // message: "Popfiit App",
            url: 'KinenGo',
          }
          try {
            const shareResponse = await Share.open(shareOptions);

            console.log(JSON.stringify(shareResponse));

          }
          catch (error) {
            console.log('ERROR=>', error);
          }
    };

    // useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    //     if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
    //         const track = await TrackPlayer.getTrack(event.nextTrack);
    //         const { title, artwork, artist } = track;
    //         setTrackTitle(title);
    //         setTrackArtist(artist);
    //         setTrackArtwork(artwork);
    //     }
    // });

    const repeatIcon = () => {
        if (repeatMode == 'off') {
            return 'repeat-off';
        }

        if (repeatMode == 'track') {
            return 'repeat-once';
        }

        if (repeatMode == 'repeat') {
            return 'repeat';
        }
    };

    const changeRepeatMode = () => {
        if (repeatMode == 'off') {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode('track');
        }

        if (repeatMode == 'track') {
            TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setRepeatMode('repeat');
        }

        if (repeatMode == 'repeat') {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode('off');
        }
    };

    const skipTo = async trackId => {
        await TrackPlayer.skip(trackId);
    };

    const design = (img, ti, imgh, imgw, redious, press) => {
        return (
            <TouchableOpacity onPress={press ? press : () => { }} style={{ alignItems: 'center', width: "40%", borderRadius: 15, height: 35, paddingHorizontal: 0,flexDirection: 'row', alignSelf:"flex-start"}}>
                <View 
                    style={{ width: 40, height: 40, justifyContent: 'center', borderRadius: redious }}>
                    <Image source={img} style={{ width: imgw, height: imgh, overflow: 'hidden', alignSelf: 'center' }}></Image>
                </View>
                <View style={{ alignItems: 'center', }}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#455A64' }}>{ti}</Text>
                </View>

            </TouchableOpacity>

        )
    }
    // useEffect(() => {
    //     setupPlayer();

    //     scrollX.addListener(({ value }) => {
          

    //         const index = Math.round(value / width);
    //         skipTo(index);
    //         setsongIndex(index);

          
    //     });

    //     return () => {
    //         scrollX.removeAllListeners();
          
    //     };
    // }, []);

    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
    };

    const skipToPrevious = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
    };

    const renderSongs = ({ item, index }) => {
        return (
            <Animated.View style={styles.mainWrapper}>
                <View style={[styles.imageWrapper, styles.elevation]}>
                    <Image
                        //   source={item.artwork}
                        source={trackArtwork}
                        style={styles.musicImage}
                    />
                </View>
            </Animated.View>
        );
    };

    const [upData, setupData] = useState([
        {
            id: '1',
            name: 'Dharia',
            title: 'August Diaries',
            img: require('../../../assets/images/Despacito-music.png')
        },
        {
            id: '2',
            name: 'Dharia',
            title: 'Incredible',
            img: require('../../../assets/images/Despacito-music.png')
        },
        {
            id: '3',
            name: 'Dharia',
            title: 'Sugar & Brownies',
            img: require('../../../assets/images/Despacito-music.png')
        },
        {
            id: '4',
            name: 'Dharia',
            title: 'Tara Rita',
            img: require('../../../assets/images/Despacito-music.png')
        },
        {
            id: '5',
            name: 'Dharia and Faul & Wad Ad',
            title: 'Cry For You',
            img: require('../../../assets/images/Despacito-music.png')
        }
    ])

    return (
        <SafeAreaView style={{ backgroundColor: '#2A2B2C', height: dimensions.SCREEN_HEIGHT * 100 / 100, width: '100%', flex: 1 }}>
            {/* <StatusBar hidden />
            <View style={StyleSheet.absoluteFillObject}>
                {
                    data.map((image, index) => {
                        const inputRange = [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width
                        ]
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0, 1, 0]
                        })
                     
                        return (
                            <Animated.Image
                                resizeMode={'cover'}
                                // key={index}
                                key={`image-${index}`}
                                source={{ uri: image }}
                                style={[
                                    StyleSheet.absoluteFillObject,
                                    {
                                        opacity, position: 'absolute',
                                    }
                                ]}
                                blurRadius={50}
                            />)
                    })
                }
            </View>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>



                <MusicCumstomHeader height={60} paddingHorizontal={15}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')}
                    img1width={30} img1height={30} img1backgroundColor={'transparent'} img1padding={5} img1borderRadius={4}
                    // press2={() => { }} title2={''} fontWeight={'bold'} img2height={20}
                    press3={() => { props.navigation.navigate('MusicCommentsScreen')}} img3width={25} img3height={25}
                    img3={require('../../../assets/ChatCircleDots-white.png')}
                    press4={() => {MycustomonShare()}} img4width={25} img4height={25}
                    img4={require('../../../assets/ShareNetwork-white.png')}
                    press5={() => { setmodlevisual1(true) }} img5width={25} img5height={25}
                    img5={require('../../../assets/DotsThreeVertical-white.png')}
                />





                <View style={styles.mainContainer}>
                 

                    <Animated.FlatList
                        ref={songSlider}
                        renderItem={renderSongs}
                        data={songs}
                        // keyExtractor={item => item.id}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: { x: scrollX },
                                    },
                                },
                            ],
                            { useNativeDriver: true },
                        )}
                    />

                   
                    <View>
                        <Text style={[styles.songContent, styles.songTitle]}>
                            {trackTitle}
                        </Text>
                        <Text style={[styles.songContent, styles.songArtist]}>
                            { trackArtist}
                        </Text>
                    </View>

                  
                    <View>
                        <Slider
                            style={styles.progressBar}
                            value={progress.position}
                            minimumValue={0}
                            maximumValue={progress.duration}
                            thumbTintColor="#6D2F91"
                            minimumTrackTintColor="#FFD369"
                            maximumTrackTintColor="#fff"
                            onSlidingComplete={async (value) => {
                                await TrackPlayer.seekTo(value);
                            }}
                        />

                     
                    </View>

                 
                    <View style={styles.musicControlsContainer}>
                        <TouchableOpacity onPress={changeRepeatMode}>
                            <MaterialCommunityIcons
                                name={`${repeatIcon()}`}
                                size={30}
                                color={repeatMode !== 'off' ? '#6D2F91' : '#888888'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={skipToPrevious}>
                            <Image
                                source={require('../../../assets/MusicSkipBack.png')}
                                style={{ height: 25, width: 25, alignSelf: "center", marginTop: 1 }}
                            />
                         
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => togglePlayBack(playBackState)} style={{ paddingVertical: 4, height: 60, width: 55, }}>
                            {
                                playBackState === State.Playing
                                    ? <Image
                                        source={require('../../../assets/Music-pause-button.png')}
                                        style={{ height: 65, width: 55 }}
                                    />
                                    :
                                    <Image
                                        source={require('../../../assets/Music-pause-button.png')}
                                        style={{ height: 80, width: 55, alignSelf: "center", marginTop: 1 }}
                                    />
                            }

                          
                        </TouchableOpacity>
                        <TouchableOpacity onPress={skipToNext}>
                            <Image
                                source={require('../../../assets/MusicSkipForward.png')}
                                style={{ height: 25, width: 25, alignSelf: "center", marginTop: 1 }}
                            />
                           
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <Ionicons name="heart-outline" size={30} color="#888888" />
                        </TouchableOpacity>
                    </View>
                </View>

               


                <View style={{ height: 60 }} />

            </ScrollView>
            {loading ? <Loader /> : null}






         
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
                <TouchableOpacity style={{ flex: 1 }} onPress={() => setmodlevisual1(false)} ></TouchableOpacity>
                <View style={{ height: 150, backgroundColor: '#FFFFFF', borderRadius:30, padding: 20,   marginHorizontal: 4,marginBottom:4 }}>

                    <View style={{  justifyContent: 'space-between', alignItems: 'center', width: "80%",  }}>

                         
                        {design(require('../../../assets/Music-Newspaper.png'), 'Newsfeed', '70%', 25, 20, () => { props.navigation.navigate('MovieNewsfeed') })}
                        {design(require('../../../assets/ArrowCircleDown-Music.png'), 'Download', '70%', 25, 20)}
                        {design(require('../../../assets/Info-music.png'), 'Share', '70%', 25, 20)}
                    </View>

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
        height: 50,
        marginTop: 25,
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 999
    },
    BackGroundImage: {
        backgroundColor: "gray",
        width: '100%',
        height: 190,
        justifyContent: 'center',
        borderRadius: 15
    },
    inputDesc: {
        paddingLeft: 20,
        textAlign: "left",
        width: '100%',
        fontSize: 13,
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 0.5,
        // backgroundColor: '#34333a',
        color: '#fff',
        height: 100,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: Mycolors.Black
    },
    container: {
        flex: 1,
        backgroundColor: '#222831',
    },
    mainContainer: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSection: {
        borderTopColor: '#393E46',
        borderWidth: 1,
        width: width,
        alignItems: 'center',
        paddingVertical: 15,
    },

    bottomIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },

    mainWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },

    imageWrapper: {
        borderRadius: 26,
        borderWidth: 2,
        borderColor: '#D8D0DD',
        width: 300,
        height: 340,
        marginBottom: 25,
    },
    musicImage: {
        width: '100%',
        height: '100%',
        borderRadius: 26,
    },
    elevation: {
        elevation: 5,

        shadowColor: '#ccc',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },
    songContent: {
        textAlign: 'center',
        color: '#EEEEEE',
    },
    songTitle: {
        fontSize: 18,
        fontWeight: '600',
    },

    songArtist: {
        fontSize: 16,
        fontWeight: '300',
    },

    progressBar: {
        width: 370,
        height: 40,
        marginTop: 25,
        flexDirection: 'row',
    },
    progressLevelDuraiton: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressLabelText: {
        color: '#FFF',
    },

    musicControlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        width: '90%',
    },
});
export default MusicPlayScreen