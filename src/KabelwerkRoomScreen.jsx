import { SafeAreaView } from 'react-native';

import { KabelwerkRoom } from './KabelwerkRoom.jsx';

// intended to be used as a react navigation screen
//
// it just wraps <KabelwerkRoom> in a safe area view and forwards the room ID
// from the route; in this way the room component does not depend on react
// navigation; and if you want to use an alternative safe area view, you just
// need to overwrite this wrapper component
const KabelwerkRoomScreen = function ({ route }) {
  const roomId =
    route.params && 'roomId' in route.params ? route.params.roomId : 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KabelwerkRoom roomId={roomId} />
    </SafeAreaView>
  );
};

export { KabelwerkRoomScreen };
