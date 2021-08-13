module.exports = {
    name: 'clearqueue',
    aliases: ['cq'],
    category: 'Music',
    description: 'Clears the existing queue.',
    usage: '{prefix}clearqueue',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

        if (!client.player.getQueue(message.guild)) return message.channel.send(`${client.emotes.error} - No music is currently playing!`);

        if (client.player.getQueue(message.guild).tracks.length <= 1) return message.channel.send(`${client.emotes.error} - There is only one song in the queue.`);

        const queue = client.player.getQueue(message.guild);

        queue.clear();

        message.channel.send(`${client.emotes.success} - The queue has just been **removed**!`);
    },
};