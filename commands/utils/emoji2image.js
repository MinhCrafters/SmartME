const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emoji2image',
    aliases: ['e2i'],
    category: 'Utils',
    description: 'Gets a specific emoji\'s URL.',
    usage: '{prefix}emoji2image <emoji>',

    async execute(client, message, args) {
        if (args[0].match(/<:.+?:\d+>/g)) {
            let emojiName = args[0].match(/:.+?:/g);
            let emojiID = args[0].match(/\d+/g)

            const embed = new MessageEmbed()
                .setTitle(emojiName.toString())
                .setColor('#8c9eff')
                .setDescription(`[Emoji URL](https://cdn.discordapp.com/emojis/${emojiID.toString()}.png)`)
                .setImage(`https://cdn.discordapp.com/emojis/${emojiID.toString()}.png`)
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
                .setTimestamp()
            return message.channel.send({embeds: [embed]})
        } else if (args[0].match(/<a:.+?:\d+>/g)) {
            let emojiName = args[0].match(/:.+?:/g);
            let emojiID = args[0].match(/\d+/g)

            const embed = new MessageEmbed()
                .setTitle(emojiName.toString())
                .setColor('#8c9eff')
                .setDescription(`[Emoji URL](https://cdn.discordapp.com/emojis/${emojiID.toString()}.gif)`)
                .setImage(`https://cdn.discordapp.com/emojis/${emojiID.toString()}.gif`)
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({dynamic: true}))
                .setTimestamp()
            return message.channel.send({embeds: [embed]})
        }
    }
}