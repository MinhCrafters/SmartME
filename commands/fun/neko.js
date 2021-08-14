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
        
        message.channel.send({embeds: [data.embed]})
   }
}