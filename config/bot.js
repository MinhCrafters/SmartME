module.exports = {
    emotes: {
        off: ':x:',
        error: ':warning:',
        queue: ':bar_chart:',
        music: ':musical_note:',
        info: ':information_source:',
        success: ':white_check_mark:',
    },

    discord: {
        token: process.env.TOKEN,
        prefix: 'me!',
        activityType: 'PLAYING',
        activity: '{prefix}help',
    },

    filters: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'bassboost_low', 'bassboost_high', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'],
};