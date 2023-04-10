const path = require('path');

const { getDefaultConfig } = require('expo/metro-config');

const demoDir = __dirname;
const repoDir = path.resolve(__dirname, '..');

const config = getDefaultConfig(demoDir);

// the following config overwrites enable us to import kabelwerk-react-native
// in the demo code
//
// source: https://docs.expo.dev/guides/monorepos/

config.watchFolders = [repoDir];

config.resolver.nodeModulesPaths = [
  path.resolve(demoDir, 'node_modules'),
  path.resolve(repoDir, 'node_modules'),
];

config.resolver.disableHierarchicalLookup = true;

module.exports = config;
