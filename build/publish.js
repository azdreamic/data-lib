const fs = require('fs');


var myArgs = process.argv.slice(2);

fs.writeFileSync('.npmrc', '//registry.npmjs.org/:_authToken=' + myArgs[0]);

