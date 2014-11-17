#pragma strict
private var gameControl : GameControl;
var controlObject : GameObject;
function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function OnGUI(){
	showScore(gameControl.getScore());
}

function showScore(score : int){
	GetComponent(UI.Text).text = "Diem : " + score;
}