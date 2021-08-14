const { MessageEmbed } = require('discord.js');
const prefix = require('discord-prefix');

let defaultPrefix = require('../../utils/config.js').discord.prefix;

module.exports = {
    name: 'w-filters',
    aliases: ['filters'],
    category: 'Music',
    description: 'Shows the current filters of a queue.',
    usage: '{prefix}w-filters',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You're not in the same voice channel!`);

        if (!client.player.getQueue(message.guild)) return message.channel.send(`${client.emotes.error} - No music is currently playing!`);

        const queue = client.player.getQueue(message.guild);

        let enabledFilters = queue.getFiltersEnabled().map((x) => '`' + x + '`').join(", ");
        let disabledFilters = queue.getFiltersDisabled().map((x) => '`' + x + '`').join(", ");

        if (!enabledFilters) enabledFilters = "None";
        if (!disabledFilters) disabledFilters = "None";

        console.log(enabledFilters, disabledFilters);

        let current_prefix = prefix.getPrefix(message.guild.id);

        if (!current_prefix) {
            current_prefix = defaultPrefix;
        };

        const embed = new MessageEmbed()
            .setColor(message.author.color)
            .setTimestamp()
            .setDescription(`List of all filters enabled and disabled.\nUse \`${current_prefix}filter\` to add a filter to a song.`)
            .addFields(
                { name: 'Enabled Filters', value: enabledFilters, inline: true },
                { name: 'Disabled Filters', value: disabledFilters, inline: false },
            )
            .setFooter('A bot made by MinhCrafters')

        message.channel.send({embeds: [embed]});
    },
};