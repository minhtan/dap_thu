#pragma strict
var objControl : GameObject;
private var gameControl : GameControl;
var panel : GameObject;

function Awake(){
	gameControl = objControl.GetComponent.<GameControl>();
}

function Update() {
	showVsHideEvent();
}

function showVsHideEvent(){
	if(gameControl.isSlow()){
		panel.SetActive(true);
	}else{
		panel.SetActive(false);
	}
}