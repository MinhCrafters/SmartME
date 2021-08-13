module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    description: 'Pauses the queue.',
    usage: '{prefix}pause',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You're not in the same voice channel !`);

        if (!client.player.getQueue(message.guild)) return message.channel.send(`${client.emotes.error} - No music is currently playing!`);

        const queue = client.player.getQueue(message.guild)

        queue.setPaused(true)
        
        message.channel.send(`${client.emotes.success} - Song **${queue.current.title}** paused!`)
    },
};