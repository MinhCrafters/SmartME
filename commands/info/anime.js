const fetch = require("node-fetch")
const discord = require("discord.js")
var functions = require("../../utils/functions.js");
const parseMilliseconds = require('pretty-ms');

//If you do not know how GraphQL API works then you wont understand. 
var query = `
query ($search: String) { 
Media (search: $search, type: ANIME) { 
 title {
      romaji
      english
      native
    }
   coverImage {
    large
    color
  }
  nextAiringEpisode {
   timeUntilAiring
    episode
  }
  status
  episodes
  isAdult
  genres
  siteUrl
  description
  bannerImage
  }
}
`

module.exports = {
    name: "anime",
    category: "Info",
    aliases: ["ani"],
    description: 'Get information about a specific anime.',
    usage: "{prefix}anime <anime_name>",

    async execute(client, message, args) {

        if (!args.length) return message.channel.send(`${client.emotes.error} - You need provide the anime name.`)

        let embed = new discord.MessageEmbed()
            .setAuthor("Please wait...", client.user.displayAvatarURL())
            .setColor("YELLOW")
        let msg = await message.channel.send({embeds: [embed]})

        fetch("https://graphql.anilist.co", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: {
                        search: args.join(" ")
                    }
                })
            }
        )
        .then(data => data.json())
        .then(json => {
            json = json.data.Media
                
            console.log(json)

            if (!json) {
                const embed = new discord.MessageEmbed()
                    .setDescription(client.emotes.error + ' - Unable to find anime about `' + args.join(" ") + "`")
                    .setColor('RED')
                return msg.edit({embeds: [embed]})
            }

            embed.setAuthor(json.title.english || json.title.romaji, json.coverImage.large)
                .setColor(json.coverImage.color)
                .setDescription(Replacer(json.description).substring(0, 400) + ` [**[Continue](${json.siteUrl})**]`)
                .setImage(json.bannerImage)
                .addField("Genres", json.genres.join(", "))
                .addField("Is 18+", json.isAdult ? 'Yes' : 'No', true)
                .addField("Status", functions.toTitleCase(json.status.replace(/_/g, " ")), true)
                .setFooter("Anime Hub")

            if (json.nextAiringEpisode) {
                embed.addField("Episode", (json.nextAiringEpisode.episode - 1) + "/" + (json.episodes || " --"), true)
                let time = parseMilliseconds(json.nextAiringEpisode.timeUntilAiring * 1000)
                embed.addField("Next Airing", `${time.days}d ${time.hours}h ${time.minutes}m`, true)
            } else {
                if (!json.episodes) {
                    embed.addField("Total Episodes", 'None', true)
                } else {
                    embed.addField("Total Episodes", json.episodes.toString(), true)
                }
            }
            return msg.edit({embeds: [embed]});
        })
    }
}

function Replacer(string) {
    return string.replace(/<br>/g, "").replace(/<i>/g, "**").replace(/<\/i>/g, "**").replace(/<i\/>/g, "**")
}