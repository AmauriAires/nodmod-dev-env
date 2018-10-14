const kill = require('kill-port')
const port = 3000;
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var chokidar = require('chokidar');
var watcher = chokidar.watch('./modules_in_development', {ignored: [/.git/], persistent: true});

async function startReact() {
  await exec('yarn start').catch(err => {});
}

kill(port)
.then(startReact())
.catch(err => {

})

async function restartOnChange(){
  console.log('Compiling module: XSXSDAS');
  console.log('Copying module: XSXSDAS to node_modules');
  kill(port)
      .then(startReact())
      .catch(err => {

      })
}

watcher
  .on('add', function(path) {
    restartOnChange().catch();
    console.log('File', path, 'has been added');
  })
  .on('change', function(path) {
    restartOnChange().catch();
    console.log('File', path, 'has been changed');
  })
  .on('unlink', function(path) {
    restartOnChange().catch();
    console.log('File', path, 'has been removed');
  })
  .on('error', function(error) {
    restartOnChange().catch();
    console.error('Error happened', error);
  })
