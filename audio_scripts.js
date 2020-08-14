function loadStem(i) {
  fetch(urls[i])
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
      audios[i] = decodedAudio;
    });
}

function playback(buffer){ //, audio
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(context.currentTime);
  //source.loop = true;
}
