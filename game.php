<?php
session_start();
if (!isset($_SESSION['id'])) {
	header ('Location: index.php');
	exit();
}

// on utilise le layout pour avoir la même apparence partout
$template = "main";
include "layout.phtml";

?>
