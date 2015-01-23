#pragma strict
	
	var panelNeedShow : GameObject;
	private var control : GameControl;
	var obj : GameObject;
	var panelNeedClose : GameObject;
	
function backToMenu () {
	control = obj.GetComponent.<GameControl>();
	Application.LoadLevel("play");
	panelNeedShow.SetActive(true);
	panelNeedClose.SetActive(false);
}