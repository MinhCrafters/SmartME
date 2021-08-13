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

        console.log(data)

        const embed = new MessageEmbed()
            .setTitle(data.embed.title)
            .setDescription(data.embed.description)
            .setFooter(data.embed.footer.text)
            .setColor('#8c9eff')
            
        message.channel.send({embeds: [embed]})
   }
}