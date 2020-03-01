const fs = require('fs');

const file = fs.readFileSync('.npmrc');

console.log(file.toString());
