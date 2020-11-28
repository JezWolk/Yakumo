const { Command } = require('discord-akairo');
const { safeDump } = require('js-yaml');

class DownloadTagCommand extends Command {
	constructor() {
		super('tag-download', {
			category: 'tags',
			channel: 'guild',
            editable: true,
			args: [
				{
					id: 'member',
					match: 'content',
					type: 'member',
					default: '',
				},
			],
		});
	}

	async exec(message, { member }) {
        const options = member ? { member: member.id, guild: message.guild.id } : { guild: message.guild.id };
        if (member) options.user_id = member.id;
        const tags = await this.client.models.tags.find(options);
        if (!tags.length) return message.util.send('No results found.');
        const tagsObject = new Object();
        for (const tag of tags) {
            tagsObject[tag.name] = {
                name: tag.name,
                aliases: tag.aliases,
                user_id: tag.user_id,
                created_at: tag.created_at,
                guild: tag.guild,
                uses: tag.uses,
                content: tag.content,
            };
            if (tag.last_modified_by && tag.last_modified_at) {
                tagsObject[tag.name].last_modified_by = tag.last_modified_by;
                tagsObject[tag.name].last_modified_at = tag.last_modified_at;
            }
        }
        return message.util.send('Here you go...', {
			files: [
				{
					attachment: Buffer.from(safeDump(tagsObject), 'utf8'),
					name: `${member ? `${member.user.tag}s_tags` : 'all_tags'}.yaml`,
				},
			],
		});
	}
}

module.exports = DownloadTagCommand;