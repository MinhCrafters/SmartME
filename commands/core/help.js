const { MessageEmbed } = require('discord.js');
const prefix1 = require('discord-prefix');

let defaultPrefix = require('../../utils/config.js').discord.prefix;

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    description: 'Shows the help panel.',
    usage: '{prefix}help <command name>',

    execute(client, message, args) {
        if (!args[0]) {
            const core = message.client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(', ');
            const utils = message.client.commands.filter(x => x.category == 'Utils').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');
            const fun = message.client.commands.filter(x => x.category == 'Fun').map((x) => '`' + x.name + '`').join(', ');
            // const rp = message.client.commands.filter(x => x.category == 'Role-playing').map((x) => '`' + x.name + '`').join(', ');
            const actions = message.client.commands.filter(x => x.category == 'Actions').map((x) => '`' + x.name + '`').join(', ');
            const info = message.client.commands.filter(x => x.category == 'Info').map((x) => '`' + x.name + '`').join(', ');

            let current_prefix = prefix1.getPrefix(message.guild.id)

            if (!current_prefix) {
                current_prefix = defaultPrefix;
            }

            const embed = new MessageEmbed()
                .setAuthor('Help Panel', message.author.displayAvatarURL({dynamic: true}))
                .setColor('#8c9eff')
                .setDescription(`Get more information of a command by typing ${current_prefix}help <command>`)
                .setFooter('A bot made by MinhCrafters')
                .setTimestamp()
                .addFields(
                    { name: 'Core Utils', value: core },
                    { name: 'Music (WIP)', value: music },
                    { name: 'Fun', value: fun },
                    // { name: 'Role-playing', value: rp },
                    { name: 'Actions', value: actions },
                    { name: 'Info', value: info },
                    { name: 'Utilities', value: utils },
                    { name: 'Available Music Filters', value: client.filters.map((x) => '`' + x + '`').join(', ') },
                )

            message.channel.send({embeds: [embed]});
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            let current_prefix = prefix1.getPrefix(message.guild.id)

            if (!current_prefix) {
                current_prefix = defaultPrefix;
            }

            if (!command) return message.channel.send(`${client.emotes.error} - This command is not exist!`);

            const embed = new MessageEmbed()
                .setAuthor(`Command help for ${command.name}`, message.author.displayAvatarURL({dynamic: true}))
                .setColor('#8c9eff')
                .setDescription(command.description)
                .setFooter('Required arguments: <>, optional arguments: [].')
                .setTimestamp()
                .addFields(
                    { name: 'Name', value: command.name, inline: true },
                    { name: 'Category', value: command.category, inline: true },
                    { name: 'Alias(es)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                    { name: 'Usage', value: command.usage.replace('{prefix}', current_prefix), inline: true },
                )

            message.channel.send({embeds: [embed]});
        };
    },
};