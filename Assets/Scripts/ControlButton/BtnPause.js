#pragma strict

var objControl : GameObject;
var panelBG : GameObject;
private var gameControl : GameControl;

function Awake(){
	gameControl = objControl.GetComponent.<GameControl>();
}

function pauseClick(){
	panelBG.SetActive(true);
	gameControl.pauseGame();
}