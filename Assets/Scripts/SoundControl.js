#pragma strict

var dieSound : AudioClip;
var hitSound : AudioClip;

function playDieSound(){
	audio.clip = dieSound;
	audio.Play();
}

function playHitSound(){
	audio.clip = hitSound;
	audio.Play();
}
