const { AkairoClient, ListenerHandler, CommandHandler } = require('discord-akairo');
const DataBase = require('../structures/DataBase.js');
const YakumoUtil = require('./util/YakumoUtil');
const Models = require('../models/export/index.js');
const { join } = require('path');

class YakumoClient extends AkairoClient {
    constructor(config) {
        super({
            ownerID: config.ownerID,
        }, {
            disableMentions: 'everyone',
        });

        this.token = config.token;

        this.mongoUri = config.mongoUri;

        this.models = Models;

        this.YakumoUtil = new YakumoUtil(this);

        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, '..', 'commands'),
            prefix: config.prefix,
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            commandUtilLifetime: 3e5,
        });

        this.listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'events') });

        this.init();
    }

    init() {
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
    }

    start() {
        this.login(this.token);
        DataBase(this.mongoUri);
    }
}

module.exports = YakumoClient;