#pragma strict

function Start () {

}

function Update () {

}

function play(){
	if(PlayerControl.control.playable()){
		Application.LoadLevel("play");
	}else{
		
	}
}