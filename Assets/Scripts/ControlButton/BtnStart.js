#pragma strict

function startClick(){
	if(PlayerControl.control.playable()){
		LevelManager.load("play");
	}
}