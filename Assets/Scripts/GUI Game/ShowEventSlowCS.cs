using UnityEngine;
using System.Collections;

public class ShowEventSlowCS : MonoBehaviour {

	public GameObject objControl;
	private GameControlCS gameControl;
	public GameObject panel;
	
	void Awake(){
		gameControl = objControl.GetComponent<GameControlCS>();
	}
	
	void Update() {
		showVsHideEvent();
	}
	
	public void showVsHideEvent(){
		if(gameControl.isSlow()){
			panel.SetActive(true);
		}else{
			panel.SetActive(false);
		}
	}
}
