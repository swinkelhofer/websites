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
	<a href="logout.php">Logout</a><br /><a href="logged.php">Zurück zur Übersichtsseite</a>
	<h1>Newsletter versenden</h1>
	<form action="send.php" method="post">
	Nachricht:<br/>
	<textarea style="border:2px solid black;" rows="30" cols="100" name="mailtext"></textarea><br />
	<input type="submit" value="Abschicken"/>
	</form>
	</body>
	</html>
<?php
	}
?>