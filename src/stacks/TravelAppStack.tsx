import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { TravelStackList } from '../Routes';
import { HomeScreen, Landing, Location } from '../screens';

const Stack = createSharedElementStackNavigator<TravelStackList>();

const TravelAppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Loaction" component={Location} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
);

export default TravelAppStack;
