#pragma strict

var controlObject : GameObject;
private var gameControl : GameControl;
var objX2 : GameObject;
var boostImg : Sprite; 
var textCoin : GameObject;
var imgCoin : GameObject;
var imgChecked : GameObject;

function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function boostX2(){
	if(PlayerControl.control.takeCoin()){
		PlayerControl.control.saveData();
		gameControl.setX2Boost();
		objX2.GetComponent.<UI.Image>().sprite = boostImg;
		GetComponent.<UI.Button>().interactable = false;
		
		textCoin.SetActive(false);
		imgCoin.SetActive(false);
		imgChecked.SetActive(true);
	}
}