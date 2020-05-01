import {Injectable} from '@angular/core';

import {ipcRenderer, remote, webFrame, screen, BrowserWindow, BrowserWindowConstructorOptions} from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  screen: typeof screen;

  childProcess: typeof childProcess;
  fs: typeof fs;
  url: typeof url;
  path: typeof path;
  serve: boolean;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.screen = remote.screen;

      this.serve = window.location.href.startsWith('http://');

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.url = window.require('url');
      this.path = window.require('path');
    }
  }

  openNewWindow(urlToLoad: string, options?: BrowserWindowConstructorOptions): BrowserWindow {
    options = Object.assign({
      title: "Timy",
      show: false,
      hasShadow: false,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: (this.serve),
      }
    }, options);

    const win = new this.remote.BrowserWindow(options);

    if (this.serve) {
      win.loadURL('http://localhost:4200/#/'+urlToLoad);
    } else {
      const currentUrl = url.parse(this.remote.getCurrentWebContents().getURL());
      win.loadURL(url.format(Object.assign(currentUrl,{
        hash: urlToLoad
      })));
      win.removeMenu();
    }
    win.once('ready-to-show', () => {
      win.show()
    })

    return win;
  }
}
