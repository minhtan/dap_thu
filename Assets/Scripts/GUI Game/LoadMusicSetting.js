#pragma strict

var spriteMusicOn : Sprite;
var spriteMusicOff : Sprite;
var objMusic : GameObject;
function Start () {
	if(SoundControlCS.sound.getBgVol() == 1){
		objMusic.GetComponent.<UI.Image>().sprite = spriteMusicOn;
	}else{
		objMusic.GetComponent.<UI.Image>().sprite = spriteMusicOff;
	}
	
}