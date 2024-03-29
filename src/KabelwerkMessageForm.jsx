import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemeContext, initStyleSheet } from './KabelwerkTheme.jsx';

const KabelwerkMessageForm = function ({
  postMessage,
  postUpload,
  pickFile = undefined,
}) {
  const theme = React.useContext(ThemeContext);
  const styles = styleSheet.render(theme);

  // the value of the text input for posting new messages
  const [draft, setDraft] = React.useState('');

  // whether the send and upload buttons are enabled
  const [buttonsEnabled, setButtonsEnabled] = React.useState(true);

  // post the drafted message and reset the text input if it worked
  //
  // disable the send buttons while waiting for the server response
  const postTextMessage = function () {
    if (draft.length > 0) {
      setButtonsEnabled(false);

      postMessage({ text: draft })
        .then(() => {
          setDraft('');
          setButtonsEnabled(true);
        })
        .catch(() => {
          // KabelwerkRoom takes care of showing an alert to the user if the
          // server rejects the push or times out
        })
        .finally(() => {
          setButtonsEnabled(true);
        });
    }
  };

  // open the file picker for the user to select a file, upload the selected
  // file, and post an image or an attachment message with the upload
  //
  // disable the send buttons until the promise chain resolves
  const postUploadMessage = function () {
    if (pickFile) {
      setButtonsEnabled(false);

      pickFile()
        .then((file) => {
          return postUpload(file);
        })
        .then((upload) => {
          return postMessage({ uploadId: upload.id });
        })
        .catch(() => {
          // if we end up here, it means that either the user closed the file
          // picker without selecting a file or that there has been an error —
          // in which case KabelwerkRoom takes care of showing an alert
        })
        .finally(() => {
          setButtonsEnabled(true);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        maxLength={4096}
        multiline={true}
        placeholder="Message"
        value={draft}
        onChangeText={setDraft}
      />
      {draft.length ? (
        <TouchableOpacity
          style={styles.sendButton}
          disabled={!buttonsEnabled}
          onPress={postTextMessage}
        >
          <Text style={styles.sendButtonText}>▶</Text>
        </TouchableOpacity>
      ) : (
        pickFile && (
          <TouchableOpacity
            style={styles.sendButton}
            disabled={!buttonsEnabled}
            onPress={postUploadMessage}
          >
            <Text style={styles.sendButtonText}>▲</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styleSheet = initStyleSheet((theme) => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.surfaceColor,
    flexDirection: 'row',
    paddingLeft: theme.spacingBase * 2,
  },
  textInput: {
    flex: 1,
    fontSize: theme.fontSizeLarge,
    marginVertical: theme.spacingBase * 2,
    paddingTop: 0, // on iOS there is a default padding
    paddingBottom: 0,
  },
  sendButton: {
    paddingRight: theme.spacingBase,
  },
  sendButtonText: {
    fontSize: 22,
  },
}));

export { KabelwerkMessageForm };
