<?php
if(trim($_GET["height"]) == "")
{
?>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="expires" content="0">
<meta http-equiv="cache-control" content="no-cache">
<title>AlisonThunderland</title>
</head>

<link rel="stylesheet" type="text/css" href="styles.css">
<script src="functions.js" type="text/javascript"></script>
<script type="text/javascript">
<!--
function load()
{
	if(navigator.appName.indexOf("Internet Explorer") == -1)
	{
		var height = window.innerHeight;
		document.location.href="index.php?height=" + height;
	}
	if(navigator.appName.indexOf("Internet Explorer") != -1)
	{
		var height = document.body.offsetHeight;
		document.location.href="index.php?height=" + height;
	}


}
//-->
</script> 
<body onLoad="load()" onContextMenu="return false;">

<map name="Grafik">
	<area shape="poly" coords="330,735,440,753,435,776,326,761" href="http://www.facebook.com" alt="Facebook" />
	<area shape="poly" coords="446,791,512,782,518,800,450,810" href="http://www.lastfm.de/music/Alison+Thunderland" alt="last.fm" />
	<area shape="poly" coords="511,752,620,753,620,770,512,770" href="http://twitter.com/alisontl" alt="twitter" />
	<area shape="poly" coords="586,794,756,792,755,811,586,810" href="http://purevolume.com/alisonthunderland" alt="purevolume.com" />
	<area shape="poly" coords="687,738,820,732,815,766,685,765" href="http://myspace.com/alisonthunderland" alt="MySpace" />
	<area shape="rect" coords="305,249,369,276" href="news.htm" alt="News" target="iframe" />
	<area shape="rect" coords="275,314,378,341" href="contact.htm" alt="Contact" target="iframe" />
	<area shape="rect" coords="230,370,377,400" href="letter.php" alt="Newsletter" target="iframe" />
	<area shape="rect" coords="300,440,370,466" href="press.htm" alt="Press" target="iframe" />
	<area shape="rect" coords="320,20,1036,145" href="alison.htm" alt="AlisonThunderland" target="iframe" />
	<area shape="rect" coords="880,727,930,733" href="impressum.htm" alt="Impressum" target="iframe" />
</map>
<img src="Homepage.jpg" width="1400" height="900" border="0" galleryimg="no" alt="AlisonThunderland" usemap="#Grafik" />
<div id="div1" style="top:230px; left:430px; max-width:490px; max-height:350px; width:490px; height:350px; position:absolute; font-size:16pt;">
	<iframe src="alison.htm" width="100%" height="100%" scrolling="auto" frameborder=0 name="iframe" allowtransparency="true" transparency="true" />
</div>

</body>
</html>
<?php
}
else
{
$faktor = 1;
$faktor = ($_GET["height"] / 900)*1.1;
?>

<html>
<head>
<meta http-equiv="expires" content="0">
<meta http-equiv="cache-control" content="no-cache">
<title>AlisonThunderland</title>
</head>

<link rel="stylesheet" type="text/css" href="styles.css">
<script src="functions.js" type="text/javascript"></script>
<script type="text/javascript">
<!--
function onChange()
{
	if(navigator.appName.indexOf("Internet Explorer") == -1)
	{
		var height = window.location.search;
		height = height.substr(8,height.length);
		if(height != window.innerHeight)
		{
			height = window.innerHeight;
			document.location.href="index.php?height=" + height;
		}
	}
	if(navigator.appName.indexOf("Internet Explorer") != -1)
	{
		var height = window.location.search;
		height = height.substr(8,height.length);
		if(height != document.body.offsetHeight)
		{
			height = document.body.offsetHeight;
			document.location.href="index.php?height=" + height;
		}
	}
}
function check()
{
	window.setInterval("onChange()",2000);
}
//-->
</script>
<body onContextMenu="return false;" onLoad="check()">
<map name="Grafik">
	<area shape="poly" coords="<?php echo(round($faktor*966)); ?>,<?php echo(round($faktor*160)); ?>,<?php echo(round($faktor*935)); ?>,<?php echo(round($faktor*225)); ?>,<?php echo(round($faktor*965)); ?>,<?php echo(round($faktor*213)); ?>,<?php echo(round($faktor*996)); ?>,<?php echo(round($faktor*225)); ?>" href="javascript:scrollUp()" alt="Up" />
	<area shape="poly" coords="<?php echo(round($faktor*937)); ?>,<?php echo(round($faktor*654)); ?>,<?php echo(round($faktor*964)); ?>,<?php echo(round($faktor*666)); ?>,<?php echo(round($faktor*992)); ?>,<?php echo(round($faktor*654)); ?>,<?php echo(round($faktor*964)); ?>,<?php echo(round($faktor*717)); ?>" href="javascript:scrollDown()" alt="Down" />
	<area shape="poly" coords="<?php echo(round($faktor*330)); ?>,<?php echo(round($faktor*735)); ?>,<?php echo(round($faktor*440)); ?>,<?php echo(round($faktor*753)); ?>,<?php echo(round($faktor*435)); ?>,<?php echo(round($faktor*776)); ?>,<?php echo(round($faktor*326)); ?>,<?php echo(round($faktor*761)); ?>" href="http://www.facebook.com" alt="Facebook" />
	<area shape="poly" coords="<?php echo(round($faktor*446)); ?>,<?php echo(round($faktor*791)); ?>,<?php echo(round($faktor*512)); ?>,<?php echo(round($faktor*782)); ?>,<?php echo(round($faktor*518)); ?>,<?php echo(round($faktor*800)); ?>,<?php echo(round($faktor*450)); ?>,<?php echo(round($faktor*810)); ?>" href="http://www.lastfm.de/music/Alison+Thunderland" alt="last.fm" />
	<area shape="poly" coords="<?php echo(round($faktor*511)); ?>,<?php echo(round($faktor*752)); ?>,<?php echo(round($faktor*620)); ?>,<?php echo(round($faktor*753)); ?>,<?php echo(round($faktor*620)); ?>,<?php echo(round($faktor*770)); ?>,<?php echo(round($faktor*512)); ?>,<?php echo(round($faktor*770)); ?>" href="http://twitter.com/alisontl" alt="twitter" />
	<area shape="poly" coords="<?php echo(round($faktor*586)); ?>,<?php echo(round($faktor*794)); ?>,<?php echo(round($faktor*756)); ?>,<?php echo(round($faktor*792)); ?>,<?php echo(round($faktor*755)); ?>,<?php echo(round($faktor*811)); ?>,<?php echo(round($faktor*586)); ?>,<?php echo(round($faktor*810)); ?>" href="http://purevolume.com/alisonthunderland" alt="purevolume.com" />
	<area shape="poly" coords="<?php echo(round($faktor*687)); ?>,<?php echo(round($faktor*738)); ?>,<?php echo(round($faktor*820)); ?>,<?php echo(round($faktor*732)); ?>,<?php echo(round($faktor*815)); ?>,<?php echo(round($faktor*766)); ?>,<?php echo(round($faktor*685)); ?>,<?php echo(round($faktor*765)); ?>" href="http://myspace.com/alisonthunderland" alt="MySpace" />
	<area shape="rect" coords="<?php echo(round($faktor*305)); ?>,<?php echo(round($faktor*249)); ?>,<?php echo(round($faktor*369)); ?>,<?php echo(round($faktor*276)); ?>" href="javascript:loadNews()" alt="News" />
	<area shape="rect" coords="<?php echo(round($faktor*275)); ?>,<?php echo(round($faktor*314)); ?>,<?php echo(round($faktor*378)); ?>,<?php echo(round($faktor*341)); ?>" href="javascript:loadContact()" alt="Contact" />
	<area shape="rect" coords="<?php echo(round($faktor*230)); ?>,<?php echo(round($faktor*370)); ?>,<?php echo(round($faktor*377)); ?>,<?php echo(round($faktor*400)); ?>" href="javascript:loadNewsletter()" alt="Newsletter" />
	<area shape="rect" coords="<?php echo(round($faktor*300)); ?>,<?php echo(round($faktor*440)); ?>,<?php echo(round($faktor*370)); ?>,<?php echo(round($faktor*466)); ?>" href="javascript:loadPress()" alt="Press" />
	<area shape="rect" coords="<?php echo(round($faktor*320)); ?>,<?php echo(round($faktor*20)); ?>,<?php echo(round($faktor*1036)); ?>,<?php echo(round($faktor*145)); ?>" href="javascript:loadAlison()" alt="AlisonThunderland" />
	<area shape="rect" coords="<?php echo(round($faktor*880)); ?>,<?php echo(round($faktor*727)); ?>,<?php echo(round($faktor*930)); ?>,<?php echo(round($faktor*733)); ?>" href="javascript:loadImpressum()" alt="Impressum" />
</map>


<img src="Homepage.jpg" width="<?php echo(round($faktor*1400)); ?>" height="<?php echo(round($faktor*900)); ?>" border="0" galleryimg="no" alt="AlisonThunderland" usemap="#Grafik" />

<div id="div1" style="top:<?php echo(round($faktor*230)); ?>px; left:<?php echo(round($faktor*430)); ?>px; max-width:<?php echo(round($faktor*490)); ?>px; max-height:<?php echo(round($faktor*350)); ?>px; width:<?php echo(round($faktor*490)); ?>px; height:<?php echo(round($faktor*350)); ?>px; position:absolute; font-size:<?php echo(round($faktor*16)); ?>pt;">
	<iframe src="alison.htm" width="100%" height="100%" scrolling="no" frameborder=0 name="iframe" allowtransparency="true" transparency="true" />

</div>
</body>
</html>
<?php
}
?>
