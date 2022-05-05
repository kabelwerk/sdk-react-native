import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const KabelwerkMessageForm = function ({ postMessage }) {
  // the value of the text input for posting new messages
  const [draft, setDraft] = React.useState('');

  // post the drafted message and reset the text input
  const handleSend = function () {
    if (draft.length > 0) {
      postMessage({ text: draft });
      setDraft('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline={true}
        placeholder="Message"
        value={draft}
        onChangeText={setDraft}
      />
      {draft.length > 0 && (
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>▶</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    padding: 16,
  },
  sendButton: {
    marginRight: 8,
  },
  sendButtonText: {
    fontSize: 20,
  },
});

export { KabelwerkMessageForm };
