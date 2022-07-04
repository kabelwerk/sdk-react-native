import Kabelwerk from 'kabelwerk';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { KabelwerkMarkup } from './KabelwerkMarkup.js';
import { toTimeString } from './datetime.js';

// return false if the other side's marker has moved over the message
const areEqual = function (prevProps, nextProps) {
  if (
    prevProps.theirMarker < prevProps.message.id &&
    nextProps.theirMarker >= nextProps.message.id
  ) {
    return false;
  }

  return true;
};

const KabelwerkMessage = React.memo(function ({ message, theirMarker }) {
  const isOurs = message.user.id == Kabelwerk.getUser().id;
  const isMarked = isOurs && theirMarker >= message.id;

  return (
    <View style={[styles.container, isOurs ? styles.ours : styles.theirs]}>
      <KabelwerkMarkup html={message.html} />
      <View style={styles.footer}>
        <Text style={styles.time}>{toTimeString(message.insertedAt)}</Text>
        {isOurs && (
          <View style={styles.checkmarks}>
            <Text style={styles.checkmark}>✓</Text>
            {isMarked && <Text style={styles.checkmark}>✓</Text>}
          </View>
        )}
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
    fontSize: 10,
  },
  checkmarks: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 18,
  },
  checkmark: {
    fontSize: 10,
    marginLeft: -4,
  },
});

export { KabelwerkMessage };
