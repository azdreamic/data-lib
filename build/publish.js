const fs = require('fs');
const exec = require('child_process').exec;
const pkgJSON = require('../package.json');


const myArgs = process.argv.slice(2);

console.log('Writing registry...')

fs.writeFileSync('.npmrc', '//registry.npmjs.org/:_authToken=' + myArgs[0]);

const version = myArgs[1].replace('v', '');
const packageName = 'azdreamic-data-lib';
const fileName = `${packageName}-${version}.tgz`;

console.log('Publishing started...');

exec('npm publish ./' + fileName, (e) => {
    console.log('Publishing Result...');
    console.log(e);
});
