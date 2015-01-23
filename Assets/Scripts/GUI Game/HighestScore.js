#pragma strict
private var gameControl : GameControl;
var controlObject : GameObject;
function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}

function OnGUI(){
	showScore(PlControl.control.getHighestScore());
}

function showScore(score : int){
	GetComponent(UI.Text).text = "Highest score: " + score;
}