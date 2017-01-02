<?php
if(trim($_GET["md5"] != ""))
{
/*
$conn = mysql_connect("alisonthunderland.com","272521-sascha","sascha2");
mysql_select_db("alisonthunderland");
$sql = "UPDATE users ";
$sql .= "SET confirmed='yes' ";
$sql .= "WHERE md5='";
$sql .= $_GET["md5"];
$sql .= "'";
mysql_query($sql);
*/
$db = sqlite_open('althu', '0666');
$sql = "UPDATE users ";
$sql .= "SET confirmed='yes' ";
$sql .= "WHERE md5='";
$sql .= $_GET["md5"];
$sql .= "'";
sqlite_query($db,$sql);
sqlite_close($db);
echo("Vielen Dank, du bekommst nun regelm&auml;&szlig;ig unseren Newsletter zugeschickt.");
}
else
	echo("Netter Versuch");
?>