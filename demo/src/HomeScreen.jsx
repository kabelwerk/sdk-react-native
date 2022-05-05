import React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';

import { ConfigContext } from './ConfigContext.jsx';

const HomeScreen = function ({ navigation }) {
  const config = React.useContext(ConfigContext);

  const resetToken = function () {
    config.update({
      url: config.url,
      token: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Go to the chat"
        onPress={() => navigation.navigate('chat-room')}
      />
      <Button title="Reset configuration" onPress={resetToken} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

export { HomeScreen };
