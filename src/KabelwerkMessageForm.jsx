import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

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
        <Button style={styles.sendButton} title="Send" onPress={handleSend} />
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
    padding: 16,
  },
  sendButton: {},
});

export { KabelwerkMessageForm };
