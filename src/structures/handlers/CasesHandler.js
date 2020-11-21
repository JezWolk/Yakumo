const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { MODLOG_COLORS } = require('../../Constants.js');

class CasesHandler {
    constructor(client) {
        this.client = client;

        this.guildModel = this.client.models.guild;
    }

    async updateCaseNumber(guild) {
        try {
            const guildDoc = await this.guildModel.findOneAndUpdate({
                guild_id: guild.id,
            }, {
                $inc: { case_number: 1 },
            });
            return guildDoc.case_number + 1;
        }
        catch (error) {
            console.log(error);
        }
    }

    async sendModlog(guild, data, caseNumber) {
        const { action, mod, target, reason } = data;
        const modlogChannel = guild.channels.cache.get(this.client.settings.modlog);
        const modlog = new MessageEmbed()
            .setColor(MODLOG_COLORS[action])
            .setAuthor(`${mod.tag} - (${mod.id})`, mod.displayAvatarURL({ format: 'png', dynamic: true }))
            .setThumbnail(target.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .setTimestamp(Date.now())
            .setFooter(`Case: ${caseNumber}`)
            .setDescription(stripIndents`
                **Member:** ${target.user.tag} - (${target.id})
                **Action:** ${this.client.YakumoUtil.capitalize(action)}
                **Reason:** ${reason || 'Not Specified'}
            `);
        modlogChannel.send(modlog);
    }

    async newCase(guild, data) {
        const caseCount = await this.updateCaseNumber(guild);
        this.sendModlog(guild, data, caseCount);
    }
}

module.exports = CasesHandler;