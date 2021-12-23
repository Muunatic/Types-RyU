import fs = require('fs');
import { Client, Intents, Collection, MessageEmbed } from 'discord.js';
import { token, prefix } from './src/data/config';

const client = new Client({ 
    
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_BANS, 
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 
        Intents.FLAGS.GUILD_INTEGRATIONS, 
        Intents.FLAGS.GUILD_INVITES, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS
    ],

    partials:
    [
        "CHANNEL",
        "GUILD_MEMBER",
        "MESSAGE",
        "REACTION",
        "USER"
    ]

});

const commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	commands.set(command.data.name, command);
}

client.on('ready', () => {

    console.log('Hello, World!');
    client.user?.setActivity({name: 'Hello, World!', type: 'PLAYING', url: 'https://www.twitch.tv/discord'});
    client.user?.setPresence({status: 'online'});

});

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    
    if (commandName === 'ping') {
        await interaction.reply(`Pong !! \`${client.ws.ping}ms.\` Latensi \`${Date.now() - interaction.createdTimestamp}ms.\``);
    }

});

client.on('messageCreate', async message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase()

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (!message.guild) return;

    if (command === 'help') {
        const embed = new MessageEmbed()
        .setColor('#89e0dc')
        .setAuthor('Help commands')
        .setFooter(`${prefix}help`)
        .addFields({
            name: 'General commands', value: `help, ping`, inline: true
        })
        .setDescription(`Prefix = **${prefix}**`)
        .setTimestamp()

        message.channel.send({embeds: [embed]});
    }

});

client.login(token);