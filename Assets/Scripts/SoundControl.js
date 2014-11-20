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
	loadSoundPref();
}

function playDieSound(){
	soundEfct.clip = dieSound;
	soundEfct.Play();
}

function playHitSound(){
	soundEfct.clip = hitSound;
	soundEfct.Play();
}
function adjustVol(valueBg : float, valueEf : float){
	bgMusic.volume = valueBg;
	PlayerPrefs.SetFloat("BgVol", valueBg);
	soundEfct.volume = valueEf;
	PlayerPrefs.SetFloat("EfctVol", valueEf);
}

function loadSoundPref(){
	bgMusic.volume = PlayerPrefs.GetFloat("BgVol", 1.0);
	soundEfct.volume = PlayerPrefs.GetFloat("EfctVol", 1.0);
}

function getBgVol(){
	return bgMusic.volume;
}
function getSoundVol(){
	return soundEfct.volume;
}