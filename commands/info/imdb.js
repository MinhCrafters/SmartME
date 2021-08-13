const discord = require("discord.js");
const fetch = require("node-fetch");

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

module.exports = {
    name: "imdb",
    aliases: ['movie', 'film', 'series'],
    category: "Info",
    description: 'Get information about a specific movie or film or series.',
    usage: "{prefix}imdb <movie name>",

    async execute(client, message, args, color) {
        if (!args.length) {
            return message.channel.send(`${client.emotes.error} - Please give the name of movie or series`)
        }

        const embed0 = new discord.MessageEmbed()
            .setDescription("Getting the information...")
            .setColor('YELLOW')
        let msg = await message.channel.send({embeds: [embed0]})
        try {
            let movie = await fetch(`https://www.omdbapi.com/?apikey=5e36f0db&t=${args.join("+")}`)
            movie = await movie.json()
            if (!movie.Response) {
                const embed = new discord.MessageEmbed()
                    .setDescription(client.emotes.error + " - Unable to find something about `" + args.join(" ") + "`")
                    .setColor('RED')
                return msg.edit({embeds: [embed]})
            }
            let embed = new discord.MessageEmbed()
                .setTitle(movie.Title)
                .setColor("#8c9eff")
                .setThumbnail(movie.Poster)
                .setDescription(movie.Plot)
                .setFooter(`Ratings: ${movie.imdbRating} | Seasons: ${movie.totalSeasons || "0"}`)
                .addField("Country", movie.Country, true)
                .addField("Languages", movie.Language, true)
                .addField("Type", toTitleCase(movie.Type), true);
            msg.edit({embeds: [embed]})
        } catch (err) {
            const embed = new discord.MessageEmbed()
                .setDescription("Something went wrong :/")
                .setColor('RED')
            msg.edit({embeds: [embed]})
        }
    }
}