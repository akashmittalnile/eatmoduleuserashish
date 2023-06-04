import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard } from 'react-native';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import HomeHeader from '../../../component/HomeHeader';
import Modal from 'react-native-modal';
// import Toast from 'react-native-simple-toast'
import LinearGradient from 'react-native-linear-gradient'
// import AppIntroSlider from 'react-native-app-intro-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Loader from '../../../WebApi/Loader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RepliesModal from '../../../component/ReplesModal'

const MusicCommentsScreen = (props) => {
    const [pick, setpick] = useState('')
    const [filepath, setfilepath] = useState(null)

    const [searchValue, setsearchValue] = useState('')
    const [scrollEnabled, setScrollEnabled] = useState(false)
    const myTextInput = useRef()
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
    const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('1')
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState({ isVisible: false, data: null });
    const [showReportModal, setShowReportModal] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState({})
    const [userMessage, setUserMessage] = useState('')
    const [replyingTo, setReplyingTo] = useState('')
    const [showAtUsername, setShowAtUsername] = useState(false)
    const [showRepliesModal, setShowRepliesModal] = useState(false)
    const [selectedReasonId, setSelectedReasonId] = useState(null)
    const [reportReasonData, setReportReasonData] = useState([
        {
            id: '1',
            name: 'I just don’t like it',
            description: '',
            selected: true
        },
        {
            id: '2',
            name: 'Nudity or pornography',
            description: '',
            selected: false
        },
        {
            id: '3',
            name: 'Hate speech or symbols',
            description: 'Racist, homophobic or sexist slurs',
            selected: false
        },
        {
            id: '4',
            name: 'Violence or threat of violence',
            description: `Graphic injury, unlawful activity, dangerous or criminal organizations`,
            selected: false
        },
        {
            id: '5',
            name: 'Sale or promotion of firearms',
            description: '',
            selected: false
        },
        {
            id: '6',
            name: 'Sale or promotion of drugs',
            description: '',
            selected: false
        },
        {
            id: '7',
            name: 'Harassment or bullying',
            description: '',
            selected: false
        },
        {
            id: '8',
            name: 'Intellectual property violation',
            description: 'Copyright or trademark infringement',
            selected: false
        },
    ])
    const [upData, setupData] = useState([
        {
            id: '1',
            name: 'Maude Hall',
            message: `That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.`,
            time: '14 min',
            img: require('../../../assets/comment-person-image.png'),
            isLiked: true,
            replies: []
        },
        {
            id: '2',
            name: 'Eleanor Pena',
            message: `That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.`,
            time: '14 min',
            img: require('../../../assets/comment-person-image.png'),
            isLiked: false,
            replies: []
        },
        {
            id: '3',
            name: 'Floyd Miles',
            message: `That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.`,
            time: '14 min',
            img: require('../../../assets/comment-person-image.png'),
            isLiked: true,
            replies: []
        },
        {
            id: '4',
            name: 'Robert Fox',
            message: `That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.`,
            time: '14 min',
            img: require('../../../assets/comment-person-image.png'),
            isLiked: true,
            replies: []
        },

    ])
    const [introSliderData] = useState([
        // require('../../assets/Group75972.png'),
        { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU' },
        { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg' },
        { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg' }
    ])

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
    useEffect(() => {

    }, [])

    const sendMessage = () => {
        if (userMessage?.trim()?.length === 0) {
            return
        }
        if (replyingTo) {
            const upDataCopy = [...upData]
            upDataCopy.map(el => {
                if (replyingTo === el.id) {
                    el.replies.push({
                        id: 99,
                        name: 'saurabh saneja',
                        message: userMessage,
                        time: '0 min',
                        img: require('../../../assets/comment-person-image.png'),
                        isLiked: false
                    })
                    return el
                }
            })
            setupData([...upDataCopy])
        } else {
            const nextId = upData?.length + 1
            setupData([...upData,
            {
                id: String(nextId),
                name: 'Saurabh Saneja',
                message: userMessage,
                time: '14 min',
                img: require('../../../assets/comment-person-image.png'),
                isLiked: false,
                replies: []
            },
            ])
        }
        Keyboard.dismiss()
        setUserMessage('')
        setReplyingTo('')
    }

    const likeChildComment = (parentId, childIndex) => {
        const upDataCopy = [...upData]
        upDataCopy.map(el => {
            if (el.id === parentId) {
                el.replies[childIndex].isLiked = !el.replies[childIndex].isLiked
            }
            return el
        })
        setupData([...upDataCopy])
    }

    const returnOneReply = (itemid) => {
        const replies = upData?.find(el => el.id === itemid)?.replies
        if (replies?.length === 0) {
            return
        }
        return (

            <View style={{ width: '90%', marginLeft: 30, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={replies[0].img} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#455A64', }}>{replies[0].name}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: '#6F6D6D', marginTop: 5 }}>{replies[0].time}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '400', color: '#272727' }}>{replies[0].message}</Text>
                </View>
                {/* <View style={{marginTop:15, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity onPress={()=>{likeChildComment(itemid, index)}}>
          <Image source={replies[0].isLiked ? require('../../../assets/people-sel-heart.png') : require('../../../assets/people-unsel-heart.png')} style={{width:30, height:30}}/>
        </TouchableOpacity>
        <Text style={{fontSize:14, fontWeight:'500', color:'#B4BBC6', marginLeft:10}}>Like</Text>
      </View>
      <TouchableOpacity onPress={()=>{myTextInput.current.focus(); setUserMessage(`@${replies[0].name}`); setReplyingTo(itemid)}} style={{flexDirection:'row', alignItems:'center'}}>
        <Image source={require('../../../assets/people-reply-image.png')}/>
        <Text style={{fontSize:14, fontWeight:'500', color:'#B4BBC6', marginLeft:10}}>Reply</Text>
      </TouchableOpacity>
    </View> */}
                {replies?.length > 1 ?
                    <TouchableOpacity onPress={() => { setShowAtUsername(false); setReplyingTo(itemid); setShowRepliesModal(true) }} style={{ marginBottom: 10, marginTop: 10, alignSelf: 'flex-end' }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#0089CF' }}>{`View ${replies?.length - 1} replies`}</Text>
                    </TouchableOpacity>
                    : null}
            </View>
        )
    }

    const _renderItem = ({ item }) => {
        return (
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 350, alignSelf: 'center' }} />
            // <View key={item.key} style={styles.slide}>
            //   <Text style={styles.title}>{item.title}</Text>
            //   <Text style={styles.text}>{item.text}</Text>
            // </View>
        );
    }

    return (
        <SafeAreaView scrollEnabled={scrollEnabled} style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
            <ScrollView>

                <HomeHeader height={60} paddingHorizontal={15}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/ArrowLeft.png')}
                    img1width={30} img1height={30} img1backgroundColor={'transparent'} img1padding={5} img1borderRadius={4}
                    press2={() => { }} title2={'Comments'} fontWeight={'bold'} img2height={20} color={Mycolors.Blacl}
                    press3={() => { }} img3width={25} img3height={25} />



                <View style={{ width: '90%', alignSelf: 'center', }}>

                    <View style={{ width: '100%', alignSelf: 'center', marginTop: 5 }}>
                        <FlatList
                            data={upData}
                            showsHorizontalScrollIndicator={false}
                            numColumns={1}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ width: dimensions.SCREEN_WIDTH * 0.85, marginBottom: 15, alignSelf: 'center' }}>
                                        <>
                                            <View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image source={item.img} />
                                                        <View style={{ marginLeft: 10 }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '700', color: '#455A64' }}>{item.name}</Text>
                                                            <Text style={{ fontSize: 12, fontWeight: '400', color: '#6F6D6D', marginTop: 5 }}>{item.time}</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                                <View style={{ marginTop: 10 }}>
                                                    <Text style={{ fontSize: 14, lineHeight: 20, fontWeight: '400', color: '#455A64' }}>{item.message}</Text>
                                                </View>
                                                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                                        <TouchableOpacity onPress={() => { setupData(upData.map((el, elIndex) => index === elIndex ? { ...el, isLiked: !item.isLiked } : el)) }}>
                                                            <Image source={item.isLiked ? require('../../../assets/people-unsel-heart.png') : require('../../../assets/people-sel-heart.png')} style={{ width: 30, height: 30 }} />
                                                        </TouchableOpacity>
                                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#6F6D6D', marginLeft: 8 }}>Like</Text>
                                                    </View>


                                                    <View>
                                                        <TouchableOpacity onPress={() => { setShowAtUsername(true); setReplyingTo(item.id); setShowRepliesModal(true); }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image source={require('../../../assets/Videogame-reply-icon.png')} />
                                                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64', marginLeft: 10 }}>Reply</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ borderBottomColor: '#E0E0E0', borderBottomWidth: 1, marginTop: 10 }} />
                                            {item?.replies?.length > 0 ?
                                                <>
                                                    {returnOneReply(item.id)}
                                                </>
                                                : null}
                                        </>
                                    </View>
                                )
                            }}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>




                {/* <View style={{ height: 10 }} /> */}

                {/* <View style={{ width: '85%', alignSelf: 'center' }}>
                </View> */}
                <View style={{ height: 100 }} />
            </ScrollView>
            {loading ? <Loader /> : null}
            <RepliesModal
                isVisible={showRepliesModal}
                setIsVisible={setShowRepliesModal}
                data={upData}
                setData={setupData}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                showAtUsername={showAtUsername}
                likeChildComment={likeChildComment}
            // startFromIndex={startFromIndex}
            />

            <View style={styles.addCommentView}>
                <TextInput
                    ref={myTextInput}
                    value={userMessage}
                    onChangeText={(text) => {
                        setUserMessage(text)
                    }}
                    placeholder="Type Your Comment"
                    placeholderTextColor={'#B2B7B9'}
                    style={styles.input}
                    multiline
                />
                 <View style={{ marginTop: 15, alignSelf: "flex-start" }}>
                <TouchableOpacity onPress={() => { opencamera()}} style={{marginHorizontal:12}}>
                    <Image source={require('../../../assets/Upload-music-chat-icon.png')} style={{ width: 32, height: 32 }} />
                </TouchableOpacity>
                </View>
                <View>

               
                <TouchableOpacity onPress={sendMessage} style={styles.sendButtonView}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>Send</Text>
                </TouchableOpacity>
                </View>
            </View>

            <Modal
                isVisible={showReportModal}
                swipeDirection="down"
                onBackdropPress={() => setShowReportModal(false)}
                onSwipeComplete={(e) => {
                    setShowReportModal(false)
                }}
                scrollTo={() => { }}
                scrollOffset={1}
                propagateSwipe={true}
                coverScreen={false}
                backdropColor='transparent'
                style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <View style={{ height: '90%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#455A64', textAlign: 'center', marginBottom: 20, marginTop: 30 }}>Report</Text>
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

                        <FlatList
                            data={reportReasonData}
                            showsHorizontalScrollIndicator={false}
                            numColumns={1}
                            keyExtractor={item => item.id}
                            style={{ marginBottom: 10 }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity key={item.id} onPress={() => setSelectedReasonId(item.id)} style={selectedReasonId === item.id ? styles.selectedReasonView : styles.reasonView}>
                                        <Image source={selectedReasonId === item.id ? require('../../../assets/dating-home-header-left-image.png') : require('../../../assets/dating-home-header-left-image.png')} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '400', color: '#455A64' }}>{item.name}</Text>
                                            {item.description ?
                                                <Text style={{ fontSize: 12, lineHeight: 12, fontWeight: '400', color: '#C5C6C9', marginTop: 2 }}>{item.description}</Text>
                                                : null}
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />

                        <TouchableOpacity style={styles.reportButtonView}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', }}>Report</Text>
                        </TouchableOpacity>

                    </ScrollView>

                </View>
            </Modal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    unselectedTabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#263238'
    },
    requestCallView: {
        marginTop: 10,
        width: 140,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#29913C',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#6D2F91',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.17,
        elevation: 2
    },
    VideoThumbWrapper: {
        position: 'relative',
        // width: '48%',
        // marginRight: 8,
        marginBottom: 4,

        width: dimensions.SCREEN_WIDTH / 1.5,
        height: 160,
        marginRight: 20,
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
        width: '100%',
        height: 160,
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonsRow: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#8F93A0',
        marginLeft: 5
    },
    buttonText2: {
        fontSize: 14,
        fontWeight: '500',
        color: '#455A64',
        marginLeft: 5
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 17.64,
        fontWeight: '400',
        color: '#455A64',
        marginTop: 20
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#8F93A0',
        marginLeft: 5
    },
    addCommentView: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        flex: 7
    },
    sendButtonView: {
        backgroundColor: '#6D2F91',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reasonView: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 15,
        // paddingVertical:10,
        paddingHorizontal: 10,
        width: '90%',
        height: 60,
    },
    selectedReasonView: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 15,
        // paddingVertical:10,
        paddingHorizontal: 10,
        width: '90%',
        height: 60,
        borderColor: '#E7F7FF',
        borderWidth: 1,
        shadowColor: '#455A64',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.10,
        elevation: 1
    },
    reportButtonView: {
        height: 60,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#0089CF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.10,
        elevation: 2
    }
});
export default MusicCommentsScreen 