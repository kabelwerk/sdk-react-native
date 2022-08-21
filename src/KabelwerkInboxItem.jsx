import Kabelwerk from 'kabelwerk';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { toDateOrTimeString } from './datetime.js';

const KabelwerkInboxItem = function ({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
            {item.isNew && <View style={styles.isNew}></View>}
          </>
        ) : (
          <Text style={styles.emptyRoom}>no messages yet</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    padding: 8,
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
    fontSize: 10,
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
    borderRadius: 8,
    height: 16,
    marginLeft: 8,
    width: 16,
  },
  emptyRoom: {
    fontStyle: 'italic',
  },
});

export { KabelwerkInboxItem };
