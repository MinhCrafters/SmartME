const weather = require('weather-js');
const discord = require('discord.js')


module.exports = {
    name: "weather",
    category: "Info",
    description: 'Get information about weather of a specific location.',
    usage: "{prefix}weather <location>",
    execute(client, message, args) {
        if (!args.length) {
            return message.channel.send(`${client.emotes.error} - Weather location cannot be empty!`)
        }
        weather.find({
            search: args.join(" "),
            degreeType: 'C'
        }, function(err, result) {
            try {
                let embed = new discord.MessageEmbed()
                    .setTitle(`Weather - ${result[0].location.name}`)
                    .setColor("#8c9eff")
                    .setDescription("Temperature units can may be differ sometimes")
                    .addField("Temperature", `${result[0].current.temperature}°C`, true)
                    .addField("Sky Status", result[0].current.skytext, true)
                    .addField("Humidity", `${result[0].current.humidity}%`, true)
                    .addField("Wind Speed", result[0].current.windspeed, true) //What about image
                    .addField("Observation Time", result[0].current.observationtime, true)
                    .addField("Wind Display", result[0].current.winddisplay, true)
                    .setThumbnail(result[0].current.imageUrl);
                message.channel.send({embeds: [embed]})
            } catch (err) {
                return message.channel.send(`${client.emotes.error} - Unable to get the data of given location!`)
            }
        });
    }
}