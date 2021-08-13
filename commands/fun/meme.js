const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "meme",
    aliases: [],
    category: "Fun",
    description: 'Get a random meme from various websites.',
    usage: '{prefix}meme',

    async execute(client, message) {
        let data = await Random.getMeme()

        const embed = new MessageEmbed()
            .setColor('#8c9eff')
            .setTitle(data.embed.title)
            .setImage(data.embed.image.url)

        message.channel.send({embeds: [embed]})
   }
}