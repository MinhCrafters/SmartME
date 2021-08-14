const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "joke",
    aliases: [],
    category: "Fun",
    description: 'Get a random joke.',
    usage: '{prefix}joke',

    async execute(client, message) {
        let data = await Random.getJoke()
            
        message.channel.send({embeds: [data.embed]})
   }
}