<?php
	$db = sqlite_open('PLZ.sql','0666');
	/*$file = fopen("PLZ.csv",'r');
	$i=0;
	while($zeile = fgetcsv($file,300,';'))
	{
		for($x=0;$x<2; $x += 2)
		{
			$query = "INSERT INTO 'PLZ' ('PLZ','Ort') VALUES ('";
			$query .= $zeile[$x];
			$query .= "','";
			$query .= $zeile[$x+1];
			$query .= "')";
			sqlite_query($query,$db);
		}
	}
	$sql = "SELECT * FROM 'PLZ'";
	$result = sqlite_query($sql,$db);
	echo("<table border=1><tr><th>PLZ</th><th>Ort</th></tr>");
	while($row = sqlite_fetch_array($result))
	{
		echo("<tr><td>" . $row["PLZ"] . "</td><td>" . $row["Ort"] . "</td></tr>");
	}
	echo("</table>");*/
	$PLZ = $_POST["PLZ"];
	$sql = "SELECT Ort FROM 'PLZ' WHERE PLZ='";
	$sql .= $PLZ;
	$sql .= "'";
	$result = sqlite_query($sql,$db);
	if($row = sqlite_fetch_array($result))
	{
		echo($row["Ort"]);
	}

?>