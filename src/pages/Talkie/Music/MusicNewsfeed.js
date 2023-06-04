import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from '../../Deal/B2b/Homeheaderroundbottom';
// import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import MyButtons from '../../../component/MyButtons';
import Modal from 'react-native-modal';
// import Toast from 'react-native-simple-toast';
import Loader from '../../../WebApi/Loader';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const MusicNewsfeed = (props) => {

    const [pick, setpick] = useState('')
    const [filepath, setfilepath] = useState(null)
    const [modlevisual1, setmodlevisual1] = useState(false)
    const [loading, setLoading] = useState(false);
    const [postDecs, setPostDesc] = useState('');

    useEffect(() => {

    }, [])

    const opencamera = async () => {
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

        launchCamera(options, (image) => {
            if (!image.didCancel) {
                console.log('the ddd==', image)
                var photo = {
                    uri: image.assets[0].uri,
                    type: "image/jpeg",
                    name: image.assets[0].fileName
                };
                setpick(photo)
                setfilepath(image)
            }

        })
    }

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
                setpick(photo)
                setfilepath(image)
            }
        })


    }


    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', height: dimensions.SCREEN_HEIGHT * 100 / 100, width: '100%' }}>
            <ScrollView>
                <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor={'#6D2F91'}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={6}
                    press2={() => { }} title2={'Newsfeed'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
                    press3={() => { }} img3width={25} img3height={25} />

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: '97%', marginHorizontal: 10 }}>
                    <Image source={require('../../../assets/dating-home-header-left-image.png')} style={{ width: 50, height: 50, borderRadius: 25 }}></Image>
                    <View style={{ marginLeft: 10, width: '83%' }}>
                        <Text style={{ color: Mycolors.Black, fontSize: 16, fontWeight: '600' }}>John Doe</Text>

                    </View>
                    <View style={{ width: '40%', height: 50, justifyContent: 'center', position: 'absolute', marginHorizontal: 10, alignSelf: "center", right: 0 }}>
                        <MyButtons title=" Post New Updates" height={40} width={'100%'} borderRadius={5} press={() => { setmodlevisual1(true) }} fontSize={13}
                            titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#6D2F91'} />

                    </View>
                </View>
                <View style={{ backgroundColor: '#fff', height: 200, width: '91%', borderRadius: 25, marginHorizontal: 20, alignSelf: "center", marginVertical: 10 }}>

                    <ImageBackground source={require('../../../assets/images/Music-tara-image.png')} style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 25 }} resizeMode='stretch'>



                    </ImageBackground>

                </View>
                {/* <View style={{ backgroundColor: '#fff', height: 200, width: '91%', position: 'relative', borderRadius: 25, marginHorizontal: 20 }}>

                    <ImageBackground source={require('../../../assets/images/ambulance-movie-pic.png')} style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 25 }} resizeMode='stretch'>


                        <View style={styles.PlayIconWrapper}>

                            <TouchableOpacity>
                                <Image source={require('../../../assets/VideoGame-play-button.png')} style={{ width: 50, height: 50 }} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                </View> */}
                {/* <View style={{ width: '96%', alignItems: 'flex-start', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 10, top: -130 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: '600' }}>Browse the</Text>
                    <Text style={{ color: 'red', fontSize: 26, fontWeight: '600' }}>Games Videos</Text>
                </View> */}

                <View style={{ width: '97%', alignSelf: 'center', }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>

                        <View style={{ marginLeft: 10, width: '83%' }}>
                            <Text style={{ color: Mycolors.Black, fontSize: 16, fontWeight: '600' }}>Dharia Tara Rita </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
                                <Text style={{ color: '#8F93A0', fontSize: 11, fontWeight: '600' }}>Published</Text>
                                <Text style={{ color: '#8F93A0', fontSize: 11, fontWeight: '600' }}> June 13, 2022 6:28AM</Text>


                            </View>
                        </View>

                    </View>
                    <View style={{ width: '97%', alignItems: 'flex-start', alignSelf: 'center', paddingHorizontal: 15, top: 10, }}>

                        <Text style={{ color: '#455A64', fontSize: 13, fontWeight: '600', textAlign: "left" }}>Haria Comanescu is a Romanian singer and song writer who is known as ‘Dharia’ to mass people. She was born on 22 February, 2005 and raised in Rome and started her musical journey from a very young age, when she was only 13. Now, She has earned worldwide popularity.

                            Dharia, a Romanian singer and song writer who has earned much popularity in a short time, started her journey from a very young age. She released her first song when she was only 13. Her first single is “Sugar & Brownies”. She released this together with Christian Tarcea. This song has earned world wide hit and positive response from listeners in the last of 2019. In March 2020, she released her second single “August Diaries “.
                            Dharia is generally a pop singer. She gained popularity when her first single got viral on TikTok. She is like an inspiration to the young generation. People of different ages love to listen her songs. She is planning her career with music and wants to do more music to achieve her success.

                            Tara Rita" is the third song by Dharia released under Thrace Music. She said about creating it with Monoir, "When we started writing the song, I felt like it has to be energetic and cheerful because this is what most of us need right now: music that speaks to our soul and keeps us dancing at the same time."</Text>
                    </View>
                    {/* <View style={{ height: 20 }} />
                    <View style={{ backgroundColor: '#fff', height: 200, width: '91%', borderRadius: 25, marginHorizontal: 20, alignSelf: "center", marginVertical: 10 }}>

                        <ImageBackground source={require('../../../assets/images/ambulance-movie-pic.png')} style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 25 }} resizeMode='stretch'>



                        </ImageBackground>

                    </View> */}

                    {/* <View style={{ width: '97%', alignItems: 'flex-start', alignSelf: 'center', paddingHorizontal: 15, top: 10, }}>

                        <Text style={{ color: '#455A64', fontSize: 13, fontWeight: '600', textAlign: "left" }}>Ambulance is a 2022 American action thriller film directed and produced by Michael Bay. A co-production between New Republic Pictures, Project X Entertainment, and Bay Films, it is based on the 2005 Danish film of the same name by Laurits Munch-Petersen and Lars Andreas Pedersen. It stars Jake Gyllenhaal, Yahya Abdul-Mateen II, and Eiza González and follows two adoptive siblings turned bank robbers who hijack an ambulance and take two first responders hostage..</Text>
                    </View> */}





                </View>

                <View style={{ height: 130 }} />

            </ScrollView>
            {loading ? <Loader /> : null}


            {/* Post your review modul */}
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
                <View style={{ height: '64%', backgroundColor: '#FFFFFF', borderRadius: 30, padding: 20, marginBottom: 20, marginHorizontal: 10, }}>
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>



                        <View style={{ ustifyContent: 'center', alignItems: "center", padding: 5 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: '97%', marginHorizontal: 10 }}>
                                <Image source={require('../../../assets/dating-home-header-left-image.png')} style={{ width: 50, height: 50, borderRadius: 25 }}></Image>
                                <View style={{ marginLeft: 10, width: '83%' }}>
                                    <Text style={{ color: Mycolors.Black, fontSize: 17, fontWeight: '600' }}>John Doe</Text>
                                </View>
                            </View>

                            <View style={{ width: '93%', height: 100, borderRadius: 5, marginTop: 20, alignSelf: 'center', backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D9D9D9" }}>

                                <TextInput
                                    value={postDecs}
                                    textAlignVertical='top'
                                    onChangeText={(e) => setPostDesc(e)}
                                    placeholder='Write Your review here…'
                                    placeholderTextColor="#D9D9D9"
                                    multiline={true}
                                    // maxLength={500}
                                    // keyboardType="number-pad"
                                    autoCapitalize='none'
                                    style={[styles.inputDesc]}
                                />

                            </View>


                            <View style={{ marginTop: 15, alignSelf: "flex-start" }}>
                                <TouchableOpacity onPress={() => { opencamera() }}
                                    style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: '97%', }}>
                                    <Image source={require('../../../assets/Movie-Camera-yellow.png')} style={{ width: 30, height: 30, borderRadius: 25 }}></Image>
                                    <View style={{ marginLeft: 10, width: '83%' }}>
                                        <Text style={{ color: '#455A64', fontSize: 14, fontWeight: '600' }}>Camera</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { openLibrary() }}
                                    style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: '97%', }}>
                                    <Image source={require('../../../assets/Movie-dummyimage.png')} style={{ width: 30, height: 30, borderRadius: 25 }}></Image>
                                    <View style={{ marginLeft: 10, width: '83%' }}>
                                        <Text style={{ color: '#455A64', fontSize: 14, fontWeight: '600' }}>Photo/video</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: '90%', height: 50, justifyContent: 'center', position: 'absolute', bottom: 30, marginHorizontal: 10, alignSelf: "center" }}>
                            <MyButtons title="Post" height={50} width={'100%'} borderRadius={5} press={() => {
                                props.navigation.navigate(' '),
                                    setmodlevisual1(false)
                            }} fontSize={13}
                                titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#6D2F91'} />

                        </View>

                        <View style={{ width: 100, height: 100 }} />
                    </ScrollView>

                </View>
            </Modal>
        </SafeAreaView >
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
        marginTop: 65,
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
});
export default MusicNewsfeed