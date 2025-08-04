const fs = require('fs');
let data = {
  t: 1754080931,
  state: 54,
  type: 1,
  size: 33,
  value: -16.093523243432,
}

function joinBuffers(buffers, delimiter = ' ') {
  let d = Buffer.from(delimiter);

  return buffers.reduce((prev, b) => Buffer.concat([prev, d, b]));
}
function int_128_to_bytes(int) {
  const bytesArray = [];
  for (let i = 0; i < 16; i++) {
    let shift = int >> BigInt(8 * i)
    shift &= BigInt(255)
    bytesArray[i] = Number(String(shift))
  }
  return Buffer.from(bytesArray)
}
function bigIntToBuffer(bigInt) {
  const hexString = bigInt.toString(16);
  const padding = hexString.length % 2 == 1 ? "0" : "";
  return Buffer.from(padding + hexString, "hex");
}
function longToBuffer(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeInt32BE(value, 0);
  return buffer;
}
function doubleToBuffer(value) {
  const buffer = Buffer.alloc(8);
  buffer.writeDoubleBE(value, 0);
  return buffer;
}
function intToBuffer(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeInt8(value, 0);
  return buffer;
}
function toByte(data) {
  const array = [];
  //let buf_t = bigIntToBuffer(data.t);
  let buf_t     = longToBuffer(data.t);
  let buf_state = intToBuffer(data.state);
  let buf_value = doubleToBuffer(data.value);

  //buf_t.writeInt32LE(data.t);
  console.log(buf_t);
  console.log(buf_state);
  console.log(buf_value);

  return Buffer.concat([buf_t, buf_state, buf_state, buf_value]);
  //return '';
}

//let buf = Buffer.allocUnsafe(4);  // Init buffer without writing all data to zeros
//buf.writeInt32LE(123456);  // Little endian this time..
//console.log(buf);
/*

Buffer
writeUInt16BE/LE
writeUIntBE/LE
allocUnsafe
 
const fs = require('fs');
const writeStream = fs.createWriteStream('large_output.bin');
writeStream.write(Buffer.from('Chunk 1'));
writeStream.write(Buffer.from('Chunk 2'));
writeStream.end();
*/
let dataToWrite = toByte(data);
console.log(dataToWrite);
fs.writeFile('output.bin', dataToWrite, (err) => {
  if (err) throw err;
  console.log('File written successfully!');
});