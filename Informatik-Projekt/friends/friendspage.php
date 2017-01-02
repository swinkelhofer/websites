<?php
session_start();
session_register('entry');
session_register('ID');
if(trim($_SESSION['ID']) == "" || $_SESSION['ID'] != $_GET["UID"] || trim($_SESSION['entry']) == "" || $_SESSION['entry'] == "none")
{
	header("Location:../index.php");
}
else
{
$FID1 = $_SESSION["ID"];
$FID2 = $_GET["FID"];
$db = sqlite_open('friends.sql','0666');
$sql = "SELECT * FROM 'Friends' WHERE (FID1='$FID1' AND FID2='$FID2' AND true1='true') OR (FID1='$FID2' AND FID2='$FID1' AND true1='true')";
$result = sqlite_query($sql, $db);
$i = false;
while($zeile = sqlite_fetch_array($result))
{
	$i = true;
}
if(!$i)
{
	echo("<html><head></head><body onLoad=\"javascript:window.location='newfriend.php'\"></body></html>");
}
else
{

if(trim($_GET["height"]) == "" || trim($_GET["width"]) == "")
{
?>
<html>
<head>
<meta http-equiv="expires" content="0">
<meta http-equiv="cache-control" content="no-cache">
<title>LoadHelper</title>
</head>

<script type="text/javascript">
<!--
function load()
{
	if(navigator.appName.indexOf("Internet Explorer") == -1)
	{
		var height = window.innerHeight;
		var width = window.innerWidth;
		document.location.href="friendspage.php?height=" + height + "&width=" + width + "&FID=" + "<?php echo($_GET["FID"]); ?>" + "&UID=" + "<?php echo($_SESSION["ID"]) ?>;
	}
	if(navigator.appName.indexOf("Internet Explorer") != -1)
	{
		var height = document.body.offsetHeight;
		var width = document.body.offsetWidth;
		document.location.href="friendspage.php?height=" + height + "&width=" + width + "&FID=" + "<?php echo($_GET["FID"]); ?>" + "&UID=" + "<?php echo($_SESSION["ID"]) ?>;
	}


}
//-->
</script> 
<body onLoad="load()" onContextMenu="return false;">
</body>
</html>
<?php
}
else
{
$height = $_GET["height"];
$width = $_GET["width"];
?>
<html>
<head><title>Eingeloggt</title>
<meta http-equiv="expires" content="0">
<meta http-equiv="cache-control" content="no-cache">
<link rel="stylesheet" type="text/css" href="frontpage.css">
<style type="text/css">
<!--

.S0 
{
	background-color: #A8F30A;
	z-Index: 0;
	position: absolute;
	width: 512px;
	height: 365px;
	cursor: pointer;
}


.S1 
{
	position: absolute;
	background-image: url(deckend.png);
	z-Index: 1;
	border: none;
	width: 512px;
	height: 365px;
	cursor: pointer;
}


.S2 
{
	background-image:url(overlay.png);
	position: absolute;
	z-Index: 2;
	border: none;
	width: 512px;
	height: 365px;
}

#News, #News2, #LNews
{
	left: 0px;
	top: 38px;
}


#Friends, #Friends2, #LFriends
{
	left: 512px;
	top: 38px;
}

#Chat, #Chat2, #LChat
{
	left: 0px;
	top: 403px;
}

#Pinn, #Pinn2, #LPinn
{
	left: 512px;
	top: 403px;
}

#Titlebar
{
	top: 0px;
	left: 0px;
	width: 1024px;
	height: 38px;
	position: absolute;
	z-Index: 6;
}

#Shadow
{
	z-index: 3;
	background-color:#354E03;
	top:104px;
	left:163px;
	width:720px;
	height:600px;
	position:absolute;
}

#Common2
{
	z-Index: 4;
	background-color: white;
	position: absolute;
	top: 95px;
	left: 150px;
	height: 600px;
	width: 720px;
}

#disablediv
{
	visibility: hidden;
	position: absolute;
	z-Index: 5;
	height: 600px;
	width: 720px;
	top: 95px;
	left: 150px;
}

iframe
{
	border: none;
	width: 100%;
	height: 100%;
}
	
-->
</style>
<script type="text/javascript">
<!--

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
	var src1 = document.getElementById(onTopFrame).src
	src1 = src1.replace("state=1", "state=0");
	document.getElementById(onTopFrame).src = src1;
	var src2 = document.getElementById(LFrame).src;
	src2 = src2.replace("state=0", "state=1");
	document.getElementById(LFrame).src = src2;
	
	
	//alert(document.getElementById('Friends2').style.top);
	
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
-->
</script>

</head>
<body>



</div>
<!-- Schicht0 -->
<div id="News2" class="S0" style="top:38; left:0px;">
<iframe id="Newsframe" src="friens/News.php?FID=<?php echo($_GET["FID"]);?>&UID=<?php echo($_SESSION["ID"]) ?>&state=0" frameborder="0" allowtransparency="true" transparency="true" scrolling="no"></iframe>
</div>
<div id="Friends2" class="S0" style="top:38; left:512px;">
<iframe id="Friendsframe" src="friends/friends.html?FID=<?php echo($_GET["FID"]);?>&UID=<?php echo($_SESSION["ID"]) ?>&state=0" frameborder="0" allowtransparency="true" transparency="true" scrolling="no"></iframe>
</div>
<div id="Chat2" class="S0" style="top:403; left:0px;">
<iframe id="Chatframe" src="friends/chat.html?FID=<?php echo($_GET["FID"]);?>&UID=<?php echo($_SESSION["ID"]) ?>&state=0" frameborder="0" allowtransparency="true" transparency="true" scrolling="no"></iframe>
</div>
<div id="Pinn2" class="S0" style="top:403; left:512px;">
<iframe id="Pinnframe" src="friends/alison.htm?FID=<?php echo($_GET["FID"]);?>&UID=<?php echo($_SESSION["ID"]) ?>&state=0" frameborder="0" allowtransparency="true" transparency="true" scrolling="no"></iframe>
</div>
<!-- Schicht0 Ende -->



<!-- Schicht1 -->
<div id="News" class="S1" onClick="changeOnTop('News')" onMouseOut="visible('News')"></div>

<div id="Friends" class="S1"onClick="changeOnTop('Friends')" onMouseOut="visible('Friends')"></div>

<div id="Chat" class="S1" onClick="changeOnTop('Chat')" onMouseOut="visible('Chat')"></div>

<div id="Pinn" class="S1" onClick="changeOnTop('Pinn')" onMouseOut="visible('Pinn')"></div>

<div id="Common" class="S1" style="visibility: hidden;" onClick="changeOnTop('Common')" onMouseOut="visible('Common')"></div>

<!-- Schicht1 Ende -->



<!-- Schicht2 -->
<div id="LNews" class="S2" onMouseOver="invisible('News')"></div>
<div id="LFriends" class="S2" onMouseOver="invisible('Friends')"></div>
<div id="LChat" class="S2" onMouseOver="invisible('Chat')"></div>
<div id="LPinn" class="S2" onMouseOver="invisible('Pinn')"></div>
<div id="LCommon" class="S2" style="visibility:hidden;" onMouseOver="invisible('Common')"></div>
<!-- Schicht2 Ende -->


<!-- Schicht3 -->
<div id="Shadow"></div>
<!-- Schicht3 Ende -->



<!-- Schicht4 -->
<div id="Common2">
<iframe id="Commonframe" src="friends/common.php?FID=<?php echo($_GET["FID"]);?>&UID=<?php echo($_SESSION["ID"]) ?>&state=1" frameborder="0" allowtransparency="true" transparency="true" style="width:100%; height:100%;" scrolling="no"></iframe>
</div>
<div id="Titlebar">
<img src="Title.gif" style="width: 100%; height: 100%;" />
<div style="right:0px; top: 2px;position: absolute;">
<a href="logout.php">Logout</a>
</div>
</div>
<div id="disablediv">
<img id="disable" src="disabled.png" style="z-Index: 5;visibility: hidden; width: 100%; height: 100%; top: 0px; left:0px; position: absolute;" />

</div>

<img src="buttondisable1.png" onMouseOver="hideTop()" onMouseOut="showTop()" style="z-Index: 8; height: 38px; width: 56px; left: 0px; cursor: pointer; top: 0px; position: absolute;"  />


<!-- Schicht4 Ende -->

</body>
</html>
<?php
}
}
}
?>