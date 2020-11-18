class MuteHandler {
    constructor(client) {
        this.client = client;
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