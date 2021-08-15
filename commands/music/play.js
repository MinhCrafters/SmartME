const { MessageEmbed } = require('discord.js');

var playing = false;

module.exports = {
	name: 'play',
	aliases: ['p'],
	category: 'Music',
    description: 'Play a song from name or URLs.',
	usage: '{prefix}play [Name/URL]',

	async execute(client, message, args) {
		if (!message.member.voice.channel)
			return message.channel.send(
				`${client.emotes.error} - You're not in a voice channel!`
			);

		if (
			message.guild.me.voice.channel &&
			message.member.voice.channel.id !==
				message.guild.me.voice.channel.id
		)
			return message.channel.send(
				`${client.emotes.error} - You're not in the same voice channel!`
			);

		if (!args[0])
			return message.channel.send(
				`${client.emotes.error} - Please provide the title/URL of the song!`
			);

		const queue = client.player.createQueue(message.guild, {
			metadata: {
				channel: message.channel,
				message: message
			},
		});

		try {
			if (!queue.connection)
				await queue.connect(message.member.voice.channel);
		} catch {
			return message.channel.send(
				`${client.emotes.error} - Could not join your voice channel!`
			);
		}

		const song = await client.player.search(
			args.join(' ').replace(/^\<+|\>+$/g, ''),
			{
				requestedBy: message.author,
			}
		);

		console.log(args.join(' ').replace(/^\<+|\>+$/g, ''));
		
		if (args.join(' ').includes('http')) {
			if (song.playlist) {
				queue.addTracks(song.playlist.tracks);
			} else {
				queue.addTrack(song.tracks[0]);
			}
		} else {
			message.channel.send(client.emotes.music + ' - Searching `' + args[0] + '` on YouTube...')

			const embed = new MessageEmbed()
				.setColor('#8c9eff')
				.setAuthor(`Choose a song to play`)
				.setFooter(
					"Type the specified song's position in the chat or type 'cancel' to cancel"
				)
				.setTimestamp()
				.setDescription(
					`${song.tracks
						.map(
							(t, i) =>
								`**#${i + 1}** - __${t.title}__ - by **${
									t.author
								}**`
						)
						.slice(0, 5)
						.join('\n')}`
				);

			let msg = await message.channel.send({ embeds: [embed] });

			/*
            const num1 = '1️⃣';
            const num2 = '2️⃣';
            const num3 = '3️⃣';
            const num4 = '4️⃣';
            const num5 = '5️⃣';

            msg.react(num1)
                .then(() => msg.react(num2))
                .then(() => msg.react(num3))
                .then(() => msg.react(num4))
                .then(() => msg.react(num5))

            
            const filter = (reaction, user) => {
                return [num1, num2, num3, num4, num5].includes(result.content.toLowerCase()) && user.id === message.author.id;
            };
            */

			const filter = (response) => {
				return ['1', '2', '3', '4', '5', 'cancel'].some(
					(answer) =>
						answer.toLowerCase() === response.content.toLowerCase()
				);
			};

			await msg.channel
				.awaitMessages({
					filter,
					max: 1,
					time: 30000,
					errors: ['time'],
				})
				.then((collected) => {
					const result = collected.first();

					if (result.content === '1') {
						msg.delete();
						queue.addTrack(song.tracks[0]);
					} else if (result.content === '2') {
						msg.delete();
						queue.addTrack(song.tracks[1]);
					} else if (result.content === '3') {
						msg.delete();
						queue.addTrack(song.tracks[2]);
					} else if (result.content === '4') {
						msg.delete();
						queue.addTrack(song.tracks[3]);
					} else if (result.content === '5') {
						msg.delete();
						queue.addTrack(song.tracks[4]);
					} else if (result.content === 'cancel') {
						msg.delete();
						return message.channel.send(
							`${client.emotes.success} - Search **cancelled**!`
						);
					} else {
						msg.delete();
						return message.channel.send(
							`${client.emotes.error} - Invalid number!`
						);
					}
				})
				.catch(() => {
					msg.delete();
					return message.channel.send(
						`${client.emotes.error} - Timed out!`
					);
				});
		}

		client.player.on('trackEnd', (queue, track) => {
			playing = false;
		});

		client.player.on('queueEnd', (queue) => {
			playing = false;
		});

		client.player.on('botDisconnect', (queue) => {
			playing = false;
		});

		client.player.on('channelEmpty', (queue) => {
			playing = false;
		});

		if (playing === true) {
			return;
		}

		try {
			queue.play();
			playing = true;
		} catch {
			console.log(console.error);
			playing = false;
		}
	},
};
