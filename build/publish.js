const fs = require('fs');


var myArgs = process.argv.slice(2);

console.log(myArgs[0]);

fs.writeFileSync('.npmrc','//npm.pkg.github.com/@sridharsathasivam/:_authToken='+myArgs[0]);

