#pragma strict
var popupPause : GameObject;
var popupSetting : GameObject;
var panelBG : GameObject;
private var gameControl : GameControl;
function Awake(){
	gameControl = GameObject.Find("/HolesContainer").GetComponent.<GameControl>();
}

function resumeClick(){
	if(!gameControl.pauseGame()){
		panelBG.SetActive(false);
	}
}

function backMenu(){
	Application.LoadLevel("menu");
}

function pauseClick(){
	panelBG.SetActive(true);
	if(gameControl.pauseGame()){
		popupPause.SetActive(true);
		popupSetting.SetActive(false);
	}else{
		popupPause.SetActive(false);
	}
}

function settingClick(){
	popupSetting.SetActive(true);
	popupPause.SetActive(false);
}