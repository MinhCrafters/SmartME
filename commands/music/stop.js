module.exports = {
    name: 'stop',
    aliases: ['dc', 'dis'],
    category: 'Music',
    description: 'Stops music and leaves the voice channel.',
    usage: '{prefix}stop',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You're not in the same voice channel!`);

        if (!client.player.getQueue(message.guild)) return message.channel.send(`${client.emotes.error} - No music is currently playing!`);

        const queue = client.player.getQueue(message.guild);

        queue.setRepeatMode(0);
        queue.stop();

        message.channel.send(`${client.emotes.success} - Music **stopped**!`);
    },
};