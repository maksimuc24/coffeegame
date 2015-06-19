use coffeeGame;

CREATE TABLE `users` ( 
	`user_id` int(11) unsigned NOT NULL auto_increment, 
	`user_login` varchar(30) NOT NULL, 
	`user_password` varchar(32) NOT NULL, 
	`user_hash` varchar(32) NOT NULL, 
	`user_ip` int(10) unsigned NOT NULL default '0', 
PRIMARY KEY (`user_id`) 
) ENGINE=MyISAM DEFAULT CHARSET=cp1251 AUTO_INCREMENT=1 ; 

CREATE TABLE `currencies` (
	`currency_id` int(11) not null auto_increment,
	`name` varchar(25) not null,
PRIMARY KEY (`currency_id`)
);

INSERT INTO currencies (`name`) values ('coins');

CREATE TABLE `coffeeGrinders` (
	`coffeeGrinder_id` int(11) not null auto_increment,
	`name` varchar(255) not null,
	`price` decimal(15, 2) not null,
	`currency_id` int null,
PRIMARY KEY (`coffeeGrinder_id`)
);

SET @base_currency = (select currency_id from currencies limit 1);

INSERT INTO coffeeGrinders (`name`, `price`, `currency_id`) VALUES 
('Marble mortar', 1000, @base_currency),
('Noname blade grinder', 1200, @base_currency),
('OE Lido, hand-powered', 3000, @base_currency),
('Rancilio Rocky, 50 mm planar burrs', 7000, @base_currency);

CREATE TABLE `coffeeMachines` (
	`coffeeMachine_id` int(11) not null auto_increment,
	`name` varchar(255) not null,
	`price` decimal(15, 2) not null,
	`currency_id` int null,
PRIMARY KEY (`coffeeMachine_id`)
);

INSERT INTO coffeeMachines (`name`, `price`, `currency_id`) values 
('French press', 300, @base_currency),
('HX brew head, 1-group', 45000, @base_currency),
('E61 brew head, 1-group', 70000, @base_currency),
('Saturated brew head, 1-group', 120000, @base_currency),
('Saturated brew head, 1-group, double boilers', 145000, @base_currency);

CREATE TABLE `timePeriods` (
	`timePeriod_id` int(11) not null auto_increment,
	`name` varchar(50) not null,
PRIMARY KEY (`timePeriod_id`)
);

INSERT INTO timePeriods (`name`) VALUES ('month');

CREATE TABLE `coffeePlaces` (
	`coffeePlace_id` int(11) not null auto_increment,
	`name` varchar(255) not null,
	`price` decimal(15,2) not null,
	`currency_id` int null,
	`timePeriod_id` int null,
PRIMARY KEY (`coffeePlace_id`)
);

SET @month_timePeriod = (SELECT timePeriod_id FROM timePeriods where name = 'month' limit 1);

INSERT INTO coffeePlaces (`name`, `price`, `currency_id`, `timePeriod_id`) values
('Sufficient', 6000, @base_currency, @month_timePeriod),
('Slightly better', 8000, @base_currency, @month_timePeriod),
('Good', 14000, @base_currency, @month_timePeriod);

CREATE TABLE `coffeeEmployees` (
	`coffeeEmployee_id` int(11) not null auto_increment,
	`name` varchar(255) not null,
	`price` decimal(15, 2) not null,
	`currency_id` int null,
	`timePeriod_id` int null,
PRIMARY KEY (`coffeeEmployee_id`)
);

INSERT INTO coffeeEmployees (`name`, `price`, `currency_id`, `timePeriod_id`) values
('Only you', 0, @base_currency, @month_timePeriod),
('One part-time worker', 10000, @base_currency, @month_timePeriod),
('Two part-time workers', 20000, @base_currency, @month_timePeriod),
('Three part-time workers', 30000, @base_currency, @month_timePeriod);

CREATE TABLE `weightMeasurements` (
	`weightMeasurement_id` int(11) not null auto_increment,
	`name` varchar(10) not null,
PRIMARY KEY (`weightMeasurement_id`)
); 

INSERT INTO weightMeasurements (`name`) values ('kg');

SET @kg_weightMeasurement = (SELECT weightMeasurement_id FROM weightMeasurements where name = 'kg' limit 1);

CREATE TABLE `coffeeTypes` (
	`coffeeType_id` int(11) not null auto_increment,
	`name` varchar(255) not null,
	`price` decimal(15, 2) not null,
	`currency_id` int null,
	`weightMeasurement_id` int null,
PRIMARY KEY (`coffeeType_id`)
);

INSERT INTO coffeeTypes (`name`, `price`, `currency_id`, `weightMeasurement_id`) values 
('100% Robusta with unknown roasting date', 300, @base_currency, @kg_weightMeasurement),
('100% Robusta with unknown roasting date', 400, @base_currency, @kg_weightMeasurement),
('30/70 Robusta/Arabica blend with unknown roasting date', 450, @base_currency, @kg_weightMeasurement);

CREATE TABLE `drinkPortions` (
	`drinkPortion_id` int(11) not null auto_increment,
	`name` varchar(10) not null,
PRIMARY KEY (`drinkPortion_id`)
);

INSERT INTO drinkPortions (`name`) VALUES ('cup');

SET @cup_drinkPortion = (SELECT drinkPortion_id FROM drinkPortions where name = 'cup' limit 1);

CREATE TABLE `coffeeDrinkPrices` (
	`coffeeDrinkPrice_id` int(11) not null auto_increment,
	`price` decimal(15, 2) not null,
	`currency_id` int null,
	`drinkPortion_id` int null,
PRIMARY KEY (`coffeeDrinkPrice_id`)
);

INSERT INTO coffeeDrinkPrices (`price`, `currency_id`, `drinkPortion_id`) values 
(20, @base_currency, @cup_drinkPortion),
(25, @base_currency, @cup_drinkPortion),
(30, @base_currency, @cup_drinkPortion),
(35, @base_currency, @cup_drinkPortion);

CREATE TABLE `equipmentTypes` (
	`equipmentType_id` int(11) not null,
	`name` varchar(20) not null,
PRIMARY KEY (`equipmentType_id`)
);

INSERT INTO equipmentTypes (`equipmentType_id`, `name`) values 
(1, 'coffeeGrinders'),
(2, 'coffeeMachines'),
(3, 'coffeePlaces'),
(4, 'coffeeTypes'),
(5, 'coffeeEmployees'),
(6, 'coffeeDrinkPrices');

CREATE TABLE `userEquipment` (
	`userEquipment_id` int(11) not null auto_increment,
	`user_id` int(11) not null,
	`equipment_id` int(11) not null,
	`equipment_type_id` int(11) not null,
PRIMARY KEY (`userEquipment_id`)
);

CREATE TABLE `userGameTime` ( \
	`userGameTime_id` int(11) not null auto_increment, \
	`user_id` int(11) not null, \
	`created` datetime not null, \
	`startTime` datetime not null, \
	`endTime` datetime null, \
	`sessionId` varchar(500) not null, \
PRIMARY KEY (`userGameTime_id`) \
);

CREATE TABLE `userBalanceUpdateTime` ( \
	`userBalanceUpdateTime_id` int(11) not null auto_increment, \
	`user_id` int(11) not null, \
	`created` datetime not null, \
	`updateTime` datetime not null, \
PRIMARY KEY (`userBalanceUpdateTime_id`) \
);

