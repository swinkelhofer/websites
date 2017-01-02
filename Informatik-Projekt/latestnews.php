<?php
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
?>