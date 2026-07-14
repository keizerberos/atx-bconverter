

const { bytesToState, bytesToStates, stateToBytes, statesToBytes,statesToBytesUncheck } = require('./byte.states.js');
const { trackToBytes, tracksToBytes, bytesToTrack, bytesToTracks } = require('./byte.tracks.js');
const fs = require("fs");
let data1x = {
	t: 1754080932,
	states: [  //0=int 1=long 2=double 3=string(200) 4=uuid 5=char 6=ubyte 7=byte 8=boolean(1=true)
		{ state: 54, type: 0, value: "dfs" },
		{ state: 25, type: 1, value: "1566666666" },
		{ state: 23, type: 2, value: "ds" },
		{ state: 76, type: 3, size: 16, value: "dsad" },
		{ state: 26, type: 4, value: "4e621daf-6352-4d00-a898-ca8fc8b6cc52" },
		{ state: 1325, type: 5, value: 'x' },
		{ state: 1025, type: 6, value: 500 },
		{ state: 12025, type: 7, value: 854 },
		{ state: 725, type: 8, value: true },
	],
}
let data1 = {
	t: 1754080932,
	states: [  //0=int 1=long 2=double 3=string(200) 4=uuid 5=char 6=ubyte 7=byte 8=boolean(1=true)
		{ state: 54, type: 0, value: -6 },
		{ state: 25, type: 1, value: 1566666666 },
		{ state: 23, type: 2, value: "-16.09" },
		{ state: 76, type: 3, size: 16, value: "prueba de cadena" },
		{ state: 26, type: 4, value: "4e621daf-6352-4d00-a898-ca8fc8b6cc52" },
		{ state: 1325, type: 5, value: 'xx' },
		{ state: 1025, type: 6, value: 200 },
		{ state: 12025, type: 7, value: -100 },
		{ state: 725, type: 8, value: true },
	],
}

let data2 = {
	t: 1754080932,
	states: [
		{ state: 54, type: 0, value: "2" },
		{ state: 25, type: 1, value: 1666666666 },
		{ state: 23, type: 2, value: 68.093523243432 },
		{ state: 17, type: 3, size: 16, value: "prueba de cadena2" },
		{ state: 26, type: 4, value: "ae621daf-6352-4d00-a898-ca8fc8b6cc52" },
	],
}

//const bytes = statesToBytes([data1]); fs.writeFile('file.bin', bytes, (err) => {	if (err) throw err;	console.log('File written successfully!'); });
//console.log("data",data1);
const filedata = fs.readFileSync("file.bin"); const stateData = bytesToStates(filedata); console.log("stateData", JSON.stringify(stateData,null,2));

//console.log(Number("-13.06") || 0.0);