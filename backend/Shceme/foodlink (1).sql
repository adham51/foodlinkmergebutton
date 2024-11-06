-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2024 at 10:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodlink`
--

-- --------------------------------------------------------

--
-- Table structure for table `foodlist`
--

CREATE TABLE `foodlist` (
  `food_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `food_name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` text NOT NULL,
  `expiration_date` date NOT NULL,
  `status` enum('available','claimed','expired') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foodlist`
--

INSERT INTO `foodlist` (`food_id`, `user_id`, `food_name`, `quantity`, `description`, `expiration_date`, `status`, `created_at`) VALUES
(1, 1, 'Bread', 50, 'Fresh bread', '2024-10-05', 'claimed', '2024-10-03 04:01:20'),
(4, 2, 'فراخ', 30, 'Fresh kpap', '2024-10-06', 'claimed', '2024-10-03 16:00:19'),
(5, 4, 'كفته', 3, 'Fresh fresh', '2024-10-05', 'claimed', '2024-10-03 17:44:33'),
(6, 4, 'لحمه', 3, 'Fresh fresh', '2024-10-05', 'claimed', '2024-10-03 17:45:45'),
(7, 4, 'محشي', 5, 'Fresh fresh', '2024-10-05', 'claimed', '2024-10-03 19:04:38'),
(8, 4, 'كوراع', 5, 'Fresh fresh', '2024-10-05', 'available', '2024-10-03 19:04:52'),
(9, 4, 'ملوخيه', 5, 'Fresh fresh', '2024-10-05', 'claimed', '2024-10-03 19:05:04'),
(10, 4, 'فراخ مشويه', 5, 'Fresh fresh', '2024-10-05', 'available', '2024-10-03 19:07:04'),
(11, 4, 'كباب', 5, 'Fresh fresh', '2024-10-05', 'claimed', '2024-10-03 19:07:25'),
(12, 4, 'مندي', 5, 'Fresh fresh', '2024-10-05', 'available', '2024-10-03 21:38:20'),
(13, 4, 'كبسه', 5, 'Fresh fresh', '2024-10-05', 'available', '2024-10-03 21:38:29'),
(14, 4, 'ارز', 5, 'Fresh fresh', '2024-10-05', 'available', '2024-10-03 21:38:37'),
(15, 4, 'مكرونه', 5, 'Fresh fresh', '2024-10-05', 'claimed', '2024-10-03 21:38:46'),
(16, 2, 'كبده', 5, 'Fresh fresh', '2024-10-05', 'available', '2024-10-04 02:53:55'),
(17, 12, 'فول', 5, 'Fresh fresh', '2024-10-05', 'claimed', '2024-10-09 21:08:53');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `charity_id` int(11) NOT NULL,
  `requested_at` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','fulfilled','cancelled') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `food_id`, `charity_id`, `requested_at`, `status`) VALUES
(2, 1, 3, '2024-10-03 17:15:40', 'fulfilled'),
(3, 1, 3, '2024-10-03 17:34:57', 'fulfilled'),
(5, 1, 3, '2024-10-03 17:35:52', 'pending'),
(6, 5, 5, '2024-10-03 17:46:30', 'pending'),
(7, 6, 5, '2024-10-03 20:56:12', 'pending'),
(8, 11, 5, '2024-10-03 21:22:40', 'pending'),
(9, 9, 3, '2024-10-03 21:28:37', 'pending'),
(10, 7, 6, '2024-10-04 03:40:08', 'pending'),
(11, 15, 3, '2024-10-04 04:29:51', 'pending'),
(12, 17, 14, '2024-10-09 23:17:47', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('donor','charity') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `user_type`, `created_at`) VALUES
(1, 'Ali', 'mido@gmail.com', '$2b$07$CLIOlANRXDUSVI92y6zFN.e7vtm.BLdrQux9KYcNdJ9S6OcMIYxsu', 'donor', '2024-10-03 02:32:44'),
(2, 'Ahmed', 'mido@gmail.com', '$2b$07$Zq1ZhOr39HC1vbzMIAS85.NXDkR19clo3cKxUfRQ19915jytL.PqS', 'donor', '2024-10-03 03:49:42'),
(3, 'Ali', 'mido@gmail.com', '$2b$07$rqdbpLK7tGxgIvgr.YJscOVJTgYngwmImKggOOJc6GDj08FHltAV.', 'charity', '2024-10-03 03:50:13'),
(4, 'Ali', 'mido@gmail.com', '$2b$07$HYeSbZJfKxMMce/xd7YlH.DBd0xaEFO3sINkWFsmN7KzX9AiHnMPe', 'donor', '2024-10-03 17:42:54'),
(5, 'Ali', 'mido@gmail.com', '$2b$07$uZUhgqmYzw/PZKEt58PM4OZCN7x4WgrTvlpOIPHKN6hQ0sdkkILwy', 'charity', '2024-10-03 17:43:45'),
(6, 'Ali', 'mido@gmail.com', '$2b$07$OsYDAEZitPbBeHFPOfTIt.EjUwFUNPTrmLxmltzgS.IxlzNmPD012', 'charity', '2024-10-04 02:23:01'),
(7, 'mohamed', 'alofglll@gmail.com', '$2b$07$Jv3jVfAJ6V2E3kesDUZ4dOwHiYRiASrMtFxjYBLY5S89x7/M7IYDi', 'donor', '2024-10-06 01:53:59'),
(8, 'sophi kaper', 'sophi@gmial.com', '$2b$07$2HuI4c7YOYLjVJ84W2EtheC.NgxL2Skr0xan.msF17eTMtYXxC/qK', 'charity', '2024-10-06 01:56:05'),
(9, 'ali', 'john.doe@example.com', '$2b$07$xt9z50Li4Cv7FpYuvElm4eDdU5XY0FrYWyqXVJ6JG4tmHrCCl67de', 'donor', '2024-10-06 02:07:07'),
(10, 'Mohamed', 'm@gmail.com', '$2b$07$DTbBT5y1Ateiw5N10qfJXOHhHwBac3deamKcaTnoYLSYKpHQYn0wW', 'donor', '2024-10-06 02:13:55'),
(11, 'قصر الكبابجي', 'kasr@gmail.com', '$2b$07$MUDCRLBvF/LZloYMuAzY1OCCciqRD0hPX97Jbf8ckZXT1QtJ6un/a', 'charity', '2024-10-06 02:26:01'),
(12, 'kamal', 'kamal@gmail.com', '$2b$07$lHGAaGe76BllB8Q0IoBzV.WIjGFG1mrATwLXhxCUj74HOnVGUlLSG', 'donor', '2024-10-09 21:04:42'),
(13, 'adham', 'adham@gmail.com', '$2b$07$DO8NRUxOno2baI/XbeCAnOmgJ88ZkSkZKimDm4c.gRtUFbxEBGKpe', 'donor', '2024-10-09 23:14:51'),
(14, 'kaber', 'kaberr@gmail.com', '$2b$07$BxdwhejwY6pjq3PN2C7mhuTwihVfl6YV7Upu0eRABbtxBrnyyxkIu', 'charity', '2024-10-09 23:16:25'),
(15, 'tema', 'tema@gmail.com', '$2b$07$KKOEd2tMoGGzcsi4HioGRO.FLxE93uSQGD4m1WZx7yvnWTKeZhNri', 'charity', '2024-10-09 23:31:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `foodlist`
--
ALTER TABLE `foodlist`
  ADD PRIMARY KEY (`food_id`),
  ADD KEY `test` (`user_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `test2` (`charity_id`),
  ADD KEY `test3` (`food_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `foodlist`
--
ALTER TABLE `foodlist`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `foodlist`
--
ALTER TABLE `foodlist`
  ADD CONSTRAINT `test` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `test2` FOREIGN KEY (`charity_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `test3` FOREIGN KEY (`food_id`) REFERENCES `foodlist` (`food_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
