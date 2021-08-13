module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    category: 'Music',
    description: 'Shuffle song positions on a queue.',
    usage: '{prefix}shuffle',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You're not in the same voice channel!`);

        if (!client.player.getQueue(message.guild)) return message.channel.send(`${client.emotes.error} - No music is currently playing!`);

        const queue = client.player.getQueue(message.guild);

        const success = queue.shuffle();

        if (success) message.channel.send(`${client.emotes.success} - Queue shuffled **${client.player.getQueue(message.guild).tracks.length}** song(s)!`);
    },
};