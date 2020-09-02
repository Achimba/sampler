"use strict";

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

const audioContext = new AudioContext();

function changeSampleSet(sampleSetId) {
	var selectedSampleSet = gSampleSetData[sampleSetId - 1][1];
	for (var i = 0; i < selectedSampleSet.length; i++) {
		var sampleSrc = null;
		var name = null;
		var restart = false;
		var loop = false;

		if (selectedSampleSet[i] != null) {
			sampleSrc = selectedSampleSet[i][0];
			name = selectedSampleSet[i][1];
			restart = selectedSampleSet[i][2];
			loop = selectedSampleSet[i][3];
		}

		var audioElement = document.getElementById('audio' + i);
		audioElement.pause();
		audioElement.removeAttribute('loop');
		var buttonElement = document.getElementById('play' + i);
		buttonElement.classList.remove('playing');
		var restartCheckbox = document.getElementById('play' + i + "chk1");
		restartCheckbox.checked = restart;
		var loopCheckbox = document.getElementById('play' + i + "chk2");
		loopCheckbox.checked = loop;

		if (sampleSrc === null) {
			audioElement.removeAttribute('src');
			buttonElement.setAttribute('disabled', 'disabled');
			buttonElement.innerText = i + 1;
			restartCheckbox.setAttribute('disabled', 'disabled');
			loopCheckbox.setAttribute('disabled', 'disabled');
		} else {
			loopCheckbox.removeAttribute('disabled');
			restartCheckbox.removeAttribute('disabled');
			buttonElement.removeAttribute('disabled');
			buttonElement.innerText = name;
			audioElement.setAttribute('src', sampleSrc);
			if (loop === true) {
				audioElement.setAttribute('loop', 'loop');
			}
			audioElement.load();
		}
	}
}

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
		var restartButton = document.getElementById(buttonElementId + "chk1");
		if (this.dataset.playing === 'false') {
 			if (restartButton.checked) {
				audioElement.load();
			}
 			audioElement.play();
			this.dataset.playing = 'true';
			this.classList.add('playing');
		} else if (this.dataset.playing === 'true') {
 			if (restartButton.checked) {
				audioElement.load();
				audioElement.play();
			} else {
				audioElement.pause();
				this.dataset.playing = 'false';
				this.classList.remove('playing');
			}
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

function initAudioElements() {
	initAudio('audio0', 'play0');
	initAudio('audio1', 'play1');
	initAudio('audio2', 'play2');
	initAudio('audio3', 'play3');
	initAudio('audio4', 'play4');
	initAudio('audio5', 'play5');
	initAudio('audio6', 'play6');
	initAudio('audio7', 'play7');
}

function populateSampleSetSelect() {
	var selectSampleSet = document.getElementById('sampleSet');
	for (var i = selectSampleSet.length - 1; i >= 0; i--) {
		selectSampleSet.remove(i);
	}	
	for (var x = 0; x < gSampleSetData.length; x++) {
		var optionString = '<option>' + gSampleSetData[x][0] + '</option>';
		selectSampleSet.insertAdjacentHTML('beforeend', optionString);
	}
}

function initSampleSetSelect() {
	populateSampleSetSelect();
	changeSampleSet(1);
}

function initAttachListeners() {
	var selectElement = document.getElementById('sampleSet');
	selectElement.addEventListener('change', function () {
		changeSampleSet(this.value);
	}, false);

	document.addEventListener("onselectstart", function () {
		return false;
	}, false);
}

function initPage() {
	initAudioElements();
	initSampleSetSelect();
	initAttachListeners();
}

window.addEventListener("DOMContentLoaded", function(e) {
	initPage();
});
