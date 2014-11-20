#pragma strict

function play(){
	if(PlayerControl.control.playable()){
		Application.LoadLevel("play");
	}else{
		
	}
}