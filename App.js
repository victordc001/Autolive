import 'react-native-gesture-handler';
import React, {useEffect } from 'react';  
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
  ScrollView, Dimensions, Platform
} from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';  
import changeNavigationBarColor from 'react-native-navigation-bar-color';    
import GoLiveb from './screens/GoLiveb';
const Stack = createStackNavigator();   


export default function App() {    

   useEffect(() => {
    if (Platform.OS === 'android') {
      changeNavigationBarColor('#f2f2f2', true);  
    }
  }, []);
 
         return(
            <NavigationContainer>
        <Stack.Navigator>     

               <Stack.Screen
            options={{
              headerShown: false,
            }}
           name='GoLiveb'   
           component={GoLiveb} />    
        
        </Stack.Navigator>
    </NavigationContainer>
  )
    
}