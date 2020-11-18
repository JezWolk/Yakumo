const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const statuses = { dnd: 'DND', online: 'online', offline: 'offline', 'idle': 'idle' };

class UserCommand extends Command {
    constructor() {
        super('user', {
            aliases: ['user', 'member'],
            description: {
                content: 'View info on a user.',
                usage: '[user]',
                examples: ['@Coltz', '611466971371929602', 'Jez'],
            },
            clientPermissions: ['EMBED_LINKS'],
            category: 'info',
            args: [
                {
                    id: 'user',
                    type: Argument.union('user', async (_, input) => {
                        try {
                            const user = await this.client.users.fetch(input);
                            return user || null;
                        } catch { } // eslint-disable-line no-empty, brace-style
                    }),
                    default: message => message.author,
                },
            ],
        });
    }

    exec(message, { user }) {
        const member = message.guild.member(user.id);
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
            .addField('User Information', [
                `Username: ${user.tag}`,
                `ID: ${user.id}`,
                `Created At: ${moment(user.createAt).format('l')}`,
                `Status: ${statuses[user.presence.status]}`,
                `Activites: ${this.client.YakumoUtil.trimArray(user.presence.activities.map((act) => act.name), 3).join(', ') || 'None'}`,
            ]);

        if (member) {
            embed.addField('Member Information', [
                `Nickname: ${member.nickname || 'None'}`,
                `Roles: ${member.roles.cache.filter(r => r.name !== '@everyone').sort((a, b) => b.position - a.position).map(r => r)}`,
                `Joined At: ${moment(member.joinedAt).format('l')}`,
            ]);
        }
        message.util.send(embed);
    }
}

module.exports = UserCommand;