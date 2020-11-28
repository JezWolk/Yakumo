const { Command } = require('discord-akairo');

class TagsCommand extends Command {
	constructor() {
		super('tags', {
			aliases: ['tags'],
			description: {
				content: 'View a list of all hoisted tags.',
			},
			category: 'tags',
			channel: 'guild',
            editable: true,
		});
	}

    exec(message) {
        const command = this.client.commandHandler.modules.get('tag-list');
        return command.exec(message, { member: message.member });
    }
}

module.exports = TagsCommand;