#pragma strict

var parentX : GameObject;
var parentY : GameObject; 
var sizeImg : float = 64;
var cam : Camera;
var ratioPixelToUnitImg : float = 100;
private var rectTrans : RectTransform;
private var rectTransX : RectTransform;
private var rectTransY : RectTransform;
function Start(){
	resizeImg();
}

function resizeImg(){
	rectTransX = parentX.GetComponent.<RectTransform>();
	rectTransY = parentY.GetComponent.<RectTransform>();
	rectTrans = GetComponent.<RectTransform>();
	var deltaAnchorX : float = rectTransX.anchorMax.x - rectTransX.anchorMin.x;
	var deltaAnchorY : float = rectTransY.anchorMax.y - rectTransY.anchorMin.y;
	var parentSizeX : float = Screen.width * deltaAnchorX;
	var parentSizeY : float = Screen.height * deltaAnchorY;
	var spaceX : float;
	var spaceY : float;
	if(parentSizeY > sizeImg){
		spaceX = (parentSizeX - sizeImg)/(2 * parentSizeX); 
		spaceY = (parentSizeY - sizeImg)/(2 * parentSizeY);
		rectTrans.anchorMin = Vector2(spaceX, spaceY);
		rectTrans.anchorMax = Vector2((spaceX + sizeImg/parentSizeX), (spaceY + sizeImg/parentSizeY));
	}	
}