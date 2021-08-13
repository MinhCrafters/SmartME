const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "smug",
    aliases: [],
    category: "Actions",
    description: 'Smug uwu.',
    usage: '{prefix}smug',

    async execute(client, message) {
        let data = await Random.getAnimeImgURL("smug")

        console.log(data)

        const embed = new MessageEmbed()
            .setColor(message.author.displayHexColor === "#000000" ? "#ffffff" : message.author.displayHexColor)
            .setImage(data)
            .setAuthor(`${message.author.username} is smugging!`, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send({embeds: [embed]})
   }
}