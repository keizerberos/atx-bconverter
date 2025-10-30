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

function trackToBuffer(data) {
	const buf_t = longToBuffer(data.t);
	const buf_lat = doubleToBuffer(data.lat);
	const buf_lon = doubleToBuffer(data.lon);
	const buf_bat = ubyteToBuffer(data.bat);
	const buf_acc = ubyteToBuffer(data.acc);
	const buf_stp = ubyteToBuffer(data.stp);
	return Buffer.concat([buf_t, buf_lat, buf_lon, buf_bat, buf_acc, buf_stp]);
}
function tracksToBuffer(dataArray) {
    let mainStream = Buffer.alloc(0);	
    dataArray.forEach(d => {
        const buf_data = trackToBuffer(d);
        mainStream = Buffer.concat([mainStream, buf_data]);
    });
    return Buffer.concat([checksumByte(mainStream),mainStream]);
}

module.exports = {trackToBuffer, tracksToBuffer};
