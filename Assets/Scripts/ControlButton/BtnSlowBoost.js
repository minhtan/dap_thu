#pragma strict

var controlObject : GameObject;
private var gameControl : GameControl;

function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function boostSlow(){
	PlayerControl.control.takeCoin();
	PlayerControl.control.saveData();
	gameControl.setSlowBoost();
}