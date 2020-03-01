const fs = require('fs');

var myArgs = process.argv.slice(2);

fs.writeFileSync('.npmrc','//npm.pkg.github.com/:_authToken='+myArgs[0]);

