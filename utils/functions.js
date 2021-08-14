module.exports.toTitleCase = function (string) {
	return string.toString().replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

module.exports.shuffle = function (array) {
	var currentIndex = array.length, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};

module.exports.millisToSeconds = function (millis) {
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return seconds;
};
