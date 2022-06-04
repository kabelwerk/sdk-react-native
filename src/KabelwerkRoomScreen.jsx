import React from 'react';
import {
  Keyboard,
  LayoutAnimation,
  Platform,
  SafeAreaView,
} from 'react-native';

import { KabelwerkRoom } from './KabelwerkRoom.jsx';

// a wrapper around <KabelwerkRoom> which:
//
// - places the room component inside a <SafeAreaView>; if you want to use an
// alternative safe area view, you need to write your own wrapper
// - (on iOS) takes care of moving the room component up when the keyboard is
// shown; there is not one best way to achieve this, so again, if you want an
// alternative — e.g. to use a <KeyboardAvoidingView> — you need to write your
// own wrapper
//
// these 2 concerns are handled by a wrapper component because different apps
// would most likely have their own ways of handling them and it is easier to
// write one's own wrapper than one's own room component
//
// the room ID from the route is forwarded to the wrapped room component
const KabelwerkRoomScreen = function ({ route }) {
  const roomId =
    route.params && 'roomId' in route.params ? route.params.roomId : 0;

  // 0 when the keyboard is hidden, the height of the keyboard when it is not
  const [offsetBottom, setOffsetBottom] = React.useState(0);

  // update offsetBottom whenever the keyboard is shown or hidden
  React.useEffect(() => {
    // Android handles this automatically
    if (Platform.OS != 'ios') {
      return;
    }

    // the animation details are sourced from the implementation of React
    // Native's <KeyboardAvoidingView>
    const animate = function (duration, easing) {
      LayoutAnimation.configureNext({
        duration: duration > 10 ? duration : 10,
        update: {
          duration: duration > 10 ? duration : 10,
          type: LayoutAnimation.Types[easing] || 'keyboard',
        },
      });
    };

    const subShow = Keyboard.addListener('keyboardWillShow', (event) => {
      const { duration, easing, endCoordinates } = event;

      if (duration && easing) {
        animate(duration, easing);
      }

      setOffsetBottom(endCoordinates.height);
    });

    const subHide = Keyboard.addListener('keyboardWillHide', (event) => {
      const { duration, easing } = event;

      if (duration && easing) {
        animate(duration, easing);
      }

      setOffsetBottom(0);
    });

    // remove the keyboard event listeners
    return () => {
      if (subShow) {
        subShow.remove();
      }

      if (subHide) {
        subHide.remove();
      }
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, bottom: offsetBottom }}>
      <KabelwerkRoom roomId={roomId} />
    </SafeAreaView>
  );
};

export { KabelwerkRoomScreen };
