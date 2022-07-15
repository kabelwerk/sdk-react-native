import React from 'react';
import { Linking, Text } from 'react-native';

const TAG_REGEX = /<(?<closing>\/)?(?<tag>[a-z]+)(?<attrs>[^<>]+)*>/g;

const ATTRS_REGEX = /(?<key>[a-z]+)="(?<value>[^<"'>\s]+)"/g;

// a dict mapping html tags to functions creating react native components
const ELEM_DICT = Object.freeze({
  p: (attrs, children) => {
    return React.createElement(Text, { style: { marginBottom: 8 } }, children);
  },
  br: (attrs, children) => {
    return '\n';
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
  _: (attrs, children) => {
    return React.createElement(Text, null, children);
  },
});

// convert an html string into a list of <Text> components — one for each <p>
const convert = function (html, elemDict) {
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
    if (stack.length) {
      stack[stack.length - 1].children.push(text.replace(/\n/g, ''));
    }
  };

  while ((match = regex.exec(html))) {
    if (match.index > index) {
      let text = html.slice(index, match.index);
      if (text.trim()) {
        pushText(text);
      }
    }

    index = match.index + match[0].length;

    if (elemDict.hasOwnProperty(match[2])) {
      if (match[1]) {
        // this is a closing tag

        let elem = stack.pop();
        let component = elemDict[elem.tag](elem.attrs, elem.children);

        if (stack.length) {
          stack[stack.length - 1].children.push(component);
        } else {
          output.push(component);
        }
      } else {
        // this is either an opening or a self-closing tag

        if (match[2] == 'br') {
          stack[stack.length - 1].children.push('\n');
        } else {
          stack.push({
            tag: match[2],
            attrs: match[3] ? parseAttrs(match[3]) : null,
            children: [],
          });
        }
      }
    } else {
      pushText(match[0]);
    }
  }

  return output;
};

// helper for the convert function above
const parseAttrs = function (htmlAttrs) {
  const regex = new RegExp(ATTRS_REGEX);
  const attrs = Object.create(null);

  let match;
  while ((match = regex.exec(htmlAttrs))) {
    attrs[match[1]] = match[2];
  }

  return attrs;
};

const KabelwerkMarkup = function ({ html }) {
  return convert(html, ELEM_DICT);
};

export { KabelwerkMarkup, convert };
