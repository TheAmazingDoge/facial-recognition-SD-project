const { SerialPort } = require('serialport');
const { ipcMain } = require('electron');
const { noble } = require('noble');

let serialPort;

//Serial Connection (USB)
function connectSerial(port) {
    serialPort = new SerialPort({ path: port, baudRate: 9600 });

    serialPort.on('open', () => {
        console.log('Serial Port Opened');
    });

    serialPort.on('data', (data) => {
        console.log('Data received:', data.toString());

        // Send data to renderer process
        mainWindow.webContents.send('serial-data', data.toString());
    });

    serialPort.on('error', (err) => {
        console.error('Serial Port Error:', err.message);
    });
}

ipcMain.on('connect-serial', (event, port) => {
    connectSerial(port);
});

//Bluetooth Connection

noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', (peripheral) => {
    console.log('Discovered:', peripheral.advertisement.localName);

    // Send discovered device to renderer process
    mainWindow.webContents.send('bluetooth-discovered', peripheral.advertisement.localName);
});

ipcMain.on('start-bluetooth-scan', () => {
    noble.startScanning();
});

ipcMain.on('stop-bluetooth-scan', () => {
    noble.stopScanning();
});

module.exports = { connectSerial };
