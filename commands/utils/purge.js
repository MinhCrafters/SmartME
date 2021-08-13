module.exports = {
    name: 'purge',
    aliases: ['clear'],
    category: 'Utils',
    description: 'Purge messages.',
    usage: '{prefix}purge all/<amount>',

    execute(client, message, args) {
        if (!args[0] || args[0].match(/all/gi)) {
            message.channel.messages.fetch()
                .then(messages => message.channel.bulkDelete(messages));

            message.channel.send(`${client.emotes.success} - Successfully purged all messages!`)
        } else {
            let messageCount = parseInt(args[0]);
            message.channel.messages.fetch({ limit: messageCount })
                .then(messages => message.channel.bulkDelete(messages));

            message.channel.send(`${client.emotes.success} - Successfully purged **${args[0]}** messages!`)
        }
    }
}