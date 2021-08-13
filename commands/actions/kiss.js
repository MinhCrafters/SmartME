const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "kiss",
    aliases: [],
    category: "Actions",
    description: 'Kiss someone.',
    usage: '{prefix}kiss <user>',

    async execute(client, message, args) {
        let data = await Random.getAnimeImgURL("kiss")

        let user;

        if (!args[0]) {
            return message.channel.send(`${client.emotes.error} - Please specify a user!`)
        } else {
            user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => {
                return message.channel.send(`${client.emotes.error} - Unable to find this person!`)
            })
        }

        if (!user) {
            return message.channel.send(`${client.emotes.error} - Unable to find this person!`)
        }

        console.log(data)

        if (user.user === message.author) {
            return message.channel.send(`${client.emotes.error} - You can't kiss yourself!`)
        }
        
        const embed = new MessageEmbed()
            .setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
            .setImage(data)
            .setAuthor(`${message.author.username} kisses ${user.user.username}! So sweet...`, user.user.displayAvatarURL({ dynamic: true }))

        message.channel.send({embeds: [embed]})
   }
}