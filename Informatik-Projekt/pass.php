<?php
session_start();
session_register('entry');
session_register('ID');
if(trim($_SESSION['ID']) == "" || trim($_SESSION['entry']) == "" || $_SESSION['entry'] == "none")
	exit();
else
{
	$db = sqlite_open('vz.sql','0666');
	$sql = "SELECT PW FROM 'Profil' WHERE ID='";
	$sql .= $_SESSION["ID"];
	$sql .= "'";
	$result = sqlite_query($sql, $db);
	$row = sqlite_fetch_array($result);
	echo($row['PW']);
}