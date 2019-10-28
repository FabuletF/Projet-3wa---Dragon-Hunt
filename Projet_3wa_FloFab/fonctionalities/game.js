"use strict"

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
const DIFFICULTY_EASY = 1;
const DIFFICULTY_NORMAL = 2;
const DIFFICULTY_HARD = 3;
const ARMOR_COPPER = 1;
const ARMOR_IRON = 2;
const ARMOR_MAGICAL = 3;
const SWORD_WOOD = 1;
const SWORD_STEEL = 2;
const SWORD_EXCALIBUR = 3;
const LOOT_ARMOR=1;
const LOOT_SWORD=2;
const LOOT_PURSE=3;
const UNDEAD=1;
const OGRE=2;
const DRAGON=3;
const MONSTER = 1;
const CHEST = 2;
const CORPSE = 3;
const CHASSEUR_MONOLOGUE=4;


var game = {};
var adventure = "oui";
var victory = 0;
var defeat = 0;
var end1=false;
var end2=false;


var loot_table = ["vide","une armure","une épée","une bourse"]

/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/
function initialize() {
	//console.log("initialize");
	game={};
	game.round = 1;
	game.monstreEnCours=0;

	game.difficulty = requestInteger("Veuillez choisir le niveau de difficulté. \n 1=Facile ; 2=Normal ; 3=Difficile",1,3);
	switch (game.difficulty) 	{
		case DIFFICULTY_EASY :
		game.KnightHP = getRandomInteger(200,250);
		game.DragonHP = getRandomInteger(250,300);
		break;
		case DIFFICULTY_NORMAL :
		game.KnightHP = getRandomInteger(200,250);
		game.DragonHP = getRandomInteger(300,350);
		break;
		case DIFFICULTY_HARD :
		game.KnightHP = getRandomInteger(150,200);
		game.DragonHP = getRandomInteger(350,400);
		break;
	}
	document.getElementById('KHP').innerHTML = game.KnightHP;

	game.DragonName = getRandomInteger(1,9);
	game.DragonTitle = getRandomInteger(1,5);
	switch (game.DragonName)	{
		case 1 :
		game.DragonName="Drak";
		break;
		case 2 :
		game.DragonName="Ragna";
		break;
		case 3 :
		game.DragonName="Javawan";
		break;
		case 4 :
		game.DragonName="Grey";
		break;
		case 5 :
		game.DragonName="Hury";
		break;
		case 6 :
		game.DragonName="Troy";
		break;
		case 7 :
		game.DragonName="Aerio";
		break;
		case 8 :
		game.DragonName="Zarg";
		break;
		case 9 :
		game.DragonName="Bry";
		break;
	}
	switch (game.DragonTitle)	{
		case 1 :
		game.DragonTitle="The Viral";
		break;
		case 2 :
		game.DragonTitle="The Code-Destroyer";
		break;
		case 3 :
		game.DragonTitle="The Word-Eater";
		break;
		case 4 :
		game.DragonTitle="The Breaker";
		break;
		case 5 :
		game.DragonTitle="The Bug";
		break;
	}
	game.sword=1;
	game.armor=1;
	game.loot=0;
	game.gold = 10;
	game.PlayerName=prompt("Veuillez entrer le nom du brave combattant.");
	document.getElementById('LogAction').innerHTML = "<p>DEBUT DE LA PARTIE</p>";
	document.getElementById('LogAction').innerHTML +="<p>***DRAGON ***"+game.DragonName+" "+game.DragonTitle+"***  : "+game.DragonHP+" PV </p><p>***LE BRAVE***  : "+game.PlayerName+"*** : "+game.KnightHP+" PV </p>";
	document.getElementById("LogAction").innerHTML += "<p>Appuyer sur le bouton pour continuer</p>"
	document.getElementById('KHP').textContent = game.KnightHP;
	document.getElementById('Gold').textContent = game.gold;
	game.HQ = "exit"
	game.destination = "forest"
}

/*---------------------------------*/
function verifie() {
	//console.log("verifie");
	switch (game.sword)	{
		case SWORD_WOOD :
		game.SwordRatio = 0.5;
		break;
		case SWORD_STEEL :
		game.SwordRatio = 1;
		break;
		case SWORD_EXCALIBUR :
		game.SwordRatio = 2;
		break;
	}
	switch (game.armor)	{
		case ARMOR_COPPER :
		game.ArmorRatio = 1;
		break;
		case ARMOR_IRON :
		game.ArmorRatio = 0.75;
		break;
		case ARMOR_MAGICAL :
		game.ArmorRatio = 0.5;
		break;
	}
}

