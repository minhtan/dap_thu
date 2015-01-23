using UnityEngine;
using System.Collections;
using UnityEngine.UI;
public class BtnX2BoostCS : MonoBehaviour {

	public GameObject controlObject;
	private GameControlCS gameControl;
	public GameObject objX2;
	public Sprite boostImg; 
	public GameObject textCoin;
	public GameObject imgCoin;
	public GameObject imgChecked;
	public GameObject panelEndCoin;
	
	void  Awake(){
		gameControl = controlObject.GetComponent<GameControlCS>();
	}
	
	public void boostX2(){
		if(PlControl.control.takeCoin()){
			gameControl.setX2Boost();
			objX2.GetComponent<Image>().sprite = boostImg;
			GetComponent<Button>().interactable = false;
			textCoin.SetActive(false);
			imgCoin.SetActive(false);
			imgChecked.SetActive(true);
		}else{
			panelEndCoin.SetActive(true);
		}
	}
}
