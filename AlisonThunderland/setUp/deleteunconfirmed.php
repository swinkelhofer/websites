<?php
session_start();
if($_SESSION["Zugang"] != "ok")
{
	header("Location:index.php");
}
else{
if($_POST["ok"] == "Bereinigen")
{
$db = sqlite_open('../althu','0666');
sqlite_query($db,"DELETE FROM users WHERE confirmed='no'");
sqlite_close($db);
	header("Location:users.php");
}
?>
<html>
<head><title>Datenbank bereinigen</title></head>
<body style="font-family:Arial;">
<form method="post" action="">
<a href="logged.php">Zur&uuml;ck zur &Uuml;bersicht</a><br />
<a href="logout.php">Logout</a>
<p>Soll die Datenbank wirklich von allen unbest&auml;tigten Mitgliedern bereinigt werden?</p>
<input type="submit" name="ok" value="Bereinigen" />
</form>
</body>
</html>
<?php
}
?>