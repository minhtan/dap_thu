#pragma strict

var panelEndCoin :GameObject;

function startClick(){
	if(PlayerControl.control.playable()){
		LevelManager.load("play");
		
	}else{
		panelEndCoin.SetActive(true);
	}
}