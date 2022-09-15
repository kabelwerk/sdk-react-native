# Kabelwerk Inbox Item

The `<KabelwerkInboxItem>` component displays information about a chat room and the latest message in that room (if there is such).

Most probably you will not directly use the `<KabelwerkInboxItem>` component in your code — on the contrary, it is likely that you will want to replace it with a component of your own.

## Example

```jsx
// example using react-native-jdenticon
const renderAvatar = function (hub) {
  return <Jdenticon value={hub.name} size={48} />;
};

<KabelwerkInboxItem
  item={item}
  renderAvatar={renderAvatar}
  onPress={onPress}
/>;
```

## Props

### `item`

An inbox item object. Please refer to the [JavaScript SDK docs](https://docs.kabelwerk.io/js/inboxes) for more information about inbox item objects.

### `renderAvatar`

The function used to render an avatar for the hub of the chat room. The somewhat cheeky default is to render Kabelwerk's own logo. If you do not want to have hub avatars, pass a [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value.

### `onPress`

Called when the component is pressed by the user.

## See also

- [Kabelwerk Inbox](./KabelwerkInbox.md)
