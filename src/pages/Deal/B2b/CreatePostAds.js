import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from './Homeheaderroundbottom';
import DropDownPicker from 'react-native-dropdown-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';

const CreatePostAds = (props) => {


    const [adsTitle, setAdsTitle] = useState('');
    const [price, setPrice] = useState('');

    const [adsDecs, setAdsDesc] = useState('');
    const [profileImage, setprofileImage] = useState('');
    const [pick, setpick] = useState('')
    const [filepath, setfilepath] = useState(null)
    const [openCategorey, setopenCategorey] = useState(false);
    // const [state, setState] = useState('')
    const [valueCategorey, setValueCategorey] = useState('');

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
            console.log("photo",photo);
            setpick(photo)
            setfilepath(image)
          }
        })
      
      
      }
    // const OpenImagePicker = async () => {
    //     console.log("slectphoto:");
    //     try {
    //       let value = await ImagePicker.openPicker({
    //         width: 1080,
    //         height: 1080,
    //         cropping: true,
    //         mediaType: 'photo',
    //         compressImageQuality: 1,
    //         compressImageMaxHeight: 1080 / 2,
    //         compressImageMaxWidth: 1080 / 2,
    //       }).then(image => {
    //         setprofileImage(image);
    //         console.log(image);
    //       });
    //     } catch (error) {
    //       console.log('error in openLibrary', error);
    //     }
    //   };
    useEffect(() => {

    }, [])
    const GoToCarDetailsScreen = (items) => {
        // console.log("items",items);
        props.navigation.navigate('CarDetails', {
            CarId: items
        })
    }

    return (
        <SafeAreaView style={{}}>
            <ScrollView>
                <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor={Mycolors.B2B_BLUE}
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/service-header-back-button.png')} img1width={25} img1height={18} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingBottom={6}
                    press2={() => { }} title2={'Create Post Ads'} fontWeight={'500'} img2height={20} color={'#fff'} fontSize={14}
                    press3={() => { }} img3width={25} img3height={25} />
                <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center', alignSelf: "center", }}>

                    <View style={{ width: "97%", alignSelf: "center", marginTop: 20 }}>
                        <Text style={{ color: '#263238', fontWeight: '500', fontSize: 16 }}>Please enter your details</Text>
                    </View>


                    <View style={styles.BoxView}>
                        <TextInput
                            value={adsTitle}
                            onChangeText={(text) => {
                                setAdsTitle(text)
                            }}
                            placeholder="Ads Title"
                            placeholderTextColor={'#B2B7B9'}
                            style={[styles.input, { width: '95%', }]}
                            multiline
                        />
                    </View>

                    <View style={{ width: '93%', height: 100, borderRadius: 5, marginTop: 10, alignSelf: 'center', backgroundColor: "#fff", }}>

                        <TextInput
                            value={adsDecs}
                            textAlignVertical='top'
                            onChangeText={(e) => setAdsDesc(e)}
                            placeholder={'Ads description'}
                            placeholderTextColor="#bbbbbb"
                            multiline={true}
                            // maxLength={500}
                            // keyboardType="number-pad"
                            autoCapitalize='none'
                            style={[styles.inputDesc]}
                        />

                    </View>

                    <View style={{
                        marginTop: 15,
                        width: '93%',
                        backgroundColor: '#fff',
                        marginHorizontal: 15,
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'center',

                        zIndex: 999,
                    }}>
                        <DropDownPicker
                            items={[
                                { label: 'Electrical', value: 'Electrical' },
                                { label: 'Funiture', value: 'Funiture' },
                                { label: 'Clothes', value: 'Clothes' },
                                { label: 'Vechile', value: 'Vechile' },
                            ]}
                            listParentContainerStyle={{
                                justifyContent: "center",
                                alignItems: "center", paddingLeft: 22
                            }}
                            listParentLabelStyle={{
                                fontWeight: "400", fontSize: 15,
                            }}

                            backgroundColor='white'

                            placeholder="Select Categorey"
                            placeholderTextColor={'#B2B7B9'}
                            containerStyle={{ height: 50, paddingLeft: 0 }}
                            dropDownDirection="BOTTOM"
                            bottomOffset={100}
                            // defaultValue={changeCountry}
                            itemStyle={{ justifyContent: 'flex-start', }}
                            textStyle={{
                                fontSize: 14
                            }}
                            // listMode="MODAL"
                            open={openCategorey}
                            setOpen={setopenCategorey}
                            value={valueCategorey}
                            setValue={setValueCategorey}
                            scrollViewProps={{
                                decelerationRate: "medium", ScrollView: "#ffcc00"
                            }}
                            onChangeValue={(values) => {
                                setValueCategorey(values)

                            }}
                            // onChangeText={(item) => setValueCategorey(item)}
                            defaultValue={null}
                            dropDownContainerStyle={{
                                backgroundColor: 'white',
                                zIndex: 999,
                                elevation: 10,
                                borderColor: '#8F93A0',
                                borderRadius: 15,
                                marginTop: 6,


                            }}
                            style={{
                                borderColor: 'white',
                                backgroundColor: 'white',
                                borderRadius: 5,
                                // shadowColor: '#000',
                                // shadowOffset: { width: 0, height: 2 },
                                // shadowOpacity: 0.2,
                                // elevation: 2,
                                // alignItems: "center"
                                // , justifyContent: "center",
                                zIndex: 1,
                                paddingLeft: 20
                            }}
                        />
                    </View>
                    <View style={styles.BoxView}>
                        <TextInput
                            value={price}
                            onChangeText={(text) => {
                                setPrice(text)
                            }}
                            placeholder="Price"
                            placeholderTextColor={'#B2B7B9'}
                            style={[styles.input, { width: '95%', }]}
                            multiline
                        />
                    </View>

                    <View style={styles.BoxView}>
                        <TextInput
                            value={adsTitle}
                            onChangeText={(text) => {
                                setAdsTitle(text)
                            }}
                            placeholder="Model"
                            placeholderTextColor={'#B2B7B9'}
                            style={[styles.input, { width: '95%', }]}
                            multiline
                        />
                    </View>

                    <View style={styles.BoxView}>
                        <TextInput
                            value={adsTitle}
                            onChangeText={(text) => {
                                setAdsTitle(text)
                            }}
                            placeholder="Year"
                            placeholderTextColor={'#B2B7B9'}
                            style={[styles.input, { width: '95%', }]}
                            multiline
                        />
                    </View>
                    <View style={styles.BoxView}>
                        <TextInput
                            value={adsTitle}
                            onChangeText={(text) => {
                                setAdsTitle(text)
                            }}
                            placeholder="KM Driven"
                            placeholderTextColor={'#B2B7B9'}
                            style={[styles.input, { width: '95%', }]}
                            multiline
                        />
                    </View>

                    <TouchableOpacity onPress={()=>{openLibrary()}}
                    style={{
                        height: 50,
                        marginTop: 15,
                        width: '93%',
                        backgroundColor: '#fff',
                        // padding:15, 
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        alignItems: 'center',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#0089CF",
                        justifyContent: 'space-between',
                    }}>
                        <View style={{ width: 32, height: 32, alignSelf: 'center', marginLeft: 10 }}>
                            <Image source={require('../../../assets/Dummyimg.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 7 }}>

                            </Image>
                        </View>
                        <View style={{ width: "70%", justifyContent: "center" }}>
                            <Text style={{ fontSize: 13, color: '#8F93A0', marginTop: 5, textAlign: 'left', fontWeight: 'bold' }}>Add Ads Photo</Text>
                        </View>

                        <View style={{ width: 32, height: 32, alignSelf: 'center', right: 10 }}>
                            <Image source={require('../../../assets/UploadSimple.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 7 }}>

                            </Image>
                        </View>
                    </TouchableOpacity>

                </View>




                <View style={{ height: 100 }} />

            </ScrollView>
            <View style={{ width: '95%', height: 60, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 20, alignSelf: 'center', zIndex: 999 }}>
                <MyButtons title="Continue" height={50} width={'100%'} borderRadius={5} press={() => { props.navigation.navigate('B2BBecomeSellerChoosePlan') }} fontSize={13}
                    titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={Mycolors.B2B_BLUE} />
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
    addCommentContainer: {
        flexDirection: 'row',
        marginTop: 20,
        padding: 5,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopWidth:0.5, 
        // borderTopColor:'#ffb0ba', 
    },
    addCommentContainer2: {
        left: -13,
        flexDirection: 'row',
        padding: 5,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopWidth:0.5, 
        // borderTopColor:'#ffb0ba', 
    },
    addCommentView: {
        width: '45%',
        backgroundColor: '#fff',
        // padding:15, 
        // flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 5,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 3
        // },
        // shadowRadius: 1,
        // shadowOpacity: 0.3,
        // elevation: 5,
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
    BoxViewImg: {
        marginTop: 15,
        width: '95%',
        backgroundColor: '#fff',
        // padding:15, 
        // flexDirection: 'row',
        marginHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
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
        paddingLeft: 10,
        fontSize: 13,
        fontWeight: '400',
        color: '#8F93A0',
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
    }
});
export default CreatePostAds 