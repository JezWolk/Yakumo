const { Command } = require('discord-akairo');
const ms = require('ms');

class MuteCommand extends Command {
    constructor() {
        super('mute', {
            aliases: ['mute'],
            description: {
                content: 'Mutes a member from the guild.',
                usage: '<member> <time> [reason]',
                examples: ['@Coltz 10m bad.'],
            },
            clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_ROLES'],
            category: 'mod',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: message => `${message.author}, what member would you like to mute?`,
                    },
                },
                {
                    id: 'time',
                    type: (_, input) => {
                        if (!input) return null;
                        const len = ms(input);
                        if (len && len <= 1296000000) return len;
                        return null;
                    },
                    prompt: {
                        start: message => `${message.author}, how long would you like to mute this member?`,
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

    async exec(message, { member, time, reason }) {
        if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) {
            return message.channel.send('You know you can\'t mute this member, so why bother trying.');
        }
        const muteMessage = await message.channel.send(`Muting **${member.user.tag}**...`);
        try {
            await this.client.muteHandler.addMute(member, message.guild, time);
            try {
                const mutedRole = await message.guild.roles.fetch(this.client.settings.mutedRole);
                member.roles.add(mutedRole.id);
            }
            catch (error) {
                message.channel.send('There was an error while giving the muted role.');
                console.log(error);
            }
            await this.client.casesHandler.newCase(message.guild, {
                mod: message.author,
                target: member,
                action: this.aliases[0],
                reason: reason,
                duration: time,
            });
            muteMessage.edit(`Sucessfully muted **${member.user.tag}**`);
        }
        catch (error) {
            if (!error.message.startsWith('E11000 duplicate key error collection:')) {
                console.log(error);
            }
            else {
                muteMessage.edit(`**${member.user.tag}** is already muted.`);
            }
        }
    }
}

module.exports = MuteCommand;