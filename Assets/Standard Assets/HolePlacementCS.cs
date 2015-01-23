using UnityEngine;
using System.Collections;

public class HolePlacementCS : MonoBehaviour {

    public int spritePixelToUnit = 100;
    public GameObject thuPrefab;
    public float screenHeightRatio = 0.9f;
    public int rowNo = 3;
    public int thuPerRow = 4;
    private Camera cam;

    void Awake(){	
	    cam = GameObject.Find("/Camera").GetComponent<Camera>();
		placeThu();
    }

    private void placeThu(){
	    float sHeight = Screen.height * screenHeightRatio;
	    float sWidth = Screen.width;
	    float tHeight = thuPrefab.renderer.bounds.size.y * spritePixelToUnit;
	    float tWidth = thuPrefab.renderer.bounds.size.x * spritePixelToUnit;
	    float colOffset = (sWidth - tWidth * thuPerRow) / (thuPerRow + 1);
	    float rowOffset = (sHeight - tHeight * rowNo) / (rowNo + 1);
	
	    Vector3 worldPos;
	
	    for(int row = 1; row <= rowNo; row++){
		    for(int col = 1; col <= thuPerRow; col++){
			    worldPos = cam.ScreenToWorldPoint(
				    new Vector3 (
					    (colOffset * col) + (tWidth / 2) * (col * 2 - 1), 
					    (rowOffset * row) + (tHeight / 2) * (row * 2 - 1), 
					    cam.transform.position.z * -1)
			    );
			    (Instantiate(thuPrefab, worldPos, Quaternion.identity) as GameObject).transform.parent = transform;
		    }
	    }
    }
}
