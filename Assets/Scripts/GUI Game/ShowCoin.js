#pragma strict

function Update () {
	GetComponent.<UI.Text>().text = PlControl.control.getCoin().ToString();
}