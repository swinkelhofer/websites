var EMail;
function strip(a)
{
	while(a.charCodeAt(a.length-1) == "160")
	{
		a = a.substr(0,a.length-1);
	}
	return a;
}
function edit(a)
{
	if(a == "EMail")
	{
		Check = confirm("Achtung!!! Sie verändern dadurch auch ihren Benutzernamen. Trotzdem durchführen?");
		if(Check == false) 
		{
			return;
		}
		EMail = document.getElementById(a).firstChild.data;
	}

	var td = document.getElementById(a);
	text = td.firstChild.data;
	text = strip(text);
	
	if(navigator.appName == "Microsoft Internet Explorer")
	{
		td.firstChild.data = "";
		td.removeChild(td.lastChild);
		if(a == "PLZ")
			var input = document.createElement("<input type=\"text\" maxlength=\"5\" value=\""+text+"\" onKeyup=\"checkKey(event,'"+a+"')\" id=\""+a+"input\" />");
		else
			var input = document.createElement("<input type=\"text\" value=\""+text+"\" onKeyup=\"checkKey(event,'"+a+"')\" id=\""+a+"input\" />");
		td.appendChild(input);
	}
	if(navigator.appName == "Netscape")
	{
		var input = document.createElement("input");
		var tag = document.createAttribute("type");
		tag.nodeValue = "text";
		input.setAttributeNode(tag);
		var tag = document.createAttribute("value");
		tag.nodeValue = text;
		td.firstChild.data = "";
		td.removeChild(td.lastChild);
		input.setAttributeNode(tag);
		var tag = document.createAttribute("onKeyup");
		tag.nodeValue = "checkKey(event,'" + a + "')";
		input.setAttributeNode(tag);
		if(a == "PLZ")
		{
			var tag = document.createAttribute("maxlength");
			tag.nodeValue = "5";
			input.setAttributeNode(tag);
		}
		var tag = document.createAttribute("id");
		tag.nodeValue = a + "input";
		input.setAttributeNode(tag);
		td.appendChild(input);
	}
	

	var space = document.createTextNode(String.fromCharCode(160,160,160));
	td.appendChild(space);
	var submit = document.createElement("a");
	var tag = document.createAttribute("href");
	tag.nodeValue = "javascript:changeIE('"+a+"')";
	submit.setAttributeNode(tag);
	td.appendChild(submit);
	var child = document.createTextNode("OK");
	submit.appendChild(child);
	

}
function changePass()
{
	if(navigator.appName == "Netscape")
	{
	var dark = document.createElement("img");
	var tag = document.createAttribute("src");
	tag.nodeValue = "overlay.png";
	dark.setAttributeNode(tag);
	var tag = document.createAttribute("id");
	tag.nodeValue = "passimg";
	dark.setAttributeNode(tag);
	var tag = document.createAttribute("style");
	tag.nodeValue = "width:100%; height:100%; top: 0px; left:0px; z-Index:4; position:absolute;";
	dark.setAttributeNode(tag);
	document.body.appendChild(dark);
	var div = document.createElement("div");
	var tag = document.createAttribute("style");
	tag.nodeValue = "width: 400px; padding:20px; border: 1px solid gray; height: 130px; top: 200px; left: 150px; z-Index:4;position: absolute; background-color:white;";
	div.setAttributeNode(tag);
	var tag = document.createAttribute("id");
	tag.nodeValue = "passdiv";
	div.setAttributeNode(tag);
	document.body.appendChild(div);
	var table = document.createElement("table");
	div.appendChild(table);
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	tr.appendChild(td);
	var text = document.createTextNode("Altes Passwort:  ");
	td.appendChild(text);
	var td = document.createElement("td");
	tr.appendChild(td);
	var input = document.createElement("input");
	var tag = document.createAttribute("type");
	tag.nodeValue = "password";
	input.setAttributeNode(tag);
	var tag = document.createAttribute("id");
	tag.nodeValue = "oldpass";
	input.setAttributeNode(tag);
	var tag = document.createAttribute("class");
	tag.nodeValue = "pass";
	input.setAttributeNode(tag);
	td.appendChild(input);
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	tr.appendChild(td);
	var text = document.createTextNode("Neues Passwort:  ");
	td.appendChild(text);
	var td = document.createElement("td");
	tr.appendChild(td);
	var input = document.createElement("input");
	var tag = document.createAttribute("type");
	tag.nodeValue = "password";
	input.setAttributeNode(tag);
	var tag = document.createAttribute("id");
	tag.nodeValue = "newpass1";
	input.setAttributeNode(tag);
	var tag = document.createAttribute("class");
	tag.nodeValue = "pass";
	input.setAttributeNode(tag);
	td.appendChild(input);
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	tr.appendChild(td);
	var text = document.createTextNode("Passwort wiederholen:");
	td.appendChild(text);
	var td = document.createElement("td");
	tr.appendChild(td);
	var input = document.createElement("input");
	var tag = document.createAttribute("type");
	tag.nodeValue = "password";
	input.setAttributeNode(tag);
	var tag = document.createAttribute("id");
	tag.nodeValue = "newpass2";
	input.setAttributeNode(tag);
	var tag = document.createAttribute("class");
	tag.nodeValue = "pass";
	input.setAttributeNode(tag);
	td.appendChild(input);
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	tr.appendChild(td);
	var text = document.createTextNode("");
	td.appendChild(text);
	var td = document.createElement("td");
	tr.appendChild(td);
	var input = document.createElement("input");
	var tag = document.createAttribute("type");
	tag.nodeValue = "button";
	input.setAttributeNode(tag);
	var tag = document.createAttribute("onClick");
	tag.nodeValue = "pass()";
	input.setAttributeNode(tag);
	var tag = document.createAttribute("value");
	tag.nodeValue = "Ändern";
	input.setAttributeNode(tag);
	td.appendChild(input);
	var input = document.createElement("input");
	var tag = document.createAttribute("type");
	tag.nodeValue = "button";
	input.setAttributeNode(tag);
	var tag = document.createAttribute("onClick");
	tag.nodeValue = "document.body.removeChild(document.getElementById('passdiv')); document.body.removeChild(document.getElementById('passimg'));";
	input.setAttributeNode(tag);
	var tag = document.createAttribute("value");
	tag.nodeValue = "Abbrechen";
	input.setAttributeNode(tag);
	td.appendChild(input);
	
	
	
	
	}
	if(navigator.appName == "Microsoft Internet Explorer")
	{
	var div = document.createElement("<div>");
	var tag = document.createAttribute("id");
	tag.nodeValue = "passdiv";
	div.setAttributeNode(tag);
	document.body.appendChild(div);
	div.style.position = "absolute";
	div.style.backgroundColor = "white";
	div.style.border = "1px solid gray";
	div.style.top = "150px";
	div.style.left = "170px";
	div.style.width = "400px";
	div.style.height = "170px";
	div.style.zIndex = "4";
	div.style.padding = "15px";
	var dark = document.createElement("<img src=\"overlay.png\" id=\"passimg\" />");
	document.body.appendChild(dark);
	dark.style.top = "0px";
	dark.style.left = "0px";
	dark.style.height = "600px";
	dark.style.width = "1000px";
	dark.style.position = "absolute";
	dark.style.zIndex = "3";
	var span = document.createElement("<span style=\"width: 170px;\">");
	var text = document.createTextNode("Altes Passwort:");
	span.appendChild(text);
	div.appendChild(span);
	var input = document.createElement("<input type=\"password\" class=\"pass\" id=\"oldpass\" />");
	div.appendChild(input);
	div.appendChild(document.createElement("<br />"));
	var span = document.createElement("<span style=\"width: 170px;\">");
	var text = document.createTextNode("Neues Passwort:");
	span.appendChild(text);
	div.appendChild(span);
	var input = document.createElement("<input type=\"password\" class=\"pass\" id=\"newpass1\" />");
	div.appendChild(input);
	div.appendChild(document.createElement("<br />"));
	var span = document.createElement("<span style=\"width: 170px;\">");
	var text = document.createTextNode("Passwort wiederholen:");
	span.appendChild(text);
	div.appendChild(span);
	var input = document.createElement("<input type=\"password\" class=\"pass\" id=\"newpass2\" />");
	div.appendChild(input);
	div.appendChild(document.createElement("<br />"));
	div.appendChild(document.createElement("<br />"));
	var span = document.createElement("<span style=\"width: 150px;\">");
	var text = document.createTextNode(" ");
	span.appendChild(text);
	div.appendChild(span);
	var submit = document.createElement("<input type=\"button\" onClick=\"pass()\" value=\"Ändern\" />");
	div.appendChild(submit);
	var breakoff = document.createElement("<input type=\"button\" onClick=\"off()\" value=\"Abbrechen\" />");
	div.appendChild(breakoff);
	
	
	



	}
}
function off()
{
	document.body.removeChild(document.getElementById('passdiv'));
	document.body.removeChild(document.getElementById('passimg'));
}

