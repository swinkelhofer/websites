<?php
	session_start();
	$_SESSION["Zugang"] = "none";
	unset($_SESSION["Zugang"]);
	header("Location: index.php");
?>