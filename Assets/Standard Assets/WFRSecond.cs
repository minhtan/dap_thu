using UnityEngine;
using System.Collections;

public class WFRSecond : MonoBehaviour {

	public static IEnumerator wait(float time){
		float startTime = Time.realtimeSinceStartup;
		while(Time.realtimeSinceStartup < startTime + time){
			yield return null;
		}
	}
}
