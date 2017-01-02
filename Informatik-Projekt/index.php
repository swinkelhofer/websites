<?php
	session_start();
	// session_register('entry');
	// session_register('ID');
	if(isset($_POST["email"]) && isset($_POST["pass"])
	&& trim($_POST["email"]) != "" && trim($_POST["pass"]) != "")
	{
	$email = $_POST["email"];
	$password = $_POST["pass"];
    $db = new SQLite3('vz.sql', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
	// $db = $sqlite->open('vz.sql','0666');
	$sql = "SELECT ID,EMail,PW FROM 'Profil' WHERE EMail='$email'";
	$result = $db->query($sql);
	while($zeile = $result->fetchArray())
	{
		if($zeile["PW"] == $password)
		{	
			$_SESSION['entry'] = 'ok';
			$_SESSION['ID'] = $zeile["ID"];
			$ID = $_SESSION['ID'];
			header("Location:frontpage.php?UID=$ID");
		}
	}
	}
?>
<html>
<head><title>VZ</title>
<style type="text/css">
input { 	border-left:1px solid #97A6B2;border-top:1px solid #97A6B2;border-right:1px solid #657988; border-bottom:1px solid #657988; 
			background-color:black; color:#97A6B2; height:30px; width: 200px; font-size:14pt;}
input:hover { border-left:2px solid #97A6B2;border-top:2px solid #97A6B2;border-right:2px solid #657988; border-bottom:2px solid #657988; }
input:focus { border-left:2px solid #97A6B2;border-top:2px solid #97A6B2;border-right:2px solid #657988; border-bottom:2px solid #657988; }
.submit { 	cursor:pointer;border-left:1px solid #97A6B2;border-top:1px solid #97A6B2;
				border-right:1px solid #657988; 
				border-bottom:1px solid #657988;
				background-color:#151515; color:#97A6B2; height:30px; width:auto; font-size:13pt;
				}
a:hover {color: #97A6B2;}
a { color:#657988; }
</style>

</head>
<body style="background-color:black;">
<form method="post" action="">
<table>
<tr>
<td style="color:#657988; font-size:16pt;">E-Mail-Adresse:&nbsp;&nbsp;&nbsp;</td>
<td><input type="text" name="email" /></td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Passwort: </td>
<td><input type="password" name="pass" /></td>
</tr>
<tr>
<td></td>
<td><input type="submit" class="submit" value="Einloggen" style="" /></td>
</tr>
</table><br /><br />
<a href="newaccount.php" style="font-size:13pt;">Neuen Account anlegen</a>
</form>
</body>
</html>
