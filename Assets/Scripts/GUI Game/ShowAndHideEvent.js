#pragma strict

var objControl : GameObject;
private var gameControl : GameControl;

function Awake(){
	gameControl = objControl.GetComponent.<GameControl>();
}

function OnGUI () {
	showVsHideEvent();
}

function showVsHideEvent(){
//	if(){
//		gameObject.SetActive(true);
//	}else{
//		gameObject.SetActive(false);
//	}
}