function pass()
{
	var oldpass = document.getElementById("oldpass").value;
	var newpass1 = document.getElementById("newpass1").value;
	var newpass2 = document.getElementById("newpass2").value;
	var ajax = new XMLHttpRequest();
	if(ajax)
	{
		ajax.open('post','pass.php',true);
		ajax.onreadystatechange = function()
		{
			if(ajax.readyState==4)
			{
				request = ajax.responseText;
				if(request == "")
				{
					alert("Fehler aufgetreten, bitte nochmals versuchen");
				}
				else
				{
					pw = request;
					if(oldpass == "" && newpass1 == "" && newpass2 == "")
					alert("Du kannst nicht einfach alle Felder leer lassen!");
					if(pw == oldpass && newpass1 == newpass2 && newpass1 != "")
					{
						if(newpass1 == oldpass)
						{
							alert("Neu ist das Passwort ja nicht wirklich!");
						}
						else
						{
							updateDB("PW",newpass1);
							document.getElementById("oldpass").value = "";
							document.getElementById("newpass1").value = "";
							document.getElementById("newpass2").value = "";
							document.body.removeChild(document.getElementById("passimg"));
							document.body.removeChild(document.getElementById("passdiv"));
							alert("Erfolgreich geändert");
						}
					}
					
					if(newpass1 != newpass2)
					{
						document.getElementById("oldpass").value = "";
						document.getElementById("newpass1").value = "";
						document.getElementById("newpass2").value = "";
						alert("Neue Passwörter stimmen nicht überein!");
					}
					
					if(oldpass == "")
					{
						document.getElementById("oldpass").value = "";
						document.getElementById("newpass1").value = "";
						document.getElementById("newpass2").value = "";
						alert("Bitte altes Passwort eingeben!");
					}
					if(newpass1 == "" || newpass2 == "")
					{
						document.getElementById("oldpass").value = "";
						document.getElementById("newpass1").value = "";
						document.getElementById("newpass2").value = "";
						alert("Bitte ein neues Passwort eingeben!");
					}
					if(pw != oldpass)
					{
						document.getElementById("oldpass").value = "";
						document.getElementById("newpass1").value = "";
						document.getElementById("newpass2").value = "";
						alert("Das alte Passwort ist falsch!");
					}
				}
			}
		}
	};
	ajax.send(null);
	
}


