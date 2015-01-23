using UnityEngine;
using System.Collections;

public class ShowEventX2CS : MonoBehaviour {

	public GameObject objControl;
	private GameControlCS gameControl;
	public GameObject panel;
	
	void Awake(){
		gameControl = objControl.GetComponent<GameControlCS>();
	}
	
	void Update() {
		showVsHideEvent();
	}
	
	void showVsHideEvent(){
		if(gameControl.isX2()){
			panel.SetActive(true);
		}else{
			panel.SetActive(false);
		}
	}
}