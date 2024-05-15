//sounds
// const PANNER_L = new Tone.Panner(-1);
// const PANNER_R = new Tone.Panner(1);

let isStart = false;
let oscSine = new Tone.Oscillator();
let oscSquare = new Tone.Oscillator();
let ampEnvSine = new Tone.AmplitudeEnvelope(0.01, 0.0, 0.05, 0.05);
let ampEnvSquare = new Tone.AmplitudeEnvelope(0.01, 0.0, 0.05, 0.05);
let rampTimeVal;
let endBpmVal;

let startButton = document.querySelector(".startButton");
let isPlay = false;
let isToneStart = false;

// define the sequence. "makenotes" is the function that will play the notes
// note: often in Tone.js the "makenotes" is defined in place, "function()"
let toneSeqSine = new Tone.Sequence(makeNotesSine, ["A4", null], "8n");
let toneSeqSquare = new Tone.Sequence(makeNotesSquare, [null, "A4"], "8n");
 
oscSine.type = "sine";
oscSquare.type = "square";

oscSine.connect(ampEnvSine)
// PANNER_L.connect(ampEnvL)
ampEnvSine.toDestination();

oscSquare.connect(ampEnvSquare)
// PANNER_R.connect(ampEnvR)
ampEnvSquare.toDestination();

// start the oscillator immediately -- the ampenv will set the notes
oscSine.start();
oscSquare.start();

// "makenotes" gets time and note from Tone.Sequence
function makeNotesSine(time, noteSine) {
    oscSine.frequency.value = noteSine;
    oscSine.volume.value = 0;
    ampEnvSine.triggerAttackRelease(0.02);
}

function makeNotesSquare(time1, noteSquare) {
    oscSquare.frequency.value = noteSquare;
    oscSquare.volume.value = -5;
    ampEnvSquare.triggerAttackRelease(0.02);
}

document.addEventListener('DOMContentLoaded', function () {
  rampTime(44); // Set initial ramp_time
  endBpm(70); // Set initial end_bpm
})

function rampTime(val) {
  document.getElementById('output').innerHTML = Math.trunc(val * 0.3) + 1;
  rampTimeVal = Math.trunc(val * 0.3) + 1;
}	

function endBpm(val) {
  document.getElementById('output1').innerHTML = Math.trunc(val * 15);
  endBpmVal = Math.trunc(val * 15);
}	


function startButtonFunction() {
  startButton.classList.toggle("active");

  if (!isStart && !isPlay) {
    isStart = true;
    isPlay = true;
    Tone.Transport.start();
    Tone.Transport.bpm.cancelScheduledValues(0); 
    Tone.Transport.bpm.value = 40;
    toneSeqSine.start();
    toneSeqSquare.start();
    Tone.Transport.bpm.rampTo(endBpmVal, rampTimeVal); // rampTo() is part of a 'Signal'
  } else if (isStart && isPlay) {
    isPlay = false;
    isStart = false;
    Tone.Transport.stop();
    toneSeqSine.stop();
    toneSeqSquare.stop();
  }
}


// function startButtonFunction() {
//   if (!isStart) {
//     isStart = true;
//     Tone.Transport.start();
//     Tone.Transport.bpm.cancelScheduledValues(0); 
//     Tone.Transport.bpm.value = 40;
//     toneSeqSine.start();
//     toneSeqSquare.start();
//     Tone.Transport.bpm.rampTo(endBpmVal, rampTimeVal); // rampTo() is part of a 'Signal'
//   }
// }

// function stopButtonFunction() {
//   isStart = false;
//   Tone.Transport.stop();
//   toneSeqSine.stop();
//   toneSeqSquare.stop();
// }


document.querySelector("button").addEventListener("click", async () => {
  if(!isToneStart) {
    isToneStart = true;
    await Tone.start();
  }
});