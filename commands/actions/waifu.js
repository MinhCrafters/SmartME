const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "waifu",
    aliases: [],
    category: "Actions",
    description: 'Get a random waifu image.',
    usage: '{prefix}waifu',

    async execute(client, message) {
        let data = await Random.getAnimeImgURL("waifu")

        console.log(data)

        const embed = new MessageEmbed()
            .setColor(message.author.displayHexColor === "#000000" ? "#ffffff" : message.author.displayHexColor)
            .setImage(data)
            .setAuthor(`Your waifu is here!`, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send({embeds: [embed]})
   }
}