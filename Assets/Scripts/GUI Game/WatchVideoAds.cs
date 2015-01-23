using UnityEngine;
using System.Collections;
using ChartboostSDK;
public class WatchVideoAds : MonoBehaviour {

	public GameObject panelLoading;
	private bool isAdsShowing = false;

	void OnEnable(){
		Chartboost.didCompleteRewardedVideo  += didCompleteRewardedVideo ;
		Chartboost.didDismissRewardedVideo  += didDismissRewardedVideo ;
	}

	void OnDisable(){
		Chartboost.didCompleteRewardedVideo  -= didCompleteRewardedVideo ;
		Chartboost.didDismissRewardedVideo  -= didDismissRewardedVideo ;
	}
	 
	void didCompleteRewardedVideo  (CBLocation location, int t){
		if(PlControl.control.getCoin() < 5){
			PlControl.control.addCoin ();
		}
	}
	
	void didDismissRewardedVideo  (CBLocation location){
		panelLoading.SetActive (false);

//		Chartboost.DestroyObject (gameObject);
	}

//	void didFailToLoadRewardedVideo (CBLocation location, CBImpressionError cb){
//		panelError.SetActive (true);
//	}

	public void clickVideoAds(){
		Chartboost.showRewardedVideo (CBLocation.GameOver);
		panelLoading.SetActive (true);
	}
}
