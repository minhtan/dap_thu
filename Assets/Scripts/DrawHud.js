#pragma strict

var mySkin : GUISkin;
var controlTexture : Texture2D;

var originalWidth = 800.0;  // define here the original resolution
var originalHeight = 600.0; // you used to create the GUI contents 
private var scale: Vector3;

function OnGUI(){
	scale.x = Screen.width/originalWidth; // calculate hor scale
  	scale.y = Screen.height/originalHeight; // calculate vert scale
  	scale.z = 1;
  	var svMat = GUI.matrix; // save current matrix
  	// substitute matrix - only scale is altered from standard
  	GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, scale);

	GUI.skin = mySkin;
	showScore(5);
	showPowerUps();
	showPauseBtn();
	
	GUI.matrix = svMat; // restore matrix
}

function showScore(score : int){
	GUI.Label (Rect(10, 10, 100, 50), "Score: " + score);
}

function showPowerUps(){
	GUI.Label(Rect ((Screen.width - 310)/2, 10, 300, 50), GUIContent("power up", controlTexture));
}

function showPauseBtn(){
	if (GUI.Button (Rect (Screen.width - 110,10, 100, 50), "Pause")) {
    	print ("clicked on pause");
	}
}