#pragma strict
var gameControl : GameControl;
	
function Start(){
	
}

function Update(){
	gameControl = GetComponent.<GameControl>();
//	ShowScore(gameControl.GetScore());
}

function ShowScore(score : int){
	GetComponent(UI.Text).text = "Diem :" + score;
}