<?php
	if(isset($_POST["email"]) && isset($_POST["pass"]) && isset($_POST["pass2"])
	&& trim($_POST["email"]) != "" && trim($_POST["pass"]) != "" && trim($_POST["pass2"]) != ""
	&& trim($_POST["vname"]) != "" && trim($_POST["nname"]) != "" && trim($_POST["sex"]) != "" 
	&& trim($_POST["day"]) != "" && trim($_POST["month"]) != "" && trim($_POST["year"]) != "" 
	&& trim($_POST["land"]) != "")
	{
		$email = $_POST["email"];
		$password = $_POST["pass"];
		$password2 = $_POST["pass2"];
		$vname = $_POST["vname"];
		$nname = $_POST["nname"];
		$sex = $_POST["sex"];
		$day = $_POST["day"];
		$month = $_POST["month"];
		$year = $_POST["year"];
		$land = $_POST["land"];
		$PLZ = $_POST["PLZ"];
		$nick = $_POST["nick"];
		$status = $_POST["status"];
		$hobbies = $_POST["hobbies"];
		$like = $_POST["like"];
		$dislike = $_POST["dislike"];
		$Spruch = $_POST["Spruch"];
		//if($day == 31 && ($
		
		
		if($_POST["logging"] == "Anlegen")
		{
		if($password == $password2)
		{
			
			$db = new SQLite3('vz.sql',SQLITE3_OPEN_READWRITE);
			$sql = "SELECT EMail FROM 'Profil' WHERE EMail='";
			$sql .= $email;
			$sql .= "'";
			$result = $db->query($sql);
			$zeile = $result->fetchArray();
			if($zeile=='')
			{
			
			$sql = "SELECT COUNT('ID') FROM 'Profil'";
			$result = $db->query($sql);
			$zeile = $result->fetchArray();
			$zahl = $zeile["COUNT('ID')"];
			while(strlen($zahl) <= 4)
			{
				$zahl = "0" . $zahl;
			}
			$sql = "INSERT INTO 'Profil' ('ID', 'EMail','PW', 'VName','NName','Nick','Birth','Status','Sex','Hobbies',
			'Spruch', 'Like','Dislike','Land','PLZ') VALUES (";
			//$zahl;
	
			//$sql .= ",'";
			$sql .= $zahl;
			$sql .= ",'";
			$sql .= $email;
			$sql .= "','";
			$sql .= $password;
			$sql .= "','";
			$sql .= $vname;
			$sql .= "','";
			$sql .= $nname;
			$sql .= "','";
			$sql .= $nick;
			$sql .= "','";
			$sql .= $day . ". " . $month . " " . $year;
			$sql .= "','";
			$sql .= $status;
			$sql .= "','";
			$sql .= $sex;
			$sql .= "','";
			$sql .= $hobbies;
			$sql .= "','";
			$sql .= $Spruch;
			$sql .= "','";
			$sql .= $like;
			$sql .= "','";
			$sql .= $dislike;
			$sql .= "','";
			$sql .= $land;
			$sql .= "','";
			$sql .= $PLZ;
			$sql .= "')";
			$db->query($sql);
			$db->close();
			echo("<p style=\"color:#97A6B2;\">Herzlichen Glückwunsch, Sie wurden der Datenbank zugefügt</p>");
			echo("<a href=\"index.php\">Einloggen</a>");
			$zeile = $result->fetchArray();
			}
			else
				echo("<p style=\"color:#97A6B2;\">Benutzer existiert bereits</p>");
		}
		else
			echo("<p style=\"color:#97A6B2;\">Passwort stimmt nicht überein</p>");
		}
	}
?>
<html>
<head><title>Anmeldung</title>
<style type="text/css">
input {  	border-left:1px solid #97A6B2;border-top:1px solid #97A6B2;border-right:1px solid #657988; border-bottom:1px solid #657988; background-color:white; 
			color:black; height:30px; width: 300px; font-size:14pt;}
