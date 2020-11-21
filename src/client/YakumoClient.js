const { AkairoClient, ListenerHandler, CommandHandler } = require('discord-akairo');
const DataBase = require('../structures/DataBase.js');
const YakumoUtil = require('./util/YakumoUtil');
const Models = require('../models/export/index.js');
const MuteHandler = require('../structures/handlers/MuteHandler.js');
const CasesHandler = require('../structures/handlers/CasesHandler.js');
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

        this.settings = config.settings;

        this.YakumoUtil = new YakumoUtil(this);

        this.muteHandler = new MuteHandler(this);

        this.casesHandler = new CasesHandler(this);

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