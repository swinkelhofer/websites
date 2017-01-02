<?php

	$user = "Administrator";
	$pass = "sascha2";
	if($user == $_POST["Benutzer"] && $pass == $_POST["Passwort"]) 
	{
		session_start();
		$_SESSION["Zugang"]="ok";
		header("Location: logged.php?".session_name()."=".session_id());
	}
?>

<html>
<head><title>Login zum Admin-Bereich</title></head>
<body style="font-family:Arial">
<form method="post">
<h1>Admin-Bereich</h1>
<table border="0">
<tr>
<td>User: </td><td><input type="text" name="Benutzer" /></td>
</tr>
<tr>
<td>Passwort: </td><td><input type="password" name="Passwort" /></td>
</tr>
<tr>
<td></td>
<td><input type="submit" name="button" value="Login" /></td>
</tr>
</table>
</form>
</body>
</html>