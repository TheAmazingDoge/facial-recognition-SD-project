const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
  signin: (credentials) => ipcRenderer.invoke('signin', credentials),
  addUser: (credentials) => ipcRenderer.invoke('addUser', credentials),
});