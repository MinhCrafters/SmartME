const { MessageEmbed } = require('discord.js');

function numberWithCommas(int) {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    description: 'Shows now playing stats as an embed.',
    usage: '{prefix}nowplaying',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You're not in the same voice channel!`);

        if (!client.player.getQueue(message.guild.id)) return message.channel.send(`${client.emotes.error} - No music is currently playing!`);

        const queue = client.player.getQueue(message.guild);

        const track = queue.nowPlaying();
        let repeat_mode = '';

        console.log(track.title);
        console.log(track.author);
        console.log(track.requestedBy.username);
        console.log(track.fromPlaylist);
        console.log(track.views);
        console.log(track.duration);
        console.log(queue.volume);
        console.log(queue.repeatMode);

        if (queue.repeatMode === 0) {
            repeat_mode = 'Off';
        }
        else if (queue.repeatMode === 1) {
            repeat_mode = 'Queue';
        }
        else if (queue.repeatMode === 2) {
            repeat_mode = 'Track';
        }
        else if (queue.repeatMode === 3) {
            repeat_mode = 'Autoplay';
        } else {
            repeat_mode = 'Off';
        }

        const embed = new MessageEmbed()
            .setAuthor('Now playing', message.author.displayAvatarURL({dynamic: true}))
            .setColor('#8c9eff')
            .setTitle(`[**${track.title}**](${track.url})`)
            .setFooter('A bot made by MinhCrafters')
            .setTimestamp()
            .setThumbnail(track.thumbnail)
            .addFields(
                { name: 'Channel', value: track.author, inline: true },
                { name: 'Requested by', value: track.requestedBy.username, inline: true },

                { name: 'Views', value: numberWithCommas(parseInt(track.views)), inline: true },
                { name: 'Duration', value: '`' + track.duration + '`', inline: true },

                { name: 'Volume', value: queue.volume.toString(), inline: true },
                { name: 'Looping mode', value: repeat_mode, inline: true },

                { name: 'Progress', value: queue.createProgressBar(), inline: false}
            )

        message.channel.send({embeds: [embed]});
    },
};