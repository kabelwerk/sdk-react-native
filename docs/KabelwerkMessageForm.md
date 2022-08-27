# Kabelwerk Message Form

The `<KabelwerkMessageForm>` component renders an input form for posting new messages in a chat room.

Most probably you will not directly use the `<KabelwerkMessageForm>` component in your code — on the contrary, it is likely that you will want to replace it with a component of your own.

## Example

```jsx
// example using expo-document-picker
const pickImage = function () {
  return DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: false,
    type: ['image/jpeg', 'image/png'],
  }).then((result) => {
    if (result.type == 'cancel') {
      return Promise.reject();
    }

    return {
      name: result.name,
      type: result.mimeType,
      uri: result.uri,
    };
  });
};

<KabelwerkMessageForm
  postMessage={postMessage}
  postUpload={postUpload}
  pickImage={pickImage}
/>;
```

## Props

### `postMessage`

Called when the user intends to post a new message in the chat room via the form. Called with an `{ text }` object for text messages and with an `{ uploadId }` object for image messages. It should return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which resolves if the message has been posted successfully.

### `postUpload`

Called when the user intends to upload a new file in the chat room via the form. Called with the resolved value of the `pickImage` callback (see below). It should return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which resolves into an upload object if the file has been uploaded successfully.

### `pickImage`

Called when the user intends to pick an image for uploading in the chat room. Called without arguments, the function should return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which resolves into an `{ name, type, uri }` object — which can then be uploaded to the Kabelwerk backend via the `postUpload` callback.

## See also

- [Kabelwerk Message](./KabelwerkMessage.md)
- [Kabelwerk Message Separator](./KabelwerkMessageSeparator.md)
- [Kabelwerk Room](./KabelwerkRoom.md)
