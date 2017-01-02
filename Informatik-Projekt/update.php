<?php
	session_start();
	session_register('entry');
	session_register('ID');
	if(trim($_SESSION['ID']) == "" ||  trim($_SESSION['entry']) == "" || $_SESSION['entry'] != "ok")
		header("Location:index.php");
	else
	{
		if(isset($_POST['EMail']))
		{
			$td = "EMail";
			$db = sqlite_open('vz.sql','06666');
			$sql = "SELECT * FROM Profil WHERE EMail='";
			$sql .= $_POST['EMail'];
			$sql .= "'";
			$result = sqlite_query($sql, $db);
			$row = sqlite_fetch_array($result);
			if($row != '' && $row["ID"] != $_SESSION['ID'])
			{
				echo("Benutzername existiert bereits");
				exit();
			}
		}
		if(isset($_POST['PW']))
		{
			$td = "PW";
		}
		if(isset($_POST['Nick']))
		{
			$td = "Nick";
		}
		if(isset($_POST['PLZ']))
		{
			$td = "PLZ";
		}
		if(isset($_POST['Status']))
		{
			$td = "Status";
		}
		if(isset($_POST['Hobbies']))
		{
			$td = "Hobbies";
		}
		if(isset($_POST['Spruch']))
		{
			$td = "Spruch";
		}
		if(isset($_POST['Like']))
		{
			$td = "Like";
		}
		if(isset($_POST['Dislike']))
		{
			$td = "Dislike";
		}
		$value = htmlspecialchars($_POST[$td]);
		$array = array('\\\\Ae\\\\' => 'Ä', '\\\\ae\\\\' => 'ä', '\\\\Oe\\\\' => 'Ö', '\\\\oe\\\\' => 'ö', '\\\\Ue\\\\' => 'Ü', '\\\\ue\\\\' => 'ü','\\\\sz\\\\' => 'ß', '\\\\euro\\\\' => '€');
		$value = strtr($value,$array);
		$UID = $_SESSION["ID"];
		$db = sqlite_open('vz.sql','0666');
		$sql = "UPDATE Profil SET ";
		$sql .= $td;
		$sql .= "='";
		$sql .= $value;
		$sql .= "' WHERE ID='";
		$sql .= $UID;
		$sql .= "'";
		sqlite_query($sql,$db);
		sqlite_close($db);
	}
?>