import Kabelwerk from 'kabelwerk';
import React from 'react';
import { Text, View } from 'react-native';

import { KabelwerkContext } from './KabelwerkContext.jsx';
import { ThemeContext, initStyleSheet } from './KabelwerkTheme.jsx';

// a status bar that tells the user Kabelwerk's connection state when the
// latter is inactive or connecting
const KabelwerkStatusBar = function () {
  const theme = React.useContext(ThemeContext);
  const styles = styleSheet.render(theme);

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

const styleSheet = initStyleSheet((theme) => ({
  container: {
    padding: 8,
  },
  inactive: {
    backgroundColor: 'lightgrey',
  },
  connecting: {
    backgroundColor: theme.accentColor,
  },
  text: {
    color: theme.onAccentColor,
    fontSize: theme.fontSizeLarge,
  },
}));

export { KabelwerkStatusBar };
