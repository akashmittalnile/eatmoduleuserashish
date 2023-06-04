import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import MyButtons from '../../../component/MyButtons';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
// import Toast from 'react-native-simple-toast';
import Loader from '../../../WebApi/Loader';
 
import { Rating, AirbnbRating } from 'react-native-ratings';

const SingerMusicListScreen = (props) => {

    
    const [modlevisual1, setmodlevisual1] = useState(false)
    
    const [userMessage, setUserMessage] = useState('')
    const [replyingTo, setReplyingTo] = useState('')
    const [loading, setLoading] = useState(false);
    const [postDecs, setPostDesc] = useState('');
   

    const design = (img, ti, imgh, imgw, redious, press) => {
        return (
            <View style={{ alignItems: 'center', width: "32%", borderRadius: 15, height: 65, paddingHorizontal: 0 }}>
                <TouchableOpacity onPress={press ? press : () => { }}
                    style={{ width: 40, height: 40, justifyContent: 'center', borderRadius: redious }}>
                    <Image source={img} style={{ width: imgw, height: imgh, overflow: 'hidden', alignSelf: 'center' }}></Image>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#455A64' }}>{ti}</Text>
                </View>
               
            </View>

        )
    }
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
    useEffect(() => {

    }, [])
    
    const [upData, setupData] = useState([
        {
            id: '1',
            name: 'Dharia',
            title:'August Diaries',
            img: require('../../../assets/images/Despacito-music.png')
        },
        {
            id: '2',
            name: 'Dharia',
            title:'Incredible',
            img: require('../../../assets/images/Despacito-music.png')
        },
        {
            id: '3',
            name: 'Dharia',
            title:'Sugar & Brownies',
            img: require('../../../assets/images/Despacito-music.png')
           },
        {
            id: '4',
            name: 'Dharia',
            title:'Tara Rita',
            img: require('../../../assets/images/Despacito-music.png')
        },
        {
            id: '5',
            name: 'Dharia and Faul & Wad Ad',
            title:'Cry For You',
            img: require('../../../assets/images/Despacito-music.png')
        }
    ])
    
    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', height: dimensions.SCREEN_HEIGHT * 100 / 100, width: '100%' }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={{ backgroundColor: '#fff', height: dimensions.SCREEN_HEIGHT * 28 / 100, width: '100%', position: 'relative', }}>

                    <ImageBackground source={require('../../../assets/images/Dharia-Singer-image.png')} style={{ width: '100%', height: '100%', overflow: 'hidden', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} resizeMode='stretch'>
                        <HomeHeader height={60} paddingHorizontal={15}
                            press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')}
                            img1width={30} img1height={30} img1backgroundColor={'transparent'} img1padding={5} img1borderRadius={4}
                            press2={() => { }} title2={'Music'} fontWeight={'bold'} img2height={20} color={Mycolors.BG_COLOR}
                            press3={() => { }} img3width={25} img3height={25} />


                    </ImageBackground>

                </View>
                {/* <View style={{ width: '96%', alignItems: 'flex-start', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 10, top: -130 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: '600' }}>Browse the</Text>
                    <Text style={{ color: 'red', fontSize: 26, fontWeight: '600' }}>Games Videos</Text>
                </View> */}
                <View style={{ backgroundColor: "red", alignSelf: 'center', height: 140, width: 140, borderRadius: 34, top: -110 }}>
                    <LinearGradient
                        colors={['#FFD037', '#6D2F92']}
                        style={{
                            height: "100%", width: "100%", borderRadius: 34,
                            justifyContent: 'center',
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >

                        <TouchableOpacity onPress={() => { props.navigation.navigate('') }}>
                            <ImageBackground
                                source={require('../../../assets/MusicListtop-image.png')} style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 34 }} resizeMode='stretch'>
                                <View style={{ width: '60%', alignSelf: 'center', height: 140, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: Mycolors.BG_COLOR, fontSize: 20 }}>Top Hits</Text>
                                    <Text style={{ fontSize: 14, marginTop: 14, color: Mycolors.BG_COLOR }}>By -Dharia </Text>
                                </View>
                            </ImageBackground>



                        </TouchableOpacity>

                    </LinearGradient>
                </View>

                <View style={{ width: '90%', alignSelf: 'center', top: -70 }}>
                    <View style={{ flexDirection: "row", width: '100%', justifyContent: "center", alignSelf: "center", alignItems: "center" }}>

                        <View style={{ marginRight: 20 }}>

                            <TouchableOpacity style={{ width: 141, height: 40, justifyContent: 'center', borderRadius: 5, backgroundColor: '#ED1C24', shadowColor: '#6D2F91', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.03, elevation: 4 }}
                                onPress={() => {props.navigation.navigate('MusicPlayScreen')}}>
                                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", }}>
                                    <Image source={require('../../../assets/Play-button-white.png')} style={{ width: 20, height: 20, }}></Image>
                                    <Text style={{ marginLeft: 6, fontSize: 13, color: Mycolors.BG_COLOR, textAlign: 'center', fontWeight: '400' }}>Play</Text>
                                </View>


                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity style={{ width: 141, height: 40, justifyContent: 'center', borderRadius: 5, backgroundColor: Mycolors.BG_COLOR, shadowColor: '#6D2F91', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.03, elevation: 4 }}
                            onPress={() => { props.navigation.navigate('MusicPlayScreen') }}>
                            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", }}>
                                <Image source={require('../../../assets/Shuffle-music.png')} style={{ width: 20, height: 20, }}></Image>
                                <Text style={{ marginLeft: 6, fontSize: 13, color: '#455A64', textAlign: 'center', fontWeight: '400' }}>Play</Text>
                            </View>

                        </TouchableOpacity>

                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "80%", marginTop: 25 }}>

                        {design(require('../../../assets/Heart-like-black.png'), 'Favorite', '70%', 25, 20)}
                        {design(require('../../../assets/Info-black.png'), 'Newsfeed', '70%', 25, 20, () => { props.navigation.navigate('MusicNewsfeed') })}
                        {design(require('../../../assets/ArrowCircleDown-black.png'), 'Download', '70%', 25, 20)}
                        {design(require('../../../assets/ShareNetwork-black.png'), 'Share', '70%', 25, 20,() => { MycustomonShare() })}
                    </View>


                    

                    <View style={{ width: '100%', alignSelf: 'center', marginTop: 15 }}>
                        <FlatList
                            data={upData}
                            showsHorizontalScrollIndicator={false}
                            numColumns={1}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ width: dimensions.SCREEN_WIDTH * 0.89, marginBottom: 15,    padding: 10, borderRadius: 15 ,flex:1,justifyContent:"flex-start", }}>
                                        <>
                                            <View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',flex:1 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center',flex:0.1  }}>
                                                <Text style={{ fontSize: 12, fontWeight: '400', color: '#6F6D6D',marginLeft:18   }}>{item.id}</Text>
                                                </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center',flex:0.7 }}>
                                                        <Image source={item.img} style={{ height: 60, width: 60,borderRadius:10 }} />
                                                        <View style={{ marginLeft: 10 }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000' }}>{item.title}</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
                                                                
                                                                <Text style={{ fontSize: 12, fontWeight: '400', color: '#6F6D6D',  }}>{item.name}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', alignItems: 'center' , flex:0.1}}>
                                                        <Image source={require('../../../assets/DotsThreeVertical.png')} />
                                                         
                                                    </TouchableOpacity>
                                                </View>
                                             

                                            </View>

                                            
                                        </>
                                    </View>
                                )
                            }}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>

                <View style={{ height: 60 }} />

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
                <View style={{ height: '74%', backgroundColor: '#FFFFFF', borderRadius: 30, padding: 20, marginBottom: 20, marginHorizontal: 10, }}>
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

                        <View style={{ width: 180, height: 150, alignSelf: 'center', marginTop: 8 }}>
                            <Image source={require('../../../assets/Post-Your-Review-movie.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 7 }}>

                            </Image>
                        </View>

                        <View style={{ ustifyContent: 'center', alignItems: "center", padding: 5 }}>
                            <Text style={{ fontWeight: 'bold', color: '#455A64', marginVertical: 10, paddingHorizontal: 10, textAlign: "center", fontSize: 18 }}>Your opinion matters to us!</Text>

                            <Rating
                                type='custom'
                                // type='heart'
                                ratingCount={5}
                                imageSize={50}
                                startingValue={1}
                                ratingBackgroundColor={'#D9D9D9'}
                                tintColor={'#FFFFFF'}
                                style={{ paddingVertical: 10, }}
                            // readonly={true}
                            // showRating
                            //onFinishRating={this.ratingCompleted}
                            />
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
                        </View>

                        <View style={{ width: '90%', height: 50, justifyContent: 'center', position: 'absolute', bottom: 30, marginHorizontal: 10, alignSelf: "center" }}>
                            <MyButtons title="Post Your Riview" height={50} width={'100%'} borderRadius={5} press={() => {
                                props.navigation.navigate(' '),
                                    setmodlevisual1(false)
                            }} fontSize={13}
                                titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#FFD037'} />

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
});
export default SingerMusicListScreen