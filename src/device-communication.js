import { SerialPort } from 'serialport';
import { ipcMain }  from 'electron' ;

let serialPort;
let mainWindow;

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
        mainWindow.webContents.send('serial-error', err.message);
    });
}

function processRecievedData(data) {
    console.log('Processing data:', data);
    try{
        const parsedData = JSON.parse(data);
        console.log('Parsed data:', parsedData);
        if(parsedData.type === 'video-feed') {
            mainWindow.webContents.send('video-feed', parsedData.data);
        } else if(parsedData.type === 'ai-result') {
            if(parsedData.data === 'owner') {
                mainWindow.webContents.send('open-door', parsedData.data);
            } else {
                mainWindow.webContents.send('ai-result', parsedData.data);
            }
        }
    } catch (error) {
        console.error('Error processing data:', error);
    }
}


ipcMain.on('connect-serial', (event, port) => {
    connectSerial(port);
});

function initializeDeviceCommunication(win) {
    mainWindow = win;
};

export { connectSerial };
export { initializeDeviceCommunication };
