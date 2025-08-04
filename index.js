
const {byteToTracks,byteToChunk} = require('./reader.states.js');
const {dataToChunk,tracksToChunk} = require('./writer.states.js');
/*
let data = {
  t: 1754080932,
  states:[  //0=int 1=long 2=double 3=string(200) 4=uuid
    {state: 54,type: 0, value: 6},
    {state: 25,type: 1, value: 1566666666},
    {state: 23,type: 2, value: -16.093523243432},
    {state: 17,type: 3, size: 16, value: "prueba de cadena"},
    {state: 26,type: 4, value: "4e621daf-6352-4d00-a898-ca8fc8b6cc52"},
  ],
  len:0xFFFF,
}

let dataToWrite = dataToByte(data);
console.log(dataToWrite);
fs.writeFile('output.bin', dataToWrite, (err) => {
  if (err) throw err;
  console.log('File written successfully!');
});

fs.writeFile('output.json', JSON.stringify(data), (err) => {
  if (err) throw err;
  console.log('File written successfully!');
});
*/
module.exports = {byteToTracks,byteToChunk,dataToChunk,tracksToChunk};