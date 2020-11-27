const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../Constants.js');

class PrefixCommand extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix'],
			description: {
                content: 'Change the guilds prefix.',
                usage: '[prefix]',
                exmaples: ['!'],
			},
            category: 'util',
            editable: true,
            args: [
                {
                    id: 'prefix',
                },
            ],
		});
	}

	async exec(message, { prefix }) {
        if (!prefix) {
            const guildPrefix = this.client.settings.items.get(message.guild.id)[SETTINGS.PREFIX] || this.client.config.defaultPrefix;
            message.channel.send(`The prefix for this guild is **${guildPrefix}**`);
        }
        else {
            await this.client.settings.set(message.guild.id, SETTINGS.PREFIX, prefix);
            message.util.send(`Now set prefix to **${prefix}**`);
        }
	}
}

module.exports = PrefixCommand;