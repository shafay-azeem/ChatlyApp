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
import { GiftedChat } from 'react-native-gifted-chat'
const ChatScreen = ({route}) => {
  const {message, isMyMessage} = useState();

  const {Chatlist} = route.params;
  const {data} = route.params;

  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();
  const [messages, setMessages] = useState([])
  // console.log(Chatlist._id,'receiver');
  // console.log(data[[1]]._id, 'sender');

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${data[1].token}`,
      },
    };

    fetch(
      'https://chatlay-mern-app.herokuapp.com/api/message/632479a4885ed0642fbad2b9',
      config,
    )
      .then(response => response.json())
      .then(responseJson => {

        setMessages(responseJson)
        console.log(messages[0].content,'++++')

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
  //     text: 'Henlo!',
  //     createdAt: new Date().getTime(),
  //     user: {
  //       _id: 2,
  //       name: 'Test User'
  //     }
  //   }
  // ]);

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  return (
  
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      key={ data[1]._id}
    />

  );
};

export default ChatScreen;
