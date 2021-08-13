const { Random } = require("something-random-on-discord")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "hug",
    aliases: [],
    category: "Actions",
    description: 'Hug someone.',
    usage: '{prefix}hug <user>',

    async execute(client, message, args) {
        let data = await Random.getAnimeImgURL("hug")
        
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
            return message.channel.send(`${client.emotes.error} - You can't hug yourself!`)
        }

        const embed = new MessageEmbed()
            .setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
            .setImage(data)
            .setAuthor(`${message.author.username} hugs ${user.user.username}! Yay...`, user.user.displayAvatarURL({ dynamic: true }))

        message.channel.send({embeds: [embed]})
   }
}