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
function stringToBuffer(str, maxsize) {
	if (str.length > maxsize) {
		const buffer = Buffer.alloc(maxsize);
		buffer.write(str, 0, 'utf8');
		return buffer;
	} else {
		const buffer = Buffer.alloc(str.length);
		buffer.write(str.slice(0, maxsize), 0, 'utf8');
		return buffer;
	}
}
function uuidToBuffer(str, maxsize) {
	const buffer = Buffer.alloc(32);
	const uuid = str.replaceAll("-", "");
	if (uuid.length != 32)
		return buffer;
	buffer.write(uuid, 0, 'utf8');
	return buffer;
}
function oneByte(data) {
	const buffer = Buffer.alloc(1);
	buffer.writeInt8(data, 0);
	return buffer;
}
function toByte(data) {
	const array = [];
	//let buf_t = bigIntToBuffer(data.t);
	let buf_t = longToBuffer(data.t);
	let buf_state = intToBuffer(data.state);
	let buf_value = doubleToBuffer(data.value);

	return Buffer.concat([buf_t, buf_state, buf_state, buf_value]);
}
function checksumByte (data){	
    let checksum = 0;
    for (let i = 0; i < data.length; i++) {
        checksum += data[i];
    }
    return oneByte(checksum % 256);
}
function stateToBuffer(data) {
	let buf_type = oneByte(data.type);
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
}
function dataToByte(data) {
	const buf_t = longToBuffer(data.t);
	let buf_acc = Buffer.concat([buf_t]);
	data.states.forEach(state => {
		const buf_state = stateToBuffer(state);
		buf_acc = Buffer.concat([buf_acc, buf_state]);
	});
	return buf_acc;
}
function trackToByte(data) {
	const buf_t = longToBuffer(data.t);
	const buf_lat = doubleToBuffer(data.lat);
	const buf_lon = doubleToBuffer(data.lon);
	const buf_bat = oneByte(data.bat);
	const buf_acc = oneByte(data.acc);
	const buf_stp = oneByte(data.stp);
	return Buffer.concat([buf_t, buf_lat, buf_lon, buf_bat, buf_acc, buf_stp]);
}
function dataToChunk(dataArray) {
	let mainStream = Buffer.alloc(0);
	dataArray.forEach(d => {
		const buf_state = dataToByte(d);
		mainStream = Buffer.concat([mainStream, intToBuffer(buf_state.length), buf_state]);
	});
	return Buffer.concat([checksumByte(mainStream),mainStream]);
}
function tracksToChunk(dataArray) {
	let mainStream = Buffer.alloc(0);	
	dataArray.forEach(d => {
		const buf_state = trackToByte(d);
		mainStream = Buffer.concat([mainStream, buf_state]);
	});
	return Buffer.concat([checksumByte(mainStream),mainStream]);
}


module.exports = {dataToChunk,tracksToChunk};
/*
let data = {
	t: 1754080932,
	states: [  //0=int 1=long 2=double 3=string(200) 4=uuid
		{ state: 54, type: 0, value: 6 },
		{ state: 25, type: 1, value: 1566666666 },
		{ state: 23, type: 2, value: -16.093523243432 },
		{ state: 17, type: 3, size: 16, value: "prueba de cadena" },
		{ state: 26, type: 4, value: "4e621daf-6352-4d00-a898-ca8fc8b6cc52" },
	],
	len: 0xFFFF,
}
let data2 = {
	t: 1754080932,
	states: [  //0=int 1=long 2=double 3=string(200) 4=uuid
		{ state: 54, type: 0, value: 2 },
		{ state: 25, type: 1, value: 1666666666 },
		{ state: 23, type: 2, value: 68.093523243432 },
		{ state: 17, type: 3, size: 16, value: "prueba de cadena2" },
		{ state: 26, type: 4, value: "ae621daf-6352-4d00-a898-ca8fc8b6cc52" },
	],
	len: 0xFFFF,
}
let dataChunks = [
	data, data2
];
let dataTracks = [{
	t: 1754080932,
	lat: -16.520378333333333,
	lon: -68.21251666666667,
	bat: 100,
	acc: 6,
	stp: 0,
}, {
	t: 1754080933,
	lat: -16.520378333333333,
	lon: -68.21251666666667,
	bat: 100,
	acc: 10,
	stp: 0,
}, {
	t: 1754080934,
	lat: -16.520378333333333,
	lon: -68.21251666666667,
	bat: 100,
	acc: 9,
	stp: 1,
}
];

let dataToWrite = dataToChunk(dataChunks);
let tracksToWrite = tracksToChunk(dataTracks);

console.log(tracksToWrite);
fs.writeFile('output.tracks.bin', tracksToWrite, (err) => {
	//fs.writeFile('output.chunk.bin', dataToWrite, (err) => {
	if (err) throw err;
	console.log('File written successfully!');
});
*/