function editTextarea(a)
{
	var td = document.getElementById(a);
	text = td.firstChild.data;
	text = strip(text);
	//text = text.substr(0,text.length-3);
	td.removeChild(td.firstChild);
	td.removeChild(td.lastChild);
	var area = document.createElement("textarea");
	var tag = document.createAttribute("cols");
	tag.nodeValue="50";
	area.setAttributeNode(tag);
	var tag = document.createAttribute("id");
	tag.nodeValue=a + "value";
	area.setAttributeNode(tag);
	textnode = document.createTextNode(text);
	area.appendChild(textnode);
	td.appendChild(area);
	var space = document.createTextNode(String.fromCharCode(160,160,160));
	td.appendChild(space);
	var submit = document.createElement("a");
	var tag = document.createAttribute("href");
	tag.nodeValue = "javascript:changeTextarea('"+a+"')";
	submit.setAttributeNode(tag);
	td.appendChild(submit);
	var child = document.createTextNode("OK");
	submit.appendChild(child);
}



function checkKey(Ereignis,a)
{
	if(navigator.appName == "Netscape")
	{
		if(Ereignis.which == 13)
		{
			input = a + "input";
			value = document.getElementById(input).value;
			var td = document.getElementById(a);
			td.removeChild(td.firstChild);
			td.removeChild(td.firstChild);
			td.removeChild(td.lastChild);
			td.removeChild(td.lastChild);
			updateDB(a,value);
			value = value + String.fromCharCode(160,160,160);
			var textnode = document.createTextNode(value);
			td.appendChild(textnode);
			
			var change = document.createElement("a");
			var tag = document.createAttribute("href");
			tag.nodeValue = "javascript:edit('" + a + "')";
			change.setAttributeNode(tag);
			var childtext = document.createTextNode("[ändern]");
			change.appendChild(childtext);
			td.appendChild(change);

		}
	}
	if(a == "PLZ")
	{
		postlz();
		return;
	}
	
}

