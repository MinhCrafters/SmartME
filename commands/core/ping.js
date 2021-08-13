module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Core',
    description: 'Returns bot latency.',
    usage: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`${client.emotes.success} - Ping: **${client.ws.ping}ms**!`);
    },
};