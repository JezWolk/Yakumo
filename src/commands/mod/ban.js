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
                    id: 'reason',
                    match: 'rest',
                    type: 'string',
                    default: '',
                },
            ],
        });
    }

    async exec(message, { user, reason }) {
        const member = message.guild.member(user.id);
        if (member && member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) {
            return message.channel.send('You know you can\'t ban this member, so why bother trying.');
        }
        const banMessage = await message.channel.send(`Banning **${user.tag}**...`);
        if (member.bannable) {
            try {
                try {
                    await user.send(stripIndents`
                        You have been banned from **${message.guild.name}**
                        Contact staff to apply for unban if you think this is unworthy.
                    `);
                }
                catch { } // eslint-disable-line no-empty, brace-style
                await message.guild.members.ban(user.id, { reason: reason });
                await this.client.cases.commit(message.guild, {
                    guild: message.guild.id,
                    mod: message.author,
                    target: user,
                    action: this.id,
                    reason: reason,
                });
                banMessage.edit(`Sucessfully banned **${user.tag}**`);
            }
            catch (error) {
                banMessage.edit(`There was an error when trying to ban **${user.tag}**`);
                console.log(error);
            }
        }
        else {
            banMessage.edit('I don\'t have permissions to ban this member.');
        }
    }
}

module.exports = BanCommand;