const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../Constants.js');

class SetConfigModChannelCommand extends Command {
	constructor() {
		super('config-set-modlog', {
			category: 'config',
			channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            editable: true,
			args: [
				{
					id: 'channel',
					match: 'content',
                    type: 'textChannel',
                    prompt: {
                        start: message => `${message.author}, what channel would you like to set as the modlog channel?`,
                    },
				},
			],
		});
	}

	async exec(message, { channel }) {
		this.client.settings.set(message.guild.id, SETTINGS.MODLOG, channel.id);
		return message.util.send(`I have now set the modlog channel to ${channel}`);
	}
}

module.exports = SetConfigModChannelCommand;