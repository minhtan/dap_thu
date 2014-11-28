#pragma strict

var controlObject : GameObject;
private var gameControl : GameControl;
var panelHide : GameObject;
var panelShow : GameObject;

function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function startClick(){
	if(PlayerControl.control.takeCoin()){
		gameControl.startGame();
		panelHide.SetActive(false);
	}else{
		panelShow.SetActive(true);
	}
}
