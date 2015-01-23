using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class BtnSlowBoostCS : MonoBehaviour {

	public GameObject controlObject;
	private GameControlCS gameControl;
	public GameObject objSlow;
	public Sprite boostImg; 
	public GameObject textCoin;
	public GameObject imgCoin;
	public GameObject imgChecked;
	public GameObject panelEndCoin;
	
	void Awake(){
		gameControl = controlObject.GetComponent<GameControlCS>();
	}
	
	public void boostSlowClick(){
		if(PlControl.control.takeCoin()){
			gameControl.setSlowBoost();
			objSlow.GetComponent<Image>().sprite = boostImg;
			GetComponent<Button>().interactable = false;
			textCoin.SetActive(false);
			imgCoin.SetActive(false);
			imgChecked.SetActive(true);
		}else{
			panelEndCoin.SetActive(true);
		}
	}
}
