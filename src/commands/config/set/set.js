const { Command, Flag } = require('discord-akairo');

class SetConfigCommand extends Command {
	constructor() {
		super('config-set', {
			description: {
				content: 'Set the configuration for the guild.',
				usage: '<key> <...arguments>',
			},
			category: 'config',
			channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            editable: true,
		});
	}

	*args() {
		const key = yield {
			type: [
				['config-set-modlog', 'modLog', 'modlog'],
			],
			otherwise: 'Check `?help config` for more information',
		};

		return Flag.continue(key);
	}
}

module.exports = SetConfigCommand;