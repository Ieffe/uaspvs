const electron = require('electron');
const uuid = require("uuid").v4;
const {
    app,
    BrowserWindow,
    ipcMain
} = electron;

let mainWindow;
let editWindow;

app.allowRendererProcessReuse = false;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: 'Memo by Ieffe'
    });

    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on("closed", () => {
        app.quit();
        mainWindow = null;
    });
})
