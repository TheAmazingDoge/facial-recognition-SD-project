import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.on("ready", () => {
  const mainWindow = new BrowserWindow();
  mainWindow.loadFile(join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();
});