function changeIE(a)
{
	input = a + "input";
			value = document.getElementById(input).value;
			updateDB(a,value);
			var td = document.getElementById(a);
			td.removeChild(td.firstChild);
			td.removeChild(td.firstChild);
			td.removeChild(td.lastChild);
			td.removeChild(td.lastChild);
			
			value = value + String.fromCharCode(160,160,160);
			var textnode = document.createTextNode(value);
			td.appendChild(textnode);
			
			var change = document.createElement("a");
			var tag = document.createAttribute("href");
			tag.nodeValue = "javascript:edit('" + a + "')";
			change.setAttributeNode(tag);
			var childtext = document.createTextNode("[ändern]");
			change.appendChild(childtext);
			td.appendChild(change);

}

function changeTextarea(a)
{
		input = a + "value";
		value = document.getElementById(input).value;
		updateDB(a,value);
		value = value + String.fromCharCode(160,160,160);
		
		var td = document.getElementById(a);
		td.removeChild(td.firstChild);
		td.removeChild(td.firstChild);
		td.removeChild(td.lastChild);
		var textnode = document.createTextNode(value);
		td.appendChild(textnode);
			
		var change = document.createElement("a");
		var tag = document.createAttribute("href");
		tag.nodeValue = "javascript:editTextarea('" + a + "')";
		change.setAttributeNode(tag);
		var childtext = document.createTextNode("[ändern]");
		change.appendChild(childtext);
		td.appendChild(change);
}

function updateDB(row,value)
{
	var xmlHttp = new XMLHttpRequest();
	for(i=0;i<=value.length;i++)
	{
	value = value.replace("Ä","\\\\Ae\\\\");
	value = value.replace("ä","\\\\ae\\\\");
	value = value.replace("Ö","\\\\Oe\\\\");
	value = value.replace("ö","\\\\oe\\\\");
	value = value.replace("Ü","\\\\Ue\\\\");
	value = value.replace("ü","\\\\ue\\\\");
	value = value.replace("ß","\\\\sz\\\\");
	value = value.replace("€","\\\\euro\\\\");
	}
	
	url= 'update.php';
	post=row+'='+value;
	if(xmlHttp)
	{
		xmlHttp.open('post', url,true);
		xmlHttp.onreadystatechange = function()
		{
			if(xmlHttp.readyState==4)
			{
				request = xmlHttp.responseText;
				if(request != "")
				{
					alert(request);
					document.getElementById("EMail").firstChild.data = EMail;
				}
				else
				{
					if(row=="EMail")
						EMail = value;
				}
			}
		}
	};
	xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xmlHttp.send(post);
				
}


function postlz()
{
	plz = document.getElementById("PLZinput").value;
	var Req = new XMLHttpRequest();
	get = "PLZ=" + plz;
	url = "PLZ.php";
	if(Req)
	{
		Req.open('post', url,true);
		Req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		Req.onreadystatechange = function()
		{
			if(Req.readyState==4)
			{
				request = Req.responseText;
				var req = document.createTextNode(request);
				var ort = document.getElementById("Ort");
				ort.removeChild(ort.firstChild);
				ort.appendChild(req);
			}
		}
	};
	Req.send(get);

}


