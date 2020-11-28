const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class InfoTagCommand extends Command {
	constructor() {
		super('tag-info', {
			category: 'tags',
			channel: 'guild',
            editable: true,
			args: [
				{
					id: 'tag',
					type: 'existingTagOrAlias',
					prompt: {
						start: message => `${message.author}, what tag do you want info on?`,
						retry: (message, provided) => `${message.author}, no tag with the name **${provided.phrase}** exists.`,
					},
				},
			],
		});
	}

	async exec(message, { tag }) {
        const user = await this.client.users.fetch(tag.user_id);
        const guild = this.client.guilds.cache.get(tag.guild);
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .addField('❯ Name', `\`${tag.name}\``)
            .addField('❯ Created By', `\`${user.tag}\` (${user.id})`)
            .addField('❯ Guild', `\`${guild.name}\``)
            .addField('❯ Aliases', tag.aliases.length ? tag.aliases.map(a => `\`${a}\``).sort().join(', ') : 'No aliases.')
            .addField('❯ Uses', `\`${tag.uses}\``)
            .addField('❯ Created At', `\`${moment(tag.createdAt).format('L')}\``);
        message.channel.send(embed);
	}
}

module.exports = InfoTagCommand;