import './ignoreWarnings';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import Splash from './src/screen/Splash';
import Home from './src/screen/Home';
import Form1 from './src/screen/Form1';
import Form2 from './src/screen/Form2';
import Result from './src/screen/Result';

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    // SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen name="Form1" component={Form1} />
          <Stack.Screen name="Form2" component={Form2} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
