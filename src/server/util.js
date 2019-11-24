const os = require('os');
const path = require('path');
const { productName } = require('../../package.json');

const platformHash = {
  darwin: 'osx',
  linux: 'linux',
  win32: 'windows',
};

exports.platformConfigKey = platformHash[os.platform()];

/**
 * Returns a string representing a default settings folder
 * @return {String}
 */
exports.getSettingsFolder = () => {
  if (this.isMac()) {
    return path.join(process.env.HOME, '/Library/Application Support/', productName);
  }
  if (this.isWindows()) {
    return path.join(process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'], 'AppData/Local', productName);
  }
  if (this.isLinux()) {
    return path.join(process.env.HOME, '.config', productName);
  }
  return null;
};

exports.isWindows = () => {
  return os.platform() === 'win32';
};

exports.getWindowsAppDataPath = () => {
  return process.env.APPDATA;
};

exports.isLinux = () => {
  return os.platform() === 'linux';
};

exports.isMac = () => {
  return os.platform() === 'darwin';
};
