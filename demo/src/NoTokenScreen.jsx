import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const NoTokenScreen = function ({ generateUser }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.explanationHeading}>
          You have been disconnected.
        </Text>
        <Text style={styles.explanationText}>
          This could be either because your device is offline and no demo user
          could be generated for you, or because you have reset your user.
        </Text>
        <Text style={styles.explanationText}>
          Please use the button below to generate a new demo user.
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button title="Generate user" onPress={generateUser} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  explanation: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  explanationHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  explanationText: {
    fontSize: 16,
    marginTop: 16,
  },
  buttons: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

export { NoTokenScreen };
