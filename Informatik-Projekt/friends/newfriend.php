<?php
session_start();
session_register('entry');
session_register('ID');
//if(trim($_SESSION['ID']) == "" || $_SESSION['ID'] != $_GET["UID"] || trim($_SESSION['entry']) == "" || $_SESSION['entry'] == "none")
//{
//	header("Location:../index.php");
//}
//else
//{
	if(isset($_POST["confirm"]) && $_POST["confirm"] == "Ja")
	{
		$FID1 = $_SESSION["ID"];
		$FID2 = $_GET["FID"];
		$db = sqlite_open('friends.sql','0666');
		$sql = "INSERT INTO 'Friends' ('FID1','FID2','true1') VALUES ('$FID1','$FID2','true')";
		@sqlite_query($sql, $db);
	}
	else
	{
?>
<html>
<head><title>Neue Freunde</title></head>
<body>
<form method="post">
Noch kein Freund. Als Freund hinzufügen???<br />
<input type="submit" value="Ja" name="confirm" />
</form>
</body>
</html>
<?php
//}
}
?>