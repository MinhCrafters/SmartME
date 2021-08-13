module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    category: 'Music',
    description: 'Toggles loop mode.',
    usage: '{prefix}loop track/queue',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

        if (!client.player.getQueue(message.guild)) return message.channel.send(`${client.emotes.error} - No music is currently playing!`);

        const queue = client.player.getQueue(message.guild);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (queue.repeatMode) {
                queue.setRepeatMode(0);
                return message.channel.send(`${client.emotes.success} - Queue repeat mode **disabled**!`);
            } else {
                queue.setRepeatMode(2);
                return message.channel.send(`${client.emotes.success} - Queue repeat mode **enabled**!`);
            };
        } else if (args.join(" ").toLowerCase() === 'track') {
            if (queue.repeatMode) {
                queue.setRepeatMode(0);
                return message.channel.send(`${client.emotes.success} - Music repeat mode **disabled**!`);
            } else {
                queue.setRepeatMode(1);
                return message.channel.send(`${client.emotes.success} - Music repeat mode **enabled**!`);
            };
        } else {
            return message.channel.send(`${client.emotes.error} - Invalid **mode**!`);
        }
    },
};