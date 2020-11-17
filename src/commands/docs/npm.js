const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const fetch = require('node-fetch');

class DocsCommand extends Command {
    constructor() {
        super('npm', {
            aliases: ['npm'],
            description: {
                content: 'Searches node package manager.',
                usage: '<query>',
                examples: ['discord.js', 'node-fetch'],
            },
            clientPermissions: ['EMBED_LINKS'],
            category: 'docs',
            args: [
                {
					id: 'pkg',
					match: 'content',
					type: 'lowercase',
					prompt: {
						start: message => `${message.author}, what would you like to search?`,
                    },
                },
            ],
        });
    }

    async exec(message, { pkg }) {
        const res = await fetch(`https://registry.npmjs.com/${encodeURIComponent(pkg)}`);
        if (res.status === 404) return message.util.send('No search results found, maybe try searching for something that exists.');
        const body = await res.json();
        const lastestVersion = body.versions[body['dist-tags'].latest];
        const maintainers = lastestVersion.maintainers.map(maintainer => maintainer.name);
        const embed = new MessageEmbed()
            .setColor(0xcb3837)
            .setTitle(lastestVersion.name)
            .setURL(`https://npmjs.com/package/${lastestVersion.name}`)
            .setDescription(lastestVersion.description)
            .addField('Author', body.author ? body.author.name : 'Unknown', true)
            .addField('Name', body.name, true)
            .addField('Licence', lastestVersion.license, true)
            .addField('Version', lastestVersion.version, true)
            .addField('Creation Date', moment(body.time.created).format('L'), true)
            .addField('Modification Date', moment(body.time.modified).format('L'), true)
            .addField('Maintainers', this.client.util.trimArray(maintainers, 10).join(', '));
        message.util.send(embed);
    }
}

module.exports = DocsCommand;