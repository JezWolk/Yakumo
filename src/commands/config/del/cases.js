const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../Constants.js');

class DelConfigCasesCommand extends Command {
	constructor() {
		super('config-del-cases', {
			category: 'config',
			channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            editable: true,
		});
	}

	async exec(message) {
		this.client.settings.delete(message.guild.id, SETTINGS.CASES);
		return message.util.send('Now delete the cases config.');
	}
}

module.exports = DelConfigCasesCommand;