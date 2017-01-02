var onTop = "Common";
function invisible(L)
{
	var value = "L" + L;
	document.getElementById(value).style.visibility = "hidden";
}

function visible(L)
{
	var value = "L" + L;
	document.getElementById(value).style.visibility = "visible";
	
}

function hideTop()
{
	onTop2 = onTop + "2";
	document.getElementById(onTop2).style.visibility = "hidden";
	document.getElementById('Shadow').style.visibility = "hidden";
	document.getElementById('disable').style.visibility = "visible";
	document.getElementById('disablediv').style.visibility = "visible";
	document.getElementById('disable').style.zIndex = "6";
	document.getElementById('disablediv').style.zIndex = "6";
}

function showTop()
{
	onTop2 = onTop + "2";
	document.getElementById(onTop2).style.visibility = "visible";
	document.getElementById('Shadow').style.visibility = "visible";
	document.getElementById('disable').style.visibility = "hidden";
	document.getElementById('disablediv').style.visibility = "hidden";

}

function changeOnTop(L)
{
	if(onTop != L)
	{
	var L2 = L + "2";
	var onTop2 = onTop + "2";
	var onTopoverlay = "L" + onTop;
	var overlay = "L" + L;
	//alert(L2 + "  " + onTop2 + "  " + onTopoverlay + "  " + overlay);
	document.getElementById(onTop).style.visibility = "visible";
	document.getElementById(onTop).style.zIndex = "2";
	document.getElementById(onTop2).style.zIndex = "1";
	document.getElementById(onTop2).style.backgroundColor = "#A8F30A";
	document.getElementById(onTopoverlay).style.zIndex= "3";
	document.getElementById(onTop).style.top = document.getElementById(L2).style.top;
	document.getElementById(onTop).style.left = document.getElementById(L2).style.left;
	document.getElementById(onTop).style.width = "512px";
	document.getElementById(onTop).style.height = "365px";
	document.getElementById(onTop2).style.top = document.getElementById(L2).style.top;
	document.getElementById(onTop2).style.left = document.getElementById(L2).style.left;
	document.getElementById(onTop2).style.width = "512px";
	document.getElementById(onTop2).style.height = "365px";
	document.getElementById(onTopoverlay).style.visibility = "visible";
	document.getElementById(onTopoverlay).style.top = document.getElementById(L2).style.top;
	document.getElementById(onTopoverlay).style.left = document.getElementById(L2).style.left;
	
	//alert(document.getElementById('Friends2').style.top);
	
	document.getElementById(L2).style.zIndex = "5";
	document.getElementById(L2).style.backgroundColor = "white";
	document.getElementById(L2).style.top = "95px";
	document.getElementById(L2).style.left = "438px";
	document.getElementById(L2).style.height = "600px";
	document.getElementById(L2).style.width = "720px";
	document.getElementById(L).style.visibility = "hidden";
	document.getElementById(overlay).style.visibility = "hidden";
	onTop = L;
	}

}