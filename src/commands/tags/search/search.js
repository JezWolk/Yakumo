const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class SearchTagCommand extends Command {
	constructor() {
		super('tag-search', {
			category: 'config',
			channel: 'guild',
            editable: true,
			args: [
				{
					id: 'searchString',
					match: 'content',
					type: 'lowercase',
					prompt: {
						start: (message) => `${message.author}, what tag would you like to search for?`,
					},
				},
			],
		});
	}

	async exec(message, { searchString }) {
        let tags = await this.client.models.tags.find();
        tags = tags.filter(tag => tag.name.includes(searchString));
        if (!tags.length) return message.util.send('No search results found, maybe try looking for something that exists.');
        const results = tags.map(tag => `\`${tag.name}\``).sort().join(', ');
        if (results.length >= 1950) {
            return message.util.send('The result is over 1950 characters and i\'m too lazy to handle this, so make your search more specific!');
        }
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`${message.author.tag} - (${message.author.id})`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
            .setDescription(results);
        return message.util.send(embed);
	}
}

module.exports = SearchTagCommand;