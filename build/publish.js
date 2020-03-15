const fs = require('fs');
const exec = require('child_process').exec;
const pkgJSON = require('../package.json');


var myArgs = process.argv.slice(2);

fs.writeFileSync('.npmrc', '//registry.npmjs.org/:_authToken=' + myArgs[0]);

const fileName = `${pkgJSON.name}-${pkgJSON.version}.tgz`;

console.log(fileName);

exec('npm publish ./' + fileName, (e) => {
    console.log(e);
    // const pkgPath = path.resolve('./' + fileName);
    // if (!fs.existsSync('./package')) {
    //     fs.mkdirSync('./package');
    //     console.log('package folder created!')
    // }
    // if (fs.existsSync(pkgPath)) {
    //     fs.copyFileSync(pkgPath, './package/' + fileName);
    //     console.log('------------------------------------------------------------')
    //     console.log('Your package is created!' + fileName + '.tgz')
    // }
});
