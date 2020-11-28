const { Inhibitor } = require('discord-akairo');
const { SETTINGS } = require('../Constants.js');

class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist',
        });
    }

    exec(message) {
        const blacklist = this.client.settings.get('global', SETTINGS.BLACKLIST, []);
		return blacklist.includes(message.author.id);
    }
}

module.exports = BlacklistInhibitor;