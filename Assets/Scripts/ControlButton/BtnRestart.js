#pragma strict

private var gameControl : GameControl;
var objControl : GameObject;
var panelBG : GameObject;

function Awake(){
	gameControl = objControl.GetComponent.<GameControl>();
}
function restartCick(){
	gameControl.restartGame();
	panelBG.SetActive(false);
}