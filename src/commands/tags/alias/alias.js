const { Command, Flag } = require('discord-akairo');

class AliasTagCommand extends Command {
	constructor() {
		super('tag-alias', {
			category: 'tags',
			channel: 'guild',
            editable: true,
		});
	}

    *args() {
        const method = yield {
          type: [
            ['tag-alias-add', '--add'],
            ['tag-alias-del', '--del'],
          ],
          otherwise: 'Check `?help tag` for more information.',
        };
      
        return Flag.continue(method);
    }
}

module.exports = AliasTagCommand;