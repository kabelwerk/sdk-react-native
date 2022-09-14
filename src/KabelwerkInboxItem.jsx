import Kabelwerk from 'kabelwerk';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext, initStyleSheet } from './KabelwerkTheme.jsx';
import { toDateOrTimeString } from './datetime.js';

// the default function for rendering the hubs' avatars
const renderKabelwerkAvatar = function (hub) {
  return (
    <Image
      resizeMode="contain"
      source={{
        uri: 'https://kabelwerk.io/images/logo_192.png',
        width: 48,
        height: 48,
      }}
      style={{
        marginRight: 12,
      }}
    />
  );
};

const KabelwerkInboxItem = function ({
  item,
  onPress,
  renderAvatar = renderKabelwerkAvatar,
}) {
  const theme = React.useContext(ThemeContext);
  const styles = styleSheet.render(theme);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {renderAvatar && renderAvatar(item.room.hub)}

      <View style={styles.main}>
        <View style={styles.upperHalf}>
          <Text style={styles.room}>{item.room.hub.name}</Text>
          {item.message && (
            <Text style={styles.datetime}>
              {toDateOrTimeString(item.message.insertedAt)}
            </Text>
          )}
        </View>

        <View style={styles.lowerHalf}>
          {item.message ? (
            <>
              <Text style={styles.message} numberOfLines={1}>
                {item.message.user.id == Kabelwerk.getUser().id
                  ? 'you'
                  : item.message.user.name}
                {' — '}
                {item.message.type == 'image' ? (
                  <Text>image</Text>
                ) : (
                  <Text>{item.message.text}</Text>
                )}
              </Text>
              {item.isNew && <Text style={styles.isNew}>new</Text>}
            </>
          ) : (
            <Text style={styles.emptyRoom}>no messages yet</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styleSheet = initStyleSheet((theme) => ({
  container: {
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 8,
  },
  main: {
    flex: 1,
  },
  upperHalf: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 24,
  },
  room: {
    flex: 1,
    fontWeight: 'bold',
  },
  datetime: {
    fontSize: theme.fontSizeSmall,
  },
  lowerHalf: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 32,
  },
  message: {
    flex: 1,
  },
  isNew: {
    backgroundColor: 'cadetblue',
    color: 'white',
    marginLeft: 8,
    paddingHorizontal: 8,
  },
  emptyRoom: {
    fontStyle: 'italic',
  },
}));

export { KabelwerkInboxItem };
