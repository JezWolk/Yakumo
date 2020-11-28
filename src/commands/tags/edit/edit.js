const { Command } = require('discord-akairo');

class EditTagCommand extends Command {
	constructor() {
		super('tag-edit', {
			category: 'config',
			channel: 'guild',
            editable: true,
			args: [
				{
					id: 'tag',
					type: 'existingTag',
					prompt: {
						start: message => `${message.author}, what tag should we edit?`,
						retry: (message, provided) => `${message.author}, no tag with the name **${provided.phrase}** exists.`,
					},
                },
                {
					id: 'content',
					match: 'rest',
					type: 'tagContent',
					prompt: {
						start: message => `${message.author}, what should the new content of the tag be?`,
					},
				},
			],
		});
	}

	async exec(message, { tag, content }) {
        if (content && content.length >= 1950) {
            return message.util.send('The tag content length can\'t be over 1950 characters.');
        }
        tag.content = content;
        tag.last_modified_by = message.author.id;
        tag.last_modified_at = new Date();
        await tag.save();
        message.util.send(`Now updated the content of the tag **${tag.name}**.`);
	}
}

module.exports = EditTagCommand;