const fs = require('fs');

let data = fs.readFileSync("output.bin");

const firstBytes = data.subarray(0,4);

const buf = Buffer.from(firstBytes);
console.log(data);
console.log(firstBytes);
console.log(buf.readInt32BE(0));
