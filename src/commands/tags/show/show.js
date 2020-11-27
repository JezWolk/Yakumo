const { Command } = require('discord-akairo');

class ShowTagCommand extends Command {
	constructor() {
		super('tag-show', {
			category: 'config',
			channel: 'guild',
            editable: true,
			args: [
				{
					id: 'name',
					match: 'content',
					type: 'lowercase',
					prompt: {
						start: (message) => `${message.author}, what tag would you like to show?`,
					},
				},
			],
		});
	}

	async exec(message, { name }) {
        const tag = await this.client.models.tags.findOne({ guild: message.guild.id, name: name });
        if (!tag) return message.util.send('There is no tag with this name.');
        tag.uses++;
        await tag.save();
        return message.util.send(tag.content);
	}
}

module.exports = ShowTagCommand;