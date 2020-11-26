const { AkairoClient } = require('discord-akairo');

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
        console.log('Yoo this is ready!');
    }
}

module.exports = YakumoClient;