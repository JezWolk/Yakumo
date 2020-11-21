const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { MODLOG_COLORS } = require('../../Constants.js');

class CasesHandler {
    constructor(client) {
        this.client = client;

        this.guildModel = this.client.models.guild;
    }

    async updateCaseCount(guild) {
        try {
            await this.guildModel.findOneAndUpdate({
                guildID: guild.id,
            }, {
                $inc: { caseCount: 1 },
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    async sendModlog(guild, data) {
        const { action, mod, target, reason } = data;
        const modlogChannel = guild.channels.cache.get(this.client.settings.modlog);
        const modlog = new MessageEmbed()
            .setColor(MODLOG_COLORS[action])
            .setAuthor(`${mod.tag} - (${mod.id})`, mod.displayAvatarURL({ format: 'png', dynamic: true }))
            .setThumbnail(target.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .setTimestamp(Date.now())
            .setDescription(stripIndents`
                **Member:** ${target.user.tag} - (${target.id})
                **Action:** ${this.client.YakumoUtil.capitalize(action)}
                **Reason:** ${reason || 'Not Specified'}
            `);
        modlogChannel.send(modlog);
    }
}

module.exports = CasesHandler;