const { Argument, Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            description: {
                content: 'Bans a member from the guild.',
                usage: '<member> [reason]',
                examples: ['@Jez naughty.'],
            },
            clientPermissions: ['BAN_MEMBERS', 'EMBED_LINKS'],
            userPermissions: ['BAN_MEMBERS'],
            category: 'mod',
            args: [
                {
                    id: 'user',
                    type: Argument.union('user', async (_, input) => {
                        try {
                            const user = await this.client.users.fetch(input);
                            return user || null;
                        } catch { } // eslint-disable-line no-empty, brace-style
                    }),
                    prompt: {
                        start: message => `${message.author}, what member would you like to ban?`,
                    },
                },
                {
                    id: 'days',
                    type: 'integer',
                    match: 'option',
                    flag: ['--days=', '-d='],
                    default: 1,
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

    async exec(message, { user, days, reason }) {
        const member = message.guild.member(user.id);
        if (member && member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) {
            return message.channel.send('You know you can\'t ban this member, so why bother trying.');
        }
        const banMessage = await message.channel.send(`Banning **${user.tag}**...`);
        try {
            await message.guild.members.ban(user.id, { days: days, reason: reason });
            try {
                await user.send(stripIndents`
                    You have been banned from **${message.guild.name}**
                    Contact staff to apply for unban if you think this is unworthy.
                `);
            }
            catch { } // eslint-disable-line no-empty, brace-style
            await this.client.casesHandler.newCase(message.guild, {
                mod: message.author,
                target: member,
                action: this.aliases[0],
                reason: reason,
            });
            banMessage.edit(`Sucessfully banned **${user.tag}**`);
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = BanCommand;