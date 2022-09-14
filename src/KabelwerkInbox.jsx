import Kabelwerk from 'kabelwerk';
import React from 'react';
import { FlatList, View } from 'react-native';

import { KabelwerkContext } from './KabelwerkContext.jsx';
import { KabelwerkInboxItem } from './KabelwerkInboxItem.jsx';
import { KabelwerkStatusBar } from './KabelwerkStatusBar.jsx';
import { ThemeContext, initStyleSheet } from './KabelwerkTheme.jsx';

// the default function for rendering the inbox items of an inbox
const renderKabelwerkInboxItem = function (item, onPress) {
  return <KabelwerkInboxItem item={item} onPress={onPress} />;
};

// check whether all rooms are empty
const areRoomsEmpty = function (inboxItems) {
  for (let item of inboxItems) {
    if (item.message) return false;
  }
  return true;
};

const KabelwerkInbox = function ({
  renderInboxItem = renderKabelwerkInboxItem,
  renderWelcomeBanner = undefined,
  onInboxItemPress = () => {},
}) {
  const theme = React.useContext(ThemeContext);
  const styles = styleSheet.render(theme);

  // only try to open the inbox after we have connected to the backend
  const { isReady } = React.useContext(KabelwerkContext);

  // the Kabelwerk inbox object
  const inbox = React.useRef(null);

  // the list of inbox items
  const [inboxItems, setInboxItems] = React.useState([]);

  // whether to show the welcome banner
  // not relevant unless the renderWelcomeBanner prop is set
  const [showWelcomeBanner, setShowWelcomeBanner] = React.useState(false);

  // setup (and clean up after) the Kabelwerk inbox object
  React.useEffect(() => {
    if (isReady && Kabelwerk.getState() != Kabelwerk.INACTIVE) {
      inbox.current = Kabelwerk.openInbox();

      inbox.current.on('ready', ({ items }) => {
        setInboxItems(items);

        // show the welcome banner if all rooms are still empty
        if (areRoomsEmpty(items)) {
          setShowWelcomeBanner(true);
        }
      });

      inbox.current.on('updated', ({ items }) => {
        setInboxItems(items);
        setShowWelcomeBanner(false);
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
      setShowWelcomeBanner(false);
    };
  }, [isReady]);

  // render an inbox item component
  const renderItem = function ({ item }) {
    return renderInboxItem(item, () => onInboxItemPress(item.room.id));
  };

  return (
    <View style={styles.container}>
      <KabelwerkStatusBar />
      {showWelcomeBanner && renderWelcomeBanner && renderWelcomeBanner()}
      <FlatList
        data={inboxItems}
        keyExtractor={(item) => item.room.id}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  );
};

const styleSheet = initStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.surfaceColor,
    flex: 1,
  },
  flatList: {},
}));

export { KabelwerkInbox };
