using UnityEngine;
using System.Collections;

public class InputControlCS : MonoBehaviour {
    public GameObject hitDetect(){
	    if (Input.GetMouseButtonUp(0)) {
		    RaycastHit2D hit = Physics2D.Raycast(Camera.main.ScreenToWorldPoint(Input.mousePosition), Vector2.zero);
		    if (hit.collider != null) {
			    return hit.collider.gameObject;
		    }
	    }
	    return null;
    }
}
