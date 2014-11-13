#pragma strict

var row : int = 1;


function Start () {
	setCellSize();
}

private function setCellSize(){

	var gridLayout : UI.GridLayoutGroup = GetComponent.<UI.GridLayoutGroup>();
	var rectOffset : RectOffset = gridLayout.padding;
	var column : int = gridLayout.constraintCount;
	var rectLR = (rectOffset.left + rectOffset.right) * column;
	var rectTB = (rectOffset.top + rectOffset.bottom) * row;
	gridLayout.cellSize = Vector2((Screen.width * 0.6) / column - rectLR, (Screen.height/5) - rectTB);;
}