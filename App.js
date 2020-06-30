import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Listagem from './src/screens/Note/Listagem'
import ApgAtz from './src/screens/Note/ApgAtz'
import Inserir from './src/screens/Note/Inserir'

const Stack = createStackNavigator();

function App() {
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Inserir">
          <Stack.Screen name="Listagem" component={Listagem} />
          <Stack.Screen name="ApgAtz" component={ApgAtz} />
          <Stack.Screen name="Inserir" component={Inserir} />
       </Stack.Navigator>
     </NavigationContainer>
   );
 }

export default App;