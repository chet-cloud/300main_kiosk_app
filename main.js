const {app, BrowserWindow, Menu} = require('electron');
require('./update');

let win;

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

function createDefaultWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
  win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
  return win;
}

app.on('ready', function() {
  createDefaultWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});



