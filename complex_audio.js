let context;
let compressor;
let reverb;

let source1, source2, source3;
let lowpassFilter;
let waveShaper;
let panner;

let dry1, dry2, dry3;
let wet1, wet2, wet3;

let masterDry;
let masterWet;

function setupRoutingGraph() {
  context = new AudioContext();
  // Create the effects nodes.
  lowpassFilter = context.createBiquadFilter();
  waveShaper = context.createWaveShaper();
  panner = context.createPanner();
  compressor = context.createDynamicsCompressor();
  reverb = context.createConvolver();
  // Create master wet and dry.
  masterDry = context.createGain();
  masterWet = context.createGain();
  // Connect final compressor to final destination.
  compressor.connect(context.destination);
  // Connect master dry and wet to compressor.
  masterDry.connect(compressor);
  masterWet.connect(compressor);
  // Connect reverb to master wet.
  reverb.connect(masterWet);
  // Create a few sources.
  source1 = context.createBufferSource();
  source2 = context.createBufferSource();
  source3 = context.createOscillator();
  source1.buffer = manTalkingBuffer;
  source2.buffer = footstepsBuffer;
  source3.frequency.value = 440;
  // Connect source1
  dry1 = context.createGain();
  wet1 = context.createGain();
  source1.connect(lowpassFilter);
  lowpassFilter.connect(dry1);
  lowpassFilter.connect(wet1);
  dry1.connect(masterDry);
  wet1.connect(reverb);
  // Connect source2
  dry2 = context.createGain();
  wet2 = context.createGain();
  source2.connect(waveShaper);
  waveShaper.connect(dry2);
  waveShaper.connect(wet2);
  dry2.connect(masterDry);
  wet2.connect(reverb);
  // Connect source3
  dry3 = context.createGain();
  wet3 = context.createGain();
  source3.connect(panner);
  panner.connect(dry3);
  panner.connect(wet3);
  dry3.connect(masterDry);
  wet3.connect(reverb);
  // Start the sources now.
  source1.start(0);
  source2.start(0);
  source3.start(0);
}
