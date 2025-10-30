const {
  longToBuffer,
  doubleToBuffer,
  intToBuffer,
  stringToBuffer,
  uuidToBuffer,
  oneByte,
  ubyteToBuffer,
  byteToBuffer,
  longFromBuffer,
  intFromBuffer,
  ubyteFromBuffer,
  byteFromBuffer,
  oneByteRead,
  oneUByteRead,
  doubleFromBuffer,
  stringFromBuffer,
  uuidFromBuffer,
  checksumByte,
  checksum,
} = require("./byte.tools");

function bufferToTrack(bytes) {
	const buf_t     = longFromBuffer(bytes,0,4);
	const buf_lat   = doubleFromBuffer(bytes,4,12);
	const buf_lon   = doubleFromBuffer(bytes,12,20);
	const buf_bat   = oneByteRead(bytes,20);
	const buf_acc   = oneByteRead(bytes,21);
	const buf_stp   = oneByteRead(bytes,22);
    return { t:buf_t,lat:buf_lat,lon:buf_lon,bat:buf_bat,acc:buf_acc,stp:buf_stp };
}
function bufferToTracks(bytes) {    
  let len = 0;
  let offset = 0;
  let chunkArray = [];	
  const checksumValue = oneByteRead(bytes,0);
  const mainPacket = bytes.subarray(1);
  const checksumTest = checksum(mainPacket);
  if (checksumTest!=checksumValue) { console.log("fail checksum"); return []};
  while(offset+1 < mainPacket.length){
    const packet = mainPacket.subarray(offset,offset+23);
    const data = bufferToTrack(packet);
    offset += 23;
    chunkArray.push(data);
  }
  return chunkArray;
}

module.exports = {bufferToTrack,bufferToTracks};