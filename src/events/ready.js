const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
        });
    }

    async exec() {
        console.log('Yoo this is ready!');

        for (const guild of this.client.guilds.cache) {
            const guildModel = this.client.models.guild;
            let guildDoc = await guildModel.findOne({ guildID: guild[0] });
            if (!guildDoc) {
                guildDoc = new guildModel({ guildID: guild[0] });
                await guildDoc.save();
            }
        }
    }
}

module.exports = ReadyListener;