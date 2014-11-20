#pragma strict

function startClick(){
	if(PlayerControl.control.playable()){
		Application.LoadLevel("play");
	}
}