input:hover { border-left:2px solid #97A6B2;border-top:2px solid #97A6B2;border-right:2px solid #657988; border-bottom:2px solid #657988; }
input:focus { border-left:2px solid #97A6B2;border-top:2px solid #97A6B2;border-right:2px solid #657988; border-bottom:2px solid #657988; }
textarea {  	border-left:1px solid #97A6B2;border-top:1px solid #97A6B2;border-right:1px solid #657988; border-bottom:1px solid #657988; background-color:white; 
			color:black; width: 300px; font-size:14pt;font-family:Arial;}

.submit { 	cursor:pointer;border-left:1px solid #97A6B2;border-top:1px solid #97A6B2;
				border-right:1px solid #657988; 
				border-bottom:1px solid #657988;
				background-color:#151515; color:#97A6B2; height:30px; width:auto; font-size:13pt;
				}
a:hover {color: #97A6B2;}
a { color:#657988; }
p { color:#97A6B2; }
</style>
<script type="text/javascript">
function postlz()
{
	plz = document.getElementById("PLZ").value;
	var Req = new XMLHttpRequest();
	get = "PLZ=" + plz;
	url = "PLZ.php";
	if(Req)
	{
		Req.open('post', url,true);
		Req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		Req.onreadystatechange = function()
		{
			if(Req.readyState==4)
			{
				request = Req.responseText;
				document.getElementById("Ort").value = request;
			}
		}
	};
	Req.send(get);

}
</script>
</head>
<body style="background-color:black;">
<form method="post" action="">
<h3 style="color:#97A6B2;">Neuen Benutzer anlegen:</h3>
<table>
<tr>
<td style="color:#657988; font-size:16pt;">E-Mail-Adresse*: </td>
<td><input type="text" name="email" /></td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Passwort*: </td>
<td><input type="password" name="pass" /></td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Passwort bestätigen*: </td>
<td><input type="password" name="pass2" /></td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Vorname*: </td>
<td><input type="text" name="vname" /></td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Nachname*: </td>
<td><input type="text" name="nname" /></td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Geschlecht*: </td>
<td>
<select name="sex" style="font-size:13pt;width:300px;">
	<option>m&auml;nnlich</option>
	<option>weiblich</option>
</select>
</td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Geburtsdatum*: </td>
<td>
<select name="day" style="font-size:13pt;">
	<option>01</option>
	<option>02</option>
	<option>03</option>
	<option>04</option>
	<option>05</option>
	<option>06</option>
	<option>07</option>
	<option>08</option>
	<option>09</option>
	<option>10</option>
	<option>11</option>
	<option>12</option>
	<option>13</option>
	<option>14</option>
	<option>15</option>
	<option>16</option>
	<option>17</option>
	<option>18</option>
	<option>19</option>
	<option>20</option>
	<option>21</option>
	<option>22</option>
	<option>23</option>
	<option>24</option>
	<option>25</option>
	<option>26</option>
	<option>27</option>
	<option>28</option>
	<option>29</option>
	<option>30</option>
	<option>31</option>
</select>
<select name="month" style="font-size:13pt;width:183px;">
	<option>Januar</option>
	<option>Februar</option>
	<option>M&auml;rz</option>
	<option>April</option>
	<option>Mai</option>
	<option>Juni</option>
	<option>Juli</option>
	<option>August</option>
	<option>September</option>
	<option>Oktober</option>
	<option>November</option>
	<option>Dezember</option>
</select>
<select name="year" style="font-size:13pt;">
	<option>1980</option>
	<option>1981</option>
	<option>1982</option>
	<option>1983</option>
	<option>1984</option>
	<option>1985</option>
	<option>1986</option>
	<option>1987</option>
	<option>1988</option>
	<option>1989</option>
	<option selected>1990</option>
	<option>1991</option>
	<option>1992</option>
	<option>1993</option>
	<option>1994</option>
	<option>1995</option>
	<option>1996</option>
	<option>1997</option>
	<option>1998</option>
	<option>1999</option>
	<option>2000</option>
	<option>2001</option>
	<option>2002</option>
	<option>2003</option>
</select>
</td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Land*:</td>
<td>
<select name="land" style="font-size:13pt;width:300px;">
	<option>Deutschland</option>
	<option>&Ouml;sterreich</option>
	<option>Schweiz</option>
</select>
</td>
</tr>
<td style="color:#657988; font-size:16pt;">PLZ:</td>
<td><input type="text" maxlength="5" name="PLZ" id="PLZ" style="width:60px;" onKeyUp="postlz()" /><input type="text" readonly style="width:240px;" id="Ort" /></td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Spitzname: </td>
<td><input type="text" name="nick" /></td>
<tr>
<td style="color:#657988; font-size:16pt;">Status: </td>
<td>
<select name="status" style="font-size:13pt;width:300px;">
	<option></option>
	<option>solo</option>
	<option>vergeben</option>
	<option>ungl&uuml;cklich verliebt</option>
	<option>verliebt</option>
	<option>verheiratet</option>
	<option>geschieden</option>
	<option>in Arbeit</option>
	<option>mal sehen</option>
	<option>frisch getrennt</option>
	<option>Danke, nie wieder</option>
	<option>gute Frage</option>
	<option>Witwe/r</option>
</select>
</td>
</tr>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Hobbies: </td>
<td><textarea name="hobbies"></textarea></td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Das mag ich: </td>
<td><textarea name="like"></textarea></td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">...und das gar nicht: </td>
<td><textarea name="dislike"></textarea></td>
</tr>
<tr>
<td style="color:#657988; font-size:16pt;">Lieblingsspruch: </td>
<td><textarea name="Spruch"></textarea></td>
</tr>
<tr>
<td></td>
<td><input class="submit" type="submit" name="logging" value="Anlegen" /></td>
</tr>
</table>
</form>
</body>
</html>
