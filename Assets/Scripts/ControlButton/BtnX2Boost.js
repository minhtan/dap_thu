#pragma strict

var controlObject : GameObject;
private var gameControl : GameControl;

function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function boostX2(){
	PlayerControl.control.takeCoin();
	PlayerControl.control.saveData();
	gameControl.setX2Boost();
}