/*---------------------------------*/
function knightDamage () {
	var damagePoints=0;

	//console.log("knightDamage");
	switch (game.difficulty)	{
		case DIFFICULTY_EASY :
		damagePoints = getRandomInteger(25,30);
		break;
		case DIFFICULTY_NORMAL :
		damagePoints = getRandomInteger(15,20);
		break;
		case DIFFICULTY_HARD :
		damagePoints = getRandomInteger(5,10);
		break;
	}
	damagePoints=Math.round(game.SwordRatio*damagePoints);
	return damagePoints;
}

/*---------------------------------*/
function dragonDamage () {
	var damagePoints=0;
	//console.log("dragonDamage");
	if (game.difficulty==DIFFICULTY_EASY) 	{
		damagePoints=getRandomInteger(10,20);
	}
	else {
		damagePoints=getRandomInteger(20,30);
	}
	damagePoints=Math.round(game.ArmorRatio*damagePoints);
	return damagePoints;
}

/*---------------------------------*/
function MonsterDamage () {
	var damagePoints=0;
	//console.log("monsterDamage");
	if (game.monstreEnCours==UNDEAD) 	{
		damagePoints=getRandomInteger(5,10);
	}
	else {
		damagePoints=getRandomInteger(15,30);
	}
	damagePoints=Math.round(game.ArmorRatio*damagePoints);
	return damagePoints;
}

/*---------------------------------*/
function PlayOneRound ()
{
	var ptsGagnes =0;
	var ptsPerdus = 0;
	var knightSpeed = 0;
	var monsterSpeed = 0;

	//console.log("PlayOneRound");
	do 	{
		knightSpeed = getRandomInteger(0,40);
		monsterSpeed = getRandomInteger(0,40);
	}
	while (knightSpeed==monsterSpeed);

	if (knightSpeed>monsterSpeed) 	{
		ptsGagnes = knightDamage();
		game.MonsterHP=game.MonsterHP-ptsGagnes;
		document.getElementById('LogAction').innerHTML +="<p>Vous avez été plus rapide que l'ennemi ! Vous le frappez et lui enlevez "+ptsGagnes+"PV !</p>";
	}
	else 	{
		if (game.monstreEnCours!=DRAGON) {
			ptsPerdus = MonsterDamage();
			game.KnightHP=game.KnightHP-ptsPerdus;
			document.getElementById('LogAction').innerHTML +="<p>Vous avez été moins rapide que l'ennemi ! Il vous frappe et vous enlève "+ptsPerdus+"PV !</p>"
		}
		else {
			ptsPerdus = MonsterDamage();
			game.KnightHP=game.KnightHP-ptsPerdus;
			document.getElementById('LogAction').innerHTML +="<p>Vous avez été moins rapide que l'ennemi ! Il vous frappe et vous enlève "+ptsPerdus+"PV !</p>"
		}
	}
	document.getElementById('KHP').textContent = game.KnightHP;
	document.getElementById('Gold').textContent = game.gold;

}

/*---------------------------------*/
function PlaydragonAllRounds() {
	//console.log("PlaydragonAllRounds    dragon");
	verifie();
	game.MonsterHP=game.DragonHP;
	while (game.KnightHP>0 && game.DragonHP>0)  	{
		PlayOneRound();
		game.DragonHP=game.MonsterHP;
		document.getElementById('LogAction').innerHTML ="<p>===Tour n°"+game.round+"===</p>";
		document.getElementById('LogAction').innerHTML +="<p>***"+game.DragonName+" "+game.DragonTitle+"*** : "+game.DragonHP+" PV </p> <p>***"+game.PlayerName+"*** : "+game.KnightHP+" PV </p>";
		document.getElementById("LogAction").innerHTML += "<p>Appuyer sur le bouton pour continuer</p>"
		game.round++;
	}
}

