import Kabelwerk from 'kabelwerk';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { KabelwerkContext } from './KabelwerkContext.jsx';

// a status bar that tells the user Kabelwerk's connection state when the
// latter is inactive or connecting
const KabelwerkStatusBar = function () {
  // the current Kabelwerk connection state
  const { state } = React.useContext(KabelwerkContext);

  if (state == Kabelwerk.INACTIVE) {
    return (
      <View style={[styles.container, styles.inactive]}>
        <Text style={styles.text}>The chat is inactive.</Text>
      </View>
    );
  } else if (state == Kabelwerk.CONNECTING) {
    return (
      <View style={[styles.container, styles.connecting]}>
        <Text style={styles.text}>Connecting…</Text>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  inactive: {
    backgroundColor: 'lightgrey',
  },
  connecting: {
    backgroundColor: 'paleturquoise',
  },
  text: {
    fontSize: 16,
  },
});

export { KabelwerkStatusBar };
