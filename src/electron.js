// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const log = require('electron-log');
const { fork } = require('child_process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
//   app.quit();
// }

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let webServer;

const startExpress = () => {
  // Start the node express server
  webServer = fork(require.resolve('../build/server/index'));

  // Were we successful?
  if (!webServer) {
    log.info('couldn\'t start web server');
  }
};

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    title: 'Easy DX',
  });

  // and load the index.html of the app.
  if (isDev) {
    mainWindow.loadURL(
      isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/client/index.html')}`
    );
  } else {
    mainWindow.loadFile(`${path.join(__dirname, '../build/client/index.html')}`);
  }

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if (!isDev) {
    startExpress();
  }
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Called before quitting...gives us an opportunity to shutdown the child process
app.on('before-quit', () => {
  log.info('gracefully shutting down...');

  // Need this to make sure we don't kick things off again in the child process
  shuttingDown = true;

  // Kill the web process
  if (webServer) {
    webServer.kill();
  }
});

process.on('SIGINT', () => {
  // graceful shutdown
  log.info('shutting down...');
  process.exit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
