﻿#pragma strict

private var gameControl : GameControl;
var controlObject : GameObject;
var popupPause : GameObject;
function Awake(){
	gameControl = controlObject.GetComponent.<GameControl>();
	
}

function PauseClick(){
	gameControl.pauseGame();
}
