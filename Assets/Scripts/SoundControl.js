#pragma strict

var dieSound : AudioClip;
var hitSound : AudioClip;
static var sound : SoundControl;
private var bgMusic : AudioSource;
private var soundEfct : AudioSource;

function Awake(){
	if(sound == null){
		DontDestroyOnLoad(gameObject);
		sound = this;
		getSource();
	}else if(sound != this){
		Destroy(gameObject);
	}
}
	
function getSource(){
	var sources = GetComponents.<AudioSource>();
	bgMusic = sources[0];
	soundEfct = sources[1];
}

function playDieSound(){
	soundEfct.clip = dieSound;
	soundEfct.Play();
}

function playHitSound(){
	soundEfct.clip = hitSound;
	soundEfct.Play();
}
