const glob = require("glob");
const config = require("./config.json");
const fs = require('fs');
const path = require('path');
const pkgJSON = require('../package.json');
const exec = require('child_process').exec;

var myArgs = process.argv.slice(2);

pkgJSON.version = myArgs[0];

console.log('version' + myArgs[0])

fs.writeFileSync('./package.json', JSON.stringify(pkgJSON));

config.copyFilesForPack.forEach((e, i) => {
    glob(e, {}, function (er, files) {
        files.forEach((v, idx) => {
            if (fs.existsSync(v) && fs.lstatSync(v).isDirectory() !== true) {
                const des = v.split('/').slice(1).join('/');
                const curPath = path.resolve('output/' + des);
                console.log('Copying File from ' + v + ' to > ' + curPath)
                ensureDirectoryExistence(curPath);
                fs.copyFileSync(v, 'output/' + des);
            }
        });
    });
});

const version = pkgJSON.version;
const packageName = pkgJSON.name.replace('\\',"\\\\");
// exec('cd ./output')
exec('npm pack ./output ', (e) => {
    console.log(e);
    const fileName = `${packageName}-${pkgJSON.version}.tgz`;
    const pkgPath = path.resolve('./' + fileName);
    if (!fs.existsSync('./package')) {
        fs.mkdirSync('./package');
        console.log('package folder created!')
    }
    if (fs.existsSync(pkgPath)) {
        fs.copyFileSync(pkgPath, './package/' + fileName);
        console.log('------------------------------------------------------------')
        console.log('Your package is created!' + fileName + '.tgz')
    }
});



// exec('cd ..')

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}