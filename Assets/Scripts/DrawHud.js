#pragma strict
var originalWidth = 800;
var originalHeight = 480;
var mySkin : GUISkin;
var ratioFontSize : int = 20;
var fontSize : float = 20;
private var widthScore : float;
private var heightScore : float;
var ratioScoreSize :float = 4;

function Update(){
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
		fontSize = Mathf.Min(Screen.width, Screen.height) / ratioFontSize;
	}
}

private function AutoResizeGUI(): void{
	if(CheckScreenSize()){
		widthScore = Screen.width / ratioScoreSize;
		heightScore =  Screen.height / ratioScoreSize;
	}else{
		heightScore = originalHeight / ratioScoreSize;
		widthScore = originalWidth / ratioScoreSize;
	}
}

function OnGUI(){
	GUI.skin = mySkin;
	GUI.contentColor = Color.red;
	GUI.skin.label.fontSize = fontSize;
	AutoFontSize();
	AutoResizeGUI();
	ShowScore(1000);
	ShowGroupEvent();
	BtnPause(calWidthGEvent());
}

private function ShowScore(score : int): void{
	GUI.Label(Rect(0, 0, widthScore, heightScore),"Score:" + score);
}

private function BtnPause(width: float): void{
	var posittionX : float = widthScore + width;
	GUI.Button(Rect(posittionX, 0, widthScore, heightScore), "Pause");
}

private function calWidthGEvent() : float{
	return Screen.width - (widthScore * 2);
}

private function ShowGroupEvent(): void{
	var widthGEvent : float = calWidthGEvent();
	GUI.BeginGroup(Rect(widthScore, 0, widthGEvent, heightScore));
	GUI.EndGroup();
}




