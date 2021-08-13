const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "cry",
    aliases: [],
    category: "Actions",
    description: 'Just cry.',
    usage: '{prefix}cry',

    async execute(client, message) {
        let data = await Random.getAnimeImgURL("cry")

        console.log(data)

        const embed = new MessageEmbed()
            .setColor(message.author.displayHexColor === "#000000" ? "#ffffff" : message.author.displayHexColor)
            .setImage(data)
            .setAuthor(`${message.author.username} is crying!`, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send({embeds: [embed]})
   }
}