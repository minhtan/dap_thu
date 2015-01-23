using UnityEngine;
using System.Collections;

public class BtnStartGameCS : MonoBehaviour {

	public GameObject controlObject;
	private GameControlCS gameControl;
	public GameObject panelHide1;
	public GameObject panelShow1;
	public GameObject panelShow2;
	public GameObject panelEndCoin;
	void Awake(){
		gameControl = controlObject.GetComponent<GameControlCS>();
	}
	
	public void startClick(){
		if(PlControl.control.playable()){
			gameControl.startGame();
			panelHide1.SetActive(false);
			panelShow1.SetActive(true);
			panelShow2.SetActive(true);
		}else{
			panelEndCoin.SetActive(true);
		}
	}
}
