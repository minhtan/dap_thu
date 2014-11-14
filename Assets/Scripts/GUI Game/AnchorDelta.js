#pragma strict

var newAnchorX : float = 0;
var anchorXDelta : float = 0;
//var newAnchorXMax : float = 0.2;
var newAnchorY : float = 0;
function Start () {
 	if(anchorXDelta != 0){
 		setAnchorX(getRectTransform());
 	}else{
 		setAnchorY(getRectTransform());
 	}
		
}

function getRectTransform(){
	return GetComponent.<RectTransform>();	
}

function setAnchorX(rectTrans : RectTransform){ 
	var anchorX : float;
	rectTrans.anchorMin = Vector2(newAnchorX, 0);
	rectTrans.anchorMax = Vector2(newAnchorX + anchorXDelta,1);
}

function setAnchorY(rectTrans : RectTransform){
	var anchorY : float;
	if(newAnchorY != 0){
		anchorY = 1 - newAnchorY;
	}else{
		anchorY = rectTrans.anchorMin.y;
	}
	rectTrans.anchorMin = Vector2(0, anchorY);
}


