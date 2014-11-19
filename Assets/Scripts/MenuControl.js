#pragma strict
var popupPause : GameObject;

function play(){
	if(PlayerControl.control.playable()){
		Application.LoadLevel("play");
	}else{
		
	}
}

function backMenu(){
	Application.LoadLevel("menu");
}

function pauseClick(){
	if(GameObject.Find("/HolesContainer").GetComponent.<GameControl>().pauseGame()){
		popupPause.SetActive(true);
	}else{
		popupPause.SetActive(false);
	}
}

function reStart(){
	
}
