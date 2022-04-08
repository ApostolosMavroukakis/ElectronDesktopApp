// document.getElementById('center').style.backgroundColor= "red"
const ipc = require('electron').ipcRenderer,
    syncBtn = document.querySelector('#syncBtn'),
    downloadClass = document.querySelector('#downloadClass'),
    asyncBtn2 = document.querySelector('#asyncBtn2');

let replyDiv = document.querySelector('#reply');

let loop = false; 

// LOCAL DATA GET

window.onload = (event) => {
    console.log("wtf")
    ipc.send('getLocalData', 'getLocalData')
  };


  ipc.on('getLocalData', (event, args) => {
    console.log("These are the local data ", args)
});
////




downloadClass.addEventListener('click', () => {
    ipc.send('downloadClass', 'Download The class')
});

// asyncBtn2.addEventListener('click', () => {
//     ipc.send('downloadZip', 'Download pig')
// });

// ipc.on('downloadReply', (event, args) => {
//     console.log(args)
//     loop = true;
//     replyDiv.innerHTML = args;

// });

// asyncBtn3.addEventListener('click', () => {
//     ipc.send('unZip', 'Unzip pig')
// });



