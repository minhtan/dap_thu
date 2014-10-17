#pragma strict

var spritePixelToUnit : int = 100;

function Start () {
	var sHeight = Screen.height;
	var sWidth = Screen.width;
	var hHeight = gameObject.renderer.bounds.size.y * spritePixelToUnit;
	var hWidth = gameObject.renderer.bounds.size.x * spritePixelToUnit;
	Debug.Log("Screen height: "+sHeight);
	Debug.Log("Screen width: "+sWidth);
	Debug.Log("Hole height: "+hHeight);
	Debug.Log("Hole width: "+hWidth);
}

function Update () {

}