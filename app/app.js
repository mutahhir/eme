import App from 'app';
import Window from './window';
import dialog from 'dialog';

import {loadApplicationMenu} from './menu';
import notifier from './notifier';
import events from '../common/events';

import fs from 'fs';

import 'electron-debug';

function createNewWindow() {
  new Window();
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
  if (!Window.hasWindows()) {
    createNewWindow();
  }
});

App.on('ready', () => {
  loadApplicationMenu();
  createNewWindow();
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
  /*if (mainWindow) {
    mainWindow.toggleDevTools();
  }*/
});
