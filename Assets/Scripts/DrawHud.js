#pragma strict
var originalWidth = 800;
var originalHeight = 480;
var mySkin : GUISkin;
var ratio : int = 20;
var fontSize : float = 20;
private var widthScore;
private var heightScore;
var ratioScore :float = 4;
function Update(){
	if(CheckScreenSize()){
		widthScore = Screen.width / ratioScore;
		heightScore =  Screen.height / ratioScore;
	}else{
		heightScore = originalHeight / ratioScore;
		widthScore = originalWidth / ratioScore;
	}
}

private function CheckScreenSize(): boolean{
	if(originalWidth != Screen.width || originalHeight != Screen.height){
		return true;
	}else{
		return false;
	}
}
private function AutoFontSize(): void
{
	if(CheckScreenSize()){
		fontSize = Mathf.Min(Screen.width, Screen.height) / ratio;
	}
}

//private function AutoResizeGUI(): void{
//	if(CheckScreenSize()){
//		widthScore = Screen.width / ratioScore;
//		heightScore =  Screen.height / ratioScore;
//	}else{
//		heightScore = originalHeight / ratioScore;
//		widthScore = originalWidth / ratioScore;
//	}
//}

function OnGUI(){
	GUI.skin = mySkin;
	GUI.contentColor = Color.red;
	GUI.skin.label.fontSize = fontSize;
	AutoFontSize();
//	AutoResizeGUI();
	ShowScore(1000);
 	
}



private function ShowScore(score : int): void{
	GUI.Label(Rect(0,0,widthScore,heightScore),"Score:" + score);
}




