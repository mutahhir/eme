import App from 'app';
import BrowserWindow from 'browser-window';
import dialog from 'dialog';

import {loadApplicationMenu} from './menu';
import notifier from './notifier';
import events from '../common/events';

import fs from 'fs';

import 'electron-debug';

let mainWindow = null;

function onClose() {
  mainWindow = null;
}

function createMainWindow () {
  const wnd = new BrowserWindow({
    width: 600,
    height: 400
  });

  wnd.loadUrl(`file://${__dirname}/../browser/index.html`);

  wnd.on('closed', onClose);

  return wnd;
}

function openFiles (paths) {
  if (!paths || paths.length === 0) return;

  let filePath = paths[0];
  let fileContents = fs.readFileSync(filePath, {encoding: 'utf8'});

  let webContents = mainWindow.webContents;

  webContents.send(events.openfile, fileContents);
}

App.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    App.quit();
  }
});

App.on('activate-with-no-open-windows', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

App.on('ready', () => {
  loadApplicationMenu();
  mainWindow = createMainWindow();
});

notifier.on(events.openfile, () => {
  dialog.showOpenDialog(null, {
    title: 'Open Markdown File',
    filters: [
        {name: 'Markdown Files', extensions: ['md', 'markdown', 'txt', 'text', 'ft']}
    ]
  }, openFiles);
});

notifier.on(events.opendevtools, () => {
  if (mainWindow) {
    mainWindow.toggleDevTools();
  }
})
