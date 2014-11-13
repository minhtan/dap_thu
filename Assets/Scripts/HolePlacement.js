#pragma strict

var spritePixelToUnit : int = 100;
var thuPrefab : GameObject;
var screenHeightRatio : float = 0.9;
var rowNo : int = 3;
var thuPerRow : int = 4;
private var cam : Camera;

function Awake(){	
	cam = GameObject.Find("/Camera").GetComponent.<Camera>();
}

function Start () {
	placeThu();
}

function placeThu(){
	var sHeight = Screen.height * screenHeightRatio;
	var sWidth = Screen.width;
	var tHeight = thuPrefab.renderer.bounds.size.y * spritePixelToUnit;
	var tWidth = thuPrefab.renderer.bounds.size.x * spritePixelToUnit;
	var colOffset = (sWidth - tWidth * thuPerRow) / (thuPerRow + 1);
	var rowOffset = (sHeight - tHeight * rowNo) / (rowNo + 1);
	
	var worldPos : Vector3;
	
	for(var row : int = 1; row <= rowNo; row++){
		for( var col : int = 1; col <= thuPerRow; col++){
			worldPos = cam.ScreenToWorldPoint(
				Vector3 (
					(colOffset * col) + (tWidth / 2) * (col * 2 - 1), 
					(rowOffset * row) + (tHeight / 2) * (row * 2 - 1), 
					cam.transform.position.z * -1)
			);
			Instantiate(thuPrefab, worldPos, Quaternion.identity).transform.parent = transform;
		}
	}
}

function Update () {

}