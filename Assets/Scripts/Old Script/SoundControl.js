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
function adjustVol(musicState : boolean){
	var valueBg : int;
	var valueEf : int;
	if(musicState){
		valueBg = 1;
		valueEf = 1;
	}else{
		valueBg = 0;
		valueEf = 0;
	}
	bgMusic.volume = valueBg;
	PlayerPrefs.SetInt("BgVol", valueBg);
	soundEfct.volume = valueEf;
	PlayerPrefs.SetInt("EfctVol", valueEf);
	
}

function loadSoundPref(){
	bgMusic.volume = PlayerPrefs.GetInt("BgVol", 1);
	soundEfct.volume = PlayerPrefs.GetInt("EfctVol", 1);
}

function getBgVol(){
	return bgMusic.volume;
}
function getSoundVol(){
	return soundEfct.volume;
}