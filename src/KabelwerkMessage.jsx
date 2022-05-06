import Kabelwerk from 'kabelwerk';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { toTimeString } from './datetime.js';

const areEqual = function (prevProps, nextProps) {
  return true;
};

const KabelwerkMessage = React.memo(function ({ message, marker }) {
  return (
    <View
      style={[
        styles.container,
        message.user.id == Kabelwerk.getUser().id ? styles.ours : styles.theirs,
      ]}
    >
      <Text>{message.text}</Text>
      <View style={styles.footer}>
        <Text style={styles.time}>{toTimeString(message.insertedAt)}</Text>
      </View>
    </View>
  );
}, areEqual);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 16,
    maxWidth: '80%',
    padding: 16,
  },
  ours: {
    alignSelf: 'flex-end',
  },
  theirs: {
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  time: {
    fontSize: 12,
  },
});

export { KabelwerkMessage };
