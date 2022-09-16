import React, { useState } from 'react';
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
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
  import { useNavigation } from '@react-navigation/native';



const Login =()=>{
    const navigation = useNavigation(); 
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [email, setEmail] = useState("skhan@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loginresponse, setloginresponse] = useState();
  const [loading, setLoading] = useState(false);
  let statusCode

  function Login() {

    const data = {
      email: email,
      password: password,
      
    }
    if (!email|| !password) {
        alert('Please Fill All Fields');
        return;
      }
    fetch('https://chatlay-mern-app.herokuapp.com/api/user/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response =>{ 
        statusCode = response.status;
       const data = response.json();
       console.log(data,'data')
       return Promise.all([statusCode, data],console.log(statusCode));
     })
      .then(data => {
        setloginresponse(data)
        if (statusCode == 200) {
            Alert.alert(
                'Success',
                'User Login successfully',
                // ,{data:loginresponse}
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('ChatList',{data:data}),
                  },
                ],
                { cancelable: false }
              );
        } else {
            alert('Please Enter Valid Credentials');
            console.log(statusCode,'ss')
          }

        console.log('Success:', data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });





  }
    return (
        <ScrollView style={{backgroundColor:'white',}}>
        <View style={[style.Container,{ marginBottom:hp("2%"),marginTop:hp("20%")}]}>
        <Image
                    style={[style.image]}
                    resizeMode ="stretch"
                    source={require('../assets/Chatlylogo.png')}
                    />
             
                    <Text style={{ fontSize:40,marginTop:hp("3%"),fontWeight:'bold'}}> SIGN IN </Text>
                    <Text style={{ fontSize:14,}}> Sign In To Your Register Account </Text>

<View style={{marginTop:hp("3%")}}>
                    <TextInput style={style.TextInput}
            placeholder='Enter Your Email'
            placeholderTextColor="#000000"
            underlineColorAndroid="#000000"

            onChangeText={(email) => setEmail(email)}
            value={email}
      

          />
                </View>

                <View style={{marginTop:hp("2%")}}>
                    <TextInput style={style.TextInput}
            placeholder='Enter Your Password'
            placeholderTextColor="#000000"
            underlineColorAndroid="#000000"

            secureTextEntry={passwordVisible}
            onChangeText={(password) => setPassword(password)}
            value={password}
      

          />
               



 
                </View>


                <TouchableOpacity style={[style.btn]}
        onPress={Login}
              > 
              <Text style={[style.btntext]}>
           LOG IN </Text>
            </TouchableOpacity>

            
            <TouchableOpacity style={[style.btn]}
         onPress={() =>navigation.navigate("SignUp", {


          })}
        > 
        <Text style={[style.btntext]}>
    SIGN UP </Text>
      </TouchableOpacity>

        </View>
        </ScrollView>
        );
    }


const style =StyleSheet.create({

    Container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        width:wp("70%"),
        height:hp("15%")
        
    },
    textTitle:{
        fontSize:40,
        marginVertical:10
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
     },
     TextInput: {
        width: wp("85%"),
        borderRadius:3,
        borderColor:'black',
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
        marginTop:hp("3%"),
        width:wp("55%")
        
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

export default Login