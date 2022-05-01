import { SafeAreaView } from 'react-native-safe-area-context';

import { KabelwerkRoom } from './KabelwerkRoom.jsx';

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
