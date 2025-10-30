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


function bufferToState(bytes, states) {
  let offset = 0;
  const type = byteFromBuffer(bytes, 0);
  offset += 1;
  const state = intFromBuffer(bytes, offset);
  offset += 2;
  if (type == 0) {
    let value = intFromBuffer(bytes, offset);
    offset += 2;
    states.push({ state: state, type: 0, value: value });
    const packet = bytes.subarray(offset);
    if (packet.length > 0) bufferToState(packet, states);
  }
  if (type == 1) {
    let value = longFromBuffer(bytes, offset);
    offset += 4;
    states.push({ state: state, type: 1, value: value });
    const packet = bytes.subarray(offset);
    if (packet.length > 0) bufferToState(packet, states);
  }
  if (type == 2) {
    let value = doubleFromBuffer(bytes, offset);
    offset += 8;
    states.push({ state: state, type: 2, value: value });
    const packet = bytes.subarray(offset);
    if (packet.length > 0) bufferToState(packet, states);
  }
  if (type == 3) {
    let [value, size] = stringFromBuffer(bytes, offset);
    offset += size + 1;
    states.push({ state: state, type: 3, value: value });
    const packet = bytes.subarray(offset);
    if (packet.length > 0) bufferToState(packet, states);
  }
  if (type == 4) {
    let [value, size] = uuidFromBuffer(bytes, offset);
    offset += 32;
    states.push({ state: state, type: 4, value: value });
    const packet = bytes.subarray(offset);
    if (packet.length > 0) bufferToState(packet, states);
  }
  if (type == 5) {    //char
    let value = oneByteRead(bytes, offset);
    offset += 1;
    states.push({ state: state, type: 5, value: String.fromCharCode(value) });
    const packet = bytes.subarray(offset);
    if (packet.length > 0) bufferToState(packet, states);
  }
  if (type == 6) {    //single uint
    let value = oneByteRead(bytes, offset);
    offset += 1;
    states.push({ state: state, type: 6, value });
    const packet = bytes.subarray(offset);
    if (packet.length > 0) bufferToState(packet, states);
  }
  if (type == 7) {    //single signed int
    let value = oneUByteRead(bytes, offset);
    offset += 1;
    states.push({ state: state, type: 7, value });
    const packet = bytes.subarray(offset);
    if (packet.length > 0) bufferToState(packet, states);
  }
  if (type == 8) {    //single bool
    let value = oneUByteRead(bytes, offset);
    offset += 1;
    states.push({ state: state, type: 8, value: value == 1 });
    const packet = bytes.subarray(offset);
    if (packet.length > 0) bufferToState(packet, states);
  }
}
/*
    reader for checksum function 
*/
function bufferToStatesChk(bytes) {    
    const chk = ubyteFromBuffer(bytes, bytes.length-1);
    bytes = bytes.slice(0, bytes.length - 1);
    const chk_value = checksum(bytes);
    const chk_result = chk== chk_value;
    const t = longFromBuffer(bytes, 0, 4);
    const packet = bytes.subarray(4);
    const states = [];
    bufferToState(packet,states);
    return { t: t, states: states,chkvalue:chk_value,chkresult:chk_result };
}
function bufferToStates(bytes) {    
    const t = longFromBuffer(bytes, 0, 4);
    const packet = bytes.subarray(4);
    const states = [];
    bufferToState(packet,states);
    return { t: t, states: states};
}
function bufferToChunks(bytes) {    
    let len = 0;
    let offset = 0;
    let chunkArray = []
    const checksumValue = ubyteFromBuffer(bytes, 0)
    const mainPacket = bytes.subarray(1);
    const checksumTest = checksum(mainPacket);
    if (checksumTest != checksumValue) { console.log("fail checksum"); ;return []};
    while(offset+1 < mainPacket.length){
        len = intFromBuffer(mainPacket, offset);
        const packet = mainPacket.subarray(offset+2,offset+len+2);
        const data = bufferToStates(packet);
        offset += len+2;
        chunkArray.push(data);
    }
    return chunkArray;
}
function bufferToChunksChk(bytes) {    
    let len = 0;
    let offset = 0;
    let chunkArray = []
    const checksumValue = ubyteFromBuffer(bytes, 0)
    const mainPacket = bytes.subarray(1);
    const checksumTest = checksum(mainPacket);
    if (checksumTest != checksumValue) { console.log("fail checksum"); ;return []};
    while(offset+1 < mainPacket.length){
        len = intFromBuffer(mainPacket, offset);
        const packet = mainPacket.subarray(offset+2,offset+len+2);
        const data = bufferToStatesChk(packet);
        offset += len+2;
        chunkArray.push(data);
    }
    return chunkArray;
}

module.exports = {bufferToState,bufferToChunks,bufferToChunksChk,bufferToStates};