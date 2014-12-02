#pragma strict

var panelEndCoin : GameObject;

function restart(){
	if(PlayerControl.control.takeCoin()){
		LevelManager.load("play");
	}else{
		panelEndCoin.SetActive(true);
	}
}