/* writer */
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
  const buffer = Buffer.alloc(2);
  buffer.writeInt16BE(value, 0);
  return buffer;
}
function stringToBuffer(str, maxsize) {
  if (str.length > maxsize) {
    const buffer = Buffer.alloc(maxsize);
    buffer.write(str, 0, "utf8");
    return buffer;
  } else {
    const buffer = Buffer.alloc(str.length);
    buffer.write(str.slice(0, maxsize), 0, "utf8");
    return buffer;
  }
}
function uuidToBuffer(str, maxsize) {
  const buffer = Buffer.alloc(32);
  const uuid = str.replaceAll("-", "");
  if (uuid.length != 32) return buffer;
  buffer.write(uuid, 0, "utf8");
  return buffer;
}
function ubyteToBuffer(data){
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(data,0); 
  return buffer;
}
function byteToBuffer(data){
  const buffer = Buffer.alloc(1);
  buffer.writeInt8(data,0); 
  return buffer;
}
function oneByte(data){
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(data,0); 
  return buffer;
}
function oneUByte(data){
  const buffer = Buffer.alloc(1);
   buffer.writeInt8(data,0); 
   return buffer;
}

/* reader */

function longFromBuffer(buffer, from, to) {
    const buf = Buffer.from(buffer.subarray(from, to));
    return buf.readInt32BE(0);
}
function byteFromBuffer(buffer, pos) {
     const buf = Buffer.from(buffer.subarray(pos, pos + 1));
    return buf.readInt8(0);
}
function ubyteFromBuffer(buffer, pos) {
     const buf = Buffer.from(buffer.subarray(pos, pos + 1));
    return buf.readUInt8(0);
}
function oneUByteRead(buffer, pos) {
    const buf = Buffer.from(buffer.subarray(pos, pos + 1));
    return buf.readUInt8(0);
}
function oneByteRead(buffer, pos) {
    const buf = Buffer.from(buffer.subarray(pos, pos + 1));
    return buf.readInt8(0);
}
function doubleFromBuffer(buffer,pos) {
    const buf = Buffer.from(buffer.subarray(pos, pos+8));
    return buf.readDoubleBE(0);
}
function intFromBuffer(buffer, pos) {
    const buf = Buffer.from(buffer.subarray(pos, pos+2));
    return buf.readInt16BE(0);
}
function stringFromBuffer(buffer, pos) {
    const size = ubyteFromBuffer(buffer,pos);
    const bufferStr = buffer.subarray(pos+1,pos+1+size);
    return [bufferStr.toString(),size];
}
function uuidFromBuffer(buffer, pos) {
    const bufferStr = buffer.subarray(pos,pos+32);
	const uuid = bufferStr.toString();
    return [uuid.substring(0, 8)+'-'+uuid.substring(8, 12)+'-'+uuid.substring(12, 16)+'-'+uuid.substring(16, 32),32];
}
//const checksum = (data) => ((data.reduce((a,v,i)=>a+data[i],0))%256);

function checksumByte(data) {
  let checksum = 0;
  for (let i = 0; i < data.length; i++) {
    checksum += data[i];
  }
  return ubyteToBuffer(checksum % 256);
}
function checksum(data) {
  let checksum = 0;
  for (let i = 0; i < data.length; i++) {
    checksum += data[i];
  }
  return checksum % 256;
}

module.exports = {
  longToBuffer,
  doubleToBuffer,
  intToBuffer,
  stringToBuffer,
  uuidToBuffer,
  oneByte,
  ubyteToBuffer,
  byteToBuffer,
  longFromBuffer,
  oneUByteRead,
  oneByteRead,
  ubyteFromBuffer,
  byteFromBuffer,
  intFromBuffer,
  doubleFromBuffer,
  stringFromBuffer,
  uuidFromBuffer,
  checksumByte,
  checksum
}