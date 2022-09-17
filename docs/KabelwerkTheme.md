# Kabelwerk Theme

The `<KabelwerkTheme>` context sets the base styles of wrapped Kabelwerk components.

Using the `<KabelwerkTheme>` context is optional — the defaults are more or less sensible. On the other hand, you may want to have multiple theme context providers, e.g. if you want different base styles for different chat rooms.

The `<KabelwerkTheme>` context does not depend on the [Kabelwerk context](./KabelwerkContext.md) and vice versa. The wrapping order does not matter and you can dynamically update the theme without affecting the websocket connection and loaded content (e.g. if your app enables the user to switch between light and dark mode).

## Example

```jsx
<KabelwerkTheme
  fontFamily="DMSans"
  fontSizeBase={14}
  fontSizeSmall={10}
  fontSizeLarge={18}
  backgroundColor="transparent"
  surfaceColor="white"
  accentColor="paleturquoise"
  onBackgroundColor="black"
  onSurfaceColor="black"
  onAccentColor="black"
  spacingBase={8}
>
  {/* chat screens */}
</KabelwerkTheme>
```

## Props

### `fontFamily`

The font family of text in Kabelwerk components. The default value is the system's default font family.

### `fontSizeBase`

The base font size of text in Kabelwerk components, e.g. for the text of chat messages. The default value is 14.

### `fontSizeSmall`

The font size for smaller text, e.g. for the time of posting the message in the bottom right corner of chat message components. The default value is 10.

### `fontSizeLarge`

The font size for larger text, e.g. for the text input where users write their messages. The default value is 18.

### `backgroundColor`

The colour of the background behind scrollable content, e.g. the background colour of a chat room behind the chat message components. The default value is transparent, i.e. the system's default background colour.

### `surfaceColor`

The background colour of most components, e.g. the background colour of a chat message component or an inbox item component. The default value is white.

### `accentColor`

The background colour of highlighted components, e.g. the background colour of the [status bar component](./KabelwerkStatusBar.md). The default value is Kabelwerk's brand colour.

### `onBackgroundColor`

The colour of text displayed on background colour, e.g. the colour of the date string displayed between chat messages posted on different dates in a chat room. The default value is the system's default text colour.

### `onSurfaceColor`

The colour of text displayed on surface colour, e.g. the colour of the text of a chat message or the colour of the text in a text input for posting messages. The default value is the system's default text colour.

### `onAccentColor`

The colour of text displayed on accent colour, e.g. the colour of the status bar's text. The default value is the system's default text colour.

### `spacingBase`

The base spacing used for margins and paddings, e.g. the padding of a chat message. The default value is 8.

## See also

- [Kabelwerk Context](./KabelwerkContext.md)
