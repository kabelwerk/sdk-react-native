import Kabelwerk from 'kabelwerk';
import React from 'react';
import {
  ActionSheetIOS,
  Clipboard,
  Image,
  Linking,
  Platform,
  Pressable,
  Text,
  ToastAndroid,
  View,
  useWindowDimensions,
} from 'react-native';

import { KabelwerkMarkup } from './KabelwerkMarkup.js';
import { ThemeContext, initStyleSheet } from './KabelwerkTheme.jsx';
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

// open the browser with the message's upload — if there is such
const openUpload = function (message) {
  if (message.type == 'image' || message.type == 'attachment') {
    Linking.openURL(message.upload.original.url);
  }
};

// copy the message to the clipboard — if it is a text message
//
// on Android directly copy the message and show a toast
// on iOS show an action sheet providing the copy option
const yank = function (message) {
  if (message.type == 'text') {
    if (Platform.OS == 'android') {
      Clipboard.setString(message.text);
      ToastAndroid.show('Text copied to clipboard.', ToastAndroid.SHORT);
    } else if (Platform.OS == 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Copy', 'Cancel'],
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex == 0) {
            Clipboard.setString(message.text);
          }
        },
      );
    }
  }
};

// the default function for rendering a message's checkmarks
const renderKabelwerkCheckmarks = function (number) {
  const styles = styleSheet.get();

  return (
    <View style={styles.checkmarks}>
      <Text style={styles.checkmark}>✓</Text>
      {number == 2 && <Text style={styles.checkmark}>✓</Text>}
    </View>
  );
};

// the default function for rendering a message's posting time
const renderKabelwerkTime = function (datetime) {
  const styles = styleSheet.get();

  return <Text style={styles.time}>{toTimeString(datetime)}</Text>;
};

const KabelwerkMessage = React.memo(function ({
  message,
  theirMarker = undefined,
  renderCheckmarks = renderKabelwerkCheckmarks,
  renderTime = renderKabelwerkTime,
  onPress = openUpload,
  onLongPress = yank,
  style = undefined,
}) {
  const windowDimensions = useWindowDimensions();

  const theme = React.useContext(ThemeContext);
  const styles = styleSheet.render(theme);

  const isOurs = message.user.id == Kabelwerk.getUser().id;
  const isMarked = isOurs && theirMarker >= message.id;

  return (
    <Pressable
      onPress={() => onPress(message)}
      onLongPress={() => onLongPress(message)}
    >
      <View
        style={[
          styles.container,
          isOurs ? styles.ours : styles.theirs,
          message.type == 'text' ? styles.text : undefined,
          style,
        ]}
      >
        {message.type == 'image' || message.type == 'attachment' ? (
          <>
            <Image
              resizeMethod="scale"
              resizeMode="contain"
              source={{
                uri: message.upload.preview.url,
                width: message.upload.preview.width,
                height: message.upload.preview.height,
              }}
              style={[
                inferImageDimensions(message.upload.preview, windowDimensions),
                styles.image,
              ]}
            />

            {message.type == 'attachment' && (
              <Text style={styles.attachmentName}>{message.upload.name}</Text>
            )}
          </>
        ) : (
          <KabelwerkMarkup html={message.html} />
        )}
        <View style={styles.footer}>
          {renderTime(message.insertedAt)}
          {isOurs && renderCheckmarks && renderCheckmarks(isMarked ? 2 : 1)}
        </View>
      </View>
    </Pressable>
  );
}, areEqual);

const styleSheet = initStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.surfaceColor,
    marginTop: theme.spacingBase * 2,
    padding: theme.spacingBase * 2,
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
  image: {
    marginBottom: theme.spacingBase,
  },
  attachmentName: {
    color: theme.onSurfaceColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizeBase,
    marginBottom: theme.spacingBase,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  time: {
    color: theme.onSurfaceColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizeSmall,
  },
  checkmarks: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 18,
  },
  checkmark: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizeSmall,
    marginLeft: -4,
  },
}));

// determine the width and height of an <Image> based on the screen width
const inferImageDimensions = function (image, screen) {
  const factor = screen.width * 0.8 >= image.width ? 1 : 0.5;

  return {
    height: image.height * factor,
    width: image.width * factor,
  };
};

export { KabelwerkMessage };
