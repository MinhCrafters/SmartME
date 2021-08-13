module.exports = {
    name: 'addemoji',
    aliases: ['addemote'],
    category: 'Utils',
    description: 'Add a guild emoji.',
    usage: '{prefix}addemoji <emoji name> [image url]',
    
    execute(client, message, args) {
        if (args[0]) {
            if (message.attachments && args[1]) {
                message.guild.emojis
                    .create(args[1], args[0])
                    .then(emoji => message.channel.send(`${client.emotes.success} - You successfully created an emoji named **${emoji.name}**!`))
                    .catch(emoji => message.channel.send(`${client.emotes.error} - Something went wrong trying to create an emoji!`))
            } else if (message.attachments.first()) {
                console.log(message.attachments.first().url)

                message.guild.emojis
                    .create(message.attachments.first().url, args[0])
                    .then(emoji => message.channel.send(`${client.emotes.success} - You successfully created an emoji named **${emoji.name}**!`))
                    .catch(emoji => message.channel.send(`${client.emotes.error} - Something went wrong trying to create an emoji!`))
            } else if (args[1]) {
                message.guild.emojis
                    .create(args[1], args[0])
                    .then(emoji => message.channel.send(`${client.emotes.success} - You successfully created an emoji named **${emoji.name}**!`))
                    .catch(emoji => message.channel.send(`${client.emotes.error} - Something went wrong trying to create an emoji!`))
            }
        } 
    }
}