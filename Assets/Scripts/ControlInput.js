﻿#pragma strict

function HitDetect(){
	if(Input.touchCount > 0)
	{
	    for(var i = 0; i < Input.touchCount; i++)
	    {
	     	var currentTouch : Touch = Input.GetTouch(i);
	        if(currentTouch.phase == TouchPhase.Began)
	        {
	            var v2 : Vector2 = new Vector2(Camera.main.ScreenToWorldPoint(currentTouch.position).x, Camera.main.ScreenToWorldPoint(currentTouch.position).y);
	            var c2d : Collider2D = Physics2D.OverlapPoint(v2);

	            if(c2d != null)
	            {    
	                return true;
	            }
	        }
		}
	}
	return false;
}