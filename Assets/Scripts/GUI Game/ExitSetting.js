#pragma strict

var popupSet : GameObject;
var popupPause : GameObject;
var sliderBg : GameObject;
var sliderEf : GameObject;
function exitPopup(){
	popupSet.SetActive(false);
	var valueBg : float = sliderBg.GetComponent.<UI.Slider>().value;
	var valueEf : float = sliderEf.GetComponent.<UI.Slider>().value;
	SoundControl.sound.adjustVol(valueBg, valueEf);
	popupPause.SetActive(true);
}