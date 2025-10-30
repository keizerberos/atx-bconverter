const fs = require("fs");
const { trackToBuffer, tracksToBuffer } = require("./byte.writer.track");
const { bufferToTrack, bufferToTracks } = require("./byte.reader.track");

/**
 * Returns the buffer of array like:
 * ```json
 * 
 * let dataTracks = [{
 * 	t: 1754080932,
 * 	lat: -16.520378333333333,
 *  lon: -68.21251666666667,
 *  bat: 100,
 * 	acc: 6,
 * 	stp: 0,
 * }, {
 * 	t: 1754080933,
 * 	lat: -16.520378333333333,
 * 	lon: -68.21251666666667,
 * 	bat: 100,	
 *  acc: 10,
 * 	stp: 0,
 * }, {
 * 	t: 1754080934,
 * 	lat: -16.520378333333333,
 * 	lon: -68.21251666666667,
 * 	bat: 100,
 * 	acc: 9,
 * 	stp: 1,
 * }
 * ];
 * ```
 * example:
 *
 * ```js
 * const bytes = tracksToBytes(dataTracks);
 * fs.writeFile('tracks.bin', bytes, (err) => {
 *   if (err) throw err;
 *    console.log('File written successfully!');
 * });
 * ```
 * @since v1.0.0
 * @param tracks object track[]
 */
function tracksToBytes(tracks) {
  return tracksToBuffer(tracks);
}
/**
 * Returns the buffer of array like:
 * ```json
 * 
 * let dataTrack = {
 * 	t: 1754080932,
 * 	lat: -16.520378333333333,
 *  lon: -68.21251666666667,
 *  bat: 100,
 * 	acc: 6,
 * 	stp: 0,
 * }
 * ```
 * example:
 *
 * ```js
 * const bytes = trackToBytes(dataTrack);
 * fs.writeFile('track.bin', bytes, (err) => {
 *   if (err) throw err;
 *    console.log('File written successfully!');
 * });
 * ```
 * @since v1.0.0
 * @param track binary file
 */
function trackToBytes(track) {
  return trackToBuffer(track);
}
/**
 * Returns object track like:
 * ```json
 * 
 * let track = {
 * 	t: 1754080932,
 * 	lat: -16.520378333333333,
 *  lon: -68.21251666666667,
 *  bat: 100,
 * 	acc: 6,
 * 	stp: 0,
 * }
 * ```
 * example:
 *
 * ```js
 * const bytes = fs.readFileSync("track.bin");
 * const track = bytesToTrack(bytes);
 * ```
 * @since v1.0.0
 * @param bytes binary file
 */
function bytesToTrack(bytes) {
  return bufferToTrack(bytes);
}
/**
 * Returns object track[] like:
 * ```json
 * 
 * let tracks = [{
 * 	t: 1754080932,
 * 	lat: -16.520378333333333,
 *  lon: -68.21251666666667,
 *  bat: 100,
 * 	acc: 6,
 * 	stp: 0,
 * }]
 * ```
 * example:
 *
 * ```js
 * const bytes = fs.readFileSync("tracks.bin");
 * const track = bytesToTracks(bytes);
 * ```
 * @since v1.0.0
 * @param bytes binary file
 */
function bytesToTracks(bytes) {
  return bufferToTracks(bytes);
}

module.exports = {trackToBytes,tracksToBytes,bytesToTrack,bytesToTracks};