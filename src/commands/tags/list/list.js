const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class ListTagCommand extends Command {
	constructor() {
		super('tag-list', {
			category: 'tags',
			channel: 'guild',
            editable: true,
			args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member,
                },
			],
		});
	}

	async exec(message, { member }) {
        const tags = await this.client.models.tags.find({ guild: message.guild.id });
        if (!tags.length) return message.channel.send('This guild dosn\'t have any tags.');
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .addField('❯ Tags', tags.map(tag => `\`${tag.name}\``).sort().join(', '));
        const userTags = tags.filter(t => t.user_id === member.id).map(t => `\`${t.name}\``).sort().join(', ');
        if (userTags.length) embed.addField('❯ User Tags', userTags);
        message.channel.send(embed);
	}
}

module.exports = ListTagCommand;