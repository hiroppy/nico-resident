'use strict';

const path = require('path');
const menubar = require('menubar');

const opts = {
  dir: __dirname,
  icon: path.join(__dirname, 'Icon.png'),
  width: 600,
  height: 600,
};

global.mb = menubar(opts);

mb.on('ready', function ready() {
  mb.app.on('will-quit', function tryQuit(e) {
    if (canQuit) return true;
      mb.window = undefined
        e.preventDefault();
  })

  mb.app.on('terminate', function terminate(ev) {
    mb.app.quit();
  });

  process.on('uncaughtException', function(err) {
    console.error(`Uncaught Exception: ${err.message} ${err.stack}` || '');
    mb.app.quit();
  });
});

module.exports.quitApp = () => {
  mb.app.quit();
};
