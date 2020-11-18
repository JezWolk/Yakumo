const { Argument, Command } = require('discord-akairo');

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
                    type: Argument.union('member', async (_, input) => {
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
        console.log(days);
        const member = message.guild.member(user.id);
        if (member && member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) {
            return message.channel.send('You know you can\'t ban this member, so why bother trying.');
        }
        const banMessage = await message.channel.send(`Banning **${user.tag}**...`);
        try {
            message.guild.members.ban(user.id, { days: days, reason: reason });
            banMessage.edit(`Sucessfully banned **${member.user.tag}**`);
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = BanCommand;