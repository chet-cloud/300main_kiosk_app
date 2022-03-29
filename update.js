const log = require('electron-log');
const { autoUpdater } = require("electron-updater");



//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let callback =()=>{}

autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
    callback('checking-for-update','Checking for update...')
})
autoUpdater.on('update-available', (info) => {
    log.info('Update available.');
    callback('update-available','Update available.');
})
autoUpdater.on('update-not-available', (info) => {
    log.info('Update not available.');
    callback('update-not-available','Update not available.');
})
autoUpdater.on('error', (err) => {
    log.info('Error in auto-updater. ' + err);
    callback('error','Error in auto-updater. ' + err);
})
let isDownloading = null;
autoUpdater.on('download-progress', (progressObj) => {
    isDownloading = new Date().getTime();
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    log.info(log_message);
    callback('download-progress',log_message);
})
autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded');
    callback('update-downloaded','Update downloaded');
    autoUpdater.quitAndInstall();
});

setInterval(() => {
    if(isDownloading ===null){
        autoUpdater.checkForUpdates()
    }else if(new Date().getTime() - isDownloading > 2* 60 * 1000){
        autoUpdater.checkForUpdates()
    }
    //autoUpdater.checkForUpdatesAndNotify();
}, 5000)

exports.setCallback =  function(fn){
    callback = fn
}



  //-------------------------------------------------------------------
// Auto updates - Option 2 - More control
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
// app.on('ready', function()  {
//   autoUpdater.checkForUpdates();
// });
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (info) => {
// })
// autoUpdater.on('update-not-available', (info) => {
// })
// autoUpdater.on('error', (err) => {
// })
// autoUpdater.on('download-progress', (progressObj) => {
// })
// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall();  
// })