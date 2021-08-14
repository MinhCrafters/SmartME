const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "advice",
    aliases: [],
    category: "Fun",
    description: 'Get a random advice.',
    usage: '{prefix}advice',

    async execute(client, message) {
        let data = await Random.getAdvice()
            
        message.channel.send({embeds: [data.embed]})
   }
}