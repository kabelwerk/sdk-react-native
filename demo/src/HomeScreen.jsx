import React from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';

const HomeScreen = function ({ navigation, logout }) {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Go to the chat"
        onPress={() => navigation.navigate('chat-room')}
      />
      <Button title="Reset configuration" onPress={logout} />
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
