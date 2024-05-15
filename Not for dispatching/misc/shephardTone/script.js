

var synth 
var ampEnv
var loop;
var clock;
var startTime;
var isStart = false;
let isTransportStart = false;
let intervalId;
let interval;
let attackDur;
let decayDur;
let sustainPercent = 0.5;
let releaseDur;
var reverb = new Tone.Reverb().toDestination();
// synth.connect(ampEnv).toDestination();

let seqArray = makeSeqArray();

let seq 

var waveIntvlVal;
var waveDurVal;
// start the oscillator immediately -- the ampenv will set the notes

var toneSeqL;

let noteArray = [];

reverb.decay.value = 1.5;


function makeSeqArray() {
  let retArray = [];
  for (i = 1; i < 11; i++) {
    for (j = 1; j < 8; j++) {
      if (j == 1) {
        retArray.push("C" + i);
      } else if (j == 2) {
        retArray.push("D" + i);
      } else if (j == 3) {
        retArray.push("E" + i);
      } else if (j == 4) {
        retArray.push("F" + i);
      } else if (j == 5) {
        retArray.push("G" + i);
      } else if (j == 6) {
        retArray.push("A" + i);
      } else {
        retArray.push("B" + i);
      }
    }
  }
  return retArray;
}

// "makenotes" gets time and note from Tone.Sequence
function makeNotes(time, note) {
  // "time" and "note" are passed in by the Tone.Sequence
  synth.frequency.value = note;
  ampEnv.triggerAttackRelease(0.1);
}

document.addEventListener('DOMContentLoaded', function () {
  waveIntvl(50); // Set initial ramp_time
  waveDur(50); // Set initial end_bpm
})

function waveIntvl(val) {
  document.getElementById('output').innerHTML = Math.trunc(val * 0.3) + 1;
  waveIntvlVal = Math.trunc(val * 0.3) + 1;
}	

function waveDur(val) {
  document.getElementById('output1').innerHTML = val;
  waveDurVal = val * 1;
}	

function startButtonFunction() {
  if (!isTransportStart) {
    isTransportStart = false;
    Tone.Transport.start();
    synth = new Tone.Oscillator().start();
    ampEnv = new Tone.AmplitudeEnvelope(0.01, 0.5, 1.0, 0.1);
    synth.connect(ampEnv);
    ampEnv.toDestination();
    seq = new Tone.Sequence(makeNotes, seqArray, "5hz");
    seq.start(0);

    interval = 0.2 * 7000;
    console.log(interval);
    intervalId = setInterval(trigger, interval); 
    function trigger() {
      synth = new Tone.Oscillator().start();
      ampEnv = new Tone.AmplitudeEnvelope(0.01, 0.5, 1.0, 0.1);
      synth.connect(ampEnv);
      ampEnv.toDestination();
      seq = new Tone.Sequence(makeNotes, seqArray, "5hz");
      seq.start();
    }
  }
 }


// function makeNote() {
//   attackDur = waveDurVal * 0.4;
//   decayDur = waveDurVal * 0.4;
//   releaseDur = waveDurVal * 0.2;

//   ampEnv = new Tone.AmplitudeEnvelope(attackDur, decayDur, sustainPercent, releaseDur);
//   synth = new Tone.OmniOscillator("A1", "sine").connect(ampEnv);
//   startTime = synth.now();
//   synth.start(startTime);
//   ampEnv.toDestination();
//   ampEnv.triggerAttack(startTime);
//   ampEnv.triggerRelease(startTime + waveDurVal * 0.8);
//   //set a ramping anchor point at the beginning ramp
//   synth.frequency.setValueAtTime("A1", startTime);
//   console.log("startTime: " + startTime);
//   console.log("waveDurVal: " + waveDurVal);
//   console.log("startTime + waveDurVal: " + (startTime + waveDurVal));
//   synth.frequency.exponentialRampToValueAtTime("A9", (startTime + waveDurVal));
//   noteArray.push(synth);
// }

// function startbuttonfunction() {
//   if (!isTransportStart) {
//     Tone.Transport.start();
//     isTransportStart = true;
//   }
//   if (!isStart) {
//     isStart = true;

//     makeNote();
//     console.log("sound");

//     interval = waveIntvlVal * 1000;
//     console.log(interval);
//     intervalId = setInterval(trigger, interval); 
//     function trigger() {
//       if ((waveIntvlVal * 1000) != interval) {
//         clearInterval(intervalId); 
//         isStart = false;
//         console.log("start again");
//         startbuttonfunction();
//       } else {
//         console.log("sound");
//         makeNote();
//       }
//     }
//   }
// }

function stopbuttonfunction() {
  isStart = false;
  isTransportStart = false;
  // clearInterval(intervalId);
  Tone.Transport.stop();
  // for (var i = 0; i < noteArray.length; i++) {
  //   noteArray[i].stop();
  // }
}

document.querySelector("#startBttn").addEventListener("click", async () => {
  await Tone.start();
  console.log("context started");
});
