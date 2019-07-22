import { BrowserWindow } from "electron"
import { JupyterServer } from "./server"

export class Workspace {

  window = null;
  server = null;

  start (directory=null, path=null) {
    let self = this;

    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false
      }
    });

    // Emitted when the window is closed.
    this.window.on("closed", function () {
      self.stop();
    });

    if (this.server != null) {
      this.server.stop();
      this.server = null;
    }
    this.server = new JupyterServer();
    this.server.start(this, directory, path);
  }

  stop () {
    this.window = null;
    if (this.server != null) {
      this.server.stop();
      this.server = null;
    }
  }

}