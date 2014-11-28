#pragma strict

var controlObject : GameObject;
private var gameControl : GameControl;
var panelHide : GameObject;

function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function startClick(){
		gameControl.startGame();
		panelHide.SetActive(false);
}
