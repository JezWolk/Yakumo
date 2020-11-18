class MuteHandler {
    constructor(client) {
        this.client = client;

        setInterval(async () => {
            for (const guild of this.client.guilds.cache) {
                const mutedArray = await this.check(guild[0]);
                for (const muted of mutedArray) {
                    if (Date.now() >= Number(muted.expiryDate)) {
                        this.endMute(muted.userID, guild[1], muted);
                    }
                }
            }
        }, 2000);
    }

    async endMute(member, guild, doc) {
        member = guild.member(doc.userID);
        if (member) {
            try {
                const mutedRole = await guild.roles.fetch(this.client.settings.mutedRole);
                if (mutedRole) member.roles.remove(mutedRole.id);
            }
            catch { } // eslint-disable-line no-empty, brace-style
        }
        try {
            await doc.deleteOne();
        }
        catch { } // eslint-disable-line no-empty, brace-style
    }

    async addMute(member, guild, duration) {
        const muteDoc = new this.client.models.muteModel({
            userID: member.id,
            guildID: guild.id,
            expiryDate: new Date(Date.now() + duration),
        });

        await muteDoc.save();
    }

    async check(guild) {
        try {
            const guildDoc = await this.client.models.muteModel.find({ guildID: guild });
            return guildDoc || [];
        }
        catch (error) { console.log(error); }
    }
}

module.exports = MuteHandler;