/*
Navicat MySQL Data Transfer

Source Server         : local_mysql
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : jaknakavueu01

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2015-07-18 03:33:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `coffeedrinkprices`
-- ----------------------------
DROP TABLE IF EXISTS `coffeedrinkprices`;
CREATE TABLE `coffeedrinkprices` (
`coffeeDrinkPrice_id`  int(11) NOT NULL AUTO_INCREMENT ,
`price`  decimal(15,2) NOT NULL ,
`currency_id`  int(11) NULL DEFAULT NULL ,
`drinkPortion_id`  int(11) NULL DEFAULT NULL ,
`quality`  float NULL DEFAULT NULL ,
PRIMARY KEY (`coffeeDrinkPrice_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10

;

-- ----------------------------
-- Records of coffeedrinkprices
-- ----------------------------
BEGIN;
INSERT INTO `coffeedrinkprices` VALUES ('1', '20.00', '1', '1', '0.08'), ('2', '25.00', '1', '1', '0.07'), ('3', '30.00', '1', '1', '0.06'), ('4', '35.00', '1', '1', '0.05'), ('5', '40.00', '1', '1', '0.04'), ('6', '45.00', '1', '1', '0.03'), ('7', '50.00', '1', '1', '0.03'), ('8', '55.00', '1', '1', '0.02'), ('9', '60.00', '1', '1', '0.0095');
COMMIT;

-- ----------------------------
-- Table structure for `coffeeemployees`
-- ----------------------------
DROP TABLE IF EXISTS `coffeeemployees`;
CREATE TABLE `coffeeemployees` (
`coffeeEmployee_id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`price`  decimal(15,2) NOT NULL ,
`currency_id`  int(11) NULL DEFAULT NULL ,
`timePeriod_id`  int(11) NULL DEFAULT NULL ,
`translate_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`quality`  float NULL DEFAULT NULL ,
PRIMARY KEY (`coffeeEmployee_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=11

;

-- ----------------------------
-- Records of coffeeemployees
-- ----------------------------
BEGIN;
INSERT INTO `coffeeemployees` VALUES ('1', 'Only you', '0.00', '1', '1', 'employees1', '6'), ('2', 'One part-time worker', '10000.00', '1', '1', 'employees2', '9'), ('3', 'Two part-time workers', '20000.00', '1', '1', 'employees3', '10'), ('4', 'Three part-time workers', '30000.00', '1', '1', 'employees4', '11'), ('5', 'One full-time worker', '38000.00', '1', '1', 'employees5', '12'), ('6', 'Two full-time workers', '76000.00', '1', '1', 'employees6', '14'), ('7', 'Two full-time workers, training, benefits and motivation', '96000.00', '1', '1', 'employees7', '16'), ('8', 'Three full-time workers', '114000.00', '1', '1', 'employees8', '18'), ('9', 'Three full-time workers, training, benefits and motivation', '144000.00', '1', '1', 'employees9', '20'), ('10', 'Your country`s Barista Champion + three full-time workers, training, benefits and motivation', '196000.00', '1', '1', 'employees10', '23');
COMMIT;

-- ----------------------------
-- Table structure for `coffeegrinders`
-- ----------------------------
DROP TABLE IF EXISTS `coffeegrinders`;
CREATE TABLE `coffeegrinders` (
`coffeeGrinder_id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`price`  decimal(15,2) NOT NULL ,
`currency_id`  int(11) NULL DEFAULT NULL ,
`translate_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`quality`  float NULL DEFAULT NULL ,
PRIMARY KEY (`coffeeGrinder_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=18

;

-- ----------------------------
-- Records of coffeegrinders
-- ----------------------------
BEGIN;
INSERT INTO `coffeegrinders` VALUES ('1', 'Marble mortar', '1000.00', '1', 'grinder1', '1'), ('2', 'Noname blade grinder', '1200.00', '1', 'grinder2', '2'), ('3', 'OE Lido, hand-powered', '3000.00', '1', 'grinder3', '9'), ('11', 'Rancilio Rocky, 50 mm planar burrs', '7000.00', '1', 'grinder4', '12'), ('12', 'Anfim KS-T, 50 mm planar burrs', '11000.00', '1', 'grinder5', '14'), ('13', 'Mazzer Mini, x0 mm planar burrs, doser', '16000.00', '1', 'grinder6', '16'), ('14', 'Anfim Super Caimano, 75 mm planar titanium burrs, doser', '25000.00', '1', 'grinder7', '18'), ('15', ' Mahlkonig K30 Vario, 65 mm planar burrs, doserless', '48000.00', '1', 'grinder8', '19'), ('16', 'Elektra Nino, 68 mm conical burrs, doserless', '68000.00', '1', 'grinder9', '23'), ('17', 'Mazzer Robur E, 71 mm conical burrs, doserless', '75000.00', '1', 'grinder10', '25');
COMMIT;

-- ----------------------------
-- Table structure for `coffeemachines`
-- ----------------------------
DROP TABLE IF EXISTS `coffeemachines`;
CREATE TABLE `coffeemachines` (
`coffeeMachine_id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`price`  decimal(15,2) NOT NULL ,
`currency_id`  int(11) NULL DEFAULT NULL ,
`translate_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`quality`  float NULL DEFAULT NULL ,
PRIMARY KEY (`coffeeMachine_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=11

;

-- ----------------------------
-- Records of coffeemachines
-- ----------------------------
BEGIN;
INSERT INTO `coffeemachines` VALUES ('1', 'French press', '300.00', '1', 'machine1', '3'), ('2', 'HX brew head, 1-group', '45000.00', '1', 'machine2', '8'), ('3', 'E61 brew head, 1-group', '70000.00', '1', 'machine3', '10'), ('4', 'Saturated brew head, 1-group', '120000.00', '1', 'machine4', '12'), ('5', 'Saturated brew head, 1-group, double boilers', '145000.00', '1', 'machine5', '15'), ('6', 'Saturated brew head, 1-group, double boilers, PID', '146000.00', '1', 'machine6', '11'), ('7', 'Saturated brew head, 1-group, double boilers, PID, VST baskets and a naked portafilter', '147000.00', '1', 'machine7', '12'), ('8', 'Saturated brew head, 1-group, with all the possible upgrades', '156000.00', '1', 'machine8', '13'), ('9', '2-group, saturated brew heads, double boilers, PID, volumetrics, VST baskets and naked portafilters, preinfusion', '250000.00', '1', 'machine9', '14'), ('10', '4-group, saturated brew heads, double boilers, PID, volumetrics, VST baskets and naked portafilters, preinfusion', '550000.00', '1', 'machine10', '15');
COMMIT;

-- ----------------------------
-- Table structure for `coffeeplaces`
-- ----------------------------
DROP TABLE IF EXISTS `coffeeplaces`;
CREATE TABLE `coffeeplaces` (
`coffeePlace_id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`price`  decimal(15,2) NOT NULL ,
`currency_id`  int(11) NULL DEFAULT NULL ,
`timePeriod_id`  int(11) NULL DEFAULT NULL ,
`translate_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`quality`  float NULL DEFAULT NULL ,
PRIMARY KEY (`coffeePlace_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=6

;

-- ----------------------------
-- Records of coffeeplaces
-- ----------------------------
BEGIN;
INSERT INTO `coffeeplaces` VALUES ('1', 'Sufficient', '6000.00', '1', '1', 'place1', '2'), ('2', 'Slightly better', '8000.00', '1', '1', 'place2', '3'), ('3', 'Good', '14000.00', '1', '1', 'place3', '5'), ('4', 'Great', '55000.00', '1', '1', 'place4', '8'), ('5', 'Fantastic', '130000.00', '1', '1', 'place5', '10');
COMMIT;

-- ----------------------------
-- Table structure for `coffeetypes`
-- ----------------------------
DROP TABLE IF EXISTS `coffeetypes`;
CREATE TABLE `coffeetypes` (
`coffeeType_id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`price`  decimal(15,2) NOT NULL ,
`currency_id`  int(11) NULL DEFAULT NULL ,
`weightMeasurement_id`  int(11) NULL DEFAULT NULL ,
`translate_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`quality`  float NULL DEFAULT NULL ,
PRIMARY KEY (`coffeeType_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10

;

-- ----------------------------
-- Records of coffeetypes
-- ----------------------------
BEGIN;
INSERT INTO `coffeetypes` VALUES ('1', '100% Robusta with unknown roasting date', '300.00', '1', '1', 'coffee1', '3'), ('2', '100% Robusta with unknown roasting date', '400.00', '1', '1', 'coffee2', '5'), ('3', '30/70 Robusta/Arabica blend with unknown roasting date', '450.00', '1', '1', 'coffee3', '7'), ('4', '10/90 Robusta/Arabica blend with unknown roasting date', '470.00', '1', '1', 'coffee4', '10'), ('5', '100% Arabica with unknown roasting date', '500.00', '1', '1', 'coffee5', '12'), ('6', 'Commodity grade Arabica, freshly roasted', '600.00', '1', '1', 'coffee6', '18'), ('7', 'Specialty coffee, freshly roasted', '700.00', '1', '1', 'coffee7', '23'), ('8', 'Micro lot, freshly roasted', '750.00', '1', '1', 'coffee8', '25'), ('9', 'Nano lot, freshly roasted', '800.00', '1', '1', 'coffee9', '27');
COMMIT;

-- ----------------------------
-- Table structure for `currencies`
-- ----------------------------
DROP TABLE IF EXISTS `currencies`;
CREATE TABLE `currencies` (
`currency_id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`currency_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=2

;

-- ----------------------------
-- Records of currencies
-- ----------------------------
BEGIN;
INSERT INTO `currencies` VALUES ('1', 'coins');
COMMIT;

-- ----------------------------
-- Table structure for `drinkportions`
-- ----------------------------
DROP TABLE IF EXISTS `drinkportions`;
CREATE TABLE `drinkportions` (
`drinkPortion_id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`drinkPortion_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=2

;

-- ----------------------------
-- Records of drinkportions
-- ----------------------------
BEGIN;
INSERT INTO `drinkportions` VALUES ('1', 'cup');
COMMIT;

-- ----------------------------
-- Table structure for `equipmenttypes`
-- ----------------------------
DROP TABLE IF EXISTS `equipmenttypes`;
CREATE TABLE `equipmenttypes` (
`equipmentType_id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`equipmentType_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=7

;

-- ----------------------------
-- Records of equipmenttypes
-- ----------------------------
BEGIN;
INSERT INTO `equipmenttypes` VALUES ('1', 'coffeeGrinders'), ('2', 'coffeeMachines'), ('3', 'coffeePlaces'), ('4', 'coffeeTypes'), ('5', 'coffeeEmployees'), ('6', 'coffeeDrinkPrices');
COMMIT;

-- ----------------------------
-- Table structure for `timeperiods`
-- ----------------------------
DROP TABLE IF EXISTS `timeperiods`;
CREATE TABLE `timeperiods` (
`timePeriod_id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`timePeriod_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=2

;

-- ----------------------------
-- Records of timeperiods
-- ----------------------------
BEGIN;
INSERT INTO `timeperiods` VALUES ('1', 'month');
COMMIT;

-- ----------------------------
-- Table structure for `userequipment`
-- ----------------------------
DROP TABLE IF EXISTS `userequipment`;
CREATE TABLE `userequipment` (
`userEquipment_id`  int(11) NOT NULL AUTO_INCREMENT ,
`user_id`  int(11) NOT NULL ,
`equipment_id`  int(11) NOT NULL ,
`equipment_type_id`  int(11) NOT NULL ,
`created`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
PRIMARY KEY (`userEquipment_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=185

;

-- ----------------------------
-- Records of userequipment
-- ----------------------------
BEGIN;
INSERT INTO `userequipment` VALUES ('184', '2', '2', '6', '2015-07-18 03:28:36'), ('183', '2', '2', '4', '2015-07-18 03:28:35'), ('182', '2', '3', '5', '2015-07-18 03:28:34'), ('181', '2', '3', '3', '2015-07-18 03:28:33'), ('180', '2', '1', '2', '2015-07-18 03:28:33'), ('179', '2', '3', '1', '2015-07-18 03:29:12');
COMMIT;

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
`user_id`  int(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
`cafeName`  varchar(30) CHARACTER SET cp1251 COLLATE cp1251_general_ci NOT NULL ,
`user_password`  varchar(32) CHARACTER SET cp1251 COLLATE cp1251_general_ci NOT NULL ,
`user_hash`  varchar(32) CHARACTER SET cp1251 COLLATE cp1251_general_ci NOT NULL ,
`user_ip`  int(10) UNSIGNED NOT NULL DEFAULT 0 ,
`balance`  float(8,2) NOT NULL DEFAULT 0.00 ,
`is_play`  tinyint(4) NOT NULL DEFAULT 0 ,
`total_drink`  float(8,0) NOT NULL DEFAULT 0 ,
`customers_in_queue`  float(8,0) NOT NULL DEFAULT 0 ,
`total_coffe_kg`  float(8,0) NOT NULL DEFAULT 0 ,
`opened_months`  float(8,0) NOT NULL DEFAULT 0 ,
PRIMARY KEY (`user_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=cp1251 COLLATE=cp1251_general_ci
AUTO_INCREMENT=7

;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('1', 'Cafe1', '36759e3c012ba75562fe2e31d144c483', '', '0', '55000.00', '0', '0', '0', '0', '0'), ('2', 'Barry Lyndon', '39a664ecbd7d66ea6f075021cbb8117f', 'e6c3a4cfa288d144045d50d717c7a8c4', '0', '1275.00', '1', '0', '-130', '0', '200'), ('3', 'illy', 'e08a7c49d96c2b475656cc8fe18cee8e', '6a25f15df607e95df221fd5902318031', '0', '55000.00', '0', '0', '0', '0', '0'), ('4', 'shopmania', '474e45c3f259290616d4189b25f71421', '25c6dcb26503d38c8167a49d45d6022a', '0', '55000.00', '0', '0', '0', '0', '0'), ('5', 'sergey_onix', 'c290a3d21ccbbbd136c20d9202dcf6df', 'c6cd3ec60b2412ddb53dd7cebc2ad57e', '0', '55000.00', '0', '0', '0', '0', '0'), ('6', 'test', 'fb469d7ef430b0baf0cab6c436e70375', '', '0', '55000.00', '0', '0', '0', '0', '0');
COMMIT;

-- ----------------------------
-- Table structure for `weightmeasurements`
-- ----------------------------
DROP TABLE IF EXISTS `weightmeasurements`;
CREATE TABLE `weightmeasurements` (
`weightMeasurement_id`  int(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`weightMeasurement_id`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=2

;

-- ----------------------------
-- Records of weightmeasurements
-- ----------------------------
BEGIN;
INSERT INTO `weightmeasurements` VALUES ('1', 'kg');
COMMIT;

-- ----------------------------
-- Auto increment value for `coffeedrinkprices`
-- ----------------------------
ALTER TABLE `coffeedrinkprices` AUTO_INCREMENT=10;

-- ----------------------------
-- Auto increment value for `coffeeemployees`
-- ----------------------------
ALTER TABLE `coffeeemployees` AUTO_INCREMENT=11;

-- ----------------------------
-- Auto increment value for `coffeegrinders`
-- ----------------------------
ALTER TABLE `coffeegrinders` AUTO_INCREMENT=18;

-- ----------------------------
-- Auto increment value for `coffeemachines`
-- ----------------------------
ALTER TABLE `coffeemachines` AUTO_INCREMENT=11;

-- ----------------------------
-- Auto increment value for `coffeeplaces`
-- ----------------------------
ALTER TABLE `coffeeplaces` AUTO_INCREMENT=6;

-- ----------------------------
-- Auto increment value for `coffeetypes`
-- ----------------------------
ALTER TABLE `coffeetypes` AUTO_INCREMENT=10;

-- ----------------------------
-- Auto increment value for `currencies`
-- ----------------------------
ALTER TABLE `currencies` AUTO_INCREMENT=2;

-- ----------------------------
-- Auto increment value for `drinkportions`
-- ----------------------------
ALTER TABLE `drinkportions` AUTO_INCREMENT=2;

-- ----------------------------
-- Auto increment value for `equipmenttypes`
-- ----------------------------
ALTER TABLE `equipmenttypes` AUTO_INCREMENT=7;

-- ----------------------------
-- Auto increment value for `timeperiods`
-- ----------------------------
ALTER TABLE `timeperiods` AUTO_INCREMENT=2;

-- ----------------------------
-- Auto increment value for `userequipment`
-- ----------------------------
ALTER TABLE `userequipment` AUTO_INCREMENT=185;

-- ----------------------------
-- Auto increment value for `users`
-- ----------------------------
ALTER TABLE `users` AUTO_INCREMENT=7;

-- ----------------------------
-- Auto increment value for `weightmeasurements`
-- ----------------------------
ALTER TABLE `weightmeasurements` AUTO_INCREMENT=2;
