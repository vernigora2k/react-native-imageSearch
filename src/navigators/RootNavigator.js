import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PersonListScreen from '../screens/PersonListScreen';
import PersonInfoScreen from '../screens/PersonInfoScreen';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'list images'}>
      <Stack.Screen name={'list images'} component={PersonListScreen} />
      <Stack.Screen name={'full image'} component={PersonInfoScreen} />
    </Stack.Navigator>
  );
};
