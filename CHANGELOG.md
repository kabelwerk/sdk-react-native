# Changelog

## 0.1.7 (TBA)

- Upgraded the Kabelwerk SDK for JavaScript to [0.3.6](https://github.com/kabelwerk/sdk-js/releases/tag/v0.3.6).

## 0.1.6 (2022-04-14)

- [`<KabelwerkContext>`](./docs/KabelwerkContext.md): added the `pushNotificationsToken` and `pushNotificationsEnabled` props.
- The [`<KabelwerkRoom>`](./docs/KabelwerkRoom.md) component now handles `message_deleted` events.
- The [`<KabelwerkMessage>`](./docs/KabelwerkMessage.md) component can now also render attachment messages.
- [`<KabelwerkMessage>`](./docs/KabelwerkMessage.md): added the `onPress` prop.
- [`<KabelwerkMessageForm>`](./docs/KabelwerkMessageForm.md): replaced the `pickImage` prop with the new `pickFile`.
- Upgraded the Kabelwerk SDK for JavaScript to [0.3.5](https://github.com/kabelwerk/sdk-js/releases/tag/v0.3.5).

## 0.1.5 (2022-10-11)

- [`<KabelwerkMarkup>`](./docs/KabelwerkMarkup.md): HTML entities for special characters are handled correctly.

## 0.1.4 (2022-09-20)

- [`<KabelwerkMessage>`](./docs/KabelwerkMessage.md): added the `renderTime` and `style` props.
- [`<KabelwerkMessageSeparator>`](./docs/KabelwerkMessageSeparator.md): renamed the `date` prop to `text`.
- [`<KabelwerkTheme>`](./docs/KabelwerkTheme.md): removed `borderRadius`.

## 0.1.3 (2022-09-15)

- Added the [`<KabelwerkTheme>`](./docs/KabelwerkTheme.md) context.
- [`<KabelwerkRoom>`](./docs/KabelwerkRoom.md): added the `onReady` prop.
- [`<KabelwerkMessage>`](./docs/KabelwerkMessage.md): added the `renderCheckmarks` and `onLongPress` props.

## 0.1.2 (2022-08-28)

- Added the [`<KabelwerkInbox>`](./docs/KabelwerkInbox.md) and [`<KabelwerkInboxItem>`](./docs/KabelwerkInboxItem.md) components.
- Added new `render*` props to the [`<KabelwerkRoom>`](./docs/KabelwerkRoom.md) component.
- Changed the props of the [`<KabelwerkMessageSeparator>`](./docs/KabelwerkMessageSeparator.md) component.
- Upgraded the Kabelwerk SDK for JavaScript to [0.3.3](https://github.com/kabelwerk/sdk-js/releases/tag/v0.3.3).
- The [`<KabelwerkMessage>`](./docs/KabelwerkMessage.md) component can now also render image messages.
- The [`<KabelwerkMessageForm>`](./docs/KabelwerkMessageForm.md) component now enables users to upload images.

## 0.1.1 (2022-08-01)

- Added the [`<KabelwerkMarkup>`](./docs/KabelwerkMarkup.md) component.
- Upgraded the Kabelwerk SDK for JavaScript to [0.3.2](https://github.com/kabelwerk/sdk-js/releases/tag/v0.3.2).

## 0.1.0 (2022-06-06)

- First release.
