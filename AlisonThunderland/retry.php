<?php
if(trim($_GET["md5"] != ""))
{
/*
$conn = mysql_connect("alisonthunderland.com","272521-sascha","sascha2");
mysql_select_db("alisonthunderland",$conn);
$sql = "DELETE FROM users ";
$sql .= "WHERE md5='";
$sql .= $_GET["md5"];
$sql .= "'";
mysql_query($sql,$conn);
*/
$db = sqlite_open('althu', '0666');
$sql = "DELETE FROM users ";
$sql .= "WHERE md5='";
$sql .= $_GET["md5"];
$sql .= "'";
sqlite_query($db,$sql);
sqlite_close($db);
echo("Du wurdest aus unserer Datenbank entfernt.");
}
else
	echo("Netter Versuch");
?>
