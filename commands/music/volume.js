module.exports = {
    name: 'volume',
    aliases: [],
    category: 'Music',
    description: 'Sets volume of a queue.',
    usage: '{prefix}volume [1-100]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You're not in the same voice channel!`);

        if (!client.player.getQueue(message.guild)) return message.channel.send(`${client.emotes.error} - No music is currently playing!`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`${client.emotes.error} - Please enter a valid number!`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`${client.emotes.error} - Please enter a valid number (between 1 and 100)!`);

        const queue = client.player.getQueue(message.guild);

        const success = queue.setVolume(parseInt(args[0]));

        if (success) message.channel.send(`${client.emotes.success} - Volume set to **${parseInt(args[0])}%**!`);
    },
};