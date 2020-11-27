const { SETTINGS, LOG_COLORS } = require('../../Constants.js');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

class CaseHandler {
    constructor(client) {
        this.client = client;
    }

    async bump(guild) {
        const caseNum = this.client.settings.items.get(guild.id)[SETTINGS.CASES] || 0;
        const newCase = await this.client.settings.set(guild.id, SETTINGS.CASES, caseNum + 1);
        return newCase.settings.caseNum;
    }

    async log(guild, data) {
        const modlogID = this.client.settings.items.get(guild.id)[SETTINGS.MODLOG];
        const modlog = guild.channels.cache.get(modlogID);
        if (modlog) {
            const { mod, target, action, reason, caseNum } = data;
            const embed = new MessageEmbed()
                .setColor(LOG_COLORS[action.toUpperCase()])
                .setAuthor(`${mod.tag} - (${mod.id})`, mod.displayAvatarURL({ format: 'png', dynamic: true }))
                .setThumbnail(target.displayAvatarURL({ format: 'png', dynamic: true }))
                .setTimestamp(Date.now())
                .setFooter(`Case ${caseNum}`)
                .setDescription(stripIndents(`
                    **Member:** ${target.tag}
                    **Action:** ${action.replace(/^\w/, (l) => l.toUpperCase())}
                    **Reason:** ${reason}
                `));
            const message = await modlog.send(embed);
            return message || null;
        }
    }

    create(data) {
        new this.client.models.cases({
            guild: data.guild,
            id: data.caseNum,
            action: data.action,
            target_id: data.target.id,
            target_tag: data.target.tag,
            mod_id: data.mod.id,
            mod_tag: data.mod.tag,
            log_id: data.log_id,
            created_at: Date.now(),
        }).save().catch(console.error);
    }

    async commit(guild, data) {
        const caseNum = await this.bump(guild);
        data.caseNum = caseNum;
        const message = await this.log(guild, data);
        data.log_id = message.id;
        this.create(data);
    }
}

module.exports = CaseHandler;