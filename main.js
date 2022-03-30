const {app, BrowserWindow, Menu,protocol} = require('electron');
const {setCallback} = require('./update');

let win;

// function sendStatusToWindow(text) {
//   log.info(text);
//   win.webContents.send('message', text);
// }

setCallback((event,text)=>{
  win.webContents.send('message', `[${event}]:${text}`);
})

function createDefaultWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    kiosk:true,
    autoHideMenuBar: true,
    // webPreferences: {
    //   webSecurity: true
    // }
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
  // protocol.registerFileProtocol('my-magic-protocol', (request, callback) => {
  //   const url = request.url.replace('my-magic-protocol://getMediaFile/', '')
  //   try {
  //     return callback(url)
  //   }
  //   catch (error) {
  //     console.error(error)
  //     return callback(404)
  //   }
  // })
  createDefaultWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});


// setTimeout(()=>{
//   app.relaunch()
//   app.exit()
// },5* 1000)

