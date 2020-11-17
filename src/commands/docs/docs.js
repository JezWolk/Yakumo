const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class DocsCommand extends Command {
    constructor() {
        super('docs', {
            aliases: ['docs'],
            description: {
                content: 'Searches discord.js documentation.',
                usage: '<query>',
                examples: ['Client', 'ClientUser#setActivity', 'CommandHandler --src=akairo-master'],
            },
            clientPermissions: ['EMBED_LINKS'],
            category: 'docs',
            args: [
                {
					id: 'query',
					match: 'content',
					type: 'lowercase',
					prompt: {
						start: message => `${message.author}, what would you like to search?`,
                    },
                },
                {
					id: 'project',
					match: 'content',
                    type: /\s?--src=([a-zA-Z-]+)/,
                    default: 'stable',
                },
            ],
        });
    }

    async exec(message, { query, project }) {
        project = project instanceof Object ? project.match[1] : project;
        query = query.replace(RegExp(`\\s?--src=${project}`), '');
        const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${encodeURIComponent(project)}&q=${encodeURIComponent(query)}`);
        const embed = await res.json();
        if (!embed) return message.util.send('No search results found, maybe try searching for something that exists.');
        message.util.send({ embed: embed });
    }
}

module.exports = DocsCommand;