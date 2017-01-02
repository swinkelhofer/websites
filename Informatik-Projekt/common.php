<?php
session_start();
session_register('entry');
session_register('ID');
if(trim($_SESSION['ID']) == "" || $_SESSION['ID'] != $_GET["UID"] || trim($_SESSION['entry']) == "" || $_SESSION['entry'] == "none")
	header("Location:index.php");
else
{
if($_GET["state"] == "1")
{
?>
<html>
<head>

<meta http-equiv="expires" content="0">
<meta http-equiv="cache-control" content="no-cache">
<script type="text/javascript" src="scripts.js"></script>
<style type="text/css">
a { color:#385203;font-size:10pt; text-decoration:none;}
textarea { font-family:Arial; font-size:10pt;}
@font-face { font-family:Calibri; src:url(calibri.ttf);}
body { font-family:Calibri; font-size:11pt; background-color:#F8FBC9;}
.pass { border: 1px solid gray; }
.pass:hover { border: 2px solid black; }
.pass:focus { border: 2px solid black; }
</style>
</head>
<body scrolling="no">
<h1>
<?php
	$db = sqlite_open('vz.sql', '0666');
	$sql = "SELECT EMail, VName, NName, Nick FROM 'Profil' WHERE ID='";
	$sql .= $_GET["UID"];
	$sql .= "'";
	$result = sqlite_query($sql, $db);
	while($row = sqlite_fetch_array($result))
	{
		if(trim($row["Nick"]) != "")
			echo("Hi ".$row["Nick"]);
		else if(trim($row["VName"]) != "" && trim($row["NName"]) != "")
			echo("Hallo ".$row["VName"]." ".$row["NName"]);
		else
			echo("Hallo " . $row["EMail"]);
	}
?>
<h3>&Uuml;ber mich</h3>
<?php
	$sql = "SELECT * FROM 'Profil' WHERE ID='";
	$sql .= $_SESSION["ID"];
	$sql .= "'";
	$result = sqlite_query($sql,$db);
	while($row = sqlite_fetch_array($result))
	{
?>
	<table border="0" style="left:30px;position:relative;">
	<tr><td style="font-weight:bold;">Name: </td><td><?php echo($row["VName"] . " " . $row["NName"]); ?></td></tr>
	<tr><td style="font-weight:bold;">Geschlecht: </td><td><?php echo($row["Sex"]); ?></td></tr>
	<tr><td style="font-weight:bold;">E-Mail: </td><td id="EMail"><?php echo($row["EMail"]); ?>&nbsp;&nbsp;&nbsp;<a href="javascript:edit('EMail')">[&auml;ndern]</a></td></tr>
	<tr><td style="font-weight:bold;">Geburtsdatum:&nbsp;&nbsp;</td><td><?php echo($row["Birth"]); ?></td></tr>
	<tr><td style="font-weight:bold;">Spitzname:&nbsp;&nbsp;</td><td id="Nick"><?php echo($row["Nick"]); ?>&nbsp;&nbsp;&nbsp;<a href="javascript:edit('Nick')">[&auml;ndern]</a></td></tr>
	<tr><td style="font-weight:bold;">Wohnort: </td><td id="PLZ"><?php echo($row["PLZ"]); $PLZ = $row["PLZ"]; ?>&nbsp;&nbsp;&nbsp;<a href="javascript:edit('PLZ')">[&auml;ndern]</a></td></tr>
	<tr><td></td><td><span id="Ort"><?php
	}
	$db = sqlite_open('PLZ.sql','0666');
	$sql = "SELECT Ort FROM 'PLZ' WHERE PLZ='";
	$sql .= $PLZ;
	$sql .= "'";
	$result = sqlite_query($sql,$db);
	if($row = sqlite_fetch_array($result))
	{
		echo($row["Ort"]);
	}
	?></span></td></tr>
	<tr><td style="font-weight:bold;">Status: </td><td id="Status"><?php
	$db = sqlite_open('vz.sql','0666');
	$sql = "SELECT * FROM 'Profil' WHERE ID='";
	$sql .= $_SESSION["ID"];
	$sql .= "'";
	$result = sqlite_query($sql,$db);
	while($row = sqlite_fetch_array($result))
	{	
	echo($row["Status"]); ?>&nbsp;&nbsp;&nbsp;<a href="javascript:createStatus()">[&auml;ndern]</a></td></tr>
	</table>
<h3>Persönliches</h3>
	<table border="0" style="left:30px;position:relative;width:650px;">
	<tr><td style="vertical-align:top;font-weight:bold;width:160px;">Hobbies: </td><td id="Hobbies"><?php echo($row["Hobbies"]); ?>&nbsp;&nbsp;&nbsp;<a href="javascript:editTextarea('Hobbies')">[&auml;ndern]</a></td></tr>
	<tr><td style="vertical-align:top;font-weight:bold;">Lieblingsspr&uuml;che:&nbsp;&nbsp;</td><td id="Spruch"><?php echo($row["Spruch"]); ?>&nbsp;&nbsp;&nbsp;<a href="javascript:editTextarea('Spruch')">[&auml;ndern]</a></td></tr>
	<tr><td style="vertical-align:top;font-weight:bold;">Das mag ich:&nbsp;&nbsp;</td><td id="Like"><?php echo($row["Like"]); ?>&nbsp;&nbsp;&nbsp;<a href="javascript:editTextarea('Like')">[&auml;ndern]</a></td></tr>	
	<tr><td style="vertical-align:top;font-weight:bold;">...und das gar nicht:&nbsp;&nbsp;</td><td id="Dislike"><?php echo($row["Dislike"]); ?>&nbsp;&nbsp;&nbsp;<a href="javascript:editTextarea('Dislike')">[&auml;ndern]</a></td></tr>
	</table>
	<br />
	<br />
	<div style="text-align:center; width:100%; position:relative;"><a href="javascript:changePass()">[Passwort &auml;ndern]</a></div>
<?php
	
	}

?>
</h1>




</body>
</html>
<?php
}
else
{
	echo("<body style=\"background-color:transparent;\"><h1>Mein Account</h1></body>");
}
}
?>