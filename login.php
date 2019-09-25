<?php
// on teste si le visiteur a soumis le formulaire de connexion
if (isset($_POST['connexion']) && $_POST['connexion'] == 'Connexion') {
  	if ((isset($_POST['login']) && !empty($_POST['login'])) && (isset($_POST['pass']) && !empty($_POST['pass']))) {
    $host = "localhost";
    $dbName = "accounts";
    $dbLogin = "root";
    $dbPassword = "";

    $dbOptions = [    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
          ];
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $dbLogin, $dbPassword, $dbOptions);

    $pdo->exec("SET NAMES UTF8");

		$pdo->exec("SET NAMES UTF8");
		$hisLogin = $_POST['login'];
		$hisPwd = $_POST['pass'];
		// on teste si une entrée de la base contient ce login
		$sql = $pdo->prepare('SELECT id FROM membre WHERE login=?');
		$req = $sql->execute([$hisLogin]);
		$data = $sql->fetch();

		// si on obtient une réponse, alors l'utilisateur est un membre
		if (!empty($data)) {
			$monId = $data['id'];
			$takePwd = $pdo->prepare('SELECT pass_md5 FROM membre WHERE id=?');
			$req1 = $takePwd->execute([$monId]);
			$regPwd = $takePwd->fetch();
			$RegPwdContent = $regPwd['pass_md5'];
			if (crypt($hisPwd, $RegPwdContent) == $RegPwdContent){
				//mise à jour last_connexion
				$sql2 = $pdo->prepare('UPDATE membre SET last_connexion=NOW() WHERE id=?');
				$req2 = $sql2->execute([$monId]);
				//
				session_start();
				$_SESSION['id']=$monId;
				header ('Location: game.php');
				exit();
			}
		// si non corrélation, le visiteur s'est trompé soit dans son mot de passe
			else {$erreur = 'Mot de passe invalide';}
		}
		else {
			$erreur = 'Compte non reconnu.';
		}
	}
	else {
  //ne devrait pas arriver avec required
	$erreur = 'Au moins un des champs est vide.';
	}
}
else {
  // init avant première saisie
  $hisLogin='';
}


// on utilise le layout pour avoir la même apparence partout
$template = "login";
include "layout.phtml";

?>
