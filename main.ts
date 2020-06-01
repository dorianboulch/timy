import {app, BrowserWindow, protocol, screen} from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as os from 'os';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
    serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  // Create the browser window.
  const mostOnTheRightScreen = screen.getAllDisplays().reduce((previousDisplay, currentDisplay) => {
    return previousDisplay.workArea.x > currentDisplay.workArea.x ? previousDisplay : currentDisplay;
  });
  let workArea = mostOnTheRightScreen.workArea;
  const windowWidth = workArea.width / 4;
  const windowHeight = workArea.height;

  win = new BrowserWindow({
    x: workArea.x + workArea.width - windowWidth,
    y: 0,
    width: windowWidth,
    height: windowHeight,
    minWidth: 300,
    minHeight: 300,
    hasShadow: false,
    title: "Timy",
    show: false,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
    },
  });

  // fix windows window size
  if(os.platform() === 'win32'){
    win.setBounds({
      width: windowWidth+8,
      height: windowHeight+8,
    });
  }

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    // win.webContents.openDevTools();
  }else{
    win.removeMenu();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  win.once('ready-to-show', () => {
    win.show()
  })

  return win;
}

try {
  if(!serve){
    protocol.registerSchemesAsPrivileged([
      { scheme: 'file:', privileges: { standard: true, secure: true } }
    ])
  }

  app.allowRendererProcessReuse = true;

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
