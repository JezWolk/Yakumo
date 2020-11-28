const { Command } = require('discord-akairo');

class AliasAddTagCommand extends Command {
	constructor() {
		super('tag-alias-add', {
			category: 'tags',
			channel: 'guild',
            editable: true,
			args: [
                {
					id: 'tag',
					type: 'existingTag',
					prompt: {
						start: message => `${message.author}, what tag should we add an alias to?`,
						retry: (message, provided) => `${message.author}, there is no tag with the name **${provided.phrase}**.`,
					},
				},
				{
					id: 'alias',
					type: 'tagName',
					prompt: {
						start: message => `${message.author}, what alias should we add to this tag?`,
						retry: (message, provided) => `${message.author}, a tag with the name **${provided.phrase}** already exists.`,
					},
				},
			],
		});
	}

	async exec(message, { tag, alias }) {
        tag.aliases.push(alias);
        tag.last_modified_by = message.author.id;
        tag.last_modified_at = new Date();
        await tag.save();
        return message.util.send(`Successfully added the tag alias **${alias}**.`);
	}
}

module.exports = AliasAddTagCommand;