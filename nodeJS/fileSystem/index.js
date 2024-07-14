const fs = require('fs');
 
//asyncronus

const fileReadCallback = (error, data) => {
    if(error) {
        console.log('Gagal membaca berkas');
        return;
    }
    console.log(data);
};
 
fs.readFile('notes.txt', 'UTF-8', fileReadCallback);