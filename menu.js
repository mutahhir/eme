import App from 'app';
import Menu from 'menu';

let template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        role: 'open'
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
