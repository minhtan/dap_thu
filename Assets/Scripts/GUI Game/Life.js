#pragma strict

private var gameControl : GameControl;
var controlObject : GameObject;
function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
}
function OnGUI(){
	showLife(gameControl.getLife());
}

function showLife(life : int){
	GetComponent(UI.Text).text = "Life: " + life;
}