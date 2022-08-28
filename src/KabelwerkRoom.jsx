import Kabelwerk from 'kabelwerk';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { KabelwerkContext } from './KabelwerkContext.jsx';
import { KabelwerkMessage } from './KabelwerkMessage.jsx';
import { KabelwerkMessageForm } from './KabelwerkMessageForm.jsx';
import { KabelwerkMessageSeparator } from './KabelwerkMessageSeparator.jsx';
import { KabelwerkStatusBar } from './KabelwerkStatusBar.jsx';
import { toDateString } from './datetime.js';

// expand the given list of chat items into the past with earlier messages,
// interspersing separators as needed
//
// note that the list is in reverse order, i.e. its last item is earliest
const expandEarlier = function (listItems, messages) {
  let lastDate;

  if (listItems.length) {
    const lastItem = listItems[listItems.length - 1];

    if (lastItem.type != 'separator') {
      lastDate = lastItem.dateString;
    }
  }

  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];

    message.dateString = toDateString(message.insertedAt);

    if (lastDate && lastDate != message.dateString) {
      listItems.push({ type: 'separator', id: lastDate, dateString: lastDate });
    }

    listItems.push(message);

    lastDate = message.dateString;
  }

  // if we have reached the beginning of the chat room's history or if this is
  // the first batch of messages in the room
  if ((!messages.length || listItems.length == messages.length) && lastDate) {
    listItems.push({
      type: 'separator',
      id: lastDate,
      dateString: lastDate,
    });
  }

  return listItems;
};

// expand the given list of chat items with a newer message, adding a separator
// if the new message is a first of a day
//
// note that the list is in reverse order, i.e. its first item is the latest
const expandNew = function (listItems, message) {
  const items = [];

  message.dateString = toDateString(message.insertedAt);

  items.push(message);

  if (!listItems.length) {
    return items;
  }

  if (listItems[0].dateString != message.dateString) {
    items.push({
      type: 'separator',
      id: message.dateString,
      dateString: message.dateString,
    });
  }

  return items.concat(listItems);
};

// the default function for rendering the chat messages in a room
const renderKabelwerkMessage = function (message, theirMarker) {
  return <KabelwerkMessage message={message} theirMarker={theirMarker} />;
};

// the default function for rendering the separators between messages posted on
// different dates
const renderKabelwerkMessageSeparator = function (dateString) {
  return <KabelwerkMessageSeparator date={dateString} />;
};

// the default function for rendering the form for posting messages in a room
const renderKabelwerkMessageForm = function (postMessage, postUpload) {
  return (
    <KabelwerkMessageForm postMessage={postMessage} postUpload={postUpload} />
  );
};

const KabelwerkRoom = function ({
  roomId = 0,
  renderMessage = renderKabelwerkMessage,
  renderMessageSeparator = renderKabelwerkMessageSeparator,
  renderMessageForm = renderKabelwerkMessageForm,
  renderWelcomeBanner = undefined,
}) {
  const { isReady } = React.useContext(KabelwerkContext);

  // the Kabelwerk room object
  const room = React.useRef(null);

  // the messages and date separators, in reverse order (most recent first)
  const [listItems, setListItems] = React.useState([]);

  // the ID of the message marked by the other side
  const [theirMarker, setTheirMarker] = React.useState(-1);

  // setup (and clean up after) the Kabelwerk room object
  React.useEffect(() => {
    if (isReady && Kabelwerk.getState() != Kabelwerk.INACTIVE) {
      room.current = Kabelwerk.openRoom(roomId);

      // when the initial list is messages is loaded
      room.current.on('ready', ({ messages, markers }) => {
        setListItems(() => expandEarlier([], messages));

        if (messages.length) {
          room.current.moveMarker();
        }

        if (markers[1]) {
          setTheirMarker(markers[1].messageId);
        }
      });

      // when a new message is posted in the room
      room.current.on('message_posted', (message) => {
        setListItems((listItems) => expandNew(listItems, message));

        room.current.moveMarker();
      });

      // when a marker in the room is moved
      room.current.on('marker_moved', (marker) => {
        if (marker.userId != Kabelwerk.getUser().id) {
          setTheirMarker(marker.messageId);
        }
      });

      room.current.connect();
    }

    return () => {
      // reset the refs
      if (room.current) {
        room.current.disconnect();
        room.current = null;
      }

      // reset the state
      setListItems([]);
      setTheirMarker(-1);
    };
  }, [isReady, roomId]);

  // fetch more messages from earlier in the chat history
  const loadEarlierMessages = React.useCallback(() => {
    if (room.current) {
      room.current
        .loadEarlier()
        .then(({ messages }) => {
          setListItems((listItems) => expandEarlier(listItems, messages));
        })
        .catch((error) => {
          // only show the error if we are still on the same screen
          if (room.current) {
            Alert.alert('Error loading earlier messages', error.message);
          }
        });
    }
  }, []);

  // post a new message in the chat room
  //
  // handle errors here, but still return a promise so that the message form
  // component knows whether to reset the text input
  const postMessage = React.useCallback((params) => {
    if (room.current) {
      return room.current.postMessage(params).catch((error) => {
        Alert.alert('Error posting your last message', error.message);
        return Promise.reject();
      });
    } else {
      return Promise.reject();
    }
  }, []);

  // post a new upload in the chat room
  const postUpload = React.useCallback((file) => {
    if (room.current) {
      return room.current.postUpload(file).catch((error) => {
        Alert.alert('Error uploading your file', error.message);
        return Promise.reject();
      });
    } else {
      return Promise.reject();
    }
  }, []);

  // render a chat message or a horizontal separator with a date
  const renderItem = function ({ item }) {
    if (item.type == 'separator') {
      return renderMessageSeparator(item.dateString);
    } else {
      return renderMessage(item, theirMarker);
    }
  };

  return (
    <View style={styles.container}>
      <KabelwerkStatusBar />
      {listItems.length == 0 && renderWelcomeBanner && renderWelcomeBanner()}
      <FlatList
        data={listItems}
        renderItem={renderItem}
        extraData={theirMarker}
        inverted={true}
        style={styles.flatList}
        onEndReached={loadEarlierMessages}
      />
      {renderMessageForm(postMessage, postUpload)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    padding: 16,
  },
});

export { KabelwerkRoom };
