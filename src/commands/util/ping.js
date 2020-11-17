const { Command } = require('discord-akairo');

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
        const messagePing = Math.round(msg.createdTimestamp - message.createdTimestamp);
        return message.util.send(`Ping: \`${messagePing}ms\`\nHeartbeat: \`${this.client.ws.ping}ms\``);
	}
}

module.exports = PingCommand;