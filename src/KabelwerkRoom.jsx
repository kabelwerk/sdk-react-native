import Kabelwerk from 'kabelwerk';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { KabelwerkContext } from './KabelwerkContext.jsx';

const KabelwerkRoom = function ({ id = 0 }) {
  const context = React.useContext(KabelwerkContext);

  // the Kabelwerk room object
  const room = React.useRef(null);

  // whether the room's ready event has been already fired
  const [isReady, setIsReady] = React.useState(false);

  // the already loaded chat messages
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (context.isReady) {
      room.current = Kabelwerk.openRoom(id);

      // when the initial list is messages is loaded
      room.current.on('ready', ({ messages }) => {
        setMessages(messages);
        setIsReady(true);
      });

      // when a new message is posted in the room
      room.current.on('message_posted', (message) => {
        setMessages((messages) => messages.concat([message]));
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
  }, [context.isReady, id]);

  const userId = Kabelwerk.getUser().id;

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
        data={messages.reverse()}
        keyExtractor={(message) => message.id}
        renderItem={renderItem}
        inverted={true}
        style={styles.flatList}
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