/*---------------------------------*/
function PlayMonsterAllRounds() {
	var coins=0;
	var monsterRound=0;

	console.log("PlayMonsterAllRounds    monster" );
	verifie();

	switch (game.monstreEnCours) {
		case UNDEAD : {
			showImage("images/UNDEAD_race.jpg");
			game.MonsterHP=5;
			break;
		}
		case OGRE : {
			showImage("images/OGRE_race.jpg");
			game.MonsterHP=20;
			break;
		}
		case DRAGON : {
			showImage("images/dragon_vert.jpg");
			game.MonsterHP=game.DragonHP;
			break;
		}
	}

	//console.log("post choix image");

	while (game.KnightHP>0 && game.MonsterHP>0)  	{
		PlayOneRound();
		monsterRound++;
	}
	if (monsterRound > 1) {
		document.getElementById('LogAction').innerHTML +="<p>=== Après "+monsterRound+" échange de coups... ===</p>";
	}
	else {
		document.getElementById('LogAction').innerHTML +="<p>=== Après "+monsterRound+" échanges de coups... ===</p>";
	}
	document.getElementById('KHP').textContent = game.KnightHP;
	document.getElementById('Gold').textContent = game.gold;
	game.loot=getRandomInteger(1,3);
	coins=getRandomInteger(5,25);
	game.gold+=coins
}

/*---------------------------------*/
function checkGold(mise)  {
	var coins=0;

	//console.log("checkGold");
	if (game.gold<mise)  {
		document.getElementById('LogAction').innerHTML = '<p>"Pas assez de pièces ? Partez! " </p>';
		coins = 0
	}
	else {
		coins = mise;
	}
	return coins
}

