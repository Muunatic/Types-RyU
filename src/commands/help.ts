import { SlashCommandBuilder } from '@discordjs/builders';
import { prefix } from '../data/config';

module.exports = {
	data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help commands'),
    async execute(interaction) {
        const embed = {
            color: '#89e0dc',
            author: { name: 'Help commands' },
            footer: { text: `${prefix}help` },
            fields: [
                { name: 'General command', value: 'help, ping' },
            ],
            timestamp: new Date(),
            description: `Prefix = **${prefix}**`,
        }
        await interaction.reply({embeds: [embed]});
    },
};
