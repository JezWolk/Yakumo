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
            ],
        });
    }

    async exec(message, { member, time }) {
        if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) {
            return message.channel.send('You know you can\'t mute this member, so why bother trying.');
        }
        const muteMessage = await message.channel.send(`Muting **${member.user.tag}**...`);
        try {
            await this.client.muteHandler.addMute(member, message.guild, time);
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