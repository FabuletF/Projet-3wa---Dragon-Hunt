-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 21 sep. 2019 à 17:17
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `accounts`
--

-- --------------------------------------------------------

--
-- Structure de la table `membre`
--

DROP TABLE IF EXISTS `membre`;
CREATE TABLE IF NOT EXISTS `membre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` text NOT NULL,
  `pass_md5` text NOT NULL,
  `last_connexion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `membre`
--

INSERT INTO `membre` (`id`, `login`, `pass_md5`, `last_connexion`) VALUES
(7, 'toto', '$2y$11$3179ab1d8145ba7e92e3fuxgBo2E9BRBrG4wBUcjt9BWvSrgIA4gq', '2019-09-21 19:07:01'),
(8, 'Florian', '$2y$11$ae83e40dcb56d370890eduB3ORx5occL00BwfJEzuVfdtBpxzUc1S', '2019-08-19 13:43:06'),
(12, 'tutu', '$2y$11$53cf92e56ac4646399744eS1Cz7wOKddc0gKw0nBzOhev4EwJtLES', '2019-08-16 14:47:31'),
(14, 'tata', '$2y$11$e93c519f1cd1ddaca6429u3DQpXrg33S4skTZmZGYqrUfVk0AA3ly', '2019-08-16 14:49:50'),
(15, 'john', '$2y$11$0043177f2795923ed140duMcJxMVC7874qGhGJnVFF33PGfwvZooa', '2019-08-16 16:15:01'),
(16, 'DOE', '$2y$11$196542cdd5b19f6967332u/74KMUhyQY4Sf.TNbMwHx1LAs43RYYO', '2019-08-16 16:15:49'),
(17, 'dodo', '$2y$11$8f9307acc2aa310dcef71uc/MurjAU/G1dbQnoVdnxDEYQN64CDhC', '2019-08-16 16:16:54'),
(18, 'jone', '$2y$11$022d52c8fdb171375410dubswghA.UFdQSy9PctuBNRxsK3kHrq3S', '2019-08-16 16:25:32'),
(19, 'dd', '$2y$11$8071e6a8426df85288432u/bY8FnF1ejpAJEdFuSc4Saq8PMcZXfK', '2019-08-16 16:26:11'),
(20, 'Papou', '$2y$11$3ae559bfbf7234bc563a7uvzad3oZ7bU92kWe5ZkAFNsWqytI4t8u', '2019-08-16 20:55:33');

-- --------------------------------------------------------

--
-- Structure de la table `ratio`
--

DROP TABLE IF EXISTS `ratio`;
CREATE TABLE IF NOT EXISTS `ratio` (
  `id` int(11) NOT NULL,
  `victoire` smallint(6) NOT NULL DEFAULT '0',
  `defaite` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ratio`
--

INSERT INTO `ratio` (`id`, `victoire`, `defaite`) VALUES
(7, 15, 22016),
(8, 9, 0),
(12, 0, 0),
(14, 1, 0),
(15, 0, 0),
(16, 0, 0),
(17, 0, 0),
(18, 0, 0),
(19, 0, 0),
(20, 1, 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ratio`
--
ALTER TABLE `ratio`
  ADD CONSTRAINT `ratio_ibfk_1` FOREIGN KEY (`id`) REFERENCES `membre` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
