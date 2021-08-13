const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "neko",
    aliases: [],
    category: "Fun",
    description: 'Get a random neko image.',
    usage: '{prefix}neko',

    async execute(client, message) {
        let data = await Random.getNeko()

        console.log(data)

        const embed = new MessageEmbed()
            .setColor('#8c9eff')
            .setTitle(data.embed.title)
            .setImage(data.embed.image.url)
        
        message.channel.send({embeds: [embed]})
   }
}