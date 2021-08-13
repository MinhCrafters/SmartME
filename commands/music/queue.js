module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    description: 'Shows the guild queue list.',
    usage: '{prefix}queue',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You're not in the same voice channel!`);

        const queue = client.player.getQueue(message.guild);

        if (!client.player.getQueue(message.guild)) return message.channel.send(`${client.emotes.error} - No songs are currently playing!`);

        message.channel.send(`**Guild Queue - ${message.guild.name} ${client.emotes.queue} ${client.player.getQueue(message.guild).repeatMode ? '(looped)' : ''}\n**Current: __${queue.current.title}__ - by **${queue.current.author}**\n\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - __${track.title}__ - by **${track.author}** (Requested by: ${track.requestedBy.username})`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In total of **${queue.tracks.length}** song(s)...`}`));
    },
};