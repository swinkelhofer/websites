<?php
session_start();
// session_register('entry');
// session_register('ID');
$_SESSION['entry'] = 'none';
$_SESSION['ID'] = 'none';
header("Location:index.php");
?>