/*---------------------------------*/
function travel()  {
	var hint=0;
	var coins=0;
	var reponse = "";

	//console.log("travel");
	document.getElementById('LogAction').innerHTML =" ";
	game.destination = requestInteger("Où voulez-vous aller ? Ville(1), forêt(2) ou dragon(3) ?",1,3);
	// Le joueur fait le choix d'où il va.
	if (game.destination==1)  {
		showImage("images/city_gate.jpg");
		game.HQ="in";
	}
	else {
		game.HQ="exit";
	}
	if (game.HQ=="exit")  {
		if (game.destination==2)  {
			showImage("images/foret.jpg");

			// Une fois dans la forêt, 4 types de rencontres sont possibles : monstre à tuer , coffre caché, cadavre, chasseur à monologue
			game.encounter=getRandomInteger(1,4);
			//game.encounter=3;
			//console.log("dans la forêt" + game.encounter);
			switch (game.encounter)  {
				case MONSTER: 				{
					game.monstreEnCours=getRandomInteger(1,2);
					PlayMonsterAllRounds();
					document.getElementById('LogAction').innerHTML +="<p>Vous avez terrassé un monstre qui trainaît aux alentours, récupérant ainsi"+loot_table[game.loot]+". Cela va sûrement intéresser le marchant en ville. </p>";
				}
				break;
			case CHEST :  	{
				coins=getRandomInteger(5,100);
				game.gold+=coins;
				document.getElementById('LogAction').innerHTML +="<p>Vous avez trouvé "+coins+" pièces dans un coffre caché, augmentant ainsi votre total à "+game.gold+" pièces.</p>";
				break;
			}
			case CORPSE : 	{
				coins=getRandomInteger(0,50);
				game.loot=LOOT_PURSE;
				game.gold+=coins;
				showImage("images/CORPSE_forest.jpg");
				document.getElementById('LogAction').innerHTML +="<p>Vous avez trouvé "+coins+" pièces dans un cadavre, augmentant ainsi votre total à "+game.gold+" pièces. Il y avait aussi un sac scellé sur lui, le marchand en ville doit pouvoir desceller ça.</p>";
			}
			case CHASSEUR_MONOLOGUE : 	{
				//console.log ("allié ...");
				showImage("images/chevalier_perdu.jpg");
				document.getElementById('LogAction').innerHTML +='<p>Vous rencontrez un autre chasseur de dragon qui vous dit : "Bonjour, mercenaire ! </p> ';

				hint=getRandomInteger(1,5);
				//console.log ("hint =  ..." + hint);

				// Le chasseur possède 5 lignes de dialogue aléatoire ainsi que 2 lignes fixes, une au-dessus de l'aléatoire et une en dessous.
				switch (hint) {
					case 1 : 	{
						document.getElementById('LogAction').innerHTML +="<p>Saviez-vous que les morts-vivants ont tendance à ne s'approcher que de ceux n'ayant pas meilleure armure qu'une armure en cuivre ?</p>";
						break;
					}
					case 2 :	{
						document.getElementById('LogAction').innerHTML +="<p>Je me demande pourquoi excepté nous humains, on ne rencontre que des morts-vivants ou des ogres dans cette forêt...</p>";
						break;
					}
					case 3 :	{
						document.getElementById('LogAction').innerHTML +="<p>Est-ce qu'il y a quelqu'un qui sait vraiment ce qui se cache derrière le 4ème mur de la ville ? Des rumeurs disent qu'il n'y a que des lignes et des lignes de texte incompréhensibles...</p>";
						break;
					}
					case 4 :	{
						document.getElementById('LogAction').innerHTML +="<p>Il paraît que le fondateur de la ville a tenté de récupérer la princesse via la magie, mais que celle-ci l'a trahi, le transformant ainsi que toutes ses futures victimes en morts-vivants.</p>";
						break;
					}
					case 5 :	{
						document.getElementById('LogAction').innerHTML +="<p>Saviez-vous que vous ne pouvez mourir d'âge ici ? Le soleil est immobile dans le ciel, il n'y a jamais une once de vent et la météo reste la même tout le temps. Une autre conséquence de la magie du fondateur.</p>";
						break;
					}
				}
				document.getElementById('LogAction').innerHTML +='<p>Peu importe ce qui ce passe, ce qui est important est que tu ne meures pas de saignement, donc va te soigner à la ville à chaque fois." </p>';
			}
		}

	}
	else if (game.destination==3) 	{
		//Comme il est plus que probable que j'augmente le nombre d'ennemis potentiels dans le futur, j'ai pris mes précautions quand à la place laissé pour cela
		// Ce combat étant le dernier, il faut être sûr de vouloir y aller.
		game.monstreEnCours = DRAGON;
		PlaydragonAllRounds();
	}
}
else if (game.HQ="in") 	{
	// La ville vous offre plusieurs services à l'étranger que vous êtes. 2 types de soins, 1 service de revente pour le "loot" que vous recevez sur les monstres/cadavres ainsi que le maître forgeron pour votre arme et armure.
	game.shop = requestInteger("Que voulez-vous visiter ? Eglise (1), auberge (2), forgeron (3) ou marchand (4) ?",1,4);
	switch(game.shop) 	{
		case 1 : 	{
			reponse=prompt("Souhaitez-vous des soins ? Cela coûtera 20 pièces.");
			reponse = reponse.toLowerCase();
			// L'église est un lieu inbibé de pouvoir, à même de pouvoir refermer toutes vos blessures.
			if (reponse=="oui") 	{
				coins=checkGold(20);
				if (coins !=0) 	{
					game.gold -= coins;
					game.KnightHP+=100;
					if (game.KnightHP>300) 	{
						/* petit malin qui essaie de dépasser le dragon ...==> on rabat */
						game.KnightHP=300;
					}
					document.getElementById('KHP').innerHTML = game.KnightHP;
					document.getElementById('LogAction').innerHTML +="<p>Vous êtes passé à l'église vous faire soigner. Vos points de vie remontent.</p>";
				}
				else {
					document.getElementById('LogAction').innerHTML +="<p>Vous êtes passé à l'église mais vous n'avez pas assez de pièces pour vous faire soigner.</p>";
				}
			}
			else {
				document.getElementById('LogAction').innerHTML +="<p>Passer à l'église sans vous faire soigner ! Quel dommage ...</p>";
			}
			break;
		}
		case 2 : 	{
			reponse=prompt("Voulez-vous vous reposer ? 5 pièces la nuit.");
			reponse = reponse.toLowerCase();
			// L'auberge vous permet de manger, boire et vous reposer, ce qui permet de regénérer plus qu'une simple guérison, mais bien moins efficace contre les plaies en tout genre.
			if (reponse=="oui") 	{
				coins=checkGold(5);
				if (coins !=0) 	{
					game.gold -= coins;
					game.KnightHP+=25;
					if (game.KnightHP>325) 	{
						/* petit malin qui essaie de dépasser le dragon ...==> on rabat */
						game.KnightHP=325;
					}
					document.getElementById('KHP').innerHTML = game.KnightHP;
					document.getElementById('LogAction').innerHTML +="<p>Vous êtes passé à l'auberge vous reposer. Vos points de vie remontent.</p>";
				}
				else {
					document.getElementById('LogAction').innerHTML +="<p>Vous êtes passé à l'auberge vous reposer, mais sans argent on vous refuse.</p>";
				}
			}
			else {
				document.getElementById('LogAction').innerHTML +="<p>Vous êtes passé à l'auberge sans vous arrêter.</p>";
			}
			break;
		}
		case 3 : 	{
			reponse=prompt("Voulez-vous forger quelque chose ? Oui ou non ?");
			reponse.toLowerCase();

			// Le forgeron est la personne à qui vous adresser si vous voulez améliorer votre arme ou armure. 3 qualités d'armes et d'armures, vous commencez avec la plus faible.
			// Le forgeron vous permettra, si vous avez l'argent, de changer la qualité d'arme ou armure en une des deux autres, meilleures.

			if (reponse=="oui") 	{
				reponse=requestInteger("Que voulez-vous forger ? Epée (1) ou armure (2) ?",1,2);
				if (reponse==1) 	{
					reponse=requestInteger("Voulez-vous une épée en acier (1) pour 100 pièces, ou voulez-vous l'épée légendaire (2), qui va vous coûter 1000 pièces ?",1,2);
					if (reponse == 1) 	{
						coins=checkGold(100);
						if (coins !=0) 	{
							game.gold -= coins;
							game.sword=2;
							document.getElementById('LogAction').innerHTML +="<p>Vous avez maintenant une épée en acier</p>";
						}
						else  {
							document.getElementById('LogAction').innerHTML +="<p>Pas assez d'argent ... </p>";
						}
					}
					else if (reponse == 2) 	{
						coins=checkGold(1000);
						if (coins !=0) 	{
							game.gold -= coins;
							game.sword=3;
							document.getElementById('LogAction').innerHTML +="<p>Vous avez maintenant l'épée légendaire</p>";
						}
						else 	{
							document.getElementById('LogAction').innerHTML +="<p>Pas assez d'argent ... </p>";
						}
					}
				}
				else if (reponse==2) 	{
					reponse=requestInteger("Voulez-vous une armure en fer (1) pour 300 pièces, ou voulez-vous l'armure magique (2), qui va vous coûter 1500 pièces ? ",1,2);
					if (reponse == 1) 	{
						coins=checkGold(300);
						if (coins !=0) 	{
							game.gold -= coins;
							game.armor=2;
							document.getElementById('LogAction').innerHTML +="<p>Vous avez maintenant une armure en fer.</p>";
						}
						else 	{
							document.getElementById('LogAction').innerHTML +="<p>Pas assez d'argent ... </p>";
						}
					}
					else if (reponse == 2) 	{
						coins=checkGold(1500);
						if (coins !=0) 	{
							game.gold -= coins;
							game.armor=3;
							document.getElementById('LogAction').innerHTML +="<p>Vous avez maintenant l'amure magique !!! </p>";
						}
						else 	{
							document.getElementById('LogAction').innerHTML +="<p>Pas assez d'argent ... </p>";
						}
					}
				}
			}
			document.getElementById('LogAction').innerHTML +="<p>Vous êtes passé chez le forgeron pour regarder, sans plus ...</p>";
			break;
		}
		case 4 : 	{
			reponse=prompt("Avez-vous des babioles à vendre ou identifier ? Oui ou bien non ?");
			reponse = reponse.toLowerCase();

			// Excepté pour le massacre, le marchant est le seul moyen de gagner de l'argent. Les prix sont à 25% de ce que le forgeron demande pour le niveau 2 d'équipement, sauf la bourse scellée qui ne contient que peu de base.

			if (reponse=="oui") 	{
				switch (game.loot) 	{
					case LOOT_ARMOR : 	{
						reponse=prompt("Jolie armure, dommage qu'elle ne vous va pas. Acceptez-vous de me la vendre pour 75 pièces ?");
						reponse.toLowerCase();
						if (reponse=="oui") 	{
							game.gold += 75;
							game.loot = 0;
							document.getElementById('LogAction').innerHTML +="<p>Vous avez vendu l'armure pour 75 pièces seulement. Dommage...</p>";
						}
						break;
					}
					case LOOT_SWORD : 	{
						reponse=prompt("Jolie épée, dommage qu'elle ne vous plaît pas. Acceptez-vous de me la vendre pour 25 pièces ?");
						reponse.toLowerCase();
						if (reponse=="oui") 	{
							game.gold += 25;
							game.loot = 0;
							document.getElementById('LogAction').innerHTML +="<p>Vous avez vendu l'épée pour 25 pièces seulement. Dommage...</p>";
						}
						break;
					}
					case LOOT_PURSE : 	{
						reponse=prompt("Joli ! Dommage que cette bourse a été scellée. Acceptez-vous de me la prêter pour que je vous la descelle, moyennant un quart de son contenu ?");
						reponse.toLowerCase();
						if (reponse=="oui") 	{
							game.gold += 15;
							game.loot = 0;
							vendu = true;
							document.getElementById('LogAction').innerHTML +="<p>Vous avez gagné 15 pièces seulement. Belle affaire !</p>";
						}
						break;
					}
					default : 	{
						document.getElementById('LogAction').innerHTML +="<p>Marchand : Je suis désolé, mais vous n'avez rien sur vous qui retient mon attention.</p>"
					}
				}
			}
			else {
				reponse=prompt("Dommage... Si jamais vous trouvez que vous avez trop d'or, j'ai une plume de phénix à vendre... 5000 pièces. Intéressé ?");
				reponse.toLowerCase();

				//Cet object est un scam total... On est pas dans Final Fantasy pour qu'une plume puisse ressuciter quelqu'un comme ça. Mais tout le monde aime les easter eggs.

				if (reponse == "oui") 	{
					coins=checkGold(5000);
					if (coins !=0) 	{
						game.gold -= coins;
						document.getElementById('LogAction').innerHTML = "<p><i>Vous avez l'impression de vous être fait arnaquer... Mais cette plume rejoindra votre collection ne serait-ce que par sa beauté. Si vous restez en vie...<i></p>";
					}
				}
				else 	{
					document.getElementById('LogAction').innerHTML +="<p>Vous avez refusé l'achat d'une plume de phénix.</p>"
				}
			}
		}
	}
}
document.getElementById("LogAction").innerHTML += "<p>Appuyer sur le bouton pour continuer</p>"
document.getElementById('KHP').textContent = game.KnightHP;
document.getElementById('Gold').textContent = game.gold;
jouer();      //Quand le "tour" est fini, on vérifie si le joueur ne remplit pas une condition de fin.
}

