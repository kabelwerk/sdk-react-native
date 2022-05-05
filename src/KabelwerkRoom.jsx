import Kabelwerk from 'kabelwerk';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { KabelwerkContext } from './KabelwerkContext.jsx';
import { KabelwerkMessageForm } from './KabelwerkMessageForm.jsx';

const KabelwerkRoom = function ({ roomId = 0 }) {
  const { isReady } = React.useContext(KabelwerkContext);

  // the Kabelwerk ID of the connected user
  const userId = Kabelwerk.getUser().id;

  // the Kabelwerk room object
  const room = React.useRef(null);

  // the loaded chat messages, in reversed order (most recent first)
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (isReady) {
      room.current = Kabelwerk.openRoom(roomId);

      // when the initial list is messages is loaded
      room.current.on('ready', ({ messages }) => {
        setMessages(messages.slice().reverse());

        if (messages.length) {
          room.current.moveMarker();
        }
      });

      // when a new message is posted in the room
      room.current.on('message_posted', (message) => {
        setMessages((messages) => {
          return [message].concat(messages);
        });

        room.current.moveMarker();
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
      setMessages([]);
    };
  }, [isReady, roomId]);

  // fetch more messages from earlier in the chat history
  const loadEarlierMessages = function () {
    if (room.current) {
      room.current
        .loadEarlier()
        .then(({ messages }) => {
          if (messages.length) {
            setMessages((currMessages) =>
              currMessages.concat(messages.reverse())
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // post a new message in the chat room
  const postMessage = function (params) {
    if (room.current) {
      room.current.postMessage(params).catch((error) => {
        console.error(error);
      });
    }
  };

  // render a chat message
  const renderItem = function ({ item }) {
    return (
      <View
        style={[
          styles.message,
          item.user.id == userId ? styles.messageOurs : styles.messageTheirs,
        ]}
      >
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={renderItem}
        inverted={true}
        style={styles.flatList}
        onEndReached={loadEarlierMessages}
      />
      <KabelwerkMessageForm postMessage={postMessage} />
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
  message: {
    backgroundColor: 'white',
    marginTop: 16,
    maxWidth: '70%',
    padding: 16,
  },
  messageOurs: {
    alignSelf: 'flex-end',
  },
  messageTheirs: {},
});

export { KabelwerkRoom };
