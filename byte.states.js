const { stateToBuffer, statesToBuffer } = require("./byte.writer.state");
//const {trackToBuffer, tracksToBuffer} = require('./byte.writer.track');
const {
  bufferToState,
  bufferToStates,
  bufferToChunks,
} = require("./byte.reader.state");
/**
 * Returns the object array of states like.
 * ```json
 * [{
 *   t: 1754080932,
 *   states:[  //0=int 1=long 2=double 3=string(200) 4=uuid 5=char 6=ubyte 7=byte 8=boolean(1=true)
 *     {state: 54,type: 0, value: -6},
 *     {state: 25,type: 1, value: 1566666666},
 *     {state: 23,type: 2, value: -16.093523243432},
 *     {state: 76,type: 3, size: 16, value: "prueba de cadena"},
 *     {state: 26,type: 4, value: "4e621daf-6352-4d00-a898-ca8fc8b6cc52"},
 *     {state: 1325,type: 5, value: 'x'},
 *     {state: 1025,type: 6, value: 200},
 *     {state: 12025,type: 7, value: -100},
 *     {state: 725,type: 8, value: true},
 *   ],
 * }]
 * ```
 * example:
 *
 * ```js
 * const filedata = fs.readFileSync("file.bin");
 * const stateDataArray = bytesToStates(filedata);
 * ```
 * @since v1.0.0
 * @param bytes binary data
 */
function bytesToStates(bytes) {
  return bufferToChunks(bytes);
}
/**
 * Returns a object of states like.
 * ```json
 * {
 *   t: 1754080932,
 *   states:[  //0=int 1=long 2=double 3=string(200) 4=uuid 5=char 6=ubyte 7=byte 8=boolean(1=true)
 *     {state: 54,type: 0, value: -6},
 *     {state: 25,type: 1, value: 1566666666},
 *     {state: 23,type: 2, value: -16.093523243432},
 *     {state: 76,type: 3, size: 16, value: "prueba de cadena"},
 *     {state: 26,type: 4, value: "4e621daf-6352-4d00-a898-ca8fc8b6cc52"},
 *     {state: 1325,type: 5, value: 'x'},
 *     {state: 1025,type: 6, value: 200},
 *     {state: 12025,type: 7, value: -100},
 *     {state: 725,type: 8, value: true},
 *   ],
 * }
 * ```
 * example:
 *
 * ```js
 * const filedata = fs.readFileSync("file.bin");
 * const stateData = bytesToState(filedata);
 * ```
 * @since v1.0.0
 * @param bytes binary data
 */
function bytesToState(bytes) {
  return bufferToState(bytes);
}
/**
 * return bytes buffer of object of states like.
 * ```js
 * let state = {
 *   t: 1754080932,
 *   states:[  //0=int 1=long 2=double 3=string(200) 4=uuid 5=char 6=ubyte 7=byte 8=boolean(1=true)
 *     {state: 54,type: 0, value: -6},
 *     {state: 25,type: 1, value: 1566666666},
 *     {state: 23,type: 2, value: -16.093523243432},
 *     {state: 76,type: 3, size: 16, value: "prueba de cadena"},
 *     {state: 26,type: 4, value: "4e621daf-6352-4d00-a898-ca8fc8b6cc52"},
 *     {state: 1325,type: 5, value: 'x'},
 *     {state: 1025,type: 6, value: 200},
 *     {state: 12025,type: 7, value: -100},
 *     {state: 725,type: 8, value: true},
 *   ],
 * }
 * ```
 * example:
 *
 * ```js
 * const bytes = stateToBytes(state);
 * fs.writeFile('file.bin', bytes, (err) => {
 *   if (err) throw err;
 *    console.log('File written successfully!');
 * });
 * ```
 * @since v1.0.0
 * @param state object state
 */
function stateToBytes(state) {
  return stateToBuffer(state);
}
/**
 * return bytes buffer of object of array of states like.
 * ```js
 * let data1 = {
 *   t: 1754080932,
 *   states:[  //0=int 1=long 2=double 3=string(200) 4=uuid 5=char 6=ubyte 7=byte 8=boolean(1=true)
 *     {state: 54,type: 0, value: -6},
 *     {state: 25,type: 1, value: 1566666666},
 *     {state: 23,type: 2, value: -16.093523243432},
 *     {state: 76,type: 3, size: 16, value: "prueba de cadena"},
 *     {state: 26,type: 4, value: "4e621daf-6352-4d00-a898-ca8fc8b6cc52"},
 *     {state: 1325,type: 5, value: 'x'},
 *     {state: 1025,type: 6, value: 200},
 *     {state: 12025,type: 7, value: -100},
 *     {state: 725,type: 8, value: true},
 *   ],
 * }
 * 
 * let data2 = {
 *  t: 1754080932,
 * 	states: [
 * 		{ state: 54, type: 0, value: 2 },
 * 		{ state: 25, type: 1, value: 1666666666 },
 * 		{ state: 23, type: 2, value: 68.093523243432 },
 * 		{ state: 17, type: 3, size: 16, value: "prueba de cadena2" },
 * 		{ state: 26, type: 4, value: "ae621daf-6352-4d00-a898-ca8fc8b6cc52" },
 * 	],
 * }
 * ```
 * example:
 *
 * ```js
 * const bytes = statesToBytes([ data1, data2 ]);
 * fs.writeFile('file.bin', bytes, (err) => {
 *   if (err) throw err;
 *    console.log('File written successfully!');
 * });
 * ```
 * @since v1.0.0
 * @param state object state
 */
function statesToBytes(state) {
  return statesToBuffer(state);
}
module.exports = { bytesToState,bytesToStates,stateToBytes,statesToBytes };