/*---------------------------------*/
function StartGame() {
	initialize();
	//PlayMonsterAllRounds();
}

/*---------------------------------*/
function jouer() {
	var combin=0;

	//console.log("jouer");
	if (adventure =="oui") {
		adventure = "non"
		StartGame()
	}
	if (game.KnightHP>0 && game.DragonHP<=0) {
		// Ce qui arrive quand le dragon est vaincu
		showImage("images/knight.jpg");
		alert("Vous avez terrassé le terrible ***"+game.DragonName+" "+game.DragonTitle+"*** et délivré la princesse ! Mais pas sans séquelles de votre dernier combat...");
		alert(" Il vous restait "+game.KnightHP+" points de vie");
		end1 = true;
		victory ++;
	}
	else if (game.KnightHP<=0 && game.DragonHP>0)	{
		// Ce qui arrive quand le chevalier (aka vous) est vaincu
		showImage("images/dragon.jpg");
		alert("***"+game.DragonName+" "+game.DragonTitle+"*** a gagné, vous avez été terrassé(e) ! La princesse restera sa captive pour les 100 ans à venir.");
		alert("Il lui restait "+game.DragonHP+" points de vie");
		end2 = true;
		defeat ++;
	}
	if (end1 || end2) {
		adventure = prompt("Voulez-vous recommencer ?");
		adventure = adventure.toLowerCase();
		if (adventure!="oui") 	{
			//je calcule une combinaison des victoires et défaites pour limiter la triche
			combin = (victory+1)*22769+defeat;
			window.location.href="final.php?id="+combin;
		}
		else {
			StartGame();
			adventure = "non";
		}
		end1 = false;
		end2 = false;
	}
}
/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
document.addEventListener("DOMContentLoaded",jouer());
