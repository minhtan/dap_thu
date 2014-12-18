#pragma strict

var ratio : float;
var anchorMinY : float;
var anchorDeltaY : float;
var anchorMinX : float;

function Start () {
	setAnchorButton();
}

function setAnchorButton () {
	var rectTran : RectTransform = GetComponent.<RectTransform>();
	var widthDelta : float = anchorDeltaY * Screen.height * ratio;
	var anchorDeltaX : float = widthDelta / Screen.width;
	rectTran.anchorMin = Vector2(anchorMinX, anchorMinY);
	rectTran.anchorMax = Vector2(anchorMinX + anchorDeltaX, anchorMinY + anchorDeltaY);
}