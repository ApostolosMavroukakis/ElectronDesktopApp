const electron = require('electron'),
app = electron.app,
BrowserWindow = electron.BrowserWindow;

const http = require('http'); // or 'https' for https:// URLs
var fs = require("fs");
var stream;
const request = require('request');
const progress = require('request-progress');





const TIMEOUT = 5000; //5sec
const { DownloaderHelper } = require('node-downloader-helper');
let url = "https://test.rdc-web.gr/hellloooo.zip";
let dirPath ="./downloads";
// const dl = new DownloaderHelper(url, dirPath);
// dl.on('start', () => startTime = new Date())
//    .on('error', (error) => { 
//               const endTime = new Date();
//               // probably you can check the error.status value
//               if (endTime  - startTime >= TIMEOUT){
//                dl.resume(); 
//                console.log('Download Retry');
//               }
//     })
//     .on('end', () => console.log('Download Completed'))
//     .on('progress',state  => 
//         console.log(state)
//         )

    
//     .start();





// progress(request(url), {
 
// })
//   .on('progress', function (state) {

//     console.log('progress', state);
// })
// .on('error', function (err) {
//     console.log('Something went wrong');
// })
//   .on('close', function () {
//     console.log('File written!');
//   })

//   .pipe(fs.createWriteStream('./downloads/papatest.jpg'));





function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width:1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,

        }
    });
    // and load the index.html of the app.
    win.loadFile("./src/index.html");
}
app.on("ready", createWindow);



const ipc = require('electron').ipcMain;
ipc.on('synMessage', (event, args) => {
 console.log(args);
 event.returnValue = 'Main said I received your Sync message';
})

ipc.on('aSynMessage', (event, args) => {
 console.log(args);
 event.sender.send('asynReply','Main said: Async message received')
})