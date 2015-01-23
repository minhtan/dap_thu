using UnityEngine;
using System.Collections;

public class BtnResumeCS : MonoBehaviour {

	public GameObject panelBG;
	public GameObject objControl;
	private GameControlCS gameControl;
	
	void Awake(){
		gameControl = objControl.GetComponent<GameControlCS>();
	}
	
	public void resumeClick(){
		if(!gameControl.pauseGame()){
			panelBG.SetActive(false);
		}
	}
	
}
