import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Button,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal';

function Item({item, data}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        ,
        {
          borderColor: '#E8E8E8',
          borderWidth: 2,
          borderRadius: hp('2%'),
          marginBottom: 10,
          padding: hp('2%'),
          backgroundColor: '#C8C8C8',
        },
      ]}
      onPress={() =>
        navigation.navigate('ChatScreen', {
          Chatlist: item,
          data: data,
        })
      }>
      <View style={{flex: 1, justifyContent: 'center', fontSize: 50}}>
        <Text> {item.name} </Text>
        <View style={{flexDirection: 'row'}}></View>
      </View>
    </TouchableOpacity>
  );
}

const ChatList = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  // console.log(data[1].token, 'dddd')

  const [searchQuery, setSearchQuery] = React.useState('');

  const [fetchchat, setFetchChat] = useState([]);
  const [response, setresponse] = React.useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  var myGlobalVar;
  // console.log(searchQuery)
  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${data[1].token}`,
      },
    };

    fetch('https://chatlay-mern-app.herokuapp.com/api/chat/', config)
      .then(response => response.json())
      .then(responseJson => {
        let counter = responseJson[0].users.length;

        //  setFetchChat(responseJson[0].users)
        setFetchChat([])
        for (var i in responseJson) {
          var id = responseJson[i]._id;
          // console.log(id)
          // console.log(i,'i')
          // console.log(responseJson[i].isGroupChat)
          if (responseJson[i].isGroupChat === false) {
            for (var j in responseJson[i].users) {
              if (data[1]._id !== responseJson[i].users[j]._id) {
                // // setFetchChat(JSON.stringify(responseJson[i].users[j]))

                var m_name =[ responseJson[i].users[j]]
                // setFetchChat(())
                console.log(m_name)
                // setFetchChat(responseJson[i].users)
               
                setFetchChat(x => [...x, ...m_name]);
                // fetchchat.push(...m_name)
                // console.log(m_name,'mmm')
                // window.myGlobalVar=m_name
                // console.log( window. myVar)
                // setFetchChat(fetchchat => ({
                //   ...fetchchat,
                //   ...m_name
                // }));
                // setFetchChat(m_name)
                // console.log(fetchchat,'ff')
                for (var k in m_name) {
                  // var myJsonString = JSON.stringify(fetchchat[0]);
                  // console.log(myJsonString,'jjjj')
                  // console.log(fetchchat[0][0],'k')
                  // console.log(m_name)
                  //  setFetchChat(x =>[...x, ...m_name ])
                  // console.log(fetchchat)
                  //     var m_name = m_name.concat(m_name)
                  // console.log(m_name)
                }
                //  console.log( JSON.stringify(m_name),'jjjjjjjjjjj')

                // fetchchat.push(m_name)
                // console.log(fetchchat,'NNNNNN')
                // const addMessage = (m_name) => setFetchChat(state => [...state, ...m_name])
                // console.log(responseJson[i].users[j]._id)
                // console.log(fetchchat,'fetch chats')
                //console.log(m_name)
                // console.log(addMessage)
                // console.log(JSON.stringify(fetchchat))
              }
            }
          }
        }
      });
  }, []);
  // const loadUserData = () => {

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${data[1].token}`,
  //     },
  //   };
  //   fetch(`https://chatlay-mern-app.herokuapp.com/api/user?search=${searchQuery}`, config)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       // console.log(responseJson)

  //     });
  // };

  // console.log(fetchchat,"nameeee")
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View>
      <View
        style={{
          height: hp('8%'),
          flexDirection: 'row',
          backgroundColor: '#3182CE',
        }}>
        <View style={{flex: 2}}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Icon
              name="sign-out"
              size={25}
              color="#FFF"
              style={{padding: hp('2%')}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 2.5}}>
          <Text
            style={{
              fontSize: 20,
              padding: hp('2%'),
              color: '#FFF',
              fontWeight: 'bold',
            }}>
            MY CHATS
          </Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchList', {data: data})}>
            <Icon
              name="search"
              size={25}
              color="#FFF"
              style={{padding: hp('2%')}}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity onPress={toggleModal}>
            <Modal isVisible={isModalVisible}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: hp('30%'),
                  borderRadius: hp('1%'),
                }}>
                <View style={{margin: hp('7%')}}>
                  <Text
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      fontSize: 30,
                    }}>
                    {data[1].name}
                  </Text>
                  <Text
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      fontSize: 20,
                    }}>
                    {' '}
                    {data[1].email}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    paddingVertical: 7,
                    marginTop: hp('1%'),
                    borderRadius: 4,
                    backgroundColor: '#3182CE',
                    width: wp('28%'),
                  }}
                  onPress={toggleModal}>
                  <Text
                    style={{
                      fontSize: 13,
                      lineHeight: 21,
                      fontWeight: 'bold',
                      letterSpacing: 0.25,
                      color: 'white',
                    }}>
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <Icon
              name="user"
              size={25}
              color="#FFF"
              style={{padding: hp('2%')}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={{margin: 10, marginBottom: 30}}
        data={fetchchat}
        renderItem={({item}) => <Item item={item} data={data} />}
        keyExtractor={item => item._id}

        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
        // }
      />
    </View>
  );
};

export default ChatList;
