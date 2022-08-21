import Kabelwerk from 'kabelwerk';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { KabelwerkContext } from './KabelwerkContext.jsx';
import { KabelwerkInboxItem } from './KabelwerkInboxItem.jsx';
import { KabelwerkStatusBar } from './KabelwerkStatusBar.jsx';

const KabelwerkInbox = function ({ onItemPress }) {
  const { isReady } = React.useContext(KabelwerkContext);

  // the Kabelwerk inbox object
  const inbox = React.useRef(null);

  // the list of inbox items
  const [inboxItems, setInboxItems] = React.useState([]);

  // setup (and clean up after) the Kabelwerk inbox object
  React.useEffect(() => {
    if (isReady && Kabelwerk.getState() != Kabelwerk.INACTIVE) {
      inbox.current = Kabelwerk.openInbox();

      inbox.current.on('ready', ({ items }) => {
        setInboxItems(items);
      });

      inbox.current.on('updated', ({ items }) => {
        setInboxItems(items);
      });

      inbox.current.connect();
    }

    return () => {
      // reset the refs
      if (inbox.current) {
        inbox.current.disconnect();
        inbox.current = null;
      }

      // reset the state
      setInboxItems([]);
    };
  }, [isReady]);

  // render an inbox item component
  const renderItem = function ({ item }) {
    return (
      <KabelwerkInboxItem
        item={item}
        onPress={() => onItemPress(item.room.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <KabelwerkStatusBar />
      <FlatList
        data={inboxItems}
        keyExtractor={(item) => item.room.id}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {},
});

export { KabelwerkInbox };
