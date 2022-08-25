import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// once a separator is rendered there is no reason for it to re-render
const areEqual = function (prevProps, nextProps) {
  return true;
};

const KabelwerkMessageSeparator = React.memo(function ({ date }) {
  return (
    <View style={styles.container}>
      <Text>&mdash; {date} &mdash;</Text>
    </View>
  );
}, areEqual);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 16,
  },
});

export { KabelwerkMessageSeparator };
