#pragma strict

var controlObject : GameObject;
private var gameControl : GameControl;
var objX2 : GameObject;
var boostImg : Sprite; 
function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function boostX2(){
	PlayerControl.control.takeCoin();
	PlayerControl.control.saveData();
	gameControl.setX2Boost();
	objX2.GetComponent.<UI.Image>().sprite = boostImg;
}