#pragma strict

function Update () {
	GetComponent.<UI.Text>().text = PlayerControl.control.getCoin().ToString();
}