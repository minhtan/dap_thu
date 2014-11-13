#pragma strict

var newAnchorY : float = 0.15;

function Start () {
	setAnchor();
}

function setAnchor(){
	var rectTrans : RectTransform = GetComponent.<RectTransform>();
	var anchorX : float = rectTrans.anchorMin.x;
	rectTrans.anchorMin = Vector2 (anchorX, 1 - newAnchorY);
}