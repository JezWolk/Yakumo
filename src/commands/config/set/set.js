const { Command, Flag } = require('discord-akairo');

class SetConfigCommand extends Command {
	constructor() {
		super('config-set', {
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
                ['config-set-cases', 'cases', 'case', 'caseNumber', 'caseNum'],
			],
			otherwise: 'Check `?help config` for more information',
		};

		return Flag.continue(key);
	}
}

module.exports = SetConfigCommand;