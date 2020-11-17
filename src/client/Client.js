const { AkairoClient, ListenerHandler } = require('discord-akairo');
const { join } = require('path');
 
class YakumoClient extends AkairoClient {
    constructor(config) {
        super({
            ownerID: config.ownerID,
        }, {
            disableMentions: 'everyone',
        });

        this.token = config.token;

        this.listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'events') });

        this.init();
    }

    init() {
        this.listenerHandler.loadAll();
    }

    start() {
        this.login(this.token);
    }
}

module.exports = YakumoClient;