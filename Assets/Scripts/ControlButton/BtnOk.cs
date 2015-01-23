using UnityEngine;
using System.Collections;

public class BtnOk : MonoBehaviour {

	public GameObject panelHidden1;
	public GameObject panelHidden2;

	public void clickOk(){
		panelHidden1.SetActive (false);
		panelHidden2.SetActive (false);
	}
}
