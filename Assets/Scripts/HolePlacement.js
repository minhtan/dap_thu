#pragma strict

var holeCount : int = 6;
var holePrefab : GameObject;

function Start () {
	var sHeight = Screen.height;
	var sWidth = Screen.width;
	var hHeight = holePrefab.renderer.bounds.size.y;
	var hWidth = holePrefab.renderer.bounds.size.x;
	
	Debug.Log("Screen height: "+sHeight);
	Debug.Log("Screen width: "+sWidth);
	Debug.Log("Hole height: "+hHeight);
	Debug.Log("Hole width: "+hWidth);
}

function Update () {

}