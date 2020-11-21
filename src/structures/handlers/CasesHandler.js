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
}

module.exports = CasesHandler;