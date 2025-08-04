const fs = require('fs');


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
function stringToBuffer(str,maxsize){
  if (str.length>maxsize){
    const buffer = Buffer.alloc(maxsize);
    buffer.write(str, 0, 'utf8'); 
    return buffer;
  }else{
    const buffer = Buffer.alloc(str.length);
    buffer.write(str.slice(0,maxsize), 0, 'utf8'); 
    return buffer;
  } 
}
function uuidToBuffer(str,maxsize){
    const buffer = Buffer.alloc(32);
    const uuid = str.replaceAll("-","");
    if (uuid.length !=32)
      return buffer;
    buffer.write(uuid, 0, 'utf8'); 
    return buffer;
}
function oneByte(data){
  const buffer = Buffer.alloc(1);
   buffer.writeUInt8(data,0); 
   return buffer;
}
function toByte(data) {
  const array = [];
  //let buf_t = bigIntToBuffer(data.t);
  let buf_t     = longToBuffer(data.t);
  let buf_state = intToBuffer(data.state);
  let buf_value = doubleToBuffer(data.value);

  console.log(buf_t);
  console.log(buf_state);
  console.log(buf_value);

  return Buffer.concat([buf_t, buf_state, buf_state, buf_value]);
}
function stateToBuffer(data){
  let buf_type      = oneByte(data.type);
  let buf_state     = intToBuffer(data.state);
  let buf_value     = null;
  let buf_len_value = null;
  if(data.type==0){
    buf_value = intToBuffer(data.value);
    return Buffer.concat([buf_type,buf_state,buf_value]);
  }
  if(data.type==1){
    buf_value = longToBuffer(data.value);
    return Buffer.concat([buf_type,buf_state,buf_value]);
  }
  if(data.type==2){
    buf_value = doubleToBuffer(data.value);
    return Buffer.concat([buf_type,buf_state,buf_value]);
  }
  if(data.type==3){
    buf_value = stringToBuffer(data.value,200);
    buf_len_value = oneByte(data.value.length>200?200:data.value.length);
    return Buffer.concat([buf_type,buf_state,buf_len_value,buf_value]);
  }
  if(data.type==4){
    buf_value = uuidToBuffer(data.value);
    return Buffer.concat([buf_type,buf_state,buf_value]);
  }
}
function dataToByte(data){
  let buf_t     = longToBuffer(data.t);
  let buf_acc   = Buffer.concat([buf_t]);
  data.states.forEach(state => {
    let buf_state = stateToBuffer(state);
    buf_acc = Buffer.concat([buf_acc, buf_state]);
  });
  /*buf_len = intToBuffer(buf_acc.length); 
  return Buffer.concat([buf_len,buf_acc]);*/
  return buf_acc;
}
module.exports = {dataToByte};
