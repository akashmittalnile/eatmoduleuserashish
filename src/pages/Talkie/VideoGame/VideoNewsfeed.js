import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
// import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import MyButtons from '../../../component/MyButtons';
import Modal from 'react-native-modal';
// import Toast from 'react-native-simple-toast';
import Loader from '../../../WebApi/Loader';
 
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';


const VideoNewsfeed = (props) => {

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
        <SafeAreaView style={{ backgroundColor: '#000', height: dimensions.SCREEN_HEIGHT * 100 / 100, width: '100%' }}>
            <ScrollView>
                <HomeHeader height={60} paddingHorizontal={15}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')}
                    img1width={30} img1height={30} img1backgroundColor={'transparent'} img1padding={5} img1borderRadius={4}
                    press2={() => { }} title2={'Newsfeed'} fontWeight={'bold'} img2height={20} color={Mycolors.BG_COLOR}
                    press3={() => { }} img3width={25} img3height={25} />

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: '97%', marginHorizontal: 10 }}>
                    <Image source={require('../../../assets/dating-home-header-left-image.png')} style={{ width: 50, height: 50, borderRadius: 25 }}></Image>
                    <View style={{ marginLeft: 10, width: '83%' }}>
                        <Text style={{ color: Mycolors.BG_COLOR, fontSize: 16, fontWeight: '600' }}>John Doe</Text>

                    </View>
                    <View style={{ width: '40%', height: 50, justifyContent: 'center', position: 'absolute', marginHorizontal: 10, alignSelf: "center", right: 0 }}>
                        <MyButtons title=" Post New Updates" height={40} width={'100%'} borderRadius={5} press={() => { setmodlevisual1(true) }} fontSize={13}
                            titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#ED1C24'} />

                    </View>
                </View>
                <View style={{ backgroundColor: '#fff', height: 200, width: '91%', position: 'relative', borderRadius: 25, marginHorizontal: 20 }}>

                    <ImageBackground source={require('../../../assets/images/Pubg-photo.png')} style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 25 }} resizeMode='stretch'>


                        <View style={styles.PlayIconWrapper}>

                            <TouchableOpacity>
                                <Image source={require('../../../assets/VideoGame-play-button.png')} style={{ width: 50, height: 50 }} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                </View>
                {/* <View style={{ width: '96%', alignItems: 'flex-start', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 10, top: -130 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: '600' }}>Browse the</Text>
                    <Text style={{ color: 'red', fontSize: 26, fontWeight: '600' }}>Games Videos</Text>
                </View> */}

                <View style={{ width: '97%', alignSelf: 'center', }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>

                        <View style={{ marginLeft: 10, width: '83%' }}>
                            <Text style={{ color: Mycolors.BG_COLOR, fontSize: 16, fontWeight: '600' }}>Pubg Squad Play Video</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
                                <Text style={{ color: '#8F93A0', fontSize: 11, fontWeight: '600' }}>Published</Text>
                                <Text style={{ color: '#8F93A0', fontSize: 11, fontWeight: '600' }}> June 13, 2022 6:28AM</Text>


                            </View>
                        </View>

                    </View>
                    <View style={{ width: '97%', alignItems: 'flex-start', alignSelf: 'center', paddingHorizontal: 15, top: 10, }}>

                        <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600', textAlign: "left" }}>PUBG: Battlegrounds (previously known as PlayerUnknown's Battlegrounds, or simply PUBG) is an online multiplayer battle royale game developed and published by PUBG Studios, a subsidiary of Krafton. The game is based on previous mods that were created by Brendan "PlayerUnknown" Greene for other games, inspired by the 2000 Japanese film Battle Royale, and expanded into a standalone game under Greene's creative direction. In the game, up to one hundred players parachute onto an island and scavenge for weapons and equipment to kill others while avoiding getting killed themselves. The available safe area of the game's map decreases in size over time, directing surviving players into tighter areas to force encounters.</Text>
                    </View>
                    <View style={{ height: 20 }} />
                    <View style={{ backgroundColor: '#fff', height: 200, width: '91%', borderRadius: 25, marginHorizontal: 20, alignSelf: "center", marginVertical: 10 }}>

                        <ImageBackground source={require('../../../assets/images/Pubg-photo.png')} style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 25 }} resizeMode='stretch'>



                        </ImageBackground>

                    </View>

                    <View style={{ width: '97%', alignItems: 'flex-start', alignSelf: 'center', paddingHorizontal: 15, top: 10, }}>

                        <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600', textAlign: "left" }}>PUBG: Battlegrounds (previously known as PlayerUnknown's Battlegrounds, or simply PUBG) is an online multiplayer battle royale game developed and published by PUBG Studios, a subsidiary of Krafton. The game is based on previous mods that were created by Brendan "PlayerUnknown" Greene for other games, inspired by the 2000 Japanese film Battle Royale, and expanded into a standalone game under Greene's creative direction. In the game, up to one hundred players parachute onto an island and scavenge for weapons and equipment to kill others while avoiding getting killed themselves. The available safe area of the game's map decreases in size over time, directing surviving players into tighter areas to force encounters.</Text>
                    </View>





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
                <View style={{ height: '64%', backgroundColor: '#2A2B2C', borderRadius: 30, padding: 20, marginBottom: 20, marginHorizontal: 10, }}>
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>



                        <View style={{ ustifyContent: 'center', alignItems: "center", padding: 5 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: '97%', marginHorizontal: 10 }}>
                                <Image source={require('../../../assets/dating-home-header-left-image.png')} style={{ width: 50, height: 50, borderRadius: 25 }}></Image>
                                <View style={{ marginLeft: 10, width: '83%' }}>
                                    <Text style={{ color: Mycolors.BG_COLOR, fontSize: 17, fontWeight: '600' }}>John Doe</Text>
                                </View>
                            </View>

                            <View style={{ width: '93%', height: 100, borderRadius: 5, marginTop: 20, alignSelf: 'center', backgroundColor: "#2A2B2C", borderWidth: 1, borderColor: "#455A64" }}>

                                <TextInput
                                    value={postDecs}
                                    textAlignVertical='top'
                                    onChangeText={(e) => setPostDesc(e)}
                                    placeholder='Write Your review here…'
                                    placeholderTextColor="#bbbbbb"
                                    multiline={true}
                                    // maxLength={500}
                                    // keyboardType="number-pad"
                                    autoCapitalize='none'
                                    style={[styles.inputDesc]}
                                />

                            </View>


                            <View style={{marginTop:15,alignSelf:"flex-start"}}>
                                <TouchableOpacity onPress={()=>{opencamera()}}
                                style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: '97%',  }}>
                                    <Image source={require('../../../assets/Video-Camera.png')} style={{ width: 30, height: 30, borderRadius: 25 }}></Image>
                                    <View style={{ marginLeft: 10, width: '83%' }}>
                                        <Text style={{ color: Mycolors.BG_COLOR, fontSize: 14, fontWeight: '600' }}>Camera</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{openLibrary()}}
                                style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: '97%',  }}>
                                    <Image source={require('../../../assets/Video-dummyimage.png')} style={{ width: 30, height: 30, borderRadius: 25 }}></Image>
                                    <View style={{ marginLeft: 10, width: '83%' }}>
                                        <Text style={{ color: Mycolors.BG_COLOR, fontSize: 14, fontWeight: '600' }}>Photo/video</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: '90%', height: 50, justifyContent: 'center', position: 'absolute', bottom: 30, marginHorizontal: 10, alignSelf: "center" }}>
                            <MyButtons title="Post" height={50} width={'100%'} borderRadius={5} press={() => {
                                props.navigation.navigate(' '),
                                    setmodlevisual1(false)
                            }} fontSize={13}
                                titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#ED1C24'} />

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
export default VideoNewsfeed