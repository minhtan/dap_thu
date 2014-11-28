#pragma strict

function OnGUI () {
	 GetComponent.<UI.Text>().text = PlayerControl.control.getRemainTime();
}