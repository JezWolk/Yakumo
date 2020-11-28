const { Command, Flag } = require('discord-akairo');

class BlacklistCommand extends Command {
	constructor() {
		super('blacklist', {
			aliases: ['blacklist'],
			description: {
				content: 'Blacklist a user from using the bot!',
                usage: '<method> <...arguments>',
                examples: ['add @Coltz', 'remove 611466971371929602', 'clear'],
			},
            category: 'util',
            ownerOnly: true,
            editable: true,
			channel: 'guild',
		});
	}

    *args() {
        const method = yield {
          type: [
            ['blacklist-add', 'add'],
            ['blacklist-remove', 'remove'],
            ['blacklist-clear', 'clear'],
          ],
          otherwise: 'Check `?help blacklist` for more information.',
        };
      
        return Flag.continue(method);
      }
}

module.exports = BlacklistCommand;