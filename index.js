const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const config = require('./utils/config.js');
const { Player } = require('discord-player');

function parseQuotes(str = '') {
	let current = '',
		arr = [],
		inQuotes = false;

	for (let char of str) {
		if (char == '"') {
			inQuotes = !inQuotes;
		} else if (char == ' ' && !inQuotes) {
			arr.push(current);
			current = '';
		} else {
			current += char;
		}
	}

	arr.push(current);

	return arr;
}

const client = new Client({
	disableMentions: 'everyone',
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

client.player = new Player(client, {
	ytdlDownloadOptions: {
		filter: 'audioonly',
	},
});

var playing = false;

client.playing = playing;
client.config = config;
client.emotes = client.config.emotes;
client.filters = client.config.filters;
client.commands = new Collection();

const prefix1 = require('discord-prefix');

fs.readdirSync('./commands').forEach((dirs) => {
	const commands = fs
		.readdirSync(`./commands/${dirs}`)
		.filter((files) => files.endsWith('.js'));

	for (const file of commands) {
		const command = require(`./commands/${dirs}/${file}`);
		console.log(`Loading command ${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
});

client.player.on('trackStart', (queue, track) => {
	queue.metadata.channel.send(
		`${client.emotes.music} - Now playing **${track.title}** to _${queue.metadata.message.member.voice.channel.name}_...`
	);
	playing = true;
});

client.player.on('trackEnd', (queue, track) => {
	playing = false;
});

client.player.on('trackAdd', (queue, track) => {
	queue.metadata.channel.send(
		`${client.emotes.music} - **${track.title}** has been added to the queue!`
	);
});

client.player.on(
	'searchInvalidResponse',
	(queue, tracks, content, collector) => {
		if (content === 'cancel') {
			collector.stop();
			return queue.metadata.channel.send(
				`${client.emotes.success} - The selection has been **cancelled**!`
			);
		} else
			queue.metadata.channel.send(
				`${client.emotes.error} - You must send a valid number between **1** and **${tracks.length}**!`
			);

		playing = false;
	}
);

client.player.on('searchCancel', (queue) => {
	queue.metadata.channel.send(
		`${client.emotes.error} - You did not provide a valid response... Please send the command again!`
	);
	playing = false;
});

client.player.on('queueEnd', (queue) => {
	// queue.metadata.channel.send(`${client.emotes.off} - Music stopped as there is no more songs in the queue!`);
	playing = false;
});

client.player.on('playlistAdd', (queue, playlist) => {
	queue.metadata.channel.send(
		`${client.emotes.music} - ${playlist.title} has been added to the queue (**${playlist.tracks.length}** songs)!`
	);
});

client.player.on('noResults', (queue, query) => {
	queue.metadata.channel.send(
		`${client.emotes.error} - No results found on YouTube for ${query}!`
	);
	playing = false;
});

client.player.on('error', (queue, error, ...args) => {
	switch (error) {
		case 'NotPlaying':
			queue.metadata.channel.send(
				`${client.emotes.error} - There is no music being played on this server!`
			);
			break;
		case 'NotConnected':
			queue.metadata.channel.send(
				`${client.emotes.error} - You are not connected in any voice channel!`
			);
			break;
		case 'UnableToJoin':
			queue.metadata.channel.send(
				`${client.emotes.error} - I am not able to join your voice channel, please check my permissions!`
			);
			break;
		case 'VideoUnavailable':
			queue.metadata.channel.send(
				`${client.emotes.error} - ${args[0].title} is not available in your country! Skipping...`
			);
			break;
		case 'MusicStarting':
			queue.metadata.channel.send(
				`The music is starting... please wait and retry!`
			);
			break;
		default:
			queue.metadata.channel.send(
				`${client.emotes.error} - I'm sorry, something went wrong... ${error}`
			);
	}

	playing = false;
});

client.player.on('channelEmpty', (queue) => {
	queue.metadata.channel.send(
		`${client.emotes.error} - Music stopped as there is no more member in the voice channel!`
	);
	playing = false;
});

client.player.on('botDisconnect', (queue) => {
	queue.metadata.channel.send(
		`${client.emotes.error} - Music stopped as I have been disconnected from the channel!`
	);
	playing = false;
});

client.once('ready', () => {
	console.log(
		`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`
	);

	client.user.setActivity(
		client.config.discord.activity.replace(
			'{prefix}',
			client.config.discord.prefix
		),
		{ type: client.config.discord.activityType }
	);
});

client.on('messageCreate', async (message) => {
	if (message.author.bot || !message.guild || message.webhookId) return;

	let prefix = prefix1.getPrefix(message.guild.id);
	if (!prefix) prefix = client.config.discord.prefix;

	if (message.content.indexOf(prefix) !== 0) {
		if (message.mentions.has(client.user)) {
			message.channel.send(
				client.emotes.info + ' - My prefix is `' + prefix + '`!'
			);
		} else {
			// handleTalk(message);
			// try {
			// 	var raw = storage.getItem('roleplay');

			// 	console.log(raw);

			// 	var data = JSON.parse(raw);

			// 	console.log('JSON parsed: \n' + data)

			// 	for (const webhooks of data[`${message.guild.id}`]['webhooks']) {
			// 		if (message.content.startsWith(webhooks['prefix'])) {
			// 			if (webhooks['avatarURL'] !== '') {
			// 				const webhook = message.channel.createWebhook(webhooks['username'], {
			// 					avatar: webhooks['avatarURL']
			// 				});

			// 				webhook.send({content: message.content.slice(webhooks['prefix'].length)}).then(webhook.delete());
			// 			} else {
			// 				const webhook = message.channel.createWebhook(webhooks['username']);

			// 				webhook.send({content: message.content.slice(webhooks['prefix'].length)}).then(webhook.delete());
			// 			}
			// 		}
			// 	}
			// } catch {
			// 	return console.log(console.error);
			// }
			return;
		}
	}

	const args = parseQuotes(message.content.slice(prefix.length).trim());
	const command = args.shift().toLowerCase();

	const cmd =
		client.commands.get(command) ||
		client.commands.find(
			(cmd) => cmd.aliases && cmd.aliases.includes(command)
		);

	if (cmd) {
		cmd.execute(client, message, args);
	}
});

client.login(client.config.discord.token);
