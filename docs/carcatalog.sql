-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 16. 13:29
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `carcatalog`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `vehicle` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `color` varchar(191) NOT NULL,
  `fuel` varchar(191) NOT NULL,
  `manufacturer` varchar(191) NOT NULL,
  `mass` int(11) NOT NULL,
  `imageUrl` varchar(191) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(191) NOT NULL,
  `yearMade` int(11) NOT NULL,
  `horsePower` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `cars`
--

INSERT INTO `cars` (`id`, `vehicle`, `type`, `color`, `fuel`, `manufacturer`, `mass`, `imageUrl`, `price`, `description`, `yearMade`, `horsePower`) VALUES
(1, 'Model S', 'Sedan', 'Red', 'Electric', 'Tesla', 2000, '/uploads/tesla.jpg', 79999, 'Luxury electric sedan with autopilot. Price: $79,999.', 2023, 670),
(5, 'Camry', 'Sedan', 'White', 'Hybrid', 'Toyota', 1600, '/uploads/toyota_camry.jpg', 32000, 'Comfortable and fuel-efficient sedan. Price: $32,000.', 2022, 208),
(6, 'Accord', 'Sedan', 'Gray', 'Gasoline', 'Honda', 1500, '/uploads/honda_accord.jpg', 35000, 'Spacious mid-size sedan with great features. Price: $35,000.', 2023, 252),
(7, 'Rav4', 'SUV', 'Blue', 'Hybrid', 'Toyota', 1700, '/uploads/toyota_rav4.jpg', 38000, 'Popular compact SUV with hybrid option. Price: $38,000.', 2023, 219),
(8, 'Corvette', 'Sports', 'Red', 'Gasoline', 'Chevrolet', 1600, '/uploads/chevrolet_corvette.jpg', 70000, 'High-performance American sports car. Price: $70,000.', 2023, 670),
(9, 'Cherokee', 'SUV', 'Black', 'Diesel', 'Jeep', 1800, '/uploads/jeep_cherokee.jpg', 40000, 'Off-road capable mid-size SUV. Price: $40,000.', 2022, 271),
(10, 'Cayenne', 'SUV', 'White', 'Gasoline', 'Porsche', 2000, '/uploads/porsche_cayenne.jpg', 90000, 'Luxury performance SUV. Price: $90,000.', 2023, 541),
(11, 'X5', 'SUV', 'Silver', 'Gasoline', 'BMW', 2100, '/uploads/bmw_x5.jpg', 85000, 'Premium mid-size luxury SUV. Price: $85,000.', 2023, 523),
(12, 'A4', 'Sedan', 'Black', 'Gasoline', 'Audi', 1600, '/uploads/audi_a4.jpg', 40000, 'Luxury compact sedan with modern features. Price: $40,000.', 2022, 201),
(13, 'Prius', 'Hatchback', 'Green', 'Hybrid', 'Toyota', 1400, '/uploads/toyota_prius.jpg', 27000, 'Highly efficient hybrid vehicle. Price: $27,000.', 2023, 121),
(14, 'Challenger', 'Coupe', 'Orange', 'Gasoline', 'Dodge', 1800, '/uploads/dodge_challenger.jpg', 60000, 'Powerful muscle car with aggressive styling. Price: $60,000.', 2023, 717),
(15, 'Defender', 'SUV', 'Green', 'Diesel', 'Land Rover', 2200, '/uploads/landrover_defender.jpg', 75000, 'Rugged off-road capable luxury SUV. Price: $75,000.', 2023, 395),
(16, 'Taycan', 'Sedan', 'Blue', 'Electric', 'Porsche', 2050, '/uploads/porsche_taycan.jpg', 110000, 'High-performance electric luxury sedan. Price: $110,000.', 2023, 750),
(17, 'Bronco', 'SUV', 'Green', 'Gasoline', 'Ford', 2000, '/uploads/ford_bronco.jpg', 45000, 'Off-road capable adventure SUV. Price: $45,000.', 2023, 300),
(18, 'Macan', 'SUV', 'White', 'Gasoline', 'Porsche', 1900, '/uploads/porsche_macan.jpg', 60000, 'Sporty compact luxury SUV. Price: $60,000.', 2023, 375),
(19, 'G70', 'Sedan', 'Red', 'Gasoline', 'Genesis', 1700, '/uploads/genesis_g70.jpg', 42000, 'Luxury sports sedan with sleek design. Price: $42,000.', 2023, 365),
(20, 'Grand Cherokee', 'SUV', 'Black', 'Hybrid', 'Jeep', 2300, '/uploads/jeep_grandcherokee.jpg', 58000, 'Spacious hybrid off-road SUV. Price: $58,000.', 2023, 375),
(21, 'Ioniq 5', 'SUV', 'Silver', 'Electric', 'Hyundai', 1800, '/uploads/hyundai_ioniq5.jpg', 48000, 'Futuristic electric crossover SUV. Price: $48,000.', 2023, 320),
(22, 'Lucid Air', 'Sedan', 'White', 'Electric', 'Lucid Motors', 1950, '/uploads/lucid_air.jpg', 120000, 'Luxury EV with an impressive range. Price: $120,000.', 2023, 1111),
(23, 'Levante', 'SUV', 'Gray', 'Gasoline', 'Maserati', 2100, '/uploads/maserati_levante.jpg', 88000, 'Exotic Italian luxury SUV. Price: $88,000.', 2023, 550),
(24, 'GR Supra', 'Coupe', 'Yellow', 'Gasoline', 'Toyota', 1500, '/uploads/toyota_supra.jpg', 55000, 'Iconic Japanese sports car reborn. Price: $55,000.', 2023, 382),
(25, 'EQB', 'SUV', 'Blue', 'Electric', 'Mercedes-Benz', 1900, '/uploads/mercedes_eqb.jpg', 58000, 'Electric compact SUV with premium comfort. Price: $58,000.', 2023, 288),
(26, 'Stinger', 'Sedan', 'Red', 'Gasoline', 'Kia', 1750, '/uploads/kia_stinger.jpg', 51000, 'Performance-focused luxury sports sedan. Price: $51,000.', 2023, 368),
(27, 'XC90', 'SUV', 'Black', 'Hybrid', 'Volvo', 2200, '/uploads/volvo_xc90.jpg', 72000, 'Spacious, safe, and premium hybrid SUV. Price: $72,000.', 2023, 455),
(28, 'Ranger Raptor', 'Truck', 'Orange', 'Gasoline', 'Ford', 2400, '/uploads/ford_ranger_raptor.jpg', 58000, 'High-performance off-road pickup. Price: $58,000.', 2023, 405),
(29, 'e-Tron GT', 'Sedan', 'Gray', 'Electric', 'Audi', 2100, '/uploads/audi_etron_gt.jpg', 104000, 'Sleek and powerful electric grand tourer. Price: $104,000.', 2023, 637),
(30, 'Cybertruck', 'Truck', 'Silver', 'Electric', 'Tesla', 3000, '/uploads/tesla_cybertruck.jpg', 69999, 'Futuristic electric pickup with armored glass. Price: $69,999.', 2024, 800),
(37, 'Model S', 'Sedan', 'Red', 'Electric', 'Tesla', 2000, '/uploads/tesla.jpg', 79999, 'Luxury electric sedan with autopilot. Price: $79,999.', 2023, 670),
(38, 'Civic', 'Sedan', 'Blue', 'Gasoline', 'Honda', 1400, '/uploads/civic.jpg', 25000, 'Reliable and fuel-efficient compact car. Price: $25,000.', 2022, 158),
(39, 'F-150', 'Truck', 'Black', 'Gasoline', 'Ford', 2500, '/uploads/ford_f150.jpg', 45000, 'Best-selling pickup truck in the US. Price: $45,000.', 2023, 400),
(40, 'Mustang', 'Coupe', 'Yellow', 'Gasoline', 'Ford', 1700, '/uploads/ford_mustang.jpg', 55000, 'American muscle car with high performance. Price: $55,000.', 2023, 480),
(41, 'Camry', 'Sedan', 'White', 'Hybrid', 'Toyota', 1600, '/uploads/toyota_camry.jpg', 32000, 'Comfortable and fuel-efficient sedan. Price: $32,000.', 2022, 208),
(42, 'Accord', 'Sedan', 'Gray', 'Gasoline', 'Honda', 1500, '/uploads/honda_accord.jpg', 35000, 'Spacious mid-size sedan with great features. Price: $35,000.', 2023, 252),
(43, 'Rav4', 'SUV', 'Blue', 'Hybrid', 'Toyota', 1700, '/uploads/toyota_rav4.jpg', 38000, 'Popular compact SUV with hybrid option. Price: $38,000.', 2023, 219),
(44, 'Corvette', 'Sports', 'Red', 'Gasoline', 'Chevrolet', 1600, '/uploads/chevrolet_corvette.jpg', 70000, 'High-performance American sports car. Price: $70,000.', 2023, 670),
(45, 'Cherokee', 'SUV', 'Black', 'Diesel', 'Jeep', 1800, '/uploads/jeep_cherokee.jpg', 40000, 'Off-road capable mid-size SUV. Price: $40,000.', 2022, 271),
(46, 'Cayenne', 'SUV', 'White', 'Gasoline', 'Porsche', 2000, '/uploads/porsche_cayenne.jpg', 90000, 'Luxury performance SUV. Price: $90,000.', 2023, 541),
(47, 'X5', 'SUV', 'Silver', 'Gasoline', 'BMW', 2100, '/uploads/bmw_x5.jpg', 85000, 'Premium mid-size luxury SUV. Price: $85,000.', 2023, 523),
(48, 'A4', 'Sedan', 'Black', 'Gasoline', 'Audi', 1600, '/uploads/audi_a4.jpg', 40000, 'Luxury compact sedan with modern features. Price: $40,000.', 2022, 201),
(49, 'Prius', 'Hatchback', 'Green', 'Hybrid', 'Toyota', 1400, '/uploads/toyota_prius.jpg', 27000, 'Highly efficient hybrid vehicle. Price: $27,000.', 2023, 121),
(50, 'Challenger', 'Coupe', 'Orange', 'Gasoline', 'Dodge', 1800, '/uploads/dodge_challenger.jpg', 60000, 'Powerful muscle car with aggressive styling. Price: $60,000.', 2023, 717),
(51, 'Defender', 'SUV', 'Green', 'Diesel', 'Land Rover', 2200, '/uploads/landrover_defender.jpg', 75000, 'Rugged off-road capable luxury SUV. Price: $75,000.', 2023, 395),
(52, 'Taycan', 'Sedan', 'Blue', 'Electric', 'Porsche', 2050, '/uploads/porsche_taycan.jpg', 110000, 'High-performance electric luxury sedan. Price: $110,000.', 2023, 750),
(53, 'Bronco', 'SUV', 'Green', 'Gasoline', 'Ford', 2000, '/uploads/ford_bronco.jpg', 45000, 'Off-road capable adventure SUV. Price: $45,000.', 2023, 300),
(54, 'Macan', 'SUV', 'White', 'Gasoline', 'Porsche', 1900, '/uploads/porsche_macan.jpg', 60000, 'Sporty compact luxury SUV. Price: $60,000.', 2023, 375),
(55, 'G70', 'Sedan', 'Red', 'Gasoline', 'Genesis', 1700, '/uploads/genesis_g70.jpg', 42000, 'Luxury sports sedan with sleek design. Price: $42,000.', 2023, 365),
(56, 'Grand Cherokee', 'SUV', 'Black', 'Hybrid', 'Jeep', 2300, '/uploads/jeep_grandcherokee.jpg', 58000, 'Spacious hybrid off-road SUV. Price: $58,000.', 2023, 375),
(57, 'Ioniq 5', 'SUV', 'Silver', 'Electric', 'Hyundai', 1800, '/uploads/hyundai_ioniq5.jpg', 48000, 'Futuristic electric crossover SUV. Price: $48,000.', 2023, 320),
(58, 'Lucid Air', 'Sedan', 'White', 'Electric', 'Lucid Motors', 1950, '/uploads/lucid_air.jpg', 120000, 'Luxury EV with an impressive range. Price: $120,000.', 2023, 1111),
(59, 'Levante', 'SUV', 'Gray', 'Gasoline', 'Maserati', 2100, '/uploads/maserati_levante.jpg', 88000, 'Exotic Italian luxury SUV. Price: $88,000.', 2023, 550),
(60, 'GR Supra', 'Coupe', 'Yellow', 'Gasoline', 'Toyota', 1500, '/uploads/toyota_supra.jpg', 55000, 'Iconic Japanese sports car reborn. Price: $55,000.', 2023, 382),
(61, 'EQB', 'SUV', 'Blue', 'Electric', 'Mercedes-Benz', 1900, '/uploads/mercedes_eqb.jpg', 58000, 'Electric compact SUV with premium comfort. Price: $58,000.', 2023, 288),
(62, 'Stinger', 'Sedan', 'Red', 'Gasoline', 'Kia', 1750, '/uploads/kia_stinger.jpg', 51000, 'Performance-focused luxury sports sedan. Price: $51,000.', 2023, 368),
(63, 'XC90', 'SUV', 'Black', 'Hybrid', 'Volvo', 2200, '/uploads/volvo_xc90.jpg', 72000, 'Spacious, safe, and premium hybrid SUV. Price: $72,000.', 2023, 455),
(64, 'Ranger Raptor', 'Truck', 'Orange', 'Gasoline', 'Ford', 2400, '/uploads/ford_ranger_raptor.jpg', 58000, 'High-performance off-road pickup. Price: $58,000.', 2023, 405),
(65, 'e-Tron GT', 'Sedan', 'Gray', 'Electric', 'Audi', 2100, '/uploads/audi_etron_gt.jpg', 104000, 'Sleek and powerful electric grand tourer. Price: $104,000.', 2023, 637),
(66, 'Cybertruck', 'Truck', 'Silver', 'Electric', 'Tesla', 3000, '/uploads/tesla_cybertruck.jpg', 69999, 'Futuristic electric pickup with armored glass. Price: $69,999.', 2024, 800),
(67, 'R1T', 'Truck', 'Blue', 'Electric', 'Rivian', 2700, '/uploads/rivian_r1t.jpg', 85000, 'Adventure-ready electric pickup truck. Price: $85,000.', 2024, 835),
(68, 'Emira', 'Coupe', 'Green', 'Gasoline', 'Lotus', 1400, '/uploads/lotus_emira.jpg', 96000, 'Lightweight sports car with superb handling. Price: $96,000.', 2023, 400),
(69, 'Polestar 3', 'SUV', 'Silver', 'Electric', 'Polestar', 2300, '/uploads/polestar_3.jpg', 83900, 'Futuristic electric luxury SUV. Price: $83,900.', 2024, 489),
(70, 'Purosangue', 'SUV', 'Red', 'Gasoline', 'Ferrari', 2033, '/uploads/ferrari_purosangue.jpg', 400000, 'Ferrari’s first luxury SUV. Price: $400,000.', 2023, 715),
(71, 'Lucid Gravity', 'SUV', 'Black', 'Electric', 'Lucid Motors', 2300, '/uploads/lucid_gravity.jpg', 120000, 'High-performance electric luxury SUV. Price: $120,000.', 2024, 800),
(72, 'E-Type', 'Coupe', 'British Racing Green', 'Gasoline', 'Jaguar', 1250, '/uploads/jaguar_etype.jpg', 250000, 'Timeless British sports car. Price: $250,000.', 1965, 265),
(73, 'Bel Air', 'Sedan', 'Red/White', 'Gasoline', 'Chevrolet', 1600, '/uploads/chevrolet_belair.jpg', 90000, 'Classic American beauty from the 50s. Price: $90,000.', 1957, 283),
(74, 'GT40', 'Coupe', 'White/Blue Stripes', 'Gasoline', 'Ford', 980, '/uploads/ford_gt40.jpg', 1000000, 'Legendary Le Mans-winning race car. Price: $10,000,000.', 1968, 485),
(75, '300SL Gullwing', 'Coupe', 'Silver', 'Gasoline', 'Mercedes-Benz', 1295, '/uploads/mercedes_300sl.jpg', 1400000, 'Iconic luxury coupe with gullwing doors. Price: $1,400,000.', 1955, 240),
(76, '356 Speedster', 'Convertible', 'Light Blue', 'Gasoline', 'Porsche', 760, '/uploads/porsche_356.jpg', 450000, 'Elegant and lightweight classic Porsche. Price: $450,000.', 1956, 95),
(77, '911 Turbo S', 'Coupe', 'Yellow', 'Gasoline', 'Porsche', 1640, '/uploads/porsche_911_turbo_s.jpg', 210000, 'Super fast and luxurious sports coupe. Price: $210,000.', 2024, 640),
(78, 'Huracán Evo', 'Coupe', 'Orange', 'Gasoline', 'Lamborghini', 1422, '/uploads/lamborghini_huracan.jpg', 265000, 'Exotic Italian supercar with a V10. Price: $265,000.', 2023, 631),
(79, 'SF90 Stradale', 'Coupe', 'Rosso Corsa', 'Hybrid', 'Ferrari', 1570, '/uploads/ferrari_sf90.jpg', 507000, 'Hybrid supercar with extreme performance. Price: $507,000.', 2024, 986),
(80, 'GT-R Nismo', 'Coupe', 'White', 'Gasoline', 'Nissan', 1720, '/uploads/nissan_gtr_nismo.jpg', 220000, 'Japanese performance legend. Price: $220,000.', 2023, 600),
(81, 'Aston Martin Valkyrie', 'Coupe', 'Dark Green', 'Hybrid', 'Aston Martin', 1030, '/uploads/aston_martin_valkyrie.jpg', 3000000, 'Hypercar built with F1 technology. Price: $3,000,000.', 2024, 1160),
(82, 'Model S', 'Sedan', 'Red', 'Electric', 'Tesla', 2159, '/uploads/tesla.jpg', 74999, 'Luxury electric sedan with autopilot. Price: $74,999.', 2023, 670),
(83, 'Civic', 'Sedan', 'Blue', 'Gasoline', 'Honda', 1400, '/uploads/civic.jpg', 25000, 'Reliable and fuel-efficient compact car. Price: $25,000.', 2022, 158),
(84, 'F-150', 'Truck', 'Black', 'Gasoline', 'Ford', 2500, '/uploads/ford_f150.jpg', 45000, 'Best-selling pickup truck in the US. Price: $45,000.', 2023, 400),
(85, 'Mustang', 'Coupe', 'Yellow', 'Gasoline', 'Ford', 1700, '/uploads/ford_mustang.jpg', 55000, 'American muscle car with high performance. Price: $55,000.', 2023, 480),
(86, 'Camry', 'Sedan', 'White', 'Hybrid', 'Toyota', 1600, '/uploads/toyota_camry.jpg', 32000, 'Comfortable and fuel-efficient sedan. Price: $32,000.', 2022, 208),
(87, 'Accord', 'Sedan', 'Gray', 'Gasoline', 'Honda', 1500, '/uploads/honda_accord.jpg', 35000, 'Spacious mid-size sedan with great features. Price: $35,000.', 2023, 252),
(88, 'Rav4', 'SUV', 'Blue', 'Hybrid', 'Toyota', 1700, '/uploads/toyota_rav4.jpg', 38000, 'Popular compact SUV with hybrid option. Price: $38,000.', 2023, 219),
(89, 'Corvette', 'Sports', 'Red', 'Gasoline', 'Chevrolet', 1600, '/uploads/chevrolet_corvette.jpg', 70000, 'High-performance American sports car. Price: $70,000.', 2023, 670),
(90, 'Cherokee', 'SUV', 'Black', 'Diesel', 'Jeep', 1800, '/uploads/jeep_cherokee.jpg', 40000, 'Off-road capable mid-size SUV. Price: $40,000.', 2022, 271),
(91, 'Cayenne', 'SUV', 'White', 'Gasoline', 'Porsche', 2000, '/uploads/porsche_cayenne.jpg', 90000, 'Luxury performance SUV. Price: $90,000.', 2023, 541),
(92, 'X5', 'SUV', 'White', 'Gasoline', 'BMW', 2100, '/uploads/bmw_x5.jpg', 85000, 'Premium mid-size luxury SUV. Price: $85,000.', 2023, 523),
(93, 'A4', 'Sedan', 'Black', 'Gasoline', 'Audi', 1600, '/uploads/audi_a4.jpg', 40000, 'Luxury compact sedan with modern features. Price: $40,000.', 2022, 201),
(94, 'Prius', 'Hatchback', 'Green', 'Hybrid', 'Toyota', 1400, '/uploads/toyota_prius.jpg', 27000, 'Highly efficient hybrid vehicle. Price: $27,000.', 2023, 121),
(95, 'Challenger', 'Coupe', 'Orange', 'Gasoline', 'Dodge', 1800, '/uploads/dodge_challenger.jpg', 60000, 'Powerful muscle car with aggressive styling. Price: $60,000.', 2023, 717),
(96, 'Defender', 'SUV', 'Gray', 'Diesel', 'Land Rover', 2200, '/uploads/landrover_defender.jpg', 75000, 'Rugged off-road capable luxury SUV. Price: $75,000.', 2023, 395),
(97, 'Taycan', 'Sedan', 'White', 'Electric', 'Porsche', 2050, '/uploads/porsche_taycan.jpg', 110000, 'High-performance electric luxury sedan. Price: $110,000.', 2023, 750),
(98, 'Bronco', 'SUV', 'Green', 'Gasoline', 'Ford', 2000, '/uploads/ford_bronco.jpg', 45000, 'Off-road capable adventure SUV. Price: $45,000.', 2023, 300),
(99, 'Macan', 'SUV', 'White', 'Gasoline', 'Porsche', 1900, '/uploads/porsche_macan.jpg', 60000, 'Sporty compact luxury SUV. Price: $60,000.', 2023, 375),
(100, 'G70', 'Sedan', 'Black', 'Gasoline', 'Genesis', 1700, '/uploads/genesis_g70.jpg', 42000, 'Luxury sports sedan with sleek design. Price: $42,000.', 2023, 365),
(101, 'Grand Cherokee', 'SUV', 'White', 'Hybrid', 'Jeep', 2300, '/uploads/jeep_grandcherokee.jpg', 58000, 'Spacious hybrid off-road SUV. Price: $58,000.', 2023, 375),
(102, 'Ioniq 5', 'SUV', 'Silver', 'Electric', 'Hyundai', 1800, '/uploads/hyundai_ioniq5.jpg', 48000, 'Futuristic electric crossover SUV. Price: $48,000.', 2023, 320),
(103, 'Lucid Air', 'Sedan', 'White', 'Electric', 'Lucid Motors', 1950, '/uploads/lucid_air.jpg', 120000, 'Luxury EV with an impressive range. Price: $120,000.', 2023, 1111),
(104, 'Levante', 'SUV', 'White', 'Gasoline', 'Maserati', 2100, '/uploads/maserati_levante.jpg', 88000, 'Exotic Italian luxury SUV. Price: $88,000.', 2023, 550),
(105, 'GR Supra', 'Coupe', 'Yellow', 'Gasoline', 'Toyota', 1500, '/uploads/toyota_supra.jpg', 55000, 'Iconic Japanese sports car reborn. Price: $55,000.', 2023, 382),
(106, 'EQB', 'SUV', 'Blue', 'Electric', 'Mercedes-Benz', 1900, '/uploads/mercedes_eqb.jpg', 58000, 'Electric compact SUV with premium comfort. Price: $58,000.', 2023, 288),
(107, 'Stinger', 'Sedan', 'Red', 'Gasoline', 'Kia', 1750, '/uploads/kia_stinger.jpg', 51000, 'Performance-focused luxury sports sedan. Price: $51,000.', 2023, 368),
(108, 'XC90', 'SUV', 'Black', 'Hybrid', 'Volvo', 2200, '/uploads/volvo_xc90.jpg', 72000, 'Spacious, safe, and premium hybrid SUV. Price: $72,000.', 2023, 455),
(109, 'Ranger Raptor', 'Truck', 'Orange', 'Gasoline', 'Ford', 2400, '/uploads/ford_ranger_raptor.jpg', 58000, 'High-performance off-road pickup. Price: $58,000.', 2023, 405),
(110, 'e-Tron GT', 'Sedan', 'Gray', 'Electric', 'Audi', 2100, '/uploads/audi_etron_gt.jpg', 104000, 'Sleek and powerful electric grand tourer. Price: $104,000.', 2023, 637),
(111, 'Cybertruck', 'Truck', 'Silver', 'Electric', 'Tesla', 3000, '/uploads/tesla_cybertruck.jpg', 69999, 'Futuristic electric pickup with armored glass. Price: $69,999.', 2024, 800),
(112, 'R1T', 'Truck', 'Blue', 'Electric', 'Rivian', 2700, '/uploads/rivian_r1t.jpg', 85000, 'Adventure-ready electric pickup truck. Price: $85,000.', 2024, 835),
(113, 'Emira', 'Coupe', 'Green', 'Gasoline', 'Lotus', 1400, '/uploads/lotus_emira.jpg', 96000, 'Lightweight sports car with superb handling. Price: $96,000.', 2023, 400),
(114, 'Polestar 3', 'SUV', 'White', 'Electric', 'Polestar', 2300, '/uploads/polestar_3.jpg', 83900, 'Futuristic electric luxury SUV. Price: $83,900.', 2024, 489),
(115, 'Purosangue', 'SUV', 'Red', 'Gasoline', 'Ferrari', 2033, '/uploads/ferrari_purosangue.jpg', 400000, 'Ferrari’s first luxury SUV. Price: $400,000.', 2023, 715),
(116, 'Lucid Gravity', 'SUV', 'Gray', 'Electric', 'Lucid Motors', 2300, '/uploads/lucid_gravity.jpg', 120000, 'High-performance electric luxury SUV. Price: $120,000.', 2024, 800),
(117, 'E-Type', 'Coupe', 'British Racing Green', 'Gasoline', 'Jaguar', 1250, '/uploads/jaguar_etype.jpg', 250000, 'Timeless British sports car. Price: $250,000.', 1965, 265),
(118, 'Bel Air', 'Sedan', 'Red/White', 'Gasoline', 'Chevrolet', 1497, '/uploads/chevrolet_belair.jpg', 2400, 'Classic American beauty from the 50s. Price: $2,400.', 1957, 185),
(119, 'GT40', 'Coupe', 'White/Blue Stripes', 'Gasoline', 'Ford', 980, '/uploads/ford_gt40.jpg', 10000000, 'Legendary Le Mans-winning race car. Price: $10,000,000.', 1968, 485),
(120, '300SL Gullwing', 'Coupe', 'Silver', 'Gasoline', 'Mercedes-Benz', 1295, '/uploads/mercedes_300sl.jpg', 1400000, 'Iconic luxury coupe with gullwing doors. Price: $1,400,000.', 1955, 240),
(121, '356 Speedster', 'Convertible', 'Light Blue', 'Gasoline', 'Porsche', 760, '/uploads/porsche_356.jpg', 450000, 'Elegant and lightweight classic Porsche. Price: $450,000.', 1956, 95),
(122, '911 Turbo S', 'Coupe', 'Yellow', 'Gasoline', 'Porsche', 1640, '/uploads/porsche_911_turbo_s.jpg', 210000, 'Super fast and luxurious sports coupe. Price: $210,000.', 2024, 640),
(123, 'Huracán Evo', 'Coupe', 'Orange', 'Gasoline', 'Lamborghini', 1422, '/uploads/lamborghini_huracan.jpg', 265000, 'Exotic Italian supercar with a V10. Price: $265,000.', 2023, 631),
(124, 'SF90 Stradale', 'Coupe', 'Rosso Corsa', 'Hybrid', 'Ferrari', 1570, '/uploads/ferrari_sf90.jpg', 507000, 'Hybrid supercar with extreme performance. Price: $507,000.', 2024, 986),
(125, 'GT-R Nismo', 'Coupe', 'White', 'Gasoline', 'Nissan', 1720, '/uploads/nissan_gtr_nismo.jpg', 220000, 'Japanese performance legend. Price: $220,000.', 2023, 600),
(126, 'Aston Martin Valkyrie', 'Coupe', 'Dark Green', 'Hybrid', 'Aston Martin', 1030, '/uploads/aston_martin_valkyrie.jpg', 3000000, 'Hypercar built with F1 technology. Price: $3,000,000.', 2024, 1160);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `text` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `userId` int(11) NOT NULL,
  `carId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `comment`
--

INSERT INTO `comment` (`id`, `text`, `createdAt`, `userId`, `carId`) VALUES
(4, 'nagyon vacak ez a kocsi', '2025-04-12 12:32:15.113', 1, 1),
(5, 'bomba kocsi', '2025-04-12 12:32:28.255', 1, 1),
(6, 'jo', '2025-04-15 22:11:20.576', 1, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `favorite`
--

INSERT INTO `favorite` (`id`, `userId`, `carId`, `createdAt`) VALUES
(2, 1, 1, '2025-04-11 19:50:57.530'),
(3, 1, 5, '2025-04-11 19:53:33.742'),
(6, 2, 78, '2025-04-12 12:28:27.635'),
(7, 2, 73, '2025-04-12 12:28:33.708'),
(9, 3, 5, '2025-04-12 16:19:21.211');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `token`
--

CREATE TABLE `token` (
  `token` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `token`
--

INSERT INTO `token` (`token`, `userId`) VALUES
('0ce937a233bee846fa1a74cafb9c800dc78dc6bcd190a1a813923e385dc1dd8005049a8937f70d36fbb226bff853b13164585be9ee0bc4285a514668a6b35909', 1),
('427ebda4455fb317a3f2a16274ec69000cd2e77f4ba2c6831bb89af88d8041dee96b1cbcdf5dff1ad65f70e357c3be91a01c48dd1e4d96fc982f18739caef7dc', 1),
('697463ff9713c83055c7bc6c37667bd437b68bbe0e8416932e54f0a9e5e13c9bf30fe181b04fa24e02546e18f6ba27d52e5afd2ae64902ce3ddade6e98017ffe', 1),
('7cfe018e844c558f9b74a682214690b78b0086c9911c319fb7660f706af7579600b10b65878a922aa4fbc65d483ea206c82ee1a226695d8e0abb3790e7674329', 1),
('b74be8c4428a294e9b39de1ed0c12806afa225084bdf46e1ce53461578b917ec7fa7ef7d4a0e45a540a231284803cf4bcce9b39e8742ccc77d9fc24b05f32678', 1),
('c2db122e5392e87124043ee91f31be16d97921cc31fcc2a7b8c3b517af9f3b491a28bc18cddaad578c69430f3ad5d509f42fe2fa61c0144f404f6866088ecfd0', 1),
('73cb73539ee50e6b6d8f0ee450d14d3e17d2dd7ea00e29bc680bcdf7d17f56934c0237513fde2498e4d55a835d3ce7a72c55812df34c066fba75aa4e11e9399a', 2),
('cd10582e3234eb7edd0ddf0258c04028e8a9ee660a69a4f71a9dfb85db0d5b2c85c7fa79c8f16d930304637be2d4de8222b8d1e793e54df8b3a015b74aefd353', 2),
('ec599d03ab065f1299073c7a283f25b1ade431d176ffb85f8b97459aa893d741a94d1afd682b26cce98aaf8b3b01231583910c0d7fa4146e142c691957eb752a', 2),
('5845feeff5343bf0758399da4bb770ec8a76a5db286c09a82fafacf0578ca4a424bdd88278eed003113ab457c785451b206faa4421e49fc0c0afe37e01ffbb5a', 3),
('e82533f6b914ddff8d3352857e71247b62107cc03b5bd3e799314fa419d58b0ddeb05c61e7d4ba980d29639bb84d8763714235dcc9ff19c860b1e3a6b1ab0e26', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`) VALUES
(1, 'admin2@admin2.com', '$argon2id$v=19$m=65536,t=3,p=4$f+EgyQVnITjbgx9HibkoNA$BLCa6q8ufZTIWYPMidhg6KH8PDKiUWwOqNBR9ewZsHc', 'ADMIN'),
(2, 'Teszt123@Teszt.com', '$argon2id$v=19$m=65536,t=3,p=4$kCNLZTYJ3Fo6jCm5gMY1Rg$LPmtIwUvUoEApoX+hI3omq4ndnopdBxXEzPvbLarBvU', 'USER'),
(3, 'newuser@example.com', '$argon2id$v=19$m=65536,t=3,p=4$cODSSt+Bq2AKvKLO4FpZHA$Lo40eyH0YavSEWb4YSOirBDtn81WftkleesfswHls5Q', 'USER');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Comment_userId_fkey` (`userId`),
  ADD KEY `Comment_carId_fkey` (`carId`);

--
-- A tábla indexei `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Favorite_userId_carId_key` (`userId`,`carId`),
  ADD KEY `Favorite_carId_fkey` (`carId`);

--
-- A tábla indexei `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`token`),
  ADD KEY `Token_userId_fkey` (`userId`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- A tábla indexei `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT a táblához `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `Comment_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `Favorite_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
