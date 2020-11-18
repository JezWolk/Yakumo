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
}

module.exports = MuteHandler;