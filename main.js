const { app, BrowserWindow } = require('electron');
// include the Node.js 'path' module at the top of your file
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
        // preload: path.join(__dirname, 'preload.js')
        },
        show: false
    })

    win.loadFile('index.html')
    win.maximize();
    win.show();
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})