# sampler
Sampler Web App

I made this for personal uses, namely Mobile / Tablet based sampling. 
This Web App serves as the input for my Korg Kaoss Pad Quad. 
I wanted to add an additional layer of sound effects to my audio mixes. 
The samples are set up in banks of 8. I figured I would not need more than 8 effects samples per song. 
The samples are described in sample_sets.js. They are loaded from my server. So this is hardcoded for my usage. Work can be done to load the samples from the local device instead of a server. 
The song select dropdown will render the appropriate samples for the selected song. 
There are two buttons for each sample pad: restart and loop. 
If restart is on then the sample will start from the beginning each time you press the sample pad. 
If restart is off then the sample will begin from the last played position (like pause). 
If loop is on then the sample will repeat from the beginning once it reached the end. 
If loop is off then the sample simply finishes when it reaches the end of the audio stream. 
You can define default button states for each sample pad in sample_sets.js. 
Visually, it met my needs on my HTC Desire 12+. Edit to taste. 

It is functional and a working proof of concept. 
