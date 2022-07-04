import React from 'react';
import { Linking, Text } from 'react-native';

const TAG_REGEX = /<(\/)?([a-z]+)(?:\shref="([^<"'>]+)" target=\"_blank\")?>/g;

// a dict mapping html tags to functions creating react native components
const ELEM_DICT = Object.freeze({
  p: (attrs, children) => {
    return React.createElement(Text, null, children);
  },
  em: (attrs, children) => {
    return React.createElement(
      Text,
      { style: { fontStyle: 'italic' } },
      children
    );
  },
  strong: (attrs, children) => {
    return React.createElement(
      Text,
      { style: { fontWeight: 'bold' } },
      children
    );
  },
  a: (attrs, children) => {
    return React.createElement(
      Text,
      {
        style: { textDecorationLine: 'underline' },
        onPress: () => Linking.openURL(attrs.href),
      },
      children
    );
  },
  unknown: (attrs, children) => {
    return React.createElement(Text, null, children);
  },
});

// convert an html string into a list of <Text> components — one for each <p>
const convert = function (html) {
  // react native does not have string.matchAll(regex)
  const regex = new RegExp(TAG_REGEX);

  // a list of <Text> components, one for each <p>
  const output = [];

  // a list of {tag, attrs, children} objects
  const stack = [];

  // the current regex match
  let match;

  // the index of the last char that has been already parsed
  let index = 0;

  // add text to the element currently being assembled
  const pushText = function (text) {
    stack[stack.length - 1].children.push(text);
  };

  while ((match = regex.exec(html))) {
    if (match.index > index) {
      pushText(html.slice(index, match.index));
    }

    index = match.index + match[0].length;

    if (match[1]) {
      // this is a closing tag

      let elem = stack.pop();
      let component = ELEM_DICT[elem.tag](elem.attrs, elem.children);

      if (stack.length) {
        stack[stack.length - 1].children.push(component);
      } else {
        output.push(component);
      }
    } else {
      // this is either an opening or a self-closing tag

      if (match[2] == 'br') {
        pushText('\n');
      } else {
        let tag = ELEM_DICT.hasOwnProperty(match[2]) ? match[2] : 'unknown';

        stack.push({
          tag: tag,
          attrs: tag == 'a' ? { href: match[3] } : null,
          children: [],
        });
      }
    }
  }

  return output;
};

const KabelwerkMarkup = function ({ html }) {
  return convert(html);
};

export { KabelwerkMarkup, convert };
