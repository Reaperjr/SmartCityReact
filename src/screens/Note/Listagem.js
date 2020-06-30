/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component,useContext } from 'react';
import { StyleSheet, Platform, View, Button, TouchableWithoutFeedback, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, FlatList } from 'react-native';
import * as NoteDB from '../../db/NoteDB';
import {LocalizationContext} from '../../translation/LocalizationContext';
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);
class Listagem extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
        notes: [],

    };
    this.reloadData();
    NoteDB.realmDB.addListener('change', () => {
        this.reloadData();
    });
}
showDeleteConfirmation = (id) => {
  Alert.alert(
      'Delete',
      'Delete a todoList',
      [
          {
              text: 'No', onPress: () => { },//Do nothing
              style: 'cancel'
          },
          {
              text: 'Yes', onPress: () => {
                  NoteDB.deleteNote(id).then().catch(error => {
                      alert(`Failed to delete todoList with id = ${id}, error=${error}`);
                  });
              }
          },
      ],
      { cancelable: true }
  );
};
reloadData = () => {
    NoteDB.readNote().then((notes) => {
        this.setState({ notes });
    }).catch((error) => {
        this.setState({ notes: [] });
    });
    console.log(`reloadData`);
}
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
    );
  };

  actionOnRow(item) {
     this.props.navigation.navigate('ApgAtz', item);
  }
  render()
    {
       return(
          <View style = { styles.container }>
          <FlatList
               data={this.state.notes}
               ItemSeparatorComponent={this.ListViewItemSeparator}
               keyExtractor={item => item.id.toString()}
               renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={ () => this.actionOnRow(item)}>
                  <View style={{ backgroundColor: index % 2 == 0 ? 'powderblue' : 'skyblue'}}>
                    <Text style={{ fontSize: 18, margin: 5 }}>{item.title}</Text>
                    <Text style={{ fontSize: 18, margin: 5 }}>{item.local}</Text>
                    <Text style={{ fontSize: 18, margin: 5 }} numberOfLines={2}>{item.date.toLocaleString()}</Text>
                    <Text style={{ fontSize: 18, margin: 5 }}>{item.description}</Text>
                    </View>
                  </TouchableOpacity>
                  )}/>
                  </View>
       );
    }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
     flex:1,
     justifyContent: 'center',
     paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
     margin: 10
  },
  flatList: {
      flex: 1,
      flexDirection: 'column',
  }
});

 export default Listagem;
