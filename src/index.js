const { app, BrowserWindow } = require("electron");
const http = require('http'); // or 'https' for https:// URLs
var fs = require("fs");
var stream;
const request = require('request');
const progress = require('request-progress');



// progress(request('https://speed.hetzner.de/10GB.bin'), {
 
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

//   .pipe(fs.createWriteStream('./downloads/1gb.zip'));





function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width:1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    win.loadFile("./src/index.html");
}
app.on("ready", createWindow);
