/*
Navicat MySQL Data Transfer

Source Server         : Local MySQl
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : jaknakavueu01

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2016-01-16 15:35:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `coffeedrinkprices`
-- ----------------------------
DROP TABLE IF EXISTS `coffeedrinkprices`;
CREATE TABLE `coffeedrinkprices` (
  `coffeeDrinkPrice_id` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(15,2) NOT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `drinkPortion_id` int(11) DEFAULT NULL,
  `quality` float DEFAULT NULL,
  `gift_image` text,
  PRIMARY KEY (`coffeeDrinkPrice_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coffeedrinkprices
-- ----------------------------
INSERT INTO `coffeedrinkprices` VALUES ('1', '20.00', '1', '1', '0.08', 'images/drink_price/1.gif');
INSERT INTO `coffeedrinkprices` VALUES ('2', '25.00', '1', '1', '0.07', 'images/drink_price/2.gif');
INSERT INTO `coffeedrinkprices` VALUES ('3', '30.00', '1', '1', '0.06', 'images/drink_price/3.gif');
INSERT INTO `coffeedrinkprices` VALUES ('4', '35.00', '1', '1', '0.05', 'images/drink_price/4.gif');
INSERT INTO `coffeedrinkprices` VALUES ('5', '40.00', '1', '1', '0.04', 'images/drink_price/5.gif');
INSERT INTO `coffeedrinkprices` VALUES ('6', '45.00', '1', '1', '0.03', 'images/drink_price/6.gif');
INSERT INTO `coffeedrinkprices` VALUES ('7', '50.00', '1', '1', '0.03', 'images/drink_price/7.gif');
INSERT INTO `coffeedrinkprices` VALUES ('8', '55.00', '1', '1', '0.02', 'images/drink_price/8.gif');
INSERT INTO `coffeedrinkprices` VALUES ('9', '60.00', '1', '1', '0.0095', 'images/drink_price/9.gif');

-- ----------------------------
-- Table structure for `coffeeemployees`
-- ----------------------------
DROP TABLE IF EXISTS `coffeeemployees`;
CREATE TABLE `coffeeemployees` (
  `coffeeEmployee_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `timePeriod_id` int(11) DEFAULT NULL,
  `translate_name` varchar(255) DEFAULT NULL,
  `quality` float DEFAULT NULL,
  `gift_image` text,
  PRIMARY KEY (`coffeeEmployee_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coffeeemployees
-- ----------------------------
INSERT INTO `coffeeemployees` VALUES ('1', 'Only you', '0.00', '1', '1', 'employees1', '6', 'images/employees/1.gif');
INSERT INTO `coffeeemployees` VALUES ('2', 'One part-time worker', '10000.00', '1', '1', 'employees2', '9', 'images/employees/2.gif');
INSERT INTO `coffeeemployees` VALUES ('3', 'Two part-time workers', '20000.00', '1', '1', 'employees3', '10', 'images/employees/3.gif');
INSERT INTO `coffeeemployees` VALUES ('4', 'Three part-time workers', '30000.00', '1', '1', 'employees4', '11', 'images/employees/4.gif');
INSERT INTO `coffeeemployees` VALUES ('5', 'One full-time worker', '38000.00', '1', '1', 'employees5', '12', 'images/employees/5.gif');
INSERT INTO `coffeeemployees` VALUES ('6', 'Two full-time workers', '76000.00', '1', '1', 'employees6', '14', 'images/employees/6.gif');
INSERT INTO `coffeeemployees` VALUES ('7', 'Two full-time workers, training, benefits and motivation', '96000.00', '1', '1', 'employees7', '16', 'images/employees/7.gif');
INSERT INTO `coffeeemployees` VALUES ('8', 'Three full-time workers', '114000.00', '1', '1', 'employees8', '18', 'images/employees/8.gif');
INSERT INTO `coffeeemployees` VALUES ('9', 'Three full-time workers, training, benefits and motivation', '144000.00', '1', '1', 'employees9', '20', 'images/employees/9.gif');
INSERT INTO `coffeeemployees` VALUES ('10', 'Your country`s Barista Champion + three full-time workers, training, benefits and motivation', '196000.00', '1', '1', 'employees10', '23', 'images/employees/10.gif');

-- ----------------------------
-- Table structure for `coffeegrinders`
-- ----------------------------
DROP TABLE IF EXISTS `coffeegrinders`;
CREATE TABLE `coffeegrinders` (
  `coffeeGrinder_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `translate_name` varchar(255) DEFAULT NULL,
  `quality` float DEFAULT NULL,
  `gift_image` text,
  PRIMARY KEY (`coffeeGrinder_id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coffeegrinders
-- ----------------------------
INSERT INTO `coffeegrinders` VALUES ('1', 'Marble mortar', '1000.00', '1', 'grinder1', '1', 'images/grinder/1.gif');
INSERT INTO `coffeegrinders` VALUES ('2', 'Noname blade grinder', '1200.00', '1', 'grinder2', '2', 'images/grinder/2.gif');
INSERT INTO `coffeegrinders` VALUES ('3', 'OE Lido, hand-powered', '3000.00', '1', 'grinder3', '9', 'images/grinder/3.gif');
INSERT INTO `coffeegrinders` VALUES ('11', 'Rancilio Rocky, 50 mm planar burrs', '7000.00', '1', 'grinder4', '12', 'images/grinder/4.gif');
INSERT INTO `coffeegrinders` VALUES ('12', 'Anfim KS-T, 50 mm planar burrs', '11000.00', '1', 'grinder5', '14', 'images/grinder/5.gif');
INSERT INTO `coffeegrinders` VALUES ('13', 'Mazzer Mini, x0 mm planar burrs, doser', '16000.00', '1', 'grinder6', '16', 'images/grinder/6.gif');
INSERT INTO `coffeegrinders` VALUES ('14', 'Anfim Super Caimano, 75 mm planar titanium burrs, doser', '25000.00', '1', 'grinder7', '18', 'images/grinder/7.gif');
INSERT INTO `coffeegrinders` VALUES ('15', ' Mahlkonig K30 Vario, 65 mm planar burrs, doserless', '48000.00', '1', 'grinder8', '19', 'images/grinder/8.gif');
INSERT INTO `coffeegrinders` VALUES ('16', 'Elektra Nino, 68 mm conical burrs, doserless', '68000.00', '1', 'grinder9', '23', 'images/grinder/9.gif');
INSERT INTO `coffeegrinders` VALUES ('17', 'Mazzer Robur E, 71 mm conical burrs, doserless', '75000.00', '1', 'grinder10', '25', 'images/grinder/10.gif');

-- ----------------------------
-- Table structure for `coffeemachines`
-- ----------------------------
DROP TABLE IF EXISTS `coffeemachines`;
CREATE TABLE `coffeemachines` (
  `coffeeMachine_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `translate_name` varchar(255) DEFAULT NULL,
  `quality` float DEFAULT NULL,
  `gift_image` text,
  PRIMARY KEY (`coffeeMachine_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coffeemachines
-- ----------------------------
INSERT INTO `coffeemachines` VALUES ('1', 'French press', '300.00', '1', 'machine1', '3', 'images/espresso_machine/1.gif');
INSERT INTO `coffeemachines` VALUES ('2', 'HX brew head, 1-group', '45000.00', '1', 'machine2', '8', 'images/espresso_machine/2.gif');
INSERT INTO `coffeemachines` VALUES ('3', 'E61 brew head, 1-group', '70000.00', '1', 'machine3', '10', 'images/espresso_machine/3.gif');
INSERT INTO `coffeemachines` VALUES ('4', 'Saturated brew head, 1-group', '120000.00', '1', 'machine4', '12', 'images/espresso_machine/4.gif');
INSERT INTO `coffeemachines` VALUES ('5', 'Saturated brew head, 1-group, double boilers', '145000.00', '1', 'machine5', '15', 'images/espresso_machine/5.gif');
INSERT INTO `coffeemachines` VALUES ('6', 'Saturated brew head, 1-group, double boilers, PID', '146000.00', '1', 'machine6', '11', 'images/espresso_machine/6.gif');
INSERT INTO `coffeemachines` VALUES ('7', 'Saturated brew head, 1-group, double boilers, PID, VST baskets and a naked portafilter', '147000.00', '1', 'machine7', '12', 'images/espresso_machine/7.gif');
INSERT INTO `coffeemachines` VALUES ('8', 'Saturated brew head, 1-group, with all the possible upgrades', '156000.00', '1', 'machine8', '13', 'images/espresso_machine/8.gif');
INSERT INTO `coffeemachines` VALUES ('9', '2-group, saturated brew heads, double boilers, PID, volumetrics, VST baskets and naked portafilters, preinfusion', '250000.00', '1', 'machine9', '14', 'images/espresso_machine/9.gif');
INSERT INTO `coffeemachines` VALUES ('10', '4-group, saturated brew heads, double boilers, PID, volumetrics, VST baskets and naked portafilters, preinfusion', '550000.00', '1', 'machine10', '15', 'images/espresso_machine/10.gif');

-- ----------------------------
-- Table structure for `coffeeplaces`
-- ----------------------------
DROP TABLE IF EXISTS `coffeeplaces`;
CREATE TABLE `coffeeplaces` (
  `coffeePlace_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `timePeriod_id` int(11) DEFAULT NULL,
  `translate_name` varchar(255) DEFAULT NULL,
  `quality` float DEFAULT NULL,
  `gift_image` text,
  PRIMARY KEY (`coffeePlace_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coffeeplaces
-- ----------------------------
INSERT INTO `coffeeplaces` VALUES ('1', 'Sufficient', '6000.00', '1', '1', 'place1', '2', 'images/place/1.gif');
INSERT INTO `coffeeplaces` VALUES ('2', 'Slightly better', '8000.00', '1', '1', 'place2', '3', 'images/place/2.gif');
INSERT INTO `coffeeplaces` VALUES ('3', 'Good', '14000.00', '1', '1', 'place3', '5', 'images/place/3.gif');
INSERT INTO `coffeeplaces` VALUES ('4', 'Great', '55000.00', '1', '1', 'place4', '8', 'images/place/4.gif');
INSERT INTO `coffeeplaces` VALUES ('5', 'Fantastic', '130000.00', '1', '1', 'place5', '10', 'images/place/5.gif');

-- ----------------------------
-- Table structure for `coffeetypes`
-- ----------------------------
DROP TABLE IF EXISTS `coffeetypes`;
CREATE TABLE `coffeetypes` (
  `coffeeType_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `weightMeasurement_id` int(11) DEFAULT NULL,
  `translate_name` varchar(255) DEFAULT NULL,
  `quality` float DEFAULT NULL,
  `gift_image` text,
  PRIMARY KEY (`coffeeType_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coffeetypes
-- ----------------------------
INSERT INTO `coffeetypes` VALUES ('1', '100% Robusta with unknown roasting date', '300.00', '1', '1', 'coffee1', '3', 'images/coffee/1.gif');
INSERT INTO `coffeetypes` VALUES ('2', '100% Robusta with unknown roasting date', '400.00', '1', '1', 'coffee2', '5', 'images/coffee/2.gif');
INSERT INTO `coffeetypes` VALUES ('3', '30/70 Robusta/Arabica blend with unknown roasting date', '450.00', '1', '1', 'coffee3', '7', 'images/coffee/3.gif');
INSERT INTO `coffeetypes` VALUES ('4', '10/90 Robusta/Arabica blend with unknown roasting date', '470.00', '1', '1', 'coffee4', '10', 'images/coffee/4.gif');
INSERT INTO `coffeetypes` VALUES ('5', '100% Arabica with unknown roasting date', '500.00', '1', '1', 'coffee5', '12', 'images/coffee/5.gif');
INSERT INTO `coffeetypes` VALUES ('6', 'Commodity grade Arabica, freshly roasted', '600.00', '1', '1', 'coffee6', '18', 'images/coffee/6.gif');
INSERT INTO `coffeetypes` VALUES ('7', 'Specialty coffee, freshly roasted', '700.00', '1', '1', 'coffee7', '23', 'images/coffee/7.gif');
INSERT INTO `coffeetypes` VALUES ('8', 'Micro lot, freshly roasted', '750.00', '1', '1', 'coffee8', '25', 'images/coffee/8.gif');
INSERT INTO `coffeetypes` VALUES ('9', 'Nano lot, freshly roasted', '800.00', '1', '1', 'coffee9', '27', 'images/coffee/9.gif');

-- ----------------------------
-- Table structure for `currencies`
-- ----------------------------
DROP TABLE IF EXISTS `currencies`;
CREATE TABLE `currencies` (
  `currency_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`currency_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of currencies
-- ----------------------------
INSERT INTO `currencies` VALUES ('1', 'coins');

-- ----------------------------
-- Table structure for `drinkportions`
-- ----------------------------
DROP TABLE IF EXISTS `drinkportions`;
CREATE TABLE `drinkportions` (
  `drinkPortion_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`drinkPortion_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of drinkportions
-- ----------------------------
INSERT INTO `drinkportions` VALUES ('1', 'cup');

-- ----------------------------
-- Table structure for `equipmenttypes`
-- ----------------------------
DROP TABLE IF EXISTS `equipmenttypes`;
CREATE TABLE `equipmenttypes` (
  `equipmentType_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`equipmentType_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of equipmenttypes
-- ----------------------------
INSERT INTO `equipmenttypes` VALUES ('1', 'coffeeGrinders');
INSERT INTO `equipmenttypes` VALUES ('2', 'coffeeMachines');
INSERT INTO `equipmenttypes` VALUES ('3', 'coffeePlaces');
INSERT INTO `equipmenttypes` VALUES ('4', 'coffeeTypes');
INSERT INTO `equipmenttypes` VALUES ('5', 'coffeeEmployees');
INSERT INTO `equipmenttypes` VALUES ('6', 'coffeeDrinkPrices');

-- ----------------------------
-- Table structure for `timeperiods`
-- ----------------------------
DROP TABLE IF EXISTS `timeperiods`;
CREATE TABLE `timeperiods` (
  `timePeriod_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`timePeriod_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of timeperiods
-- ----------------------------
INSERT INTO `timeperiods` VALUES ('1', 'month');

-- ----------------------------
-- Table structure for `userbalanceupdatetime`
-- ----------------------------
DROP TABLE IF EXISTS `userbalanceupdatetime`;
CREATE TABLE `userbalanceupdatetime` (
  `userBalanceUpdateTime_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`userBalanceUpdateTime_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userbalanceupdatetime
-- ----------------------------

-- ----------------------------
-- Table structure for `userequipment`
-- ----------------------------
DROP TABLE IF EXISTS `userequipment`;
CREATE TABLE `userequipment` (
  `userEquipment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `equipment_type_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userEquipment_id`)
) ENGINE=MyISAM AUTO_INCREMENT=400 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userequipment
-- ----------------------------
INSERT INTO `userequipment` VALUES ('399', '2', '1', '6', '2016-01-16 15:30:51');
INSERT INTO `userequipment` VALUES ('398', '2', '1', '4', '2016-01-16 15:30:50');
INSERT INTO `userequipment` VALUES ('397', '2', '1', '5', '2016-01-16 15:30:47');
INSERT INTO `userequipment` VALUES ('396', '2', '1', '3', '2016-01-16 15:30:46');
INSERT INTO `userequipment` VALUES ('395', '2', '1', '2', '2016-01-16 15:30:44');
INSERT INTO `userequipment` VALUES ('394', '2', '1', '1', '2016-01-16 15:30:58');

-- ----------------------------
-- Table structure for `usergametime`
-- ----------------------------
DROP TABLE IF EXISTS `usergametime`;
CREATE TABLE `usergametime` (
  `userGameTime_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL,
  `sessionId` varchar(500) NOT NULL,
  PRIMARY KEY (`userGameTime_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usergametime
-- ----------------------------

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cafeName` varchar(30) NOT NULL,
  `user_password` varchar(32) NOT NULL,
  `user_hash` varchar(32) NOT NULL,
  `user_ip` int(10) unsigned NOT NULL DEFAULT '0',
  `balance` float(8,2) NOT NULL DEFAULT '0.00',
  `is_play` tinyint(4) NOT NULL DEFAULT '0',
  `total_drink` float(8,0) NOT NULL DEFAULT '0',
  `customers_in_queue` float(8,0) NOT NULL DEFAULT '0',
  `total_coffe_kg` float(8,0) NOT NULL DEFAULT '0',
  `opened_months` float(8,0) NOT NULL DEFAULT '0',
  `buy_total_coffe_kg` double(8,4) NOT NULL DEFAULT '0.0000',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=cp1251;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Cafe1', '36759e3c012ba75562fe2e31d144c483', '', '0', '55000.00', '0', '0', '0', '0', '0', '0.0000');
INSERT INTO `users` VALUES ('2', 'Barry Lyndon', '39a664ecbd7d66ea6f075021cbb8117f', '28f3805e83a6409695d0c5805dcc7465', '0', '47380.00', '1', '0', '5', '0', '278', '0.0000');
INSERT INTO `users` VALUES ('3', 'illy', 'e08a7c49d96c2b475656cc8fe18cee8e', '6a25f15df607e95df221fd5902318031', '0', '55000.00', '0', '0', '0', '0', '0', '0.0000');
INSERT INTO `users` VALUES ('4', 'shopmania', '474e45c3f259290616d4189b25f71421', '25c6dcb26503d38c8167a49d45d6022a', '0', '55000.00', '0', '0', '0', '0', '0', '0.0000');
INSERT INTO `users` VALUES ('5', 'sergey_onix', 'c290a3d21ccbbbd136c20d9202dcf6df', 'c6cd3ec60b2412ddb53dd7cebc2ad57e', '0', '55000.00', '0', '0', '0', '0', '0', '0.0000');
INSERT INTO `users` VALUES ('6', 'test', 'fb469d7ef430b0baf0cab6c436e70375', '', '0', '55000.00', '0', '0', '0', '0', '0', '0.0000');

-- ----------------------------
-- Table structure for `weightmeasurements`
-- ----------------------------
DROP TABLE IF EXISTS `weightmeasurements`;
CREATE TABLE `weightmeasurements` (
  `weightMeasurement_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`weightMeasurement_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of weightmeasurements
-- ----------------------------
INSERT INTO `weightmeasurements` VALUES ('1', 'kg');
