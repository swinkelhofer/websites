<?php
session_start();
// session_register('entry');
// session_register('ID');
if(trim($_SESSION['ID']) == "" || $_SESSION['ID'] != $_GET["UID"] || trim($_SESSION['entry']) == "" || $_SESSION['entry'] == "none")
	header("Location:index.php");
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
		document.location.href="frontpage.php?height=" + height + "&width=" + width + "&UID=" + "<?php echo($_SESSION["ID"]); ?>";
	}
	if(navigator.appName.indexOf("Internet Explorer") != -1)
	{
		var height = document.body.offsetHeight;
		var width = document.body.offsetWidth;
		document.location.href="frontpage.php?height=" + height + "&width=" + width + "&UID=" + "<?php echo($_SESSION["ID"]); ?>";
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
<script type="text/javascript" src="scripts.js"></script>

</head>
<body>



</div>
<!-- Schicht0 -->
<div id="News2" class="S0" style="top:38; left:0px;">
<iframe id="Newsframe" src="News.php?UID=<?php echo($_SESSION["ID"]);?>&state=0" frameborder="0" allowtransparency="true" transparency="true" scrolling="no"></iframe>
</div>
<div id="Friends2" class="S0" style="top:38; left:512px;">
<iframe id="Friendsframe" src="Friends.html?UID=<?php echo($_SESSION["ID"]);?>&state=0" frameborder="0" allowtransparency="true" transparency="true" scrolling="no"></iframe>
</div>
<div id="Chat2" class="S0" style="top:403; left:0px;">
<iframe id="Chatframe" src="Chat.html?UID=<?php echo($_SESSION["ID"]);?>&state=0" frameborder="0" allowtransparency="true" transparency="true" scrolling="no"></iframe>
</div>
<div id="Pinn2" class="S0" style="top:403; left:512px;">
<iframe id="Pinnframe" src="Pinn.html?UID=<?php echo($_SESSION["ID"]);?>&state=0" frameborder="0" allowtransparency="true" transparency="true" scrolling="no"></iframe>
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
<iframe id="Commonframe" src="common.php?UID=<?php echo($_SESSION["ID"]);?>&state=1" frameborder="0" allowtransparency="true" transparency="true" style="width:100%; height:100%;" scrolling="no"></iframe>
</div>
<div id="Titlebar">
<img src="Title.gif" style="width: 100%; height: 100%;" />
<div style="right:5px; top: 7px;height: 80%;position: absolute;">
<a href="logout.php"><img src="Logout.png" style="border:none; position:relative; height: 100%;" id="high" onMouseOver="javascript:highlight()" onMouseOut="javascript:rehighlight()" /></a>
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
?>
