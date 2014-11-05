#pragma strict

var hitSound : AudioClip;

function playHitSound(){
	audio.clip = hitSound;
	audio.Play();
}
