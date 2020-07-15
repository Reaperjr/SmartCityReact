/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';
import * as NoteDB from '../../db/NoteDB';
import translations from '../../translation/translations';

class Inserir extends Component{

  constructor(props) {
    super(props);
    this.state = {
        id: 0,
        title: '',
        local: '',
        description: ''
    };
}

  // show_count=()=>{
  //   var ID = NoteDB.realmDB.objects('Note').length;
  //   Alert.alert("contagem: " + ID);
  // }

  addRegisto=()=>{
        const newNote = {
          id: Math.floor(Date.now() / 1000),
          title: this.state.title,
          local: this.state.local,
          date: new Date(),
          description: this.state.description
          
      };
      NoteDB.insertNote(newNote).then().catch((error) => {
          alert(`Insert new Note error ${error}`);
      });
    Alert.alert(translations.insertSuccess)
  }

  GoToListagem = () =>
    {
       this.props.navigation.navigate('Listagem');
    }

  render() {
   return (
     <View style={styles.MainContainer}>
       <Text style={styles.textLabel}>{translations.title}</Text>
       <TextInput style={styles.textInput}  autoCorrect={false}onChangeText = { ( text ) => { this.setState({ title: text })} }/>             
       <Text style={styles.textLabel}>{translations.local}</Text>
       <TextInput style={styles.textInput} autoCorrect={false} onChangeText = { ( text ) => { this.setState({ local: text })} } />
       <Text style={styles.textLabel}>{translations.desc}</Text>
       <TextInput multiline={true} style={styles.textInputDesc} autoCorrect={false} onChangeText = { ( text ) => { this.setState({ description: text })} }/>
                  
       <TouchableOpacity onPress={this.addRegisto} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> {translations.dialogadd} </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={this.show_count} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> CONTAGEM </Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={this.GoToListagem} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}>{translations.noteslist}  </Text>
        </TouchableOpacity>
     </View>
   );
 }
 }


 const styles = StyleSheet.create({
   MainContainer: {
     flex: 1,
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
}
 });



 export default Inserir;
