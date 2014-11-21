#pragma strict

var controlObject : GameObject;
private var gameControl : GameControl;
var panel : GameObject;

function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function startClick(){
	gameControl.startGame();
	panel.SetActive(false);
}
