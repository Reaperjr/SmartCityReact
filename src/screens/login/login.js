import React, {useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Dimensions} from 'react-native';
import {LocalizationContext} from '../../translation/LocalizationContext';
import Axios from 'axios';
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
export default function Login({navigation}) {
  const {translations} = useContext(LocalizationContext);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [dimensions, setDimensions] = React.useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  React.useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

const login = (email, password) => {
   Axios.post('http://192.168.1.66:3000/api/auth/login', {email: email, password: password})
        .then(res => {alert(res.data.message);
          id = res.data.data[0].id_user;
          console.log(id);
            navigation.navigate('Map', {id: id,});
            return res.data;
        })
        .catch(err => {
            if(err.response.status == 403)
                return false;
            err;
        });
}
    return (
      <View style={dimensions.window.height > dimensions.window.width ? styles.containerP : styles.containerL }>
        <Text style={styles.logo}>SmartCity</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c" autoCompleteType="email"
            onChangeText={(text) => setEmail(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c" autoCompleteType="password"
            onChangeText={(text) => setPassword(text)}/>
        </View>
        <TouchableOpacity  style={styles.loginBtn}>
          <Text onPress={() => login(email,password)} style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Text  onPress={() => navigation.navigate('Inserir')} style={styles.noteText}>{translations.personalNotes}</Text>
        </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
  containerP: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerL: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"steelblue",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
  noteText:{
    marginTop:30,
    color:"white"
  }
});