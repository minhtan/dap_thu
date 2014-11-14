#pragma strict

function Update () {
	setCellSize();
}

private function setCellSize(){

	var gridLayout : UI.GridLayoutGroup = GetComponent.<UI.GridLayoutGroup>();
	var rectOffset : RectOffset = gridLayout.padding;
	var spacingX : float = gridLayout.spacing.x;
	var spacingY : float = gridLayout.spacing.y;
	var column : int = gridLayout.constraintCount;
	gridLayout.cellSize = Vector2((Screen.width * 0.6) / column -  spacingX, (Screen.height/5) - spacingY);;
}