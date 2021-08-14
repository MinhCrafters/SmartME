const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['av'],
    category: 'Utils',
    description: 'Shows a specific user\'s avatar',
    usage: '{prefix}avatar [user] [format] [size]',

    async execute(client, message, args) {
        let format = 'png';
        let size = 2048;

        if (!args[0]) {
            user = message.member;
        } else {
            user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => {
                return message.channel.send(`${client.emotes.error} - Unable to find this person!`);
            });
        }

        if (args[1]) {
            format = args[1];
        }

        if (args[2]) {
            size = parseInt(args[2]);
        }

        if (!user) {
            return message.channel.send(`${client.emotes.error} - Unable to find this person!`);
        }

        if (size > 4096) {
            return message.channel.send(`${client.emotes.error} - Image size must below or equal to 4096 pixels!`);
        }

        if (size < 128) {
            return message.channel.send(`${client.emotes.error} - Image size must above or equal to 128 pixels!`);
        }

        /*
        const embed = new MessageEmbed()
            .setTitle(user.nickname)
            .setImage(user.user.displayAvatarURL({
                dynamic: true,
                format: format,
                size: size
            }))
            .setDescription('Actual image may larger or smaller than this image.')
            .setTimestamp()
            .setFooter(`Image Format: ${format.toUpperCase()}, Image Size: ${size}`);
        */
        
        const embed = new MessageEmbed()
            .setTitle(user.user.username)
            .setColor('#8c9eff')
            .setDescription(`Image Format: ${format.toUpperCase()}\nImage Size: ${size.toString()}\n[Avatar URL](${user.user.displayAvatarURL({dynamic: true, format: format, size: size})})`)
            .setImage(user.user.displayAvatarURL({
                dynamic: true,
                format: format,
                size: size
            }))
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
        
        return message.channel.send({embeds: [embed]})
    }
}