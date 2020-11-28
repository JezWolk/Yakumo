const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: {
                content: 'Displays a list of all my commands.',
                usage: '[command]',
            },
            category: 'util',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                },
            ],
        });
    }

    async exec(message, { command }) {
        if (command) {
            const embed = new MessageEmbed().setColor('BLUE');
            embed.setTitle(`\`${command.aliases[0]} ${command.description.usage}\``);
            if (command.description.content) embed.addField('Description', command.description.content);
            if (command.aliases.length > 1) embed.addField('Aliases', command.aliases.slice(1).map(a => `\`${a}\``).join(', '));
            if (command.description.examples && command.description.examples.length) embed.addField('Examples', command.description.examples.map(e => `\`${command.id} ${e}\``).join('\n'));
            return message.util.send(embed);
        }

        const embed = new MessageEmbed().setColor('BLUE');
        for (const category of this.handler.categories.values()) {
            embed.addField(`❯ ${this.capitalize(category.id)}`, `${category.filter(cmd => cmd.aliases.length > 0).map(cmd => `\`${cmd.id}\``).join(' ')}`);
        }
        return message.util.send(embed);
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

module.exports = HelpCommand;