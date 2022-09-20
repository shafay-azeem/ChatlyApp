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
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = ({ route }) => {


  const { Chatlist } = route.params;
  const { data } = route.params;


  const [messages, setMessages] = useState([])





  let statusCode

  let token = data[1].token;



  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${data[1].token}`,
      },
    };

    setMessages([""])


    fetch(
      'https://chatlay-mern-app.herokuapp.com/api/message/63248930885ed0642fbad490',
      config,
    )
      .then(response => response.json())
      .then(responseJson => {



        setMessages(x => [...x, ...responseJson]);


      });


  }, []);



  let giftedChatMessages = messages.map((x) => {

    let gcm = {
      _id: x._id,
      text: x.content,
      createdAt: x.createdAt,
      user: {
        _id: 1
      }

    };
    return gcm;
  });



  function handleSend(newMessage) {

    // socket.emit("stop typing", '63248930885ed0642fbad490');
    const data =
    {
      content: newMessage[0].text,
      chatId: "63248930885ed0642fbad490"
    }

    fetch('https://chatlay-mern-app.herokuapp.com/api/message', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data], console.log(statusCode));
      })
      .then(data => {
        socket.emit("new message", data)
        setMessages((messages) => [...messages, ...data])

        if (statusCode == 200) {
          console.log(statusCode, 'success')
        } else {
          console.log(statusCode, 'err')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      });

  }




  return (

    //style={{  position: item.user._id === user._id ? 'right' : 'left',}}

    <GiftedChat
      messages={giftedChatMessages.reverse()}
      onSend={messages => handleSend(messages)}

      user={{
        _id: 1,
      }}




    />


  );
};

export default ChatScreen;
