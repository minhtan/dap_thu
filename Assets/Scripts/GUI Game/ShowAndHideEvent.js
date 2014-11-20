#pragma strict

var objControl : GameObject;
private var gameControl : GameControl;

function Awake(){
	gameControl = objControl.GetComponent.<GameControl>();
}

//function Start(){
//	gameObject.SetActive(false);
//}

function Update () {
	showVsHideEvent();
}

function showVsHideEvent(){
//	if(gameControl.isX2()){
//		gameObject.SetActive(true);
//	}else{
//		gameObject.SetActive(false);
//	}
	gameObject.SetActive(true);
}