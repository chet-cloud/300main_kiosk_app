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
    },
    kiosk:true
  });
  //win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });

  // Set environment variables and read it
  let specified_page = process.env.APP===undefined ? "version.html": process.env.APP

  win.loadURL(`file://${__dirname}/public/${specified_page}#v${app.getVersion()}`);
  
  return win;
}

app.on('ready', function() {
  createDefaultWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});



