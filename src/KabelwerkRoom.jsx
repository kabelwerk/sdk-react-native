import Kabelwerk from 'kabelwerk';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { KabelwerkContext } from './KabelwerkContext.jsx';

const KabelwerkRoom = function ({ roomId = 0 }) {
  const context = React.useContext(KabelwerkContext);

  // the Kabelwerk ID of the connected user
  const userId = Kabelwerk.getUser().id;

  // the Kabelwerk room object
  const room = React.useRef(null);

  // whether the room's ready event has been already fired
  const [isReady, setIsReady] = React.useState(false);

  // the loaded chat messages, in reversed order (most recent first)
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (context.isReady) {
      room.current = Kabelwerk.openRoom(roomId);

      // when the initial list is messages is loaded
      room.current.on('ready', ({ messages }) => {
        setMessages(messages.slice().reverse());
        setIsReady(true);
      });

      // when a new message is posted in the room
      room.current.on('message_posted', (message) => {
        setMessages((messages) => {
          return [message].concat(messages);
        });
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
      setIsReady(false);
      setMessages([]);
    };
  }, [context.isReady, roomId]);

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
  const postMessage = function (text) {
    if (room.current) {
      room.current.postMessage({ text }).catch((error) => {
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

  if (!isReady) {
    return <Text>Loading...</Text>;
  }

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
