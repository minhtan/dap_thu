#pragma strict

var controlObject : GameObject;
private var gameControl : GameControl;
var objSlow : GameObject;
var boostImg : Sprite; 
var textCoin : GameObject;
var imgCoin : GameObject;
var imgChecked : GameObject;
var panelEndCoin : GameObject;

function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function boostSlow(){
	if(PlayerControl.control.takeCoin()){
		PlayerControl.control.saveData();
		gameControl.setSlowBoost();
		objSlow.GetComponent.<UI.Image>().sprite = boostImg;
		GetComponent.<UI.Button>().interactable = false;
		textCoin.SetActive(false);
		imgCoin.SetActive(false);
		imgChecked.SetActive(true);
	}else{
		panelEndCoin.SetActive(true);
	}
}