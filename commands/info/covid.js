const {
    MessageEmbed
} = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "covid",
    category: "Info",
    description: 'Get statistics about COVID-19.',
    usage: "{prefix}covid all/<country name>",
    aliases: ["covid19"],
    async execute(client, message, args) {
        let link;
        let embed = new MessageEmbed()

        if (!args[0] || args[0].match(/all|global|globe|world/gi)) {
            let jsonData = await fetch("https://disease.sh/v3/covid-19/all")
            jsonData = await jsonData.json()
            embed
                .setTitle("Global Cases")
                .setColor("#8c9eff")
                .setDescription("Sometimes cases number may differ from small amount.")
                .addField("Total Cases", jsonData.cases.toLocaleString(), true)
                .addField("Total Deaths", jsonData.deaths.toLocaleString(), true)
                .addField("Total Recovered", jsonData.recovered.toLocaleString(), true)
                .addField("Today's Cases", jsonData.todayCases.toLocaleString(), true)
                .addField("Today's Deaths", jsonData.todayDeaths.toLocaleString(), true)
                .addField("Active Cases", jsonData.active.toLocaleString(), true);
        } else {
            let jsonData = await fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`)
            jsonData = await jsonData.json()

            if (!jsonData.country) return message.reply("I am unable to get the **" + args[0] + "** details.")

            embed.setTitle(`${jsonData.country.toUpperCase()}`)
                .setColor("#8c9eff")
                .setDescription("Sometimes cases number may differ from small amount.")
                .setThumbnail(jsonData.countryInfo.flag || "")
                .addField("Total Cases", jsonData.cases.toLocaleString(), true)
                .addField("Total Deaths", jsonData.deaths.toLocaleString(), true)
                .addField("Total Recovered", jsonData.recovered.toLocaleString(), true)
                .addField("Today's Cases", jsonData.todayCases.toLocaleString(), true)
                .addField("Today's Deaths", jsonData.todayDeaths.toLocaleString(), true)
                .addField("Active Cases", jsonData.active.toLocaleString(), true);
        }
        return message.channel.send({embeds: [embed]}).catch(err => {
            return message.reply("Something went wrong, please try again later.")
        })
    }
}