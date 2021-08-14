const prefix = require('discord-prefix');

module.exports = {
    name: 'prefix',
    aliases: [],
    category: 'Core',
    description: 'Set a custom prefix.',
    usage: '{prefix}prefix <new prefix>',

    execute(client, message, args) {
        if (message.member.hasPermission('MANAGE_SERVER')) {
            if (!args.length) return message.channel.send(`${client.emotes.error} - Please provide the new prefix!`);

            prefix.setPrefix(args.join(" "), message.guild.id);

            message.channel.send(`${client.emotes.success} - Successfully changed prefix to **${args[0]}**!`)
        } else {
            return message.channel.send(`${client.emotes.error} - Insufficient permission!`)
        }
    }
}