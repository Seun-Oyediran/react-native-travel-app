import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { TravelAppStack } from './src/stacks';

export default function App() {
  const [loaded] = useFonts({
    // eslint-disable-next-line
    SF: require('./assets/fonts/sf-ui-display-medium-58646be638f96.otf'),
    // eslint-disable-next-line
    SF1: require('./assets/fonts/sf-ui-display-black-58646a6b80d5a.otf'),
    // eslint-disable-next-line
    PLAYFAIR: require('./assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
    // eslint-disable-next-line
    NOIR: require('./assets/fonts/NoirStdMedium.ttf'),
    // eslint-disable-next-line
    PLAYFAIR_BOLD: require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
  });

  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      {/* eslint-disable-next-line */}
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <TravelAppStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
