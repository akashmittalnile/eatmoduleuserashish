import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from '../../Deal/B2b/Homeheaderroundbottom';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MyButtons from '../../../component/MyButtons';
import { dimensions, Mycolors } from '../../../utility/Mycolors';


const UploadMusic = (props) => {
    const [albumname, setAlbumName] = useState('');
    const [albumby, setAlbumBy] = useState('');
    const [movieDecs, setMovieDesc] = useState('')
    const [selectedTime, setselectedTime] = useState('1')
    const [pick, setpick] = useState('')
    const [filepath, setfilepath] = useState(null)
    const [upData, setupData] = useState([
        {
            id: '1',
            title: 'Ambulance',
            type: 'Romance',
            desc: '6',
            time: '',
            img: require('../../../assets/images/Ambulance-image.png')
        },
        {
            id: '2',
            title: 'The Lost City',
            type: 'Pop',
            desc: '5.6',
            time: '',
            img: require('../../../assets/images/The-Lost-City-image.png'),
        },
        {
            id: '3',
            title: 'Uncharted',
            type: 'Rock',
            desc: '9',
            time: '',
            img: require('../../../assets/images/Uncharted-image.png'),
        },
        {
            id: '4',
            title: 'Ambulance',
            type: 'EDM',
            desc: '4.9',
            time: '',
            img: require('../../../assets/images/Ambulance-image.png'),
        },
        {
            id: '5',
            title: 'The Lost City',
            type: 'Westen',
            desc: '2020 ∙ Petrol ∙ Manual ∙ 12,120 km',
            time: '',
            img: require('../../../assets/images/The-Lost-City-image.png'),
        }
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
        <SafeAreaView style={{}}>
            <ScrollView>
                <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor={'#6D2F91'}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={6}
                    press2={() => { }} title2={'Upload Music'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
                    press3={() => { }} img3width={25} img3height={25} />


                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <View style={{ width: '96%', alignItems: 'flex-start', alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#263238', fontSize: 18, fontWeight: '600' }}>Choose Category</Text>

                    </View>
                    <View style={{ width: "100%", alignSelf: 'center', marginHorizontal: 15, marginTop: 20 }}>
                        <FlatList
                            data={upData}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ width: 90, marginHorizontal: 5 }}>
                                        <TouchableOpacity style={{ width: 90, height: 40, justifyContent: 'center', borderWidth: 0.5, borderRadius: 50, borderColor: Mycolors.BG_COLOR, backgroundColor: selectedTime == item.id ? '#6D2F91' : Mycolors.BG_COLOR, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.03, elevation: 1 }}
                                            onPress={() => { setselectedTime(item.id) }}>
                                            <Text style={{ fontSize: 11, color: selectedTime == item.id ? Mycolors.BG_COLOR : '#263238', textAlign: 'center', fontWeight: '500' }}>{item.type}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                            keyExtractor={item => item.id}
                        />

                    </View>

                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', top: 10 }}>
                        <View style={styles.BoxView}>
                            <TextInput
                                value={albumname}
                                onChangeText={(text) => {
                                    setAlbumName(text)
                                }}
                                placeholder="Album Name"
                                placeholderTextColor={'#B2B7B9'}
                                style={[styles.input, { width: '100%', }]}
                                multiline
                            />
                        </View>
                        <View style={styles.BoxView}>
                            <TextInput
                                value={albumby}
                                onChangeText={(text) => {
                                    setAlbumBy(text)
                                }}
                                placeholder="Album By"
                                placeholderTextColor={'#B2B7B9'}
                                style={[styles.input, { width: '100%', }]}
                                multiline
                            />
                        </View>

                        <View style={{ width: '93%', height: 100, borderRadius: 5, marginTop: 14, alignSelf: 'center', backgroundColor: "#fff", }}>

                            <TextInput
                                value={movieDecs}
                                textAlignVertical='top'
                                onChangeText={(e) => setMovieDesc(e)}
                                placeholder='Album Description'
                                placeholderTextColor="#bbbbbb"
                                multiline={true}
                                maxLength={100}
                                // keyboardType="number-pad"
                                autoCapitalize='none'
                                style={[styles.inputDesc]}
                            />

                        </View>
                    </View>
                    <TouchableOpacity style={styles.uploadButtonView} onPress={() => { openLibrary() }}>
                        <Image source={require('../../../assets/upload-button-black.png')} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#263238', marginLeft: 10 }}>Upload Music</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ height: 190 }} />

            </ScrollView>
            <View style={{ width: '85%', height: 60, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 20, alignSelf: 'center', zIndex: 999 }}>
                <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} press={() => { }} fontSize={13}
                    titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#6D2F91'} />

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
    uploadButtonView: {
        marginTop: 30,
        height: 50,
        width: '92%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#263238',
        borderStyle: 'dashed',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.10,
        elevation: 5,
    },
});

export default UploadMusic 