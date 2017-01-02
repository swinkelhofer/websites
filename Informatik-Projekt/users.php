<?php
$db = sqlite_open('vz.sql','0666');
$erg = sqlite_query($db, "SELECT * FROM Profil");
echo("<table border=1><tr><th>ID</th><th>E-Mail</th><th>Passwort</th><th>VName</th><th>NName</th><th>Sex</th><th>Birth</th><th>Nick</th><th>PLZ</th><th>Hobbies</th></tr>");
while($row = sqlite_fetch_array($erg))
{
	echo("<tr><td>".$row["ID"]."</td><td>".$row["EMail"]."</td><td>".$row["PW"]."</td><td>".$row["VName"]."</td><td>".$row["NName"]."</td><td>"
	.$row["Sex"]."</td><td>".$row["Birth"]."</td><td>".$row["Nick"]."</td><td>".$row["PLZ"]."</td><td>".$row["Hobbies"]."</td></tr>");
}
echo("</table>");
echo("<br />");
$db = sqlite_open('news.sql','0666');
$erg = sqlite_query($db, "SELECT * FROM Nachrichten");
echo("<table border=1><tr><th>IDsend</th><th>Text</th><th>IDrec</th><th>Time</th><th>Gesehen</th><th>Del1</th><th>Del2</th></tr>");
while($row = sqlite_fetch_array($erg))
{
	echo("<tr><td>".$row["IDsend"]."</td><td>".$row["Text"]."</td><td>".$row["IDrec"]."</td><td>".$row["Date"]."</td><td>".$row["Read"]."</td><td>".$row["del1"]."</td><td>".$row["del2"]."</td></tr>");
}
echo("</table>");
echo("<br />");
$db = sqlite_open('friends/friends.sql','0666');
$erg = sqlite_query($db, "SELECT * FROM Friends");
echo("<table border=1><tr><th>FID1</th><th>FID2</th><th>true1</th><th>true2</th></tr>");
while($row = sqlite_fetch_array($erg))
{
	echo("<tr><td>".$row["FID1"]."</td><td>".$row["FID2"]."</td><td>".$row["true1"]."</td><td>".$row["true2"]."</td></tr>");
}
echo("</table>");
?>