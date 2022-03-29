
const electron = require('electron'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;
const Store = require('electron-store');
const http = require('http'); // or 'https' for https:// URLs
var fs = require("fs");
const request = require('request');
var yauzl = require("yauzl");
const ipc = require('electron').ipcMain;
const unzipper = require('unzipper');
const mkdirp = require('mkdirp'); 
const store = new Store();
// let url = "https://test.rdc-web.gr/hellloooo.zip";

let dir = "./downloads"
let dirPath = "./downloads/test.zip"; 
let url ="http://demo.rdc-web.gr/media/test/class.zip"
let percentage = 0



let testData = [{id:0,className:"name",pathToClass:"./downloads"},{id:2,className:"name",pathToClass:"./downloads"},]

store.set('test', testData);
console.log(store.get('test'));

ipc.on('unZip', (event, args) => {
  fs.createReadStream('./assets/classes/zippedClass.zip')
  .pipe(unzipper.Extract({ path: './downloads' }));
});





const getInstallerFile = (installerfileURL,installerfilename) => {

  // Variable to save downloading progress
  var received_bytes = 0;
  var total_bytes = 0;

  var outStream = fs.createWriteStream(installerfilename);
  
  request
      .get(installerfileURL)
          .on('error', function(err) {
              console.log(err);
          })
          .on('response', function(data) {
              total_bytes = parseInt(data.headers['content-length']);
              console.log("download has started")

          })
          .on('data', function(chunk) {
              received_bytes += chunk.length;
              showDownloadingProgress(received_bytes, total_bytes);
          })
          .pipe(outStream);
};

function showDownloadingProgress(received, total) {
  percentage = ((received * 100) / total).toFixed(2);
  console.log(percentage + "% | " + received + " bytes downloaded out of " + total + " bytes.");

}


function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1920,
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

ipc.on('synMessage', (event, args) => {
  console.log(args);
  event.returnValue = ' Sync message Reply Download is at' + percentage+"%";
})

ipc.on('aSynMessage', (event, args) => {
  console.log(args);
  event.sender.send('asynReply', 'Main said: Async message received')
})


ipc.on('downloadZip', (event, args) => {

  // downloadZip();
  getInstallerFile(url,dirPath);
  event.sender.send('downloadReply', 'Main said: Async DownloadStarted')
})

ipc.on('downloadClass', (event, args) => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    console.log("dir created")
}

  let tempData = store.get('classesData')
  if (!tempData) tempData = []
  tempData.push({id: tempData.length + 1, title:"A title"})
  store.set('classesData',tempData)
  // getInstallerFile(url,dirPath);
  console.log(store.get('classesData'))
  event.sender.send('downloadReply', 'Download has Started')
})

