const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../../Constants.js');

class BlacklistRemoveCommand extends Command {
	constructor() {
		super('blacklist-remove', {
			category: 'util',
			channel: 'guild',
            ownerOnly: true,
            editable: true,
			args: [
				{
					id: 'user',
					match: 'content',
                    type: 'user',
                    prompt: {
                        start: message => `${message.author}, who do you want to remove from blacklist?`,
                    },
				},
			],
		});
	}

	async exec(message, { user }) {
        const blacklist = this.client.settings.get('global', SETTINGS.BLACKLIST, []);
        if (!blacklist.includes(user.id)) return message.util.send(`**${user.tag}** isn't blacklisted.`);
        const index = blacklist.indexOf(user.id);
        blacklist.splice(index, 1);
        this.client.settings.set('global', SETTINGS.BLACKLIST, blacklist);
        return message.util.send(`Sucsesfully unblacklisted **${user.tag}**`);
	}
}

module.exports = BlacklistRemoveCommand;