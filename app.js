import App from 'app';
import BrowserWindow from 'browser-window';

// import 'electron-debug';

let mainWindow = null;

function onClose() {
  mainWindow = null;
}

function createMainWindow () {
  const wnd = new BrowserWindow({
    width: 600,
    height: 400
  });

  wnd.on('closed', onClose);

  return wnd;
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
  mainWindow = createMainWindow();
});
