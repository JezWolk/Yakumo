const { Command, Flag } = require('discord-akairo');

class ConfigCommand extends Command {
	constructor() {
		super('config', {
			aliases: ['config'],
			description: {
				content: 'ill do this later!',
				usage: 'ill do this later!',
			},
			category: 'config',
			channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            editable: true,
		});
	}

    *args() {
        const method = yield {
          type: [
            ['config-set', 'set'],
            ['config-del', 'del', 'delete', 'remove'],
          ],
          otherwise: 'Check `?help config` for more information.',
        };
      
        return Flag.continue(method);
      }
}

module.exports = ConfigCommand;