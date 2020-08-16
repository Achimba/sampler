"use strict";

// --- SERVICE WORKER

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(function(reg) {
        if (reg.installing) {
            console.log("Service worker installing");
        } else if (reg.waiting) {
            console.log("Service worker installed");
        } else if (reg.active) {
            console.log("Service worker active");
        }
    }).catch(function(error) {
        console.log("Registration failed with " + error);
    });
}

// --- GLOBALS

const audioContext = new AudioContext();

// --- CHANGE SAMPLE SET

const sampleSet1 = ['samples/1/1.wav', 
					'samples/1/2.wav', 
					'samples/1/3.wav', 
					'samples/1/4.wav', 
					'samples/1/5.wav', 
					'samples/1/6.wav', 
					'samples/1/7.wav', 
					'samples/1/8.wav'];

const sampleSet2 = ['samples/2/1.wav', 
					'samples/2/2.wav', 
					null, 
					null, 
					null, 
					null, 
					null, 
					null];

const sampleSetArray = [sampleSet1, sampleSet2];

function changeSampleSet(sampleSetId) {
	var selectedSampleSet = sampleSetArray[sampleSetId - 1];
	for (var i = 0; i < selectedSampleSet.length; i++) {
		var audioElement = document.getElementById('audio' + i);
		audioElement.pause();
		var buttonElement = document.getElementById('play' + i);
		buttonElement.classList.remove('playing');
		var restartCheckbox = document.getElementById('play' + i + "chk1");
		restartCheckbox.checked = false;
		var loopCheckbox = document.getElementById('play' + i + "chk2");
		loopCheckbox.checked = false;
		var sampleSrc = selectedSampleSet[i];
		if (sampleSrc === null) {
			audioElement.removeAttribute('src');
			buttonElement.setAttribute('disabled', 'disabled');
			restartCheckbox.setAttribute('disabled', 'disabled');
			loopCheckbox.setAttribute('disabled', 'disabled');
		} else {
			loopCheckbox.removeAttribute('disabled');
			restartCheckbox.removeAttribute('disabled');
			buttonElement.removeAttribute('disabled');
			audioElement.setAttribute('src', sampleSrc);
			audioElement.load();
		}
	}
}

// --- INIT AUDIO ELEMENTS

function getAudioElement(id) {
	var audioElement = document.getElementById(id);
	var sample = audioContext.createMediaElementSource(audioElement);
	sample.connect(audioContext.destination);
	return audioElement;
}

function attachEventListeners(audioElement, buttonElement) {
	var buttonElementId = buttonElement.id;

	buttonElement.addEventListener('click', function () {
		if (audioContext.state === 'suspended') {
			audioContext.resume();
		}
		if (this.dataset.playing === 'false') {
			var restartButton = document.getElementById(buttonElementId + "chk1");
 			if (restartButton && restartButton.checked) {
				audioElement.load();
			}
 			audioElement.play();
			this.dataset.playing = 'true';
			this.classList.add('playing');
		} else if (this.dataset.playing === 'true') {
			audioElement.pause();
			this.dataset.playing = 'false';
			this.classList.remove('playing');
		}
	}, false);

	var loopButton = document.getElementById(buttonElementId + "chk2");
	loopButton.addEventListener('click', function () {
		if (loopButton.checked) {
			audioElement.setAttribute('loop', 'loop');
		} else {
			audioElement.removeAttribute('loop');
		}
	}, false);

	audioElement.addEventListener('ended', function () {
		buttonElement.dataset.playing = 'false';
		buttonElement.classList.remove('playing');
	}, false);
}

function initAudio(audioId, buttonId) {
	var audioElement = getAudioElement(audioId);
	var playButton = document.getElementById(buttonId);
	attachEventListeners(audioElement, playButton);
}

// --- INIT PAGE

window.addEventListener("DOMContentLoaded", function(e) {
	initAudio('audio0', 'play0');
	initAudio('audio1', 'play1');
	initAudio('audio2', 'play2');
	initAudio('audio3', 'play3');
	initAudio('audio4', 'play4');
	initAudio('audio5', 'play5');
	initAudio('audio6', 'play6');
	initAudio('audio7', 'play7');

	var selectElement = document.getElementById('sampleSet');
	selectElement.addEventListener('change', function () {
		changeSampleSet(this.value);
	}, false);

	document.addEventListener("onselectstart", function () {
		return false;
	}, false);
});
