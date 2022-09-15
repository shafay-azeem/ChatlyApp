import React, { useState } from 'react';
import {
  SafeAreaView,

  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  RefreshControl

} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp, heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons'


function Item({ item }) {
  const navigation = useNavigation();


  return (
    <TouchableOpacity style={[, { borderColor: '#E8E8E8', borderWidth: 2, borderRadius: hp("2%"), marginBottom: 10, padding: hp("2%"), backgroundColor: '#C8C8C8' }]}
    // onPress={() => navigation.navigate('PatientDemographics',{
    //   patientId: item.patientId,
    //   patient:item


    // })}
    >
      <View style={{ flex: 1 ,justifyContent:"center",fontSize:50}}>
        <Text> {item.name} </Text>
        <View style={{ flexDirection: "row" }}>
        </View>
      </View>

    </TouchableOpacity>

  );






}

const SearchList = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  // console.log(data[1].token, 'dddd')

  const [searchQuery, setSearchQuery] = React.useState('');
  
  const [fetchchat, setFetchChat] = React.useState({});
  const [refreshing, setRefreshing] = useState(true);
  // console.log(searchQuery)
  

  useEffect(() => {

    const config = {
      headers: {
        Authorization: `Bearer ${data[1].token}`,
      },
    };
    
    fetch(`https://chatlay-mern-app.herokuapp.com/api/user?search=${searchQuery}`, config)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson,'searchlist')
        let counter=responseJson.length
        for(var i in responseJson){
        setFetchChat(responseJson)
    //    console.log(responseJson[i].name)
        }
    });
  
  },[]);
  const loadUserData = () => {

    const config = {
      headers: {
        Authorization: `Bearer ${data[1].token}`,
      },
    };
    fetch(`https://chatlay-mern-app.herokuapp.com/api/user?search=${searchQuery}`, config)
      .then((response) => response.json())
      .then((responseJson) => {
        setFetchChat(responseJson)

      });
  };

  return (
    <View>

 <View style={{height:hp("8%"),flexDirection:'row',backgroundColor:'#3182CE'}}>
    <View style={{flex:0.2}}>

    </View>
  <View style={{flex:5}}>
  
    <TextInput  
      style={{ width: 270,fontSize:15, padding: hp("2%"),color:"#FFF"}}
              placeholder="ENTER DESIRE USER" 
              placeholderTextColor="#000000"
              underlineColorAndroid="#FFFFFF"
              onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
              />

  </View>
  <View style={{flex:1,}}>
    <TouchableOpacity
      onPress={loadUserData}>
    <Icon name="search" size={25} color="#FFF" style={{padding: hp("2%")}}  />
    </TouchableOpacity>
    </View>
  

 </View>

      <FlatList

        style={{ margin: 10, marginBottom: hp('10%') }}
        data={fetchchat}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item._id}
        
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
        // }

      />


    </View>

  )

}


export default SearchList