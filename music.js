//const context = new AudioContext();

function tone() {
    const context = new AudioContext();
    var osc440 = context.createOscillator();
    osc440.frequency.value = 440;
    osc440.connect(context.destination);
    osc440.start();
    osc440.stop(context.currentTime + 0.4);
}

function playSound() {
  const  source = context.createBufferSource();
  //CORS policy blocks access from Soundcloud
  var url = "https://ipfs.io/ipfs/QmdQv4X21nPsu2Xbgh1Xs7Pe5nBXcVvtT3is6ab5Lk4vtP?filename=Track%200.wav";//"sway.loopysession/Track 0.aiff";
  //source.buffer = url;
  visualizeAudio(url)
  source.connect(context.destination);
  source.start(0);
}

function visualizeAudio(url) {
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => visualize(audioBuffer));
}
