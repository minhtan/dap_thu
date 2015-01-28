using UnityEngine;
using System.Collections;
using ChartboostSDK;
using UnityEngine.UI;
public class ShowPictureAds : MonoBehaviour {

	public GameObject panelLoading;

	void Start(){
		Chartboost.showInterstitial (CBLocation.Default);
	}

	void OnEnable(){
//		Chartboost.didCacheInterstitial += didCacheInterstitial;
		Chartboost.didDismissInterstitial += didDismissInterstitial;
		Chartboost.didFailToLoadInterstitial += didFailToLoadInterstitial;
	}

	void OnDisable(){
//		Chartboost.didCacheInterstitial -= didCacheInterstitial;
		Chartboost.didDismissInterstitial -= didDismissInterstitial ;
		Chartboost.didFailToLoadInterstitial -= didFailToLoadInterstitial;
	}

//	void didCacheInterstitial (CBLocation location){
//		panelLoading.SetActive (false);
//	}

	void didDismissInterstitial (CBLocation location){
		panelLoading.SetActive (false);
//		Chartboost.Destroy (this);
	}

	void didFailToLoadInterstitial(CBLocation location, CBImpressionError er){
		panelLoading.SetActive (false);
	}

}
