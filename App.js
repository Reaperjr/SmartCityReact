import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Listagem from './src/screens/Note/Listagem'
import ApgAtz from './src/screens/Note/ApgAtz'
import Inserir from './src/screens/Note/Inserir'
import Login from './src/screens/login/login'
import Map from './src/screens/Maps/Map'
import {LocalizationContext} from './src/translation/LocalizationContext';
const Stack = createStackNavigator();

function App() {
  const {translations} = React.useContext(LocalizationContext);
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">
       <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
       <Stack.Screen name="Map" component={Map}/>
          <Stack.Screen name="Listagem" component={Listagem} options={{ title: translations.noteslist }}/>
          <Stack.Screen name="ApgAtz" component={ApgAtz} options={{ title: translations.EditNote }}/>
          <Stack.Screen name="Inserir" component={Inserir} options={{ title: translations.dialogadd }} />
       </Stack.Navigator>
     </NavigationContainer>
   );
 }

export default App;