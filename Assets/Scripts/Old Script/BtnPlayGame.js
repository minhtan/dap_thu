#pragma strict

var panelEndCoin :GameObject;

function startClick(){
	if(PlControl.control.playable()){
		LevelManager.load("play");
		
	}else{
		panelEndCoin.SetActive(true);
	}
}