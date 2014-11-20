#pragma strict

var panelBG : GameObject;
var objControl : GameObject;
private var gameControl : GameControl;

function Awake(){
	gameControl = objControl.GetComponent.<GameControl>();
}

function resumeClick(){
	if(!gameControl.pauseGame()){
		panelBG.SetActive(false);
	}
}

