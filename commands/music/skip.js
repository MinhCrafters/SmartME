module.exports = {
    name: 'skip',
    aliases: ['sk'],
    category: 'Music',
    description: 'Skips a song.',
    usage: '{prefix}skip',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You're not in the same voice channel!`);

        if (!client.player.getQueue(message.guild)) return message.channel.send(`${client.emotes.error} - No music is currently playing!`);

        const queue = client.player.getQueue(message.guild);

        const success = queue.skip();

        if (success) message.channel.send(`${client.emotes.success} - The current song has just been **skipped**!`);
    },
};