const { Command } = require('discord-akairo');

class AddTagCommand extends Command {
	constructor() {
		super('tag-add', {
			category: 'config',
			channel: 'guild',
            editable: true,
			args: [
				{
					id: 'name',
					type: 'tagName',
					prompt: {
						start: message => `${message.author}, what should the tag be named?`,
						retry: (message, provided) => `${message.author}, a tag named **${provided.phrase}** already exists.`,
					},
				},
				{
					id: 'content',
					match: 'rest',
					type: 'tagContent',
					prompt: {
						start: message => `${message.author}, what should the content of the tag be?`,
					},
				},
			],
		});
	}

	async exec(message, { name, content }) {
        if (name && name.length >= 1950) {
            return message.util.send('The tag name length can\'t be over 1950 characters.');
        }
        if (content && content.length >= 1950) {
            return message.util.send('The tag content length can\'t be over 1950 characters.');
        }

        await new this.client.models.tags({
            guild: message.guild.id,
            user_id: message.author.id,
            name: name,
            content: content,
            created_at: new Date(),
        }).save();

        message.util.send(`Successfully created the tag **${name}**.`);
	}
}

module.exports = AddTagCommand;