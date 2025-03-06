import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { initializeDeviceCommunication } from "./src/device-communication.js";
import "./src/device-communication.js";
import { authenticateUser } from "./src/database.js";
import { addUser } from "./src/database.js";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "src/preload.js"),
      contextIsolation: true,
      enableReomteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();

  ipcMain.handle('signin', async (event, { username, password }) => {
    return new Promise((resolve, reject) => {
      authenticateUser(username, password, (err, success) => {
        if (err) {
          reject({ success: false, message: 'Internal server error' });
        } else if (success) {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'Invalid username or password' });
        }
      });
    });
  });
  ipcMain.handle('addUser', async (event, { username, password }) => {
    return new Promise((resolve, reject) => {
      addUser(username, password, (err, user) => {
        if (err) {
          reject({ success: false, message: 'Internal server error' });
        } else {
          resolve({ success: true, user });
        }
      });
    });
  });
  // Initialize device communication
  initializeDeviceCommunication(mainWindow);
});