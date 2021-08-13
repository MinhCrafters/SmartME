const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "fact",
    aliases: ['funfact'],
    category: "Fun",
    description: 'Get a random fact.',
    usage: '{prefix}fact',

    async execute(client, message) {
        let data = await Random.getFact()

        console.log(data)

        const embed = new MessageEmbed()
            .setColor('#8c9eff')
            .setDescription(data.embed.description)

        message.channel.send({embeds: [embed]})
   }
}