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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import { useEffect } from 'react';
import axios from "axios";
import { GiftedChat } from 'react-native-gifted-chat'
const ChatScreen = ({route}) => {
  const {message, isMyMessage} = useState();

  const {Chatlist} = route.params;
  const {data} = route.params;
  // const {room} = route.params;
  // console.log(room,'=====')
  const [sender, setSender] = useState([]);
  const [receiver, setReceiver] = useState();
  const [messages, setMessages] = useState([])
  const [chatMessages, setchatMessages] = useState([])
 const senderId=(Chatlist._id,'receiver');
  const receiverId=(data[[1]]._id, 'sender');
  const id = data[[1]]._id
  let statusCode

  let token = data[1].token;
  console.log(token)

 
  useEffect( () => {
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

        // setMessages(responseJson[0])
        // console.log(responseJson)
        // setMessages(JSON.stringify(responseJson[0].content),"---")
        // setMessages(responseJson[0]) 
        
        setMessages (x=>[...x, ...responseJson]);
        // console.log(messages,'m-c')
        // console.log(message[1].content,'m-c')
        // console.log(messages[0]._id,'sss')

        // var arr=[]
        // for(i=0 ; i<responseJson.length ; i++){
        //   if(responseJson[i].sender._id===data[1]._id){
        //    var m_name=responseJson[i].content
        //    var b =(arr.push(m_name))
        //    console.log(arr)
     
        //   }
        //   else{
        //     m_name=(responseJson[i].content,'Raihan')
        //     setReceiver(x => [x, m_name]);
        //   }
        //   // console.log(sender,'sherhyar')
        //   // console.log(receiver,'receiver')
        // } 

      });

  }, []);
  
  // console.log(messages[0].content,'---')

  let giftedChatMessages = messages.reverse().map((x) => {
    // console.log(senderId,'--')
    // console.log(JSON.parse(x.sender))
    // console.log(x.sender)
  //  let a=JSON.stringify(x.sender)
  //  console.log(a._id,'aaa')
//  console.log(Chatlist._id,'receiver');
//    console.log(data[[1]]._id, 'sender');
// var a =x.chat
// // console.log(a,'====')
// console.log(x.get._id,'kkkk')
// console.log(x.length,'lngth')

// console.log(a[1]._id,'king')
    let gcm = {
      _id: x._id,
      text:x.content,
      createdAt: x.createdAt,
      user: {
_id:1}
    //     // name: chatMessage.get("user").get("name"),
    //     // avatar: chatMessage.get("user").get("avatarUrl")

    };
    return gcm;
  });
 
  // const [messages, setMessages] = useState([

  //   {
  //     _id: 0,
  //     text: 'New room created.',
  //     createdAt: new Date().getTime(),
  //     system: true
  //   },
  //   // example of chat message
  //   {
  //     _id: 1,
  //     text: 'hii!',
  //     createdAt: new Date().getTime(),
  //     user: {
  //       _id: 2,
  //       name: 'Test User'
  //     }
  //   }
  // ]);

  // helper method that is sends a message\

//  console.log(giftedChatMessages,'giftedChatMessages')

  function handleSend (newMessage) {

    const data = 
    {
        content: newMessage,
        chatId : "63248930885ed0642fbad490"
    }

    fetch('https://chatlay-mern-app.herokuapp.com/api/message', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    .then(response =>{ 
       statusCode = response.status;
       const data = response.json();
       return Promise.all([statusCode, data],console.log(statusCode));
     })
      .then(data => {
        setMessages([...messages, data]);
        if (statusCode == 200)  {
          console.log(statusCode,'success')
        } else {
            console.log(statusCode,'err')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      });

  }




    // const onSend = useCallback((messages = []) => {
    //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])


  // function handleSend(newMessage = []) {
  //   setMessages(GiftedChat.append(messages, newMessage));
  // }

  return (


    // <View></View>
    <GiftedChat
      messages={giftedChatMessages}
      onSend={messages  => handleSend(messages )}

       user={{
        _id: 1,
      }}


    />


  );
};

export default ChatScreen;
