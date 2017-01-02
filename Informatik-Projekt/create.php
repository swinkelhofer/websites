<?php
$db = new SQLite3('vz.sql', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
$db->exec("CREATE TABLE Profil ('ID' INT (10), 'EMail' VARCHAR (50) NULL, 'PW' VARCHAR (30) NULL, 
'VName' VARCHAR (30) NULL, 'NName' VARCHAR (30) NULL, 
'Nick' VARCHAR  (30) NULL, 'Birth' VARCHAR (25) NULL,'Status' VARCHAR (30) NULL, 
'Sex' CHAR NULL, 'Hobbies' VARCHAR (200) NULL, 
'Spruch' VARCHAR (200) NULL, 'Like' VARCHAR (200) NULL, 'Dislike' VARCHAR (200) NULL, 'Land' VARCHAR (30) NULL,
'PLZ' INT (5) NULL, PRIMARY KEY('ID'))");
$db->close();
$db = new SQLite3('news.sql', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
$db->exec("CREATE TABLE Nachrichten ('IDsend' INT (10) NULL, 'Text' TEXT NULL, 'IDrec' VARCHAR (30) NULL, 'Read' VARCHAR (3) NULL, 'Date' DATE NULL, del1 BOOLEAN NULL, del2 BOOLEAN NULL)");
$db->close();
$db = new SQLite3('friends/friends.sql', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
$db->exec("CREATE TABLE 'Friends' ('FID1' INT (10) NULL, 'FID2' VARCHAR (30) NULL, 'true1' BOOLEAN false, 'true2' BOOLEAN false)");
$db->close();
$db = new SQLite3('PLZ.sql', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
$db->exec("CREATE TABLE PLZ ('PLZ' INT (5) NULL, 'Ort' VARCHAR (50) NULL)");
$db->close();
?>
