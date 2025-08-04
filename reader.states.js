const fs = require('fs');

let data = fs.readFileSync("output.bin");
function longFromBuffer(buffer, from, to) {
    const buf = Buffer.from(buffer.subarray(from, to));
    return buf.readInt32BE(0);
}
function oneByteRead(buffer, pos) {
    const buf = Buffer.from(buffer.subarray(pos, pos + 1));
    return buf.readUInt8(0);
}
function doubleFromBuffer(buffer,pos) {
    const buf = Buffer.from(buffer.subarray(pos, pos+8));
    return buf.readDoubleBE(0);
}
function intFromBuffer(buffer, pos) {
    const buf = Buffer.from(buffer.subarray(pos, pos+4));
    return buf.readInt8(0);
}
function stringFromBuffer(buffer, pos) {
    const size = intFromBuffer(buffer,pos);
    const bufferStr = buffer.subarray(pos+1,pos+1+size);
    return [bufferStr.toString(),size];
}
function uuidFromBuffer(buffer, pos) {
    const bufferStr = buffer.subarray(pos,pos+32);
	const uuid = bufferStr.toString();
    return [uuid.substring(0, 8)+'-'+uuid.substring(8, 12)+'-'+uuid.substring(12, 16)+'-'+uuid.substring(16, 32),32];
}
function byteToState(bytes,states) {
    let offset = 0;
    const type = oneByteRead(bytes, 0);
    console.log("type:", type,offset);
    offset+=1;
    const state = intFromBuffer(bytes, offset);
    offset+=4;
    console.log("state:", state,offset);
    if (type == 0) {
        let value = intFromBuffer(bytes,offset);
        offset+=4;
        console.log("value:", value,offset);
        states.push({state:state,type:0,value:value});
        const packet = bytes.subarray(offset);
        if (packet.length>0)
            byteToState(packet,states);
    }
    if (type == 1) {
        let value = longFromBuffer(bytes,offset);
        offset+=4;
        console.log("value:", value,offset);
        states.push({state:state,type:1,value:value});
        const packet = bytes.subarray(offset);
        if (packet.length>0)
            byteToState(packet,states);
    }
    if (type == 2) {
        let value = doubleFromBuffer(bytes,offset);
        offset+=8;
        console.log("value:", value,offset);
        states.push({state:state,type:2,value:value});
        const packet = bytes.subarray(offset);
        if (packet.length>0)
            byteToState(packet,states);
    }
    if (type == 3) {
        let [value,size] = stringFromBuffer(bytes,offset);
        offset+=size+1;
        console.log("size:",size);
        console.log("value:", value,offset);
        states.push({state:state,type:3,value:value});
        const packet = bytes.subarray(offset);
        if (packet.length>0)
            byteToState(packet,states);
    }
    if (type == 4) {
        let [value,size] = uuidFromBuffer(bytes,offset);
        offset+=32;
        console.log("value:", value,offset);
        states.push({state:state,type:4,value:value});
         const packet = bytes.subarray(offset);
        if (packet.length>0){
            
            byteToState(packet,states);
        }
    }
}
function byteToData(bytes) {
    const t = longFromBuffer(bytes, 0, 4);
    const packet = data.subarray(4);
    const states = [];
    byteToState(packet,states);
    return { t: t, states: states };
}
const stateData = byteToData(data);
console.log(stateData);

