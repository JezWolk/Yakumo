const { Command } = require('discord-akairo');

class DelTagCommand extends Command {
	constructor() {
		super('tag-del', {
			category: 'config',
			channel: 'guild',
            editable: true,
			args: [
				{
					id: 'tag',
					type: 'existingTag',
					prompt: {
						start: message => `${message.author}, what tag should we delete?`,
						retry: (message, provided) => `${message.author}, no tag with the name **${provided.phrase}** exists.`,
					},
				},
			],
		});
	}

	async exec(message, { tag }) {
        await this.client.models.tags.findOneAndDelete({ guild: message.guild.id, name: tag.name });
        message.util.send(`Successfully delete the tag **${tag.name}**.`);
	}
}

module.exports = DelTagCommand;