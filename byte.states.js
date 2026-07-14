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
function statesToBytes(states) {
	checkStates(states);	
  return statesToBuffer(truncStates(states));
}


function truncType(valor, tipo) {
  switch (tipo) {
    case 0: // int (32-bit signed integer)
      return Math.min(2147483647, Math.max(-2147483648, Math.trunc(Number(valor) || 0)));

    case 1: // long (64-bit signed integer / BigInt)
      const bigNum = Math.trunc(Number(valor) || 0);
      const MAX_LONG = 9223372036854775807n;
      const MIN_LONG = -9223372036854775808n;
      return bigNum > MAX_LONG ? MAX_LONG : (bigNum < MIN_LONG ? MIN_LONG : bigNum);

    case 2: // double (64-bit float)
      return Number(valor) || 0.0;

    case 3: // string(200)
      return String(valor).slice(0, 200);

    case 4: // uuid (36 caracteres estándar)
      const uuidStr = String(valor).trim().toLowerCase();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      return uuidRegex.test(uuidStr) ? uuidStr : "00000000-0000-0000-0000-000000000000";

    case 5: // char (1 solo carácter)
      return String(valor).charAt(0) || '\0';

    case 6: // ubyte (8-bit unsigned integer: 0 a 255)
      return Math.min(255, Math.max(0, Math.trunc(Number(valor) || 0)));

    case 7: // byte (8-bit signed integer: -128 a 127)
      return Math.min(127, Math.max(-128, Math.trunc(Number(valor) || 0)));

    case 8: // boolean
      return Boolean(valor);

    default:
			console.error(`Tipo de dato inválido: ${tipo}`,valor);
			return 0;
      //throw new Error(`Tipo de dato inválido: ${tipo} ${}`);
  }
}
function checkType(valor, tipo) {
  const num = Number(valor);
  let min = 0;
  let max = 0;

  switch (tipo) {
    case 0: // int (32-bit signed)
      min = -2147483648; max = 2147483647; break;
    case 1: // long (64-bit signed)
      min = -9223372036854775808; max = 9223372036854775807; break;
    case 6: // ubyte (8-bit unsigned)
      min = 0; max = 255; break;
    case 7: // byte (8-bit signed)
      min = -128; max = 127; break;
    default:
      return { valid: true, overflow: 0 }; // Tipos dinámicos o flotantes
  }

  if (num > max) {
    return { valid: false, overflow: num - max };
  } else if (num < min) {
    return { valid: false, overflow: num - min };
  }
  return { valid: true, overflow: 0 };
}
//0=int 1=long 2=double 3=string(200) 4=uuid 5=char 6=ubyte 7=byte 8=boolean
function checkStates(chunks){
	const validations = [];
	chunks.forEach(chunk => {
		chunk.states.forEach(state=>{
			//console.log("state.value,state.type",state.type,state.value);
			//if (typeof state.value === 'string'){
			if (state.type == 0) {
				if (isNaN(state.value)){
						validations.push({"state":state.state,"type":state.type,"value":state.value,"check":"is not a number"});}
			}
			if (state.type == 8) {
				if (typeof state.value !== "boolean"){
						validations.push({"state":state.state,"type":state.type,"value":state.value,"check":"is not a boolean"});}
			}
			if (state.type == 2) {
						if (isNaN(state.value)){
							 validations.push({"state":state.state,"type":state.type,"value":state.value,"check":"invalid type"});}
			}else if (state.type == 3) {
						if (state.value.length>200 ){
								validations.push({"state":state.state,"type":state.type,"value":state.value,"check":"max length limit"});
						}
						if (!isNaN(state.value)){
								validations.push({"state":state.state,"type":state.type,"value":state.value,"check":"is not string"});
						}
			}else if (state.type == 5) {
						if (!isNaN(state.value)){
							 validations.push({"state":state.state,"type":state.type,"value":state.value,"check":"invalid type"});}
			else if (state.value.length!=1){
							validations.push({"state":state.state,"type":state.type,"value":state.value,"check":"is not a char"});}		
			}else{
				const result = checkType(state.value,state.type);
				if (!result.valid ) validations.push({"state":state.state,"type":state.type,"value":state.value,"check":"overflow " + result.overflow});
			}
		});			
	});
	if (validations.length>0) console.log("errors",validations);
}
function truncStates(chunks){
	chunks.forEach(chunk => {
		chunk.states.forEach(state=>{
			state.value = truncType(state.value,state.type);
		});
	});
	return chunks;
}
function statesToBytesUncheck(state) {
  return statesToBuffer(state);
}
module.exports = { bytesToState,bytesToStates,stateToBytes,statesToBytes,statesToBytesUncheck};
