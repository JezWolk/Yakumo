const { Command } = require('discord-akairo');

class AliasDelTagCommand extends Command {
	constructor() {
		super('tag-alias-del', {
			category: 'tags',
			channel: 'guild',
            editable: true,
			args: [
				{
					id: 'tag',
					type: 'existingTagAlias',
					prompt: {
						start: message => `${message.author}, what tag alias should we delete?`,
						retry: (message, provided) => `${message.author}, no tag alias with the name **${provided.phrase}** exists.`,
					},
                },
			],
		});
	}

	async exec(message, { tag: { tag, phrase } }) {
        const index = tag.aliases.indexOf(phrase);
        tag.aliases.splice(index, 1);
        tag.last_modified_by = message.author.id;
        tag.last_modified_at = new Date();
        await tag.save();
        return message.util.send(`Successfully deleted the tag **${phrase}**.`);
    }
}

module.exports = AliasDelTagCommand;