const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../../Constants.js');

class BlacklistAddCommand extends Command {
	constructor() {
		super('blacklist-add', {
			category: 'util',
			channel: 'guild',
            ownerOnly: true,
            editable: true,
			args: [
				{
					id: 'user',
                    type: 'uncachedUser',
                    prompt: {
                        start: message => `${message.author}, who do you want to blacklist?`,
                    },
				},
			],
		});
	}

	async exec(message, { user }) {
        const blacklist = this.client.settings.get('global', SETTINGS.BLACKLIST, []);
        if (blacklist.includes(user.id)) return message.util.send(`**${user.tag}** is already blacklisted.`);
        blacklist.push(user.id);
        this.client.settings.set('global', SETTINGS.BLACKLIST, blacklist);
        return message.util.send(`Sucsesfully blacklisted **${user.tag}**`);
	}
}

module.exports = BlacklistAddCommand;