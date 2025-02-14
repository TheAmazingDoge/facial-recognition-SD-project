import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { initializeDeviceCommunication } from "./src/device-communication.js";
import "./src/device-communication.js";

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
    },
  });

  mainWindow.loadFile(join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();

  // Initialize device communication
  initializeDeviceCommunication(mainWindow);
});