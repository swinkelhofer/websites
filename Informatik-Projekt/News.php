<?php
session_start();
session_register('entry');
session_register('ID');
if(trim($_SESSION['ID']) == "" || $_SESSION['ID'] != $_GET["UID"] || trim($_SESSION['entry']) == "" || $_SESSION['entry'] == "none")
	header("Location:index.php");
else
{
if($_GET["state"]=="0")
{
	echo("<html><head>
	<meta http-equiv=\"expires\" content=\"0\">
	<meta http-equiv=\"cache-control\" content=\"no-cache\">
	<title>Nachrichten</title></head>
	<body style='background-color:transparent;'><h1>Nachrichten</h1>");
	$UID = $_GET["UID"];
	$db = sqlite_open('news.sql', '0666');
	$sql = "SELECT * FROM 'Nachrichten' WHERE IDrec='";
	$sql .= $UID;
	$sql .= "' AND Read='no' AND Del2='false'";
	$result = sqlite_query($sql, $db);
	$i=0;
	while($row = sqlite_fetch_array($result))
	{
		$i++;
	}
	if($i > 1)
		echo("<p>" . $i . " neue Nachrichten</p>");
	else if($i == 1)
		echo("<p>Eine neue Nachricht</p>");
	else
		echo("<p>Keine neuen Nachrichten</p>");
	echo("</body></html>");
}
if($_GET["state"]=="1")
{
	if($_POST["Send"] == "Senden" && trim($_POST["text"]) != "" && trim($_POST["id"]) != "")
	{
		$IDsend = $_GET["UID"];
		$IDrec = $_POST["id"];
		$text = $_POST["text"];
		$db = sqlite_open('news.sql', '0666');
		$sql = "INSERT INTO 'Nachrichten' ('IDsend', 'Text', 'IDrec', 'Read', 'Date','del1','del2') VALUES ('";
		$sql .= $IDsend;
		$sql .= "', '";
		$sql .= $text;
		$sql .= "', '";
		$sql .= $IDrec;
		$sql .= "', 'no','";
		$sql .= time();
		$sql .= "','false','false')";
		sqlite_query($sql, $db);
		
		
	}
?>		
<html>
<head>

<meta http-equiv="expires" content="0">
<meta http-equiv="cache-control" content="no-cache">
<title>Nachrichten</title>

<script type="text/javascript">
var onTop="Empty"
var visibles = new Array();
page1 = "1greatdiv0";
page = "greatdiv0";
function changeOnTop(L)
{
	document.getElementById(onTop).style.visibility = "hidden";
	document.getElementById(L).style.visibility = "visible";
	if(L == "In" && document.getElementById("greatdiv0") && document.getElementById("1greatdiv0"))
	{
		document.getElementById("greatdiv0").style.visibility="visible";
		page="greatdiv0";
		document.getElementById("1greatdiv0").style.visibility="hidden";
	}
	if(L == "Out" && document.getElementById("greatdiv0") && document.getElementById("1greatdiv0"))
	{
		document.getElementById("1greatdiv0").style.visibility="visible";
		page1="1greatdiv0";
		document.getElementById("greatdiv0").style.visibility="hidden";
	}
	if(L== "New" && document.getElementById("greatdiv0") && document.getElementById("1greatdiv0"))
	{
		document.getElementById("greatdiv0").style.visibility="hidden";
		document.getElementById("1greatdiv0").style.visibility="hidden";
	}
	onTop=L;
	for(i=0; i < visibles.length; i++)
	{
		document.getElementById(visibles[i]).style.visibility = "hidden";
		document.getElementById(visibles[i]).style.height = "1px";
	}
}

function hideOrShow(L)
{
	var feld = L.substr(L.length-4,4);
	feld = "hidden" + feld;
	var url = document.getElementById(feld).value;
	url = "editnews.php" + url + "&do=read";
	if(document.getElementById(L).style.visibility == "hidden")
	{
		document.getElementById(L).style.visibility = "visible";
		document.getElementById(L).style.height = "auto";
		
		var feld = L.substr(L.length-4,4);
		span = "span" + feld;
		feld = "hidden" + feld;
		var request="";
		if(document.getElementById(span).style.fontWeight == "bold")
		{
			document.getElementById(span).style.fontWeight = "normal";
			var xmlHttp = new XMLHttpRequest();
			if(xmlHttp)
			{
				xmlHttp.open('GET', url,true);
				xmlHttp.onreadystatechange = function()
				{
					if(xmlHttp.readyState==4)
					{
						request = xmlHttp.responseText;
						document.getElementById('income').firstChild.nodeValue = "Posteingang (" + request + ")";
					}
				}
			};
			xmlHttp.send(null);
		}
		
		visibles.push(L);
	} 
	else if(document.getElementById(L).style.visibility = "visible")
	{
		document.getElementById(L).style.visibility = "hidden";
		document.getElementById(L).style.height = "1px";
	}
}
function hideOrShow1(L)
{
	if(document.getElementById(L).style.visibility == "hidden")
	{
		document.getElementById(L).style.visibility = "visible";
		document.getElementById(L).style.height = "auto";
		visibles.push(L);
	} 
	else if(document.getElementById(L).style.visibility = "visible")
	{
		document.getElementById(L).style.visibility = "hidden";
		document.getElementById(L).style.height = "1px";
	}
}

function del2(L)
{
	url="";
	var feld = L.substr(L.length-4,4);
	var vid = "vid" + feld;
	var div = "div" + feld;
	feld = "hidden" + feld;
	var url = document.getElementById(feld).value;
	url = "editnews.php" + url + "&do=del2";
	var xmlHttp = new XMLHttpRequest();
	if(xmlHttp)
	{
		xmlHttp.open('GET', url,true);
		xmlHttp.onreadystatechange = function()
		{
		}
	};
	xmlHttp.send(null);
	document.getElementById(vid).style.visibility = "hidden";
	document.getElementById(div).style.visibility = "hidden";

	

}

function del1(L)
{
	url="";
	var feld = L.substr(L.length-4,4);
	var vid = "1vid" + feld;
	var div = "1div" + feld;
	feld = "1hidden" + feld;
	var url = document.getElementById(feld).value;
	url = "editnews.php" + url + "&do=del1";
	var xmlHttp = new XMLHttpRequest();
	if(xmlHttp)
	{
		xmlHttp.open('GET', url, true);
		xmlHttp.onreadystatechange = function()
		{
		}
	};
	xmlHttp.send(null);
	document.getElementById(vid).style.visibility = "hidden";
	document.getElementById(div).style.visibility = "hidden";
}
function nextpage(L)
{
	pagenew = page.charAt(page.length-1);
	pagenew++;
	pagenew = "greatdiv" + pagenew;
	if(document.getElementById(pagenew))
	{
		document.getElementById(page).style.visibility = "hidden";
		page = page.charAt(page.length-1);
		page++;
		page = "greatdiv" + page;
		document.getElementById(page).style.visibility = "visible";
		visibles.push(page);
	}
	
}
function lastpage(L)
{
	if(page.charAt(page.length-1) == 1)
	{
		document.getElementById('greatdiv1').style.visibility = "hidden";
		document.getElementById('greatdiv0').style.visibility = "visible";
		page1 = "greatdiv0";
	}
	if(page.charAt(page.length-1) > 1)
	{

		document.getElementById(page).style.visibility = "hidden";
		page = page.charAt(page.length-1);
		page--;
		page = "greatdiv" + page;
		document.getElementById(page).style.visibility = "visible";
		visibles.push(page);
	}
	if(page.charAt(page.length-1) == 0)
	{
		page = "greatdiv0";
	}
}
function nextpage1(L)
{
	pagenew1 = page1.charAt(page1.length-1);
	pagenew1++;
	pagenew1 = "1greatdiv" + pagenew1;
	if(document.getElementById(pagenew1))
	{
		document.getElementById(page1).style.visibility = "hidden";
		page1 = page1.charAt(page1.length-1);
		page1++;
		page1 = "1greatdiv" + page1;
		document.getElementById(page1).style.visibility = "visible";
		visibles.push(page1);
	}
	
}
function lastpage1(L)
{
	if(page1.charAt(page1.length-1) == 1)
	{
		document.getElementById('1greatdiv1').style.visibility = "hidden";
		document.getElementById('1greatdiv0').style.visibility = "visible";
		page1 = "1greatdiv0";
	}
	if(page1.charAt(page1.length-1) > 1)
	{
		document.getElementById(page1).style.visibility = "hidden";
		page1 = page1.charAt(page1.length-1);
		page1--;
		page1 = "1greatdiv" + page1;
		document.getElementById(page1).style.visibility = "visible";
		visibles.push(page1);
	}
}

</script>
</head>
<body style="background-color:transparent;padding: 10px;">
<form method="post">
<?php
	$db = sqlite_open('news.sql', '0666');
	$sql = "SELECT * FROM 'Nachrichten' WHERE IDrec='";
	$sql .= $_GET["UID"];
	$sql .= "' AND Read='no' AND Del2='false'";
	$result = sqlite_query($sql, $db);
	$i=0;
	while($row = sqlite_fetch_array($result))
	{
		$i++;
	}
?>

<div style="width:23%; height:98%; border-right: 1px solid black;position: absolute; left: 2%; top:2%;">
<div style="cursor:pointer;" onMouseDown="changeOnTop('New')">Neue Nachricht erstellen</div><br />
<div style="cursor:pointer;" onMouseDown="changeOnTop('In')" id="income">Posteingang (<?php echo($i); ?>)</div><br />
<div style="cursor:pointer;" onMouseDown="changeOnTop('Out')">Postausgang</div>
</div>



<div id="Empty" style="width:75%; height:100%; position: absolute; left: 25%; top:0px; visibility:visible;"><iframe id="iframe1" src="" style="visibility:hidden;" allowtransparency="true" frameborder="0" transparency="true"></iframe></div>



<div id="New" style="padding: 2%; width:75%; height:100%; position: absolute; left: 25%; top:0px; visibility:hidden;">
<form method="post">
<h1>Neue Nachricht erstellen</h1>
<input type="text" name="id" style="border:1px solid black;"/><br />
<textarea name="text" rows="20" style="border:1px solid black;">
</textarea><br />
<input type="submit" value="Senden" name="Send" />
</form>
</div>


<div id="In" style="padding: 2%; width:68%; height:100%; position: absolute; left: 25%; top:0px; visibility:hidden;">

<h1>Posteingang</h1>
<div style="text-align:center;"><a href="javascript:lastpage('greatdiv')"><<<</a> <a href="javascript:nextpage('greatdiv')">>>></a></div><br />
<?php

		$ID = $_GET["UID"];
		$db = sqlite_open('news.sql', '0666');
		$sql = "SELECT * FROM 'Nachrichten' WHERE IDrec='$ID' AND Del2='false' ORDER BY Date DESC";
		$result = sqlite_query($sql, $db);
		$db2 = sqlite_open('vz.sql', '0666');
		$i = 0;
		while($row = sqlite_fetch_array($result))
		{
			if($i % 10 == 0)
			{
				if($i/10 == 0)
					echo("<div id=\"greatdiv" . $i/10 . "\" style=\"position:absolute;\">");
				else
					echo("<div id=\"greatdiv" . $i/10 . "\" style=\"visibility:hidden;position:absolute;\">");
			}
			$ID = $row["IDsend"];
			$sql2 = "SELECT EMail FROM Profil WHERE ID='$ID'";
			$user = sqlite_query($sql2, $db2);
			while($zeile = sqlite_fetch_array($user))
			{
				if($row["Read"] == "no")
				{
					$bold = "bold";
				}
				else
				{
					$bold = "normal";
				}
				if($i < 10)
					$i = "000".$i;
				if($i < 100 && $i >= 10)
					$i = "00" . $i;
				if($i < 1000 && $i >= 100)
					$i = "0" . $i;
				echo("<div id=\"vid".$i."\"> ".($i+1).". <span id=\"span" . $i . "\" style='height:auto; top:auto;font-weight:" . $bold . ";' onMouseDown=\"hideOrShow('div" . $i . "')\">" . $zeile["EMail"] . "</span>&nbsp;&nbsp;&nbsp;(" . date("d.m.Y, h:i:s",$row["Date"]) . ")&nbsp;<a href=\"javascript:del2('div" . $i . "')\">L&ouml;schen</a></div>");
			}
			
			echo("<input type=\"hidden\" value=\"?timestamp=".$row["Date"]."&idsend=".$row["IDsend"]."&UID=".$_SESSION["ID"]."\" id=\"hidden" . $i ."\" /><div id='div" . $i . "' style='height:1px;visibility:hidden;position:relative;overflow-y:hidden;border:1px solid black;padding:3px;'>" . chunk_split(str_replace('\n','<br />',$row["Text"]),10,'&shy;') . "</div>");
			if($i % 10 == 9)
			{
				echo("</div>");
			}
			$i++;
		}
		echo("</div>");
		
?>


</div>


<div id="Out" style="padding: 2%; width:75%; height:100%; position: absolute; left: 25%; top:0px; visibility:hidden;">

<h1>Postausgang</h1>
<div style="text-align:center;"><a href="javascript:lastpage1('1greatdiv')"><<<</a> <a href="javascript:nextpage1('1greatdiv')">>>></a></div><br />

<?php

		
		$ID = $_GET["UID"];
		$db = sqlite_open('news.sql', '0666');
		$sql = "SELECT * FROM 'Nachrichten' WHERE IDsend='$ID' AND Del1='false' ORDER BY Date DESC";
		$result = sqlite_query($sql, $db);
		$db2 = sqlite_open('vz.sql', '0666');
		$i=0;
		while($row = sqlite_fetch_array($result))
		{
			if($i % 10 == 0)
			{
				if($i/10 == 0)
					echo("<div id=\"1greatdiv" . $i/10 . "\" style=\"position:absolute;\">");
				else
					echo("<div id=\"1greatdiv" . $i/10 . "\" style=\"visibility:hidden;position:absolute;\">");
			}
			$ID = $row["IDrec"];
			$sql2 = "SELECT EMail FROM Profil WHERE ID='$ID'";
			$user = sqlite_query($sql2, $db2);
			while($zeile = sqlite_fetch_array($user))
			{
				if($i < 10)
					$i = "000".$i;
				if($i < 100 && $i >= 10)
					$i = "00" . $i;
				if($i < 1000 && $i >= 100)
					$i = "0" . $i;
				echo("<div id=\"1vid".$i."\"> ".($i+1).". <span style='font-weight:bold;' onMouseDown=\"hideOrShow1('1div" . $i . "')\">" . $zeile["EMail"] . "</span>&nbsp;&nbsp;&nbsp;(" . date("d.m.Y, h:i:s",$row["Date"]) . ")&nbsp;<a href=\"javascript:del1('1div" . $i . "')\">L&ouml;schen</a></div>");
			}
			echo("<input type=\"hidden\" value=\"?timestamp=".$row["Date"]."&idsend=".$row["IDsend"]."&UID=".$_SESSION["ID"]."\" id=\"1hidden" . $i ."\" /><div id='1div" . $i . "' style='height:1px;visibility:hidden;position:relative;overflow-y:hidden;border:1px solid black;padding:3px;'>" . chunk_split($row["Text"],10,'&shy;') . "</div>");
			if($i % 10 == 9)
			{
				echo("</div>");
			}
			$i++;
		}
		echo("</div>");
		
?>

</form>
</div>




</body>
</html>
<?php
}
}
?>