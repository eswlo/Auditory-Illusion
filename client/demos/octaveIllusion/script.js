// const PANNER_L = new Tone.Panner(-1);
// const PANNER_R = new Tone.Panner(1);

let PANNER_L = new Tone.Panner(-1);
let PANNER_R = new Tone.Panner(1);

let toggle = document.querySelector(".toggle");
let isToggled = false;

let startButton = document.querySelector(".startButton");
let isPlay = false;

let isToneStart = false;

let toneSeqL;
let toneSeqR;
let intvlVal;

let isTransportStart = false;

// L scale
let oscL = new Tone.Oscillator();
// set up an envelope so we can trigger notes on and off
let ampEnvL = new Tone.AmplitudeEnvelope(0.01, 0.5, 1.0, 0.1);

// R scale
let oscR = new Tone.Oscillator();
let ampEnvR = new Tone.AmplitudeEnvelope(0.01, 0.5, 1.0, 0.1);

// start the oscillator immediately -- the ampenvL will set the notes
oscL.start();
oscR.start();
 
// oscL.connect(PANNER_L)
// PANNER_L.connect(ampEnvL)
// ampEnvL.toDestination();

// oscR.connect(PANNER_R)
// PANNER_R.connect(ampEnvR)
// ampEnvR.toDestination();

function toggleAnimation() {
  if (!isToggled) {
    isToggled = true;
    PANNER_L.pan.setValueAtTime(1, 0);
    PANNER_R.pan.setValueAtTime(-1, 0);
  } else {
    isToggled = false;
    PANNER_L.pan.setValueAtTime(-1, 0);
    PANNER_R.pan.setValueAtTime(1, 0);
  }
  console.log(isToggled);
  toggle.classList.toggle("active");
}

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

  if (!isTransportStart && !isPlay) {
    oscL.connect(PANNER_L)
    PANNER_L.connect(ampEnvL)
    ampEnvL.toDestination();
    oscR.connect(PANNER_R)
    PANNER_R.connect(ampEnvR)
    ampEnvR.toDestination();
    Tone.Transport.start();
    let intvl = intvlVal;
    toneSeqL = new Tone.Sequence(makeNotesL, ["G5", "G4"], intvl);
    toneSeqR = new Tone.Sequence(makeNotesR, ["G4", "G5"], intvl);
    toneSeqL.start();
    toneSeqR.start();
    isTransportStart = true;
    isPlay = true;
  } else if (isTransportStart && isPlay) {
    isTransportStart = false;
    isPlay = false;
    Tone.Transport.stop();
    toneSeqL.stop();
    toneSeqR.stop();
  }
 }



//  function startButtonFunction() {
//   if (!isTransportStart) {
//     // if (!isToggled) {
//     //   oscL.disconnect();
//     //   PANNER_R.disconnect();
//     //   oscR.disconnect();
//     //   PANNER_L.disconnect();

//     //   oscL.connect(PANNER_L)
//     //   PANNER_L.connect(ampEnvL)
//     //   ampEnvL.toDestination();

//     //   oscR.connect(PANNER_R)
//     //   PANNER_R.connect(ampEnvR)
//     //   ampEnvR.toDestination();
//     // } else {
//     //   oscL.disconnect();
//     //   PANNER_L.disconnect();
//     //   oscR.disconnect();
//     //   PANNER_R.disconnect();

//     //   oscR.connect(PANNER_L)
//     //   PANNER_L.connect(ampEnvL)
//     //   ampEnvL.toDestination();

//     //   oscL.connect(PANNER_R)
//     //   PANNER_R.connect(ampEnvR)
//     //   ampEnvR.toDestination();
//     // }

//     oscL.connect(PANNER_L)
//     PANNER_L.connect(ampEnvL)
//     ampEnvL.toDestination();

//     oscR.connect(PANNER_R)
//     PANNER_R.connect(ampEnvR)
//     ampEnvR.toDestination();
    
//     Tone.Transport.start();
//     isTransportStart = true;
//     let intvl = intvlVal;
//     toneSeqL = new Tone.Sequence(makeNotesL, ["G5", "G4"], intvl);
//     toneSeqR = new Tone.Sequence(makeNotesR, ["G4", "G5"], intvl);
//     toneSeqL.start();
//     toneSeqR.start();
//   }
//  }

//  function stopButtonFunction() {
//   isTransportStart = false;
//   Tone.Transport.stop();
//   toneSeqL.stop();
//   toneSeqR.stop();
//  }
 
document.addEventListener('DOMContentLoaded', function () {
  setIntvl(0);
  setVolL(-100); // Set initial left volume
  setVolR(-100); // Set initial right volume
});

function setIntvl(val) {
  document.getElementById('outputIntvl').innerHTML = (val / 66).toFixed(2);
  intvlVal = (val / 66).toFixed(2);
}	

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


