import App from 'app';
import Window from './window';
import dialog from 'dialog';

import {loadApplicationMenu} from './menu';
import notifier from './notifier';
import events from '../common/events';

import fs from 'fs';

import 'electron-debug';

function createNewWindow() {
  let window = new Window();
  window.focus();
}

function openFiles (paths) {
  if (!paths || paths.length === 0) return;

  paths.forEach((path) => {
    new Window(path);
  });
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

notifier.on(events.newfile, () => {
  createNewWindow();
})

notifier.on(events.openfile, () => {
  dialog.showOpenDialog(null, {
    title: 'Open Markdown File',
    filters: [
        {name: 'Markdown Files', extensions: ['md', 'markdown', 'txt', 'text', 'ft']}
    ]
  }, openFiles);
});

notifier.on(events.opendevtools, () => {
  const focusedWindow = Window.focusedWindow();
  if (focusedWindow)
    focusedWindow.toggleDevTools();
});
