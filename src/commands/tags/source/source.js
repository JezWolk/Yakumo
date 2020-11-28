const { Command } = require('discord-akairo');

class SourceTagCommand extends Command {
	constructor() {
		super('tag-source', {
			category: 'tags',
			channel: 'guild',
            editable: true,
			args: [
				{
					id: 'tag',
					type: 'existingTag',
					prompt: {
						start: message => `${message.author}, what tag do you source on?`,
						retry: (message, provided) => `${message.author}, no tag with the name **${provided.phrase}** exists.`,
					},
				},
			],
		});
	}

	async exec(message, { tag }) {
        message.util.send(tag.content, {
            files: [
                {
                    attachment: Buffer.from(tag.content, 'utf-8'),
                    name: `${tag.name}_source.txt`,
                },
            ],
        });
	}
}

module.exports = SourceTagCommand;