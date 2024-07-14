const fs = require('fs');
 
const readableStream = fs.createReadStream('./input.txt', {
    highWaterMark: 15
});
const writableStream = fs.createWriteStream('output2.txt');
readableStream.on('readable', () => {
    try {
        
        writableStream.write(`${readableStream.read()}\n`);
    } catch(error) {
        // catch the error when the chunk cannot be read.
    }
});
 
readableStream.on('end', () => {
    writableStream.end();
    console.log('Done');
});