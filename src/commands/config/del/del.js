const { Command, Flag } = require('discord-akairo');

class DelConfigCommand extends Command {
	constructor() {
		super('config-del', {
			category: 'config',
			channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            editable: true,
		});
	}

	*args() {
		const key = yield {
			type: [
                ['config-del-modlog', 'modLog', 'modlog'],
                ['config-del-cases', 'cases'],
			],
			otherwise: 'Check `?help config` for more information',
		};

		return Flag.continue(key);
	}
}

module.exports = DelConfigCommand;