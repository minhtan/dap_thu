#pragma strict
import System.Collections.Generic;

private var soDuocchon : int;
var time : float = 3.0f;

function Start () {
	print(checkSoNgauNhien(2));
}

function Update () {
	 
}
function SoNgauNhien(){
	soDuocchon = Random.Range(1,12);
	return soDuocchon;
}
function checkSoNgauNhien(number : int){
	for(var child : Transform in transform){
		var tenThu = "con_thu" + number;
		if(child.name.Equals(tenThu)){
			//var trangThai : GameObject = child.gameObject;
			var t : TrangThai;
			t = child.GetComponent("TrangThai");
			return t.getTrangThai();
		}
	}
	return false;
}