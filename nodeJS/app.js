const Hapi = require('@hapi/hapi');
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : 'dicoding.com',
    });
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};
init();
const firstName = process.argv[2];
const lastName = process.argv[3];
 
//console.log(`Hello ${firstName} ${lastName}`);

const moment = require('moment');
 
const date = moment().format("MMM Do YY");
console.log(date);


