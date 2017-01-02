<?php 
$errorcode = 13;
if(isset($_POST["send"]) && $_POST["send"] == "Newsletter bestellen")
{
	$errorcode = 13;
	$vollstndg = "";
	session_start(); 
	if(!isset($_SESSION['captcha_spam']) || $_POST["sicherheitscode"] != $_SESSION['captcha_spam'])
	{
		$errorcode *= 2;
	}
	if(!isset($_POST["VName"]) || !is_string($_POST["VName"]) || trim($_POST["VName"]) == "")
	{
		$errorcode *= 3;
	}
	if(!isset($_POST["NName"]) || !is_string($_POST["NName"]) || trim($_POST["NName"]) == "")
	{
		$errorcode *= 5;
	}
	if(!preg_match('/^[a-z0-9_\.\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/i',$_POST["email"]))
	{
		$errorcode *= 11;
	}

	if($errorcode == 13)
	{


		$md5 = md5(htmlspecialchars(stripslashes($_POST["email"])));
		$db = sqlite_open('althu', '0666');
		$sql = "INSERT INTO users ";
		$sql .= "(VName, NName, email, md5, confirmed) VALUES ('";
		$sql .= htmlspecialchars(stripslashes($_POST["VName"]));
		$sql .= "','";
		$sql .= htmlspecialchars(stripslashes($_POST["NName"]));
		$sql .= "','";
		$sql .= htmlspecialchars(stripslashes($_POST["email"]));
		$sql .= "','";
		$sql .= $md5;
		$sql .= "','no')";
		@sqlite_query($db, $sql) or die("<div style=\"font-family:BernhardFashion BT;font-size:16pt;\">E-Mail-Adresse bereits in unserer Datenbank vorhanden!</div>");
		sqlite_close($db);



		$mailtext = "Du wurdest in unsere Abonementen-Datenbank eingetragen.\n";
		$mailtext .= "Bitte folge dem Bestätigungslink, damit du künftig unsere Newsletter erhältst.\n";
		$mailtext .= "http://www.alisonthunderland.com/confirm.php?md5=";
		$mailtext .= md5(htmlspecialchars(stripslashes($_POST["email"])));
		$mailtext .= "\nSolltest du wieder deinen Willen angemeldet worden sein, kannst du dich aus unserer\n";
		$mailtext .= "Datenbank austragen lassen, indem du folgendem Link folgst:\n";
		$mailtext .= "http://www.alisonthunderland.com/retry.php?md5=";
		$mailtext .= md5(htmlspecialchars(stripslashes($_POST["email"])));
		$mailtext .= "\n\nVielen Dank.\nEuer Team von AlisonThunderland";
		echo("Danke, dass du unseren Newsletter abonniert hast, du bekommst in wenigen Minuten eine Bestätigung auf deinen E-Mail-Account.");
		@mail(htmlspecialchars($_POST["email"]), "Abonnement des Newsletters von AlisonThunderland", $mailtext
		, "FROM: newsletter@alisonthunderland.com");
	}
}
?>
<html>
<head>
<meta http-equiv="expires" content="0">
<meta http-equiv="cache-control" content="no-cache">
<title>Newsletter</title>
</head>
<link rel="stylesheet" type="text/css" href="styles.css" >
<body scrolling="no">
<h1>Newsletter</h1>
<form action="" method="post">
<table border="0">
<tr>
<td style="vertical-align:top;">Vorname: </td>
<td style="vertical-align:top;"><input type="text" name="VName" value="<?php echo(htmlspecialchars(stripslashes($_POST["VName"])));?>" style="background-color:
<?php
if($errorcode % 3 == 0)
{
	echo("red;");
}
else
{
	echo("white;");
}
?>
" /></td>
</tr>
<tr>
<td style="vertical-align:top;">Nachname: </td>
<td style="vertical-align:top;"><input type="text" name="NName" value="<?php echo(htmlspecialchars(stripslashes($_POST["NName"])));?>" style="background-color:
<?php
if($errorcode % 5 == 0)
{
	echo("red;");
}
else
{
	echo("white;");
}
?>
"/ ></td>
</tr>
<tr>
<td style="vertical-align:top;">E-Mail-Adresse: </td>
<td><input type="text" name="email" value="<?php echo(htmlspecialchars(stripslashes($_POST["email"])));?>" style="background-color:
<?php
if($errorcode % 11 == 0)
{
	echo("red;");
}
else
{
	echo("white;");
}
?>
" />
<?php
if($errorcode % 11 == 0)
{
	echo("<div style=\"font-size:12pt; color:red;\">(Bitte korrekte E-Mail-Adresse angeben!)</div>");
}
?>
</td>
</tr>
<tr>
<td>Captcha-Code</td>
<td><img src="Captcha/captcha.php" border="0" style="vertical-align:middle;" title="Sicherheitscode"><input type="text" name="sicherheitscode" size="5" style="vertical-align:middle; font-family:Arial; background-color:
<?php
if($errorcode % 2 == 0)
{
	echo("red;");
}
else
{
	echo("white;");
}
?>
"></td>
<tr>
<td></td>
<td><input type="submit" value="Newsletter bestellen" name="send" /></td>
</tr>
</table>
</form>
</body>
</html>