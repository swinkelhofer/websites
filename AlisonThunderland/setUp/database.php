<?php
session_start();
if($_SESSION["Zugang"] != "ok")
{
	header("Location:index.php");
}
else{

if($_POST["ok"] == "OK")
{
//$conn = @mysql_connect('localhost','272521-sascha','sascha2');
$db = sqlite_open('../althu', '0666');
//$sql = "DROP DATABASE IF EXISTS `alisonthunderland`";
//@mysql_query($sql,$conn);
//sqlite_query($db, $sql);
//$sql = "CREATE DATABASE `alisonthunderland`";
//@mysql_query($sql, $conn);
//sqlite_query($db, $sql);
//@mysql_select_db("alisonthunderland", $conn);
//@mysql_query($sql,$conn);
$sql = "DROP TABLE users";
sqlite_query($db, $sql);
$sql = "CREATE TABLE users(VName VARCHAR(100) NOT NULL, NName VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, md5 VARCHAR(100) NOT NULL, confirmed VARCHAR(100) NOT NULL,PRIMARY KEY (email))";
//@mysql_query($sql,$conn);
sqlite_query($db, $sql);
sqlite_close($db);

echo("Datenbanken neu erstellt");
}
?>
<html>
<head><title>Datenbanken erzeugen</title></head>
<body style="font-family:Arial;">
<a href="logout.php">Logout</a>
<br /><a href="logged.php">Zurück zur Übersichtsseite</a>
<form action="" method="post">
<h1>Datenbanken erzeugen</h1>
<p>Sollen die alten Datenbanken wirklich gelöscht werden und durch neue ersetzt werden?</p>
<input type="submit" name="ok" value="OK" />
</form>
</body>
</html>
<?php
}
?>