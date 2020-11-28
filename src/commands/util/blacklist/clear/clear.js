const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../../Constants.js');

class BlacklistClearCommand extends Command {
	constructor() {
		super('blacklist-clear', {
			category: 'util',
			channel: 'guild',
            ownerOnly: true,
            editable: true,
		});
	}

	async exec(message) {
        this.client.settings.set('global', SETTINGS.BLACKLIST, []);
        return message.util.send('Sucsesfully cleared blacklistings.');
	}
}

module.exports = BlacklistClearCommand;