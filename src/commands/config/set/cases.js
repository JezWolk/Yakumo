const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../Constants.js');

class SetConfigCasesCommand extends Command {
	constructor() {
		super('config-set-cases', {
			category: 'config',
			channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            editable: true,
			args: [
				{
					id: 'cases',
					match: 'content',
                    type: 'number',
                    prompt: {
                        start: message => `${message.author}, what do you want to set the current case to?`,
                    },
				},
			],
		});
	}

	async exec(message, { cases }) {
		this.client.settings.set(message.guild.id, SETTINGS.CASES, cases);
		return message.util.send(`I have now set the case number to **${cases}**.`);
	}
}

module.exports = SetConfigCasesCommand;