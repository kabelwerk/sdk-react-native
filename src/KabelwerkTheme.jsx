import React from 'react';
import { StyleSheet } from 'react-native';

// the default values when there is not a theme context provider
const ThemeContext = React.createContext({
  fontFamily: undefined,
  fontSizeBase: 14,
  fontSizeSmall: 10,
  fontSizeLarge: 18,
  backgroundColor: 'transparent',
  surfaceColor: 'white',
  accentColor: '#a9e0e5',
  onBackgroundColor: undefined,
  onSurfaceColor: undefined,
  onAccentColor: undefined,
  spacingBase: 8,
});

// the context provider to be used by devs
const KabelwerkTheme = function ({
  children,
  fontFamily = undefined,
  fontSizeBase = 14,
  fontSizeSmall = 10,
  fontSizeLarge = 18,
  backgroundColor = 'transparent',
  surfaceColor = 'white',
  accentColor = '#a9e0e5',
  onBackgroundColor = undefined,
  onSurfaceColor = undefined,
  onAccentColor = undefined,
  spacingBase = 8,
}) {
  return (
    <ThemeContext.Provider
      value={{
        fontFamily,
        fontSizeBase,
        fontSizeSmall,
        fontSizeLarge,
        backgroundColor,
        surfaceColor,
        accentColor,
        onBackgroundColor,
        onSurfaceColor,
        onAccentColor,
        spacingBase,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// return a Kabelwerk style sheet object
const initStyleSheet = function (createStyleSheet) {
  let currentTheme = null;
  let currentStyles = null;

  const render = function (theme) {
    if (theme != currentTheme) {
      currentTheme = theme;
      currentStyles = StyleSheet.create(createStyleSheet(currentTheme));
    }

    return currentStyles;
  };

  const get = function () {
    return currentStyles;
  };

  return { render, get };
};

export { KabelwerkTheme, ThemeContext, initStyleSheet };
