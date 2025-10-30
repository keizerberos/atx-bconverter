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
  oneByteRead,
  doubleFromBuffer,
  stringFromBuffer,
  uuidFromBuffer,
  checksumByte,
  checksum,
} = require("./byte.tools");

/* writter */
function dataToBuffer(data){
    let buf_type = ubyteToBuffer(data.type);
	let buf_state = intToBuffer(data.state);
	let buf_value = null;
	let buf_len_value = null;
	if (data.type == 0) {
		buf_value = intToBuffer(data.value);
		return Buffer.concat([buf_type, buf_state, buf_value]);
	}
	if (data.type == 1) {
		buf_value = longToBuffer(data.value);
		return Buffer.concat([buf_type, buf_state, buf_value]);
	}
	if (data.type == 2) {
		buf_value = doubleToBuffer(data.value);
		return Buffer.concat([buf_type, buf_state, buf_value]);
	}
	if (data.type == 3) {
		buf_value = stringToBuffer(data.value, 200);
		buf_len_value = oneByte(data.value.length > 200 ? 200 : data.value.length);
		return Buffer.concat([buf_type, buf_state, buf_len_value, buf_value]);
	}
	if (data.type == 4) {
		buf_value = uuidToBuffer(data.value);
		return Buffer.concat([buf_type, buf_state, buf_value]);
	}
    if (data.type == 5){
        const chr = data.value.charCodeAt(0);
        buf_value = ubyteToBuffer(chr);
        return Buffer.concat([buf_type,buf_state,buf_value]);
    }
    if (data.type == 6){
        buf_value = ubyteToBuffer(data.value);
        return Buffer.concat([buf_type,buf_state,buf_value]);
    }
    if (data.type == 7){
        buf_value = byteToBuffer(data.value);
        return Buffer.concat([buf_type,buf_state,buf_value]);
    }
    if (data.type == 8){
        buf_value = byteToBuffer(data.value?1:0);
        return Buffer.concat([buf_type,buf_state,buf_value]);
    }
}

/*
    with checksum
*/
function stateToBufferChk(data){
  let buf_t     = longToBuffer(data.t);
  let buf_acc   = Buffer.concat([buf_t]);
  data.states.forEach(state => {
    let buf_state = dataToBuffer(state);
    buf_acc = Buffer.concat([buf_acc, buf_state]);
  });
  const chk_value = checksum(buf_acc);
  buf_checksum = ubyteToBuffer(chk_value); 
  data.checksum = chk_value;
  return Buffer.concat([buf_acc,buf_checksum]);
}


function stateToBuffer(data){
  let buf_t     = longToBuffer(data.t);
  let buf_acc   = Buffer.concat([buf_t]);
  data.states.forEach(state => {
    let buf_state = dataToBuffer(state);
    buf_acc = Buffer.concat([buf_acc, buf_state]);
  });
  return Buffer.concat([buf_acc]);
}

function statesToBuffer(dataArray) {
    let mainStream = Buffer.alloc(0);
    dataArray.forEach(d => {
        const buf_data = stateToBuffer(d);
        console.log("intToBuffer(buf_data.length)",intToBuffer(buf_data.length));
        mainStream = Buffer.concat([mainStream, intToBuffer(buf_data.length), buf_data]);
    });
    console.log("checksumByte(mainStream)",checksumByte(mainStream));
    return Buffer.concat([checksumByte(mainStream),mainStream]);
}



module.exports = {stateToBuffer, statesToBuffer,stateToBufferChk};