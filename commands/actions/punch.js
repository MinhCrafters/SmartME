const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "punch",
    aliases: [],
    category: "Actions",
    description: 'Punch someone.',
    usage: '{prefix}punch <user>',

    async execute(client, message, args) {
        let data = await Random.getAnimeImgURL("punch")

        let user;

        if (!args[0]) {
            return message.channel.send(`${client.emotes.error} - Please specify a user!`)
        } else {
            user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => {
                return message.channel.send(`${client.emotes.error} - Unable to find this person!`)
            })
        }

        if (!user) {
            return message.channel.send(`${client.emotes.error} - Unable to find this person!`)
        }

        console.log(data)

        if (user.user === message.author) {
            const embed = new MessageEmbed()
                .setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
                .setImage(data)
                .setAuthor(`${message.author.username} punches themselves! It hurts...`, user.user.displayAvatarURL({ dynamic: true }))

            message.channel.send({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
                .setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
                .setImage(data)
                .setAuthor(`${message.author.username} punches ${user.user.username}! Pain...`, user.user.displayAvatarURL({ dynamic: true }))

            message.channel.send({embeds: [embed]})
        }
   }
}