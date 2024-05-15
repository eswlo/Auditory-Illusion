const PANNER_L = new Tone.Panner(-1);
const PANNER_R = new Tone.Panner(1);

let isStart = false;

let startButton = document.querySelector(".startButton");
let isPlay = false;

let isToneStart = false;

// L scale
let oscL = new Tone.Oscillator();
// set up an envelope so we can trigger notes on and off
let ampEnvL = new Tone.AmplitudeEnvelope(0.01, 0.5, 1.0, 0.1);

// R scale
let oscR = new Tone.Oscillator();
let ampEnvR = new Tone.AmplitudeEnvelope(0.01, 0.5, 1.0, 0.1);

// define the sequence. "makenotes" is the function that will play the notes
// note: often in Tone.js the "makenotes" is defined in place, "function()"
let toneSeqL = new Tone.Sequence(makeNotesL, ["C5", "D4", "A4", "F4", "F4", "A4", "D4", "C5"], "8n");
let toneSeqR = new Tone.Sequence(makeNotesR, ["C4", "B4", "E4", "G4", "G4", "E4", "B4", "C4"], "8n");

// start the oscillator immediately -- the ampenvL will set the notes
oscL.start();
oscR.start();
 
oscL.connect(PANNER_L)
PANNER_L.connect(ampEnvL)
ampEnvL.toDestination();

oscR.connect(PANNER_R)
PANNER_R.connect(ampEnvR)
ampEnvR.toDestination();

// start the transport
Tone.Transport.start();

// "makenotes" gets time and note from Tone.Sequence
function makeNotesL(timeL, noteL) {
  // "time" and "note" are passed in by the Tone.Sequence
  oscL.frequency.value = noteL;
  ampEnvL.triggerAttackRelease(0.1);
}

function makeNotesR(timeR, noteR) {
  // "time" and "note" are passed in by the Tone.Sequence
  oscR.frequency.value = noteR;
  ampEnvR.triggerAttackRelease(0.1);
}

 function startButtonFunction() {
  startButton.classList.toggle("active");
  if (!isStart && !isPlay) {
    isStart = true;
    isPlay = true;
    toneSeqL.start();
    toneSeqR.start();
  } else if (isStart && isPlay) {
    isStart = false;
    isPlay = false;
    toneSeqL.stop();
    toneSeqR.stop();   
  }
 }


//  function startButtonFunction() {
//   if (!isStart) {
//     isStart = true;
//     toneSeqL.start();
//     toneSeqR.start();
//   }
//  }

//  function stopButtonFunction() {
//   isStart = false;
//   toneSeqL.stop();
//   toneSeqR.stop();
//  }
 
document.addEventListener('DOMContentLoaded', function () {
  setVolL(-100); // Set initial left volume
  setVolR(-100); // Set initial right volume
});

function setVolL(val) {
  document.getElementById('outputL').innerHTML = val;
  oscL.volume.value = val * 0.7 - 67;
}	
    
function setVolR(val) {
  document.getElementById('outputR').innerHTML = val;
  oscR.volume.value = val * 0.7 - 67;
}	

document.querySelector("button").addEventListener("click", async () => {
  if(!isToneStart) {
    isToneStart = true;
    await Tone.start();
  }
});

// slider pregress effect
let sliderL = document.getElementById("volRangeL");
let sliderR = document.getElementById("volRangeR");

sliderL.addEventListener("mousemove", function() {
  let x = sliderL.value;
  let color = 'linear-gradient(90deg, rgb(58, 156, 216)' + x + '%, rgb(214,214,214)' + x + '%)';
  sliderL.style.background = color;
})

sliderR.addEventListener("mousemove", function() {
  let x = sliderR.value;
  let color = 'linear-gradient(90deg, rgb(58, 156, 216)' + x + '%, rgb(214,214,214)' + x + '%)';
  sliderR.style.background = color;
})


