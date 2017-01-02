<?php
	session_start();
	if($_SESSION["Zugang"] != "ok")
	{
		header("Location:index.php");
	}
	else
	{
		/*$conn = @mysqli_connect("alisonthunderland.com","272521-sascha","sascha2");
		@mysql_select_db("alisonthunderland",$conn);
		$sql = "SELECT email FROM users WHERE confirmed='yes'";
		$return = @mysql_query($sql,$conn);
		echo("<html><head><title>Senden</title></head><body style=\"font-family:Arial\"><h1>Versendet</h1>");
		echo("Folgende Mitglieder erhalten nun einen Newsletter<br />");
		while($email=@mysql_fetch_array($return))
		{
			@mail($email["email"],"Newsletter",$_POST["mailtext"],"FROM:newsletter@alisonthunderland.com");
			echo("<br />".$email["email"]);
		}
		@mysqli_close($conn);
		*/

		$db = sqlite_open('../althu', '0666');
		$sql = "SELECT email FROM users WHERE confirmed='yes'";
		$result = sqlite_query($db,$sql);
		echo("<html><head><title>Senden</title></head><body style=\"font-family:Arial\"><h1>Versendet</h1>");
		echo("Folgende Mitglieder erhalten nun einen Newsletter<br />");
		while($row = sqlite_fetch_array($result))
		{
			@mail($row["email"],"Newsletter",$_POST["mailtext"],"FROM:newsletter@alisonthunderland.com");
			echo("<br />".$row["email"]);
		}
		sqlite_close($db);

		echo("<hr /><a href=\"logout.php\">Logout</a><br /><a href=\"logged.php\">Zurück zur Übersichtsseite</a></body></html>");
	}
?>