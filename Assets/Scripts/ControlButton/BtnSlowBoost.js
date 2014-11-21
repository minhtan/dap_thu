#pragma strict

var controlObject : GameObject;
private var gameControl : GameControl;
var objSlow : GameObject;
var boostImg : Sprite; 

function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function boostSlow(){
	PlayerControl.control.takeCoin();
	PlayerControl.control.saveData();
	gameControl.setSlowBoost();
	objSlow.GetComponent.<UI.Image>().sprite = boostImg;
}