#pragma strict

var popup : GameObject;
var sliderBg : GameObject;
var sliderEf : GameObject;
function settingClick(){
	popup.SetActive(true);
	var bgVolumn : float = SoundControl.sound.getBgVol();
	var efVolumn : float = SoundControl.sound.getSoundVol();
	sliderBg.GetComponent.<UI.Slider>().value = bgVolumn;
	sliderEf.GetComponent.<UI.Slider>().value = efVolumn;
}