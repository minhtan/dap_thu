#pragma strict

var parent : GameObject;
var sizeImg : float = 64;
private var rectTrans : RectTransform;
private var anchor : AnchorDelta;
function Start(){
	resizeImg();
}

function resizeImg(){
//	anchor = parent.GetComponent.<AnchorDelta>();
//	rectTrans = GetComponent.<RectTransform>();
//	var deltaAnchorX : float = anchor.getAnchorXDelta();
//	var deltaAnchorY : float = 1;
//	var parentSizeX : float = Screen.width * deltaAnchorX;
//	var parentSizeY : float = Screen.height * deltaAnchorY;
//	var spaceX : float;
//	var spaceY : float;
//	Debug.Log(parentSizeX);
//	if(parentSizeY > sizeImg){
//		spaceX = (parentSizeX - sizeImg)/(2 * parentSizeX); 
//		spaceY = (parentSizeY - sizeImg)/(2 * parentSizeY);
//		rectTrans.anchorMin = Vector2(spaceX, spaceY);
//		rectTrans.anchorMax = Vector2((spaceX + sizeImg/parentSizeX), (spaceY + sizeImg/parentSizeY));
//	}	
}