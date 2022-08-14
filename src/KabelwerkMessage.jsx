import Kabelwerk from 'kabelwerk';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

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
  const windowDimensions = useWindowDimensions();

  const isOurs = message.user.id == Kabelwerk.getUser().id;
  const isMarked = isOurs && theirMarker >= message.id;

  return (
    <View
      style={[
        styles.container,
        isOurs ? styles.ours : styles.theirs,
        message.type == 'text' ? styles.text : undefined,
      ]}
    >
      {message.type == 'image' ? (
        <Image
          resizeMethod="scale"
          resizeMode="contain"
          source={{
            uri: message.upload.preview.url,
            width: message.upload.preview.width,
            height: message.upload.preview.height,
          }}
          style={inferImageStyles(message.upload.preview, windowDimensions)}
        />
      ) : (
        <KabelwerkMarkup html={message.html} />
      )}
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
    padding: 16,
  },
  ours: {
    alignSelf: 'flex-end',
  },
  theirs: {
    alignSelf: 'flex-start',
  },
  text: {
    maxWidth: '80%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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

// determine the width and height of an <Image> based on the screen width
const inferImageStyles = function (image, screen) {
  const factor = screen.width * 0.8 >= image.width ? 1 : 0.5;

  return {
    height: image.height * factor,
    marginBottom: 8,
    width: image.width * factor,
  };
};

export { KabelwerkMessage };
