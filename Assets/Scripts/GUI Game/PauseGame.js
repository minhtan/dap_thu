#pragma strict

private var gameControl : GameControl;
var controlObject : GameObject;
function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}
function PauseClick(){
	gameControl.pauseGame();
}