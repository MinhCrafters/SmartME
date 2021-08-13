let filtersInUse = [];
let filtersUpdated = {};

module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Music',
    description: 'Set a filter to a queue.',
    usage: '{prefix}filter [filter name]',

    async execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

        if (!client.player.getQueue(message.guild)) return message.channel.send(`${client.emotes.error} - No music is currently playing!`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Please specify a valid filter!`);

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`${client.emotes.error} - This filter doesn't exist, try for example (8D, vibrato, pulsator...)!`);

        const queue = client.player.getQueue(message.guild);

        const index = filtersInUse.indexOf(filterToUpdate);

        if (!filtersInUse[index]) {
            message.channel.send(`${client.emotes.music} - I'm **adding** the filter to the music, please wait... (NOTE: The longer the music is, the longer this will take.)`);
        } else {
            message.channel.send(`${client.emotes.music} - I'm **disabling** the filter on the music, please wait... (NOTE: The longer the music is playing, the longer this will take.)`);
        }

        if (args[0].toLowerCase() === filterToUpdate) {
            const index = filtersInUse.indexOf(filterToUpdate);

            if (!filtersInUse[index]) {
                filtersUpdated[filterToUpdate] = true;
                filtersInUse[filtersInUse.length] = filterToUpdate;
                message.channel.send(`${client.emotes.success} - Successfully enabled **${filterToUpdate.toLowerCase()}** filter!`)
            } else {
                filtersUpdated[filterToUpdate] = false;
                if (index > -1) {
                    filtersInUse.splice(index, 1);
                    message.channel.send(`${client.emotes.success} - Successfully disabled **${filterToUpdate.toLowerCase()}** filter!`)
                }
            }
        }

        const result = filtersUpdated;

        console.log(result);

        await queue.setFilters(result);
    },
};