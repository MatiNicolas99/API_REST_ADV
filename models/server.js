const express = require('express');
const cors = require('cors');


class Server {


    constructor () {

        this.app = express();
        this.postPath = '/joyas';
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
    }

    middlewares () {
        this.app.use(express.json());
        this.app.use(cors());
    }
    routes () {
        this.app.use(this.postPath, require('../routes/approutes'))
    };

    listen () {
        this.app.listen(this.port, () => {
            console.log(`Servidor encendido en el puerto: ${this.port}`);
        });
    };
};



module.exports = Server;