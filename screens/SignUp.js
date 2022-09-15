import React from 'react';
import {
  SafeAreaView,

  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert

} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import {
  widthPercentageToDP as wp, heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { useState } from 'react';

const SignUp = () => {
  const navigation = useNavigation(); 
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [passwordVisible, setPasswordVisible] = useState(true)
  const [password, setPassword] = useState();


  function register_user() {

    const data = {
      name:name,
      email: email,
      password: password
    }
    if (!email|| !password || !name) {
        alert('Please Fill All Fields');
        return;
      }
      if (password != confirmpassword) {
        alert('Password Should Be Same');
        return;
      }
    fetch('https://chatlay-mern-app.herokuapp.com/api/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response =>{ 
        statusCode = response.status;
       const data = response.json();
       return Promise.all([statusCode, data],console.log(statusCode));
     })
      .then(data => {
        if (statusCode == 201)  {
            Alert.alert(
                'Success',
                'Your Are Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Login'),
                  },
                ],
                { cancelable: false }
              );
        } else {
            alert('Registeration Failed');
            console.log(statusCode,'ss')
          }

        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });





  }
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
     <View style={[style.Container,{ marginBottom:hp("2%"),marginTop:hp("15%")}]}>
      <Image
                    style={[style.image]}
                    resizeMode ="stretch"
                    source={require('../assets/Chatlylogo.png')}
                    />


                <Text style={{ fontSize:40,marginTop:hp("3%"),fontWeight:'bold'}}> SIGN UP </Text>
        <Text style={{ fontSize:14,}}> Register With Your Valid Email </Text>
        
        <View style={{ marginTop: hp("2%") }}>
          <TextInput style={style.TextInput}
            placeholder='Enter Your Name'
            placeholderTextColor="#000000"
            underlineColorAndroid="#000000"
           
            onChangeText={(name) => setName(name)}
            value={name}


          />
        </View>

        <View style={{ marginTop: hp("2%") }}>
          <TextInput style={style.TextInput}
            placeholder='Enter Your Email'
            placeholderTextColor="#000000"
            underlineColorAndroid="#000000"
      
            onChangeText={(email) => setEmail(email)}
            value={email}


          />
        </View>

        <View style={{ marginTop: hp("2%") }}>
          <TextInput style={style.TextInput}
            placeholder='Enter Your Password'
            placeholderTextColor="#000000"
            underlineColorAndroid="#000000"
   
            secureTextEntry={passwordVisible}
            onChangeText={(password) => setPassword(password)}
            value={password}


          />





        </View>
        
        <View style={{ marginTop: hp("2%") }}>
          <TextInput style={style.TextInput}
            placeholder='Confirm Your Password'
            placeholderTextColor="#000000"
            underlineColorAndroid="#000000"
         
            secureTextEntry={passwordVisible}
            onChangeText={(confirmpassword) => setConfirmpassword(confirmpassword)}
            value={confirmpassword}


          />





        </View>


     

        <TouchableOpacity style={[style.btn]}
          onPress={register_user}
        >
          <Text style={[style.btntext]}>
           REGISTER </Text>
        </TouchableOpacity> 

      </View>
    </ScrollView>
  );
}


const style = StyleSheet.create({

  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image:{
    width:wp("70%"),
    height:hp("15%")
    
},
  textTitle: {
    fontSize: 30,
    marginVertical: 0
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  TextInput: {
    width: wp("85%"),
    borderRadius: 3,
    borderColor: 'black',
    // borderWidth: 1,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor:'#3182CE',
    marginTop: hp("3%"),
    width: wp("55%")

  },
  icon: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: -20,
    marginBottom: 10,
  },
  btntext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }

})


export default SignUp