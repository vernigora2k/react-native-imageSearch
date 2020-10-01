import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigators/RootNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import getImagesReducer from './Redux/getImagesReducer';

const store = createStore(getImagesReducer)

export class App extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>   
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
