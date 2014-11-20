#pragma strict

var popupSetting : GameObject;
var sliderBg : GameObject;
var sliderEf : GameObject;

function backToPauseClick(){
	var valueBg : float = sliderBg.GetComponent.<UI.Slider>().value;
	var valueEf : float = sliderEf.GetComponent.<UI.Slider>().value;
	SoundControl.sound.adjustVol(valueBg, valueEf);
	popupSetting.SetActive(false);
}