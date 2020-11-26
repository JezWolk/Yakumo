const { AkairoClient, CommandHandler } = require('discord-akairo');
const database = require('../structures/database.js');
const { join } = require('path');

class YakumoClient extends AkairoClient {
    constructor(config) {
        super({
            ownerID: config.ownerID,
        }, {
            disableMentions: 'everyone',
        });

        this.config = config;

        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, '..', 'commands'),
            prefix: config.prefix,
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            commandUtilLifetime: 3e5,
        });

        this.init();
    }

    init() {
        this.commandHandler.loadAll();
    }

    start() {
        this.login(this.config.token);
        database(this.config.mongoUri);
        console.log('Yoo this is ready!');
    }
}

module.exports = YakumoClient;