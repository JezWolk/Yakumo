const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../Constants.js');

class DelConfigModChannelCommand extends Command {
	constructor() {
		super('config-del-modlog', {
			category: 'config',
			channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            editable: true,
		});
	}

	async exec(message) {
		this.client.settings.delete(message.guild.id, SETTINGS.MODLOG);
		return message.util.send('Now deleted the modlog channel config.');
	}
}

module.exports = DelConfigModChannelCommand;