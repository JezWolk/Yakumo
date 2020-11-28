const { Command } = require('discord-akairo');

class RenameTagCommand extends Command {
	constructor() {
		super('tag-rename', {
			category: 'tags',
			channel: 'guild',
            editable: true,
			args: [
				{
					id: 'tag',
					type: 'existingTag',
					prompt: {
						start: message => `${message.author}, what tag should we rename?`,
						retry: (message, provided) => `${message.author}, no tag with the name **${provided.phrase}** exists.`,
					},
                },
                {
					id: 'name',
					match: 'rest',
					type: 'string',
					prompt: {
						start: message => `${message.author}, what should the new name of the tag be?`,
					},
				},
			],
		});
	}

	async exec(message, { tag, name }) {
        if (name && name.length >= 1950) {
            return message.util.send('The tag content length can\'t be over 1950 characters.');
        }
        tag.name = name;
        tag.last_modified_by = message.author.id;
        tag.last_modified_at = new Date();
        await tag.save();
        message.util.send(`Rename the tag **${tag.name}**.`);
	}
}

module.exports = RenameTagCommand;