<?php
// On teste si le visiteur a soumis le formulaire.

if (isset($_POST['inscription']) && $_POST['inscription'] == 'Inscription') {

	// On teste l'existence de nos variables. On teste également si elles ne sont pas vides.
	if ((isset($_POST['login']) && !empty($_POST['login'])) && (isset($_POST['pass']) && !empty($_POST['pass'])) && (isset($_POST['pass_confirm']) && !empty($_POST['pass_confirm']))) {
	// On teste les deux mots de passe.
		if ($_POST['pass'] != $_POST['pass_confirm']) {
			$hisLogin=$_POST['login'];
			$erreur = 'Les 2 mots de passe sont différents.';
		}
		else {
			$host = "localhost";
			$dbName = "accounts";
			$dbLogin = "root";
			$dbPassword = "";

			$dbOptions = [    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
							PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
						];
			$pdo = new PDO("mysql:host=$host;dbname=$dbName", $dbLogin, $dbPassword, $dbOptions);

			$pdo->exec("SET NAMES UTF8");

			$hisLogin = $_POST['login'];
			$salt = '$2y$11$'.substr(bin2hex(openssl_random_pseudo_bytes(32)), 0, 22);
			$hisPwd = crypt($_POST['pass'], $salt);

			// On recherche si ce login est déjà utilisé par un autre membre.

			$sql = $pdo->prepare('SELECT count(*) As RES FROM membre WHERE login=?');
			$req = $sql->execute([$hisLogin]);
			$data = $sql->fetch();

			if (intval($data['RES']) == 0) {
				$sql5 = $pdo->prepare('SELECT count(*) as RES FROM membre');
				$req5 = $sql5->execute([]);
				$nombre = $sql5->fetch();
				// On cherche si le nombre d'utilisateurs est supérieur à la limite donnée au serveur.
				if (intval($nombre['RES']) == 200){
					$sql6 = $pdo->prepare('SELECT id FROM membre ORDER BY last_connexion ASC LIMIT 1');
					$req6 = $sql6->execute();
					$id = $sql6->fetch();
					// On va remplacer l'utilisateur qui ne s'est pas connecté depuis le plus longtemps par le nouveau.
					$monId = $id['id'];
					$sql7 = $pdo->prepare('UPDATE membre SET login=?,pass_md5=?,last_connexion=NOW() WHERE id=?');
					$req7 = $sql7->execute([$hisLogin,$hisPwd,$monId]);
					$sql8 = $pdo->prepare('DELETE FROM ratio WHERE id=?');
					$req8 = $sql8->execute([$monId]);
				}
				else {
					//On crée le nouvel utilisateur.
					$sql2 = $pdo->prepare('INSERT INTO membre (login, pass_md5) VALUES (?, ?)');
					$req2 = $sql2->execute([$hisLogin, $hisPwd]);
					$sql4 = $pdo->prepare('SELECT id FROM membre WHERE login=?');
					$req4 = $sql4->execute([$hisLogin]);
					$id = $sql4->fetch();
					$monId = $id['id'];
				}
				$sql3 = $pdo->prepare('INSERT INTO ratio (id,victoire, defaite) VALUES (?,0, 0)');
				$req3 = $sql3->execute([$monId]);

				session_start();
				$_SESSION['id']=$monId;
				header ('Location: game.php');
				exit();

				}

			else {
					$erreur = 'Un membre possède déjà ce login.';
			}
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
$template = "inscription";
include "layout.phtml";
?>
