using UnityEngine;
using System.Collections;

public class ScreenPlacement : MonoBehaviour {
	
	public ScreenPosition position;
	public Vector2 pixelOffset;
	
	void Start(){
		transform.ScreenPlacement( position, pixelOffset );	
	}
}
