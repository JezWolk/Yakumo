const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { MODLOG_COLORS } = require('../../Constants.js');

class CasesHandler {
    constructor(client) {
        this.client = client;

        this.guildModel = this.client.models.guild;

        this.caseModel = this.client.models.case;
    }

    async bumpCaseNumber(guild) {
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

    async buildEmbed(mod, target, action, reason, caseNumber) {
        return new MessageEmbed()
            .setColor(MODLOG_COLORS[action.toUpperCase()])
            .setAuthor(`${mod.tag} - (${mod.id})`, mod.displayAvatarURL({ format: 'png', dynamic: true }))
            .setThumbnail(target.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .setTimestamp(Date.now())
            .setFooter(`Case: ${caseNumber}`)
            .setDescription(stripIndents(`
                **Member:** ${target.user.tag} - (${target.id})
                **Action:** ${this.client.YakumoUtil.capitalize(action)}
                **Reason:** ${reason || 'Not Specified'}
            `));
    }

    async newCase(guild, data) {
        const { mod, target, action, reason } = data;
        const caseNumber = await this.bumpCaseNumber(guild);
        const logEmbed = await this.buildEmbed(mod, target, action, reason, caseNumber);
        const logChannel = guild.channels.cache.get(this.client.settings.modlog);
        logChannel.send(logEmbed);
    }
}

module.exports = CasesHandler;