const { AkairoClient } = require('discord-akairo');

class YakumoClient extends AkairoClient {
    constructor(config) {
        super({
            ownerID: config.ownerID,
        }, {
            disableMentions: 'everyone',
        });

        this.token = config.token;
    }

    start() {
        this.login(this.token);
    }
}

module.exports = YakumoClient;