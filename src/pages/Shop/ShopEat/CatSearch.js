import React, { useEffect,useState ,useRef} from 'react';
import {View,Image,Text,StyleSheet,SafeAreaView,TextInput,FlatList,Alert,TouchableOpacity, ScrollView, ImageBackground, StatusBar,RefreshControl} from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider,ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import { baseUrl, login,shop_eat_business,menu_AllCategoryNames,menu_categorySearch_attribute_name, requestPostApi,requestGetApi,shop_eat } from '../../../WebApi/Service'
import Loader from '../../../WebApi/Loader';
import MyAlert from '../../../component/MyAlert';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserResult, saveUserToken,setVenderDetail, setUserType } from '../../../redux/actions/user_action';
import Toast from 'react-native-toast-message';

const CatSearch = (props) => {
  const [searchValue,setsearchValue]=useState('')
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [resData, setresData] = useState([])
  const [venderdata, setvenderdata] = useState(null)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [lat, setlat] = useState('28.6176')
  const [lan, setlan] = useState('77.422')
  const [refreshing, setRefreshing] = useState(false);
  const [relode,setrelode] = useState(false)
  const mapdata  = useSelector(state => state.maplocation)

  useEffect(()=>{
   console.log('hohohohoho',props.route.params.datas);
  //  setresData(props.route.params.datas)
   AllVenders()
//    if(props.route.params.from!='search'){
//     AllVenders()
//    }
 },[])
 const checkcon = () => {
     
 }
 const wait = (timeout) => {
   return new Promise(resolve => setTimeout(resolve, timeout));
 }

 const onRefresh = React.useCallback(() => {
   // setRefreshing(true);
   // fetchSuccessDetails()
   checkcon()
   wait(2000).then(() => {
     setRefreshing(false)
   });
 }, []);

const homePageSearch = async (ttt) => {
  setresData([])
  setLoading(true)
  const { responseJson, err } = await requestGetApi(menu_categorySearch_attribute_name+ttt+'&lat=' +  mapdata.restorentlocation.latitude + '&long=' + mapdata.restorentlocation.longitude, '', 'GET', '')
  setLoading(false)
  console.log('the res==>>Home', responseJson)
  if (responseJson.headers.success == 1) {
     setresData(responseJson.body)
     setrelode(!relode)
  } else {
     setalert_sms(err)
     setMy_Alert(true)
  }
}

const AllVenders = async () => {
  console.log('the res==>>Homethe res==>>Homethe res==>>Home')

  setLoading(true)
  const { responseJson, err } = await requestGetApi(menu_AllCategoryNames+'?lat=' +  mapdata.restorentlocation.latitude + '&long=' + mapdata.restorentlocation.longitude, '', 'GET', '')
  setLoading(false)
  console.log('the res==>>Homethe res==>>Homethe res==>>Home', responseJson)
  if (responseJson.headers.success == 1) {
    setresData(responseJson.body)
  } else {
     setalert_sms(err)
     setMy_Alert(true)
  }
}

  return(
    <SafeAreaView style={{}}>
    
    <HomeHeader height={60}  paddingHorizontal={15}
   press1={()=>{props.navigation.goBack()}} img1={require('../../../assets/arrow.png')} img1width={18} img1height={15} 
   press2={()=>{}} title2={'Search'} fontWeight={'500'} img2height={20}
   press3={()=>{}} img3width={25} img3height={25} />

<ScrollView
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}

        //   />
        // }
      >
<View style={{width:'96%',alignSelf:'center'}}>
<SearchInput2 marginTop={10} placeholder={'Search by Categories'} 
serchValue={searchValue} 
onChangeText={(e)=>{
  setsearchValue(e)
  homePageSearch(e.text)
if(e.text.length==0){
  AllVenders()
}
}} 
press={()=>{Alert.alert('Hi')}}
presssearch={()=>{homePageSearch(searchValue.text)}}
paddingLeft={9}/>
 
 {resData.length > 0 ?   
<View style={{width:'100%',marginTop:25,alignSelf:'center', }}>
{resData!=null ?
          <FlatList
                  data={resData}
                  //horizontal={true}
                 // showsHorizontalScrollIndicator={false}
                   numColumns={2}
                  renderItem={({item,index})=>{
                    return(
                      <View style={{ width:'49%',height:238, marginHorizontal: 2, marginVertical:-1,}}>
                      <ImageBackground source={require('../../../assets/Food-Cover-image.png')}style={{width:'100%',height:'100%',  borderRadius: 10,  }}resizeMode='stretch'> 
                      <TouchableOpacity style={{ paddingTop:20
                   
                      }} onPress={() => { props.navigation.navigate('ShopSearch', { datas: [item], from: 'CatClick' }) }}>
                        <View style={{ width: 100, height: 100, alignSelf: 'center',borderRadius:100/2,shadowOffset: {
                          width: 0,
                          height: 3
                        },
                        shadowRadius: 1,
                        shadowOpacity: 0.5,
                       elevation: 10,
                       }}>
                          <Image source={{ uri: item.category_image }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 50, overflow: 'hidden' }}></Image>
                        </View>
                        <Text style={{ color: Mycolors.Black, fontWeight: '600', fontSize: 14, textAlign: 'center', marginTop: 9 }} >{item.category_name}</Text>
                        <Text style={{ color: '#0EA00E', fontWeight: '400', fontSize: 12, textAlign: 'center', marginTop: 9, }} >{item.total_vendors==0 ? 'No Places NearBy' : item.total_vendors+' Places NearBy'}</Text>
                      </TouchableOpacity>
                      </ImageBackground>
                    </View>
        //               <TouchableOpacity style={{width:'47%',height:160,marginHorizontal:5,marginVertical:5, padding:10,backgroundColor:'#fff',
        //               shadowOffset: {
        //               width: 0,
        //               height: 3
        //             },
        //             shadowRadius: 1,
        //             shadowOpacity: 0.3,
        //             alignSelf:'center',
        //            // justifyContent: 'center',
        //             elevation: 5,borderRadius:10}} onPress={()=>{props.navigation.navigate('ShopSearch',{datas:[],from:'CatClick'})}}>
        //   <View style={{width:100,height:100,alignSelf:'center',marginTop:5}}>
        //   <Image source={{uri:item.category_image}} style={{width:'100%',height:'100%',alignSelf:'center',borderRadius:10,overflow:'hidden'}}></Image>
        //   </View>
        // <Text style={{color:Mycolors.Black,fontWeight:'600',fontSize:12,textAlign:'center',marginTop:9}} >{item.category_name}</Text>
        //   </TouchableOpacity>
                    )
                  }}
                  keyExtractor={item => item.id}
                />
:
null
}

         </View>


:
<Text style={{color:'#000',fontSize:16,textAlign:'center',marginTop:50,fontWeight:'bold'}}>No Categories Found</Text>
}
 


 </View>
<View style={{height:60}} />

</ScrollView>

{loading ? <Loader /> : null}
    </SafeAreaView>
     );
  }
const styles = StyleSheet.create({

});
export default CatSearch 