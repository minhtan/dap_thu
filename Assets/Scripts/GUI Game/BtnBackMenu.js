
var popupMenu  : GameObject;
function loadScene(){
	if(Application.loadedLevelName == "play"){
		Application.LoadLevel("menu");
	}else{
		Application.LoadLevelAdditive("play");
		
	}
//	popupMenu.SetActive(false);
}