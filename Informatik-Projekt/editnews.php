<?php
session_start();
session_register('entry');
session_register('ID');
if(trim($_SESSION['ID']) == "" || $_SESSION['ID'] != $_GET["UID"] || trim($_SESSION['entry']) == "" || $_SESSION['entry'] == "none")
	header("Location:index.php");
else
{
if($_GET["do"] == "read")
{
	
	$IDsend = $_GET["idsend"];
	$timestamp = $_GET["timestamp"];
	$db = sqlite_open('news.sql','0666');
	$sql = "UPDATE 'Nachrichten' SET Read='yes' WHERE IDsend='$IDsend' AND Date='$timestamp'";
	sqlite_query($sql,$db);
	$db = sqlite_open('news.sql', '0666');
	$sql = "SELECT * FROM 'Nachrichten' WHERE IDrec='";
	$sql .= $_GET["UID"];
	$sql .= "' AND Read='no' AND Del2='false'";
	$result = sqlite_query($sql, $db);
	$i=0;
	while($row = sqlite_fetch_array($result))
	{
		$i++;
	}
	echo($i);

}
else if($_GET["do"] == "del2")
{
	$IDsend = $_GET["idsend"];
	$timestamp = $_GET["timestamp"];
	$db = sqlite_open('news.sql', '0666');
	$sql = "UPDATE 'Nachrichten' SET del2='true' WHERE IDsend='$IDsend' AND Date='$timestamp'";
	sqlite_query($sql,$db);
	$sql = "DELETE FROM 'Nachrichten' WHERE del2='true' AND del1='true'";
	sqlite_query($sql,$db);

}

else if($_GET["do"] == "del1")
{
	$IDsend = $_GET["idsend"];
	$timestamp = $_GET["timestamp"];
	$db = sqlite_open('news.sql', '0666');
	$sql = "UPDATE 'Nachrichten' SET del1='true' WHERE IDsend='$IDsend' AND Date='$timestamp'";
	sqlite_query($sql,$db);
	$sql = "DELETE FROM 'Nachrichten' WHERE del2='true' AND del1='true'";
	sqlite_query($sql,$db);
}
else
	print("Verbrecher");
}