function createStatus()
{
	var td = document.getElementById("Status");
	value = td.firstChild.data;
	value = strip(value);
	for(i=0;i<=td.childNodes.length+1;i++)
	{
	td.removeChild(td.firstChild);
	}
	var select = document.createElement("select");
	var tag = document.createAttribute("id");
	tag.nodeValue = "stateselect";
	select.setAttributeNode(tag);
	td.appendChild(select);
	var option = document.createElement("option");
	option.text = "solo";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,0);
	var option = document.createElement("option");
	option.text = "vergeben";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,1);
	td.appendChild(select);
	var option = document.createElement("option");
	option.text = "unglücklich verliebt";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,2);
	td.appendChild(select);
	var option = document.createElement("option");
	option.text = "verliebt";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,3);
	td.appendChild(select);
	var option = document.createElement("option");
	option.text = "verheiratet";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,4);
	td.appendChild(select);
	var option = document.createElement("option");
	option.text = "geschieden";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,5);
	td.appendChild(select);	
	var option = document.createElement("option");
	option.text = "in Arbeit";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,6);
	td.appendChild(select);	
	var option = document.createElement("option");
	option.text = "mal sehen";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,7);
	td.appendChild(select);
	var option = document.createElement("option");
	option.text = "frisch getrennt";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,8);
	td.appendChild(select);
	var option = document.createElement("option");
	option.text = "Danke, nie wieder";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,9);
	td.appendChild(select);
	var option = document.createElement("option");
	option.text = "gute Frage";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,10);
	td.appendChild(select);	
	var option = document.createElement("option");
	option.text = "Witwe/r";
	if(navigator.appName == "Netscape")
		select.appendChild(option);
	if(navigator.appName == "Microsoft Internet Explorer")
		select.add(option,11);
	switch(value)
	{
		case "solo": select.selectedIndex=0;
						break;
		case "vergeben": select.selectedIndex=1;
						break;
		case "unglücklich verliebt": select.selectedIndex=2;
						break;
		case "verliebt": select.selectedIndex=3;
						break;
		case "verheiratet": select.selectedIndex=4;
						break;
		case "geschieden": select.selectedIndex=5;
						break;
		case "in Arbeit": select.selectedIndex=6;
						break;
		case "mal sehen": select.selectedIndex=7;
						break;
		case "frisch getrennt": select.selectedIndex=8;
						break;
		case "Danke, nie wieder": select.selectedIndex=9;
						break;
		case "gute Frage": select.selectedIndex=10;
						break;
		case "Witwe/r": select.selectedIndex=11;
						break;
	}
	td.appendChild(select);	
	var a = document.createElement("a");
	var tag = document.createAttribute("href");
	tag.nodeValue = "javascript:editSelect()";
	a.setAttributeNode(tag);
	var child = document.createTextNode("OK");
	a.appendChild(child);
	var space = document.createTextNode(String.fromCharCode(160,160,160));
	td.appendChild(space);
	td.appendChild(a);
}
function editSelect()
{
	var select = document.getElementById("stateselect");
	if(navigator.appName == "Netscape")
		status = select.value;
	if(navigator.appName == "Microsoft Internet Explorer")
	{
		index = select.selectedIndex;
		var option = select.childNodes[index];
		var status = option.text;
	}
	updateDB("Status",status);
	var td = document.getElementById("Status");
	for(i=0;i<=td.childNodes.length+1;i++)
	{
		td.removeChild(td.firstChild);
	}
	var text = document.createTextNode(status);
	td.appendChild(text);
	var space = document.createTextNode(String.fromCharCode(160,160,160));
	td.appendChild(space);
	var a = document.createElement("a");
	var tag = document.createAttribute("href");
	tag.nodeValue = "javascript:createStatus()";
	a.setAttributeNode(tag);
	var atext = document.createTextNode("[ändern]");
	a.appendChild(atext);
	td.appendChild(a);
}
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
	var LFrame = L + "frame";
	var onTopFrame = onTop + "frame";
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
	document.getElementById(onTop2).style.borderRadius = document.getElementById(L2).style.borderRadius;
	var src1 = document.getElementById(onTopFrame).src
	src1 = src1.replace("state=1", "state=0");
	document.getElementById(onTopFrame).src = src1;
	var src2 = document.getElementById(LFrame).src;
	src2 = src2.replace("state=0", "state=1");
	document.getElementById(LFrame).src = src2;
	
	
	//alert(document.getElementById('Friends2').style.top);
	document.getElementById(L2).style.borderRadius = "17px";
	document.getElementById(L2).style.zIndex = "5";
	document.getElementById(L2).style.backgroundColor = "white";
	document.getElementById(L2).style.top = "95px";
	document.getElementById(L2).style.left = "150px";
	document.getElementById(L2).style.height = "600px";
	document.getElementById(L2).style.width = "720px";
	document.getElementById(L).style.visibility = "hidden";
	document.getElementById(overlay).style.visibility = "hidden";
	onTop = L;
	}

}

function highlight()
{
	document.getElementById("high").src = "Logout-high.png";
}
function rehighlight()
{
	document.getElementById("high").src = "Logout.png";
}