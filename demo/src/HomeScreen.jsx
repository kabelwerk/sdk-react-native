import { KabelwerkStatusBar } from 'kabelwerk-react-native';
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const HomeScreen = function ({ navigation, name, logout }) {
  return (
    <SafeAreaView style={styles.container}>
      <KabelwerkStatusBar />

      <View style={styles.welcome}>
        <Text style={styles.welcomeHeading}>
          Welcome to Kabelwerk's React Native demo app!
        </Text>
        <Text style={styles.welcomeText}>
          You are connected as <Text style={styles.name}>{name}</Text>. This
          user has been automatically generated for you and will be persisted on
          the device for a few days — unless you reset it before that.
        </Text>
        <Text style={styles.welcomeText}>
          Feel free to send messages, upload images, and find ways to break the
          app!
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button
          title="Open a chat room"
          onPress={() => navigation.navigate('chat-room')}
        />
        <Button
          title="Open inbox"
          onPress={() => navigation.navigate('inbox')}
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
  name: {
    fontWeight: 'bold',
  },
  buttons: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

export { HomeScreen };
