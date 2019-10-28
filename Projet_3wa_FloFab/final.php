<?php
session_start();
if (!isset($_SESSION['id'])) {
	header ('Location: index.php');
	exit();
}
$idSession = intval($_SESSION['id']);
if (isset($_GET["id"])) {
	$host = "localhost";
	$dbName = "accounts";
	$dbLogin = "root";
	$dbPassword = "";

	$dbOptions = [    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
					PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
				];
	$pdo = new PDO("mysql:host=$host;dbname=$dbName", $dbLogin, $dbPassword, $dbOptions);

	$pdo->exec("SET NAMES UTF8");

	$sql = $pdo->prepare('SELECT victoire FROM ratio WHERE id=?');
	$req1 = $sql->execute([$idSession]);
	$victoire = $sql->fetch();
	$sql = $pdo->prepare('SELECT defaite FROM ratio WHERE id=?');
	$req2 = $sql->execute([$idSession]);
	$defaite = $sql->fetch();
	$wins = intval($victoire['victoire']);
	$loses = intval($defaite['defaite']);
	// Récupération de la combinaison passée en paramètre et déduction des victoires et défaites.
	$combin = intval($_GET["id"]);

	$GameVictory = floor($combin/22769) - 1 ;
	// on enlève le 1 ajouté pour rendre visuellement plus compliqué la compréhension du résultat en url

	$GameDefeat = $combin % 22769;

	$victory = $GameVictory + $wins;
	$defeat = $GameDefeat + $loses;
	$sql3 = $pdo->prepare('UPDATE ratio SET victoire = ?, defaite=? WHERE id=?');
	$req2 = $sql3->execute([$victory,$defeat,$idSession]);

}


// on utilise le layout pour avoir la même apparence partout
$template = "final";
include_once "layout.phtml";


?>
