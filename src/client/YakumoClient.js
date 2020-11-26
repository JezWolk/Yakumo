const { AkairoClient } = require('discord-akairo');
const database = require('../structures/database.js');

class YakumoClient extends AkairoClient {
    constructor(config) {
        super({
            ownerID: config.ownerID,
        }, {
            disableMentions: 'everyone',
        });

        this.config = config;
    }

    start() {
        this.login(this.config.token);
        database(this.config.mongoUri);
        console.log('Yoo this is ready!');
    }
}

module.exports = YakumoClient;