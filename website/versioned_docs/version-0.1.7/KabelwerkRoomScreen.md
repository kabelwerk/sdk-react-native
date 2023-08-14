# Kabelwerk Room Screen

A wrapper around [`<KabelwerkRoom>`](./KabelwerkRoom.md) which:

- Places the room component inside a [`<SafeAreaView>`](https://reactnative.dev/docs/safeareaview). If you want to use an alternative safe area view, you need to write your own wrapper.
- Takes care of moving the room component up when the keyboard is shown on iOS. There is not one best way to achieve this, so again, if you want an alternative — e.g. to use a [`<KeyboardAvoidingView>`](https://reactnative.dev/docs/keyboardavoidingview) — you need to write your own wrapper.

These two concerns are handled by a wrapper component because different apps would most likely have their own ways of handling them and it is easier to write one's own wrapper than one's own room component.

The room ID from the route is forwarded to the wrapped room component.

## Example

```jsx
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen
      name="chat-room"
      component={KabelwerkRoomScreen}
      options={{ title: 'Chat' }}
    />
  </Stack.Navigator>
</NavigationContainer>
```

## Props

All props except for React Navigation's [route](https://reactnavigation.org/docs/route-prop) and [navigation](https://reactnavigation.org/docs/navigation-prop) props are forwarded to the wrapped [`<KabelwerkRoom>`](./KabelwerkRoom.md) component.

## See also

- [Kabelwerk Room](./KabelwerkRoom.md)
