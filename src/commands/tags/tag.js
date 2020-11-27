const { Command, Flag } = require('discord-akairo');

class TagCommand extends Command {
	constructor() {
		super('tag', {
			aliases: ['tag'],
			description: {
				content: 'ill do this later!',
				usage: 'ill do this later!',
			},
			category: 'tags',
			channel: 'guild',
            editable: true,
		});
	}

    *args() {
        const method = yield {
          type: [
            ['tag-add', 'add', 'create'],
            ['tag-del', 'del', 'delete'],
            ['tag-show', 'show', 'view'],
            ['tag-search', 'search', 'look'],
            ['tag-edit', 'edit', 'change'],
          ],
          otherwise: 'Check `?help tag` for more information.',
        };
      
        return Flag.continue(method);
    }
}

module.exports = TagCommand;