import App from 'app';
import Menu from 'menu';
import notifier from './notifier';
import events from '../common/events';


let template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click: () => notifier.emit(events.newfile)
      }, {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click: () => notifier.emit(events.openfile)
      }
    ]
  }
];


export function loadApplicationMenu() {
  if (process.platform === 'darwin') {
    const name = App.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          role: 'about'
        }, {
          type: 'separator'
        }, {
          label: 'Services',
          role: 'services',
          submenu: []
        }, {
          label: 'Developer Tools',
          accelerator: (() => process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I')(),
          click: () => notifier.emit(events.opendevtools)
        }, {
          type: 'separator'
        }, {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },{
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        }, {
          label: 'Show All',
          role: 'unhide'
        }, {
          type: 'separator'
        }, {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { App.quit(); }
        }
      ]
    });
  }

  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  return menu;
}
