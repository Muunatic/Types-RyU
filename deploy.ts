import fs = require('fs');
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { token, clientId } from './src/data/config';

const commands = [

    new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help commands'),

    new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Client ping'),
    
]

.map(command => command.toJSON());

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Refreshing!');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Deployed!');
	} catch (error) {
		console.error(error);
	}
})();