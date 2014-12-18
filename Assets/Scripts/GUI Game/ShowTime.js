#pragma strict

function OnGUI () {
	 GetComponent.<UI.Text>().text = PlControl.control.getRemainTime();
}