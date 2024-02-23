-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2021 at 12:31 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(600) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `isAdmin`) VALUES
(7, 'abdo', 'skout', 'Rojer', '7cbfb8101d47452bdc58288d2d69db795a06e8a008c579bedea2003a1232a757d6a44bc4ee998c0fad4f2d6fac5113f8cb3bb61e5c6729013cd376617478b72c', 0),
(10, 'admin', 'admin', 'admin', '46e7f1cb50e90ba908cbd384f70a8dd67c38e88eed5d14dfa1cfed1aab466669a3dd275ce946d6fee15963f1245d122fcdcb5883569854deee65a0bd1ce5a377', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `price` double NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `imageName` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `price`, `start`, `end`, `imageName`) VALUES
(29, 'Want to see the best of London? We got you covered. But as you can expect from a Withlocals experience, the real excitement is its hidden gems. Join your favorite local and get a feeling of the city\'s real vibe on a tour that has it all, so you can say: I experienced the real London!', 'London', 99, '2021-09-17', '2021-09-24', 'e0013e8d-7455-45f0-8aa6-ee7b3905e34e.jpg'),
(30, 'Paris of the South?. Buenos Aires, Argentina’s bustling metropolis that will have you sighing over its Belle Époque architecture, cobblestone streets lined with adorable cafés and boutiques', 'Argentina ', 898, '2021-09-10', '2021-09-16', '9eb83c24-c76c-4dc9-b1fa-f34e388fb732.jpg'),
(31, 'Chile is nature on a colossal scale, and Chile is a land of contrasts. There is a lot of places to explore in this 12-day program in which you will experience different cultures and food.\n\n', 'Chile ', 1999, '2021-09-16', '2021-09-24', 'ef188b86-69aa-453a-8f81-7333cbe84d28.jpg'),
(32, 'Expo 2020 Dubai will host the world for 6 months, with each day brimming with new experiences.', 'Dubai ', 500, '2021-09-17', '2021-09-17', '5679eff4-ad29-41d7-802b-ec1ebbbccb27.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
