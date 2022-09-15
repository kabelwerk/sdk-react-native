import React from 'react';
import { Text, View } from 'react-native';

import { ThemeContext, initStyleSheet } from './KabelwerkTheme.jsx';

// once a separator is rendered there is no reason for it to re-render
const areEqual = function (prevProps, nextProps) {
  return true;
};

const KabelwerkMessageSeparator = React.memo(function ({ date }) {
  const theme = React.useContext(ThemeContext);
  const styles = styleSheet.render(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>&mdash; {date} &mdash;</Text>
    </View>
  );
}, areEqual);

const styleSheet = initStyleSheet((theme) => ({
  container: {
    alignSelf: 'center',
    marginTop: theme.spacingBase * 2,
  },
  text: {
    color: theme.onBackgroundColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizeBase,
  },
}));

export { KabelwerkMessageSeparator };
