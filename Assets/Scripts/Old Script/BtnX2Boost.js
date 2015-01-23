#pragma strict
//
//var controlObject : GameObject;
//private var gameControl : GameControlCS;
//var objX2 : GameObject;
//var boostImg : Sprite; 
//var textCoin : GameObject;
//var imgCoin : GameObject;
//var imgChecked : GameObject;
//var panelEndCoin : GameObject;
//
//function Awake(){
//	gameControl = controlObject.GetComponent.<GameControlCS>();
//}
//
//function boostX2(){
//	if(PlControl.control.takeCoin()){
//		gameControl.setX2Boost();
//		objX2.GetComponent.<UI.Image>().sprite = boostImg;
//		GetComponent.<UI.Button>().interactable = false;
//		textCoin.SetActive(false);
//		imgCoin.SetActive(false);
//		imgChecked.SetActive(true);
//	}else{
//		panelEndCoin.SetActive(true);
//	}
//}