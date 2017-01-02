<?php
	session_start();
	if($_SESSION["Zugang"] != "ok")
	{
		header("Location:index.php");
	}
	else{
?>
<html>
<head><title>Admin-Bereich</title></head>
<body style="font-family:Arial">
<a href="logout.php">Logout</a>
<h1>Admin-Bereich</h1>
<a href="newsletter.php">Newsletter versenden</a><br />
<a href="database.php">Datenbank neu aufsetzen</a><br />
<a href="deleteunconfirmed.php">Datenbank von unbest&auml;tigten Mitgliedern bereinigen</a><br />
<a href="users.php">Alle Mitglieder anzeigen</a>
</body>
</html>
<?php
}
?>