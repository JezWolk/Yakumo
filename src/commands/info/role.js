const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class RoleCommand extends Command {
    constructor() {
        super('role', {
            aliases: ['role'],
            description: {
                content: 'View info on a role.',
                usage: '[role]',
                examples: ['@Mod', '717862005293187172', 'Member'],
            },
            clientPermissions: ['EMBED_LINKS'],
            category: 'info',
            args: [
                {
                    id: 'role',
                    type: 'role',
                    default: message => message.member.roles.highest,
                },
            ],
        });
    }

    exec(message, { role }) {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setThumbnail(message.guild.iconURL({ dynamic: true, format: 'png' }))
            .addField('Role Information', [
                `Name: ${role.name}`,
                `Color: #${role.color.toString(16)}`,
                `Hoisted: ${role.hoisted ? 'Yes' : 'No'}`,
                `Mentionable: ${role.mentionable ? 'Yes' : 'No'}`,
                `Creation Date: ${moment(role.createdAt).format('l')}`,
            ])
            .addField('Permissions', role.permissions.toArray().map(p => this.client.YakumoUtil.capitalize(p.toLowerCase().replace(/_/g, ' '))));
        message.util.send(embed);
    }
}

module.exports = RoleCommand;