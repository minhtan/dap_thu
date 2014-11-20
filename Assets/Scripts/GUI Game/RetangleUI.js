#pragma strict

private var gameControlFather : AnchorDelta;
var panelFather : GameObject;

private var gameControl : AnchorDelta;


function Awake(){
	gameControlFather = panelFather.GetComponent.<AnchorDelta>();
	gameControl = GetComponent.<AnchorDelta>();
}

function retangleUI(){
	var anchorYFather : float = (Screen.height * gameControl.getAnchorYDelta());
}