// Create Annonomuos Self Executing Function
// Source: https://middleearmedia.com/web-audio-api-audio-buffer/

(function(){

	var context = new AudioContext(); // Create and Initialize the Audio Context
	var audio; // Create the Sound

	window.addEventListener("keydown", onKeyDown);

  // Create Buffer for each of 12 stems...
	var stemsCount = 4;

	// Load URLs dynamically...
	// Manual loading for testing
	var urls = [
		"https://ipfs.io/ipfs/QmdQv4X21nPsu2Xbgh1Xs7Pe5nBXcVvtT3is6ab5Lk4vtP?filename=Track%200.wav",
		"https://ipfs.io/ipfs/QmRHP8bKoNmvCDJk8uF4K2m56gqqDprkyZfcHJn2xVoi5Y?filename=Track%201.wav",
		"https://ipfs.io/ipfs/QmUgvWv5izeBr6aWoNzf5a2FJaSpS2eC5rFBiiBnJDeZyD?filename=Track%203.wav",
		"https://ipfs.io/ipfs/QmXJMRJHscaLGEgsLZ9FfnA9Agutt58H71NJ9Txmxj1qea?filename=Track%204.wav",
	];

	const bufferNodes = [];
	// Create all the buffers!
	for (var i = 0; i < stemsCount; ++i) {
	    bufferNodes[i] = context.createBufferSource();
	}

	var audios = [];
	// Fetch each audio snippet and add
	function loadStem(i) {
		fetch(urls[i])
			.then(data => data.arrayBuffer())
			.then(arrayBuffer => context.decodeAudioData(arrayBuffer))
			.then(decodedAudio => {
				audios[i] = decodedAudio;
			});
	}

	// Load stems from URL into a buffer, then place within audios[] array.
	for (var i = 0; i < stemsCount; ++i) {
		audios[i] = loadStem(i);
	}

	// Play buffer (currently loaded manually in unnamed fetch funciton)
	function playback(node){ //, audio
		const source = node;
		source.buffer = audios[1];
		source.connect(context.destination);
		source.start(context.currentTime);
	  //source.loop = true;
	}

	function onKeyDown(e){
		context.resume().then(() => {
			console.log('Playback resumed successfully');
		});

		switch (e.keyCode) {
			case 37: //left
				playback(bufferNodes[0]); // Makes 2 instances trigger, both of guitar loop (1)
			case 38: //up
				playback(bufferNodes[1]); // Works correctly
			case 39: //right
			case 40: // down
			case 88:
				fullProcess(); // Not working
			break;
		}
 	}

	function fullProcess(){
		let audio;
		url = "https://ipfs.io/ipfs/QmRHP8bKoNmvCDJk8uF4K2m56gqqDprkyZfcHJn2xVoi5Y?filename=Track%201.wav";
		fetch(url)
			.then(data => data.arrayBuffer())
			.then(arrayBuffer => context.decodeAudioData(arrayBuffer))
			.then(decodedAudio => {
				audio = decodedAudio;
			});

		var player = context.createBufferSource();
		player.buffer = audio;
		player.connect(context.destination);
		player.start(context.currentTime);
		// source.disconnect(context.destination);
	}

}());
