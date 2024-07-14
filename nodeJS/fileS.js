const fs = require('fs');
 
//asyncronus

// const fileReadCallback = (error, data) => {
//     if(error) {
//         console.log('Gagal membaca berkas');
//         return;
//     }
//     console.log(data);
// };
 
//fs.readFile('todo.txt', 'UTF-8', fileReadCallback);

//syncronus
const data = fs.readFileSync('todo.txt', 'UTF-8');
console.log(data);