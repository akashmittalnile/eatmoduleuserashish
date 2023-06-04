import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
// import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import MyButtons from '../../../component/MyButtons';
 
import LinearGradient from 'react-native-linear-gradient';
// import Toast from 'react-native-simple-toast';
import Loader from '../../../WebApi/Loader';
import VideoPlayer from 'react-native-video-player'
 
import { VideoModel } from '../../../component/VideoModel';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const VideoUpload = (props) => {

    const [videoTitle, setVideoTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [videoDecs, setVideoDesc] = useState('');
    // const [loading, setLoading] = useState(false)


    const [pick, setpick] = useState('')
    const [filepath, setfilepath] = useState(null)

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
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>Choose Category</Text>

                </View>

                <View style={{ width: '90%', alignSelf: 'center' }}>


                    <View style={{ width: dimensions.SCREEN_WIDTH * 0.99, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, top: -130 }}>
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

                                        <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH / 3.2, height: 130, alignItems: 'center', borderRadius: 15, paddingHorizontal: 10, justifyContent: "center", overflow: 'hidden', position: 'relative',}}
                                            onPress={() => { setSelectedCategory(item.id) }}>
                                            <LinearGradient
                                                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
                                                style={{ position: 'absolute', top: -3, bottom: 0, left: 0, right:-5 , zIndex: 1, }}
                                            >
                                                {selectedCategory === item.id ?
                                                    <View style={{ flex: 1, flexDirection: 'column',borderColor: selectedCategory === item.id ? 'red' : 'white' ,borderWidth:1 , }}>
                                                        <Image source={require('../../../assets/Video-selected-category-check-circle.png')} style={{ alignSelf: 'flex-end', top: 10, right: 10 }} />

                                                    </View>
                                                    :
                                                    null

                                                }
                                            </LinearGradient>


                                            <Image source={item.img} style={{ width: 75, height: 75 }} resizeMode='contain'></Image>


                                            <Text style={{ fontSize: 13, fontWeight: '500', color: '#263238', marginTop: 5, textAlign: 'center' }}>{item.title}</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                )
                            }}

                        />
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', top: -128 }}>
                        <View style={styles.BoxView}>
                            <TextInput
                                value={videoTitle}
                                onChangeText={(text) => {
                                    setVideoTitle(text)
                                }}
                                placeholder="Video Title"
                                placeholderTextColor={'#B2B7B9'}
                                style={[styles.input, { width: '100%', }]}
                                multiline
                            />
                        </View>

                        <View style={{ width: '93%', height: 100, borderRadius: 5, marginTop: 10, alignSelf: 'center', backgroundColor: "#fff", }}>

                            <TextInput
                                value={videoDecs}
                                textAlignVertical='top'
                                onChangeText={(e) => setVideoDesc(e)}
                                placeholder='Video Description'
                                placeholderTextColor="#bbbbbb"
                                multiline={true}
                                // maxLength={500}
                                // keyboardType="number-pad"
                                autoCapitalize='none'
                                style={[styles.inputDesc]}
                            />

                        </View>
                    </View>
                    <TouchableOpacity style={styles.uploadButtonView} onPress={()=>{openLibrary()}}>
            <Image source={require('../../../assets/upload-button-white.png')} />
            <Text style={{fontSize:14, fontWeight:'500', color:'#FFFFFF',marginLeft:10}}>Upload for Thumbnail</Text>
          </TouchableOpacity>

                </View>
                <View style={{height:100}} />
            </ScrollView>
            <View style={{ width: '85%', height: 60, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 100, alignSelf: 'center', zIndex: 999 }}>
                <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} press={() => {  }} fontSize={13}
                    titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#ED1C24'} />

            </View>

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
        backgroundColor: "gray",
        width: '100%',
        height: 190,
        justifyContent: 'center',
        borderRadius: 15
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
    input: {
        paddingLeft: 20,
        fontSize: 13,
        fontWeight: '400',
        color: '#000',
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
    uploadButtonView:{
        marginTop:-100,
        height:50,
        width:'92%',
        alignSelf:'center',
        backgroundColor:'#302e2e',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'#FFFFFF',
        borderStyle:'dashed',
        borderRadius:5,
        
        
        // shadowColor: '#000',
        // shadowOffset: {
        // width:0,
        // height:3
        // }, 
        // shadowRadius: 5,
        // shadowOpacity: 0.10,
        // elevation: 5,
      },
});
export default VideoUpload