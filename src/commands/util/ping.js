const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			description: {
				content: 'Checks the bot\'s ping to the Discord server.',
			},
            category: 'util',
            editable: true,
		});
	}

	async exec(message) {
        const msg = await message.util.send('Pinging...');
        const timeDiff = (msg.editedAt || msg.createdAt) - (message.editedAt || message.createdAt);
        message.util.send(stripIndents(`
            🔂 **Ping**: ${timeDiff} ms
            💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms
        `));
	}
}

module.exports = PingCommand;