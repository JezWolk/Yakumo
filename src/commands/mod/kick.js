const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            description: {
                content: 'Kicks a member from the guild.',
                usage: '<member> [reason]',
                examples: ['@Coltz bad.'],
            },
            clientPermissions: ['KICK_MEMBERS', 'EMBED_LINKS'],
            userPermissions: ['KICK_MEMBERS'],
            category: 'mod',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: message => `${message.author}, what member would you like to kick?`,
                    },
                },
                {
                    id: 'reason',
                    match: 'rest',
                    type: 'string',
                    default: '',
                },
            ],
        });
    }

    async exec(message, { member, reason }) {
        if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) {
            return message.channel.send('You know you can\'t kick this member, so why bother trying.');
        }
        const kickMessage = await message.channel.send(`Kicking **${member.user.tag}**...`);
        try {
            await member.kick([reason]);
            try {
                await member.send(stripIndents`
                    You have been kicked from **${message.guild.name}**
                    You may join back when ever you wish.
                `);
            }
            catch { } // eslint-disable-line no-empty, brace-style
            kickMessage.edit(`Sucessfully kicked **${member.user.tag}**`);
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = KickCommand;