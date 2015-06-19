use coffeeGame;

alter table `users` change column `user_login` `cafeName` varchar(30) not null;

alter table `users` add column `balance` float(8,2) not null default '0.00';

alter table `userEquipment` add column `created` timestamp not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

--alter table `userGameTime` add column `sessionId` varchar(500) null;