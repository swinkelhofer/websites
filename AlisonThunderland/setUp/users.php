<?php
session_start();
if($_SESSION["Zugang"] != "ok")
{
	header("Location:index.php");
}
else{
$db = sqlite_open('../althu', '0666');
$sql = "SELECT * FROM users";
$result = sqlite_query($db, $sql);
echo("<table border=1>");
echo("<tr><th>Vorname</th><th>Nachname</th><th>E-Mail</th><th>md5</th><th>Best&auml;tigt</th></tr>");
while ($row = sqlite_fetch_array($result))
{
	echo("<tr><td>".$row["VName"]."</td><td>".$row["NName"]."</td><td>".$row["email"]."</td><td>".$row["md5"]."</td><td>".$row["confirmed"]."</td></tr>");
}
echo("</table>");
echo("<hr /><a href=\"logged.php\">Zur&uuml;ck zur &Uuml;bersicht</a><br /><a href=\"logout.php\">Logout</a>");
sqlite_close($db);
}
?>