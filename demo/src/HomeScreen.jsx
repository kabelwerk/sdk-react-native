import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const HomeScreen = function ({ navigation, logout }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.welcomeHeading}>
          Welcome to the Kabelwerk demo app for React Native!
        </Text>
        <Text style={styles.welcomeText}>
          A demo user has been automatically generated for you and its auth
          token is persisted in the device's local storage.
        </Text>
        <Text style={styles.welcomeText}>
          You could update the user's name via the settings, or you could reset
          the auth token and generate a new demo user. But most importantly, you
          can open the chat screen!
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button
          title="Open chat"
          onPress={() => navigation.navigate('chat-room')}
        />
        <Button
          title="Settings"
          onPress={() => navigation.navigate('settings')}
        />
        <Button title="Reset user" onPress={logout} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  welcomeHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 16,
    marginTop: 16,
  },
  buttons: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

export { HomeScreen };
