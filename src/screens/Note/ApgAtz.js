/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';
import {LocalizationContext} from '../../translation/LocalizationContext';
import * as NoteDB from '../../db/NoteDB';
import { Value } from 'react-native-reanimated';
import translations from '../../translation/translations';

class ApgAtz extends Component{

  constructor(props){
    super(props);
    this.state = {
      title : this.props.route.params.title,
      local : this.props.route.params.local,
      description : this.props.route.params.description,
      id: this.props.route.params.id,
    }
  }

  updateRegisto=()=>{
    const note = {    
      id:  this.state.id,
      title: this.state.title,
      local: this.state.local,
      description: this.state.description                                        
  };    
  NoteDB.updateNote(note).then().catch((error) => {
      alert(`Update note error ${error}`);
  });  
  Alert.alert(translations.updateSuccess)
  }

  deleteRegisto = () => {
    Alert.alert(
      translations.delete,
      translations.delnote,
      [
          {
              text: translations.no, onPress: () => { },//Do nothing
              style: translations.cancel
          },
          {
              text: translations.yes, onPress: () => {
                  NoteDB.deleteNote(this.state.id).then( () =>{
                    this.props.navigation.navigate('Listagem');
                  }).catch(error => {
                      alert(`Failed to delete todoList with id = ${this.state.id}, error=${error}`);
                  });
              }
          },
      ],
      { cancelable: true }
  );
};

  render() {

   return (
     <View style={styles.MainContainer}>
       <TextInput>{this.state.id}</TextInput>
       <Text style={styles.textLabel}>{translations.title}</Text>
                    <TextInput style={styles.textInput}  autoCorrect={false}
                        onChangeText = { ( text ) => { this.setState({ title: text })} } value={this.state.title}
                    />
                    <Text style={styles.textLabel}>{translations.local}</Text>
                    <TextInput style={styles.textInput} autoCorrect={false}
                       onChangeText = { ( text ) => { this.setState({ local: text })} } value={this.state.local}
                    />
                    <Text style={styles.textLabel}>{translations.desc}</Text>
                    <TextInput multiline={true} style={styles.textInputDesc} autoCorrect={false}
                      onChangeText = { ( text ) => { this.setState({ description: text })} } value={this.state.description}
                    />
       <TouchableOpacity onPress={this.updateRegisto} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> {translations.dialogup} </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deleteRegisto} activeOpacity={0.7} style={styles.button} >
           <Text style={styles.TextStyle}> {translations.delete} </Text>
         </TouchableOpacity>
         
     </View>
   );
 }
 }

 const styles = StyleSheet.create({
   MainContainer: {
     flex: 1,
   },
   button: {
    backgroundColor: 'steelblue',
    padding: 10,
    margin: 10
},
   textLabel: {
    margin: 10,
      color: 'black',
      fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    margin: 10,
    borderColor: 'steelblue',
    height: 40,
    borderRadius: 25,
  },
  textInputDesc: {
    margin: 10,
    height: 60,
    borderColor: 'steelblue',
    borderWidth: 1,
    borderRadius: 25,
  }
 });

 export default ApgAtz;
