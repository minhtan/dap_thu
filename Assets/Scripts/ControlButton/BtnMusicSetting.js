#pragma strict

var musicSpriteOn : Sprite;
var musicSpriteOff : Sprite;

function musicSettingClick(){
	if(SoundControlCS.sound.getBgVol() == 0){
		SoundControlCS.sound.adjustVol(true);
		GetComponent.<UI.Image>().sprite = musicSpriteOn;		
	}else{
		SoundControlCS.sound.adjustVol(false);
		GetComponent.<UI.Image>().sprite = musicSpriteOff;
	}
}