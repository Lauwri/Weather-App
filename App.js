import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import WeatherDisplay from './components/WeatherDisplay';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WeatherDisplay />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#47505e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
