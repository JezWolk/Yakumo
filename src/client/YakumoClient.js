const { AkairoClient, CommandHandler, MongooseProvider } = require('discord-akairo');
const CaseHandler = require('../structures/handlers/CaseHandler.js');
const database = require('../structures/database.js');
const models = require('../models/export/index.js');
const { SETTINGS } = require('../Constants.js');
const { join } = require('path');

class YakumoClient extends AkairoClient {
    constructor(config) {
        super({
            ownerID: config.ownerID,
        }, {
            disableMentions: 'everyone',
        });

        this.config = config;

        this.models = models;

        this.settings = new MongooseProvider(this.models.settings);

        this.cases = new CaseHandler(this);

        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, '..', 'commands'),
            prefix: (message) => this.settings.items.get(message.guild.id)[SETTINGS.PREFIX] || this.config.defaultPrefix,
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            commandUtilLifetime: 3e5,
        });

        this.commandHandler.resolver.addType('tagName', async (message, phrase) => {
            if (!phrase) return null;
            const tag = await this.models.tags.findOne({ guild: message.guild.id, name: phrase.toLowerCase() });
            return tag ? null : phrase;
        });

        this.commandHandler.resolver.addType('tagContent', async (message, phrase) => {
			if (!phrase) phrase = '';
			if (message.attachments.first()) phrase += `\n${message.attachments.first().url}`;
			return phrase || null;
        });

        this.init();
    }

    async init() {
        await this.settings.init();
        this.commandHandler.loadAll();
    }

    start() {
        this.login(this.config.token);
        database(this.config.mongoUri);
        console.log('Yoo this is ready!');
    }
}

module.exports = YakumoClient;