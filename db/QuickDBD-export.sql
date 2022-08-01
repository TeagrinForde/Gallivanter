-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE `User` (
    `UserID` int  NOT NULL ,
    `username` string  NOT NULL ,
    `email` string  NOT NULL ,
    `password` string  NULL ,
    PRIMARY KEY (
        `UserID`
    ),
    CONSTRAINT `uc_User_email` UNIQUE (
        `email`
    )
);

CREATE TABLE `UserData` (
    `ID` int  NOT NULL ,
    `CustomerID` int  NOT NULL ,
    `name` string  NOT NULL ,
    `Address` string  NOT NULL ,
    `phone` varchar(30)  NOT NULL ,
    `mobile` varchar(30)  NOT NULL ,
    `PlannedTrips` string  NOT NULL ,
    `CompletedTrips` string  NOT NULL ,
    `Reviews` int  NOT NULL ,
    PRIMARY KEY (
        `ID`
    )
);

CREATE TABLE `PlannedTrips` (
    `PTripID` int  NOT NULL ,
    `OrderID` int  NOT NULL ,
    `Name` varchar(200)  NOT NULL ,
    `locations` string  NOT NULL ,
    `Travelers` int  NOT NULL ,
    `Price` money  NOT NULL ,
    PRIMARY KEY (
        `PTripID`
    )
);

CREATE TABLE `CompletedTrips` (
    `CTripID` int  NOT NULL ,
    `Name` varchar(200)  NOT NULL ,
    `locations` string  NOT NULL ,
    `Travelers` int  NOT NULL ,
    `Price` money  NOT NULL ,
    PRIMARY KEY (
        `CTripID`
    )
);

CREATE TABLE `Locations` (
    `locID` int  NOT NULL ,
    `review` string  NOT NULL ,
    `cityName` varchar(255)  NOT NULL ,
    `countryID` int  NOT NULL ,
    PRIMARY KEY (
        `locID`
    )
);

CREATE TABLE `Countries` (
    `ID` int  NOT NULL ,
    `countryCode` varchar(10)  NOT NULL ,
    `countryName` varchar(255)  NOT NULL ,
    PRIMARY KEY (
        `ID`
    )
);

ALTER TABLE `UserData` ADD CONSTRAINT `fk_UserData_CustomerID` FOREIGN KEY(`CustomerID`)
REFERENCES `User` (`UserID`);

ALTER TABLE `UserData` ADD CONSTRAINT `fk_UserData_Reviews` FOREIGN KEY(`Reviews`)
REFERENCES `Locations` (`review`);

ALTER TABLE `PlannedTrips` ADD CONSTRAINT `fk_PlannedTrips_OrderID_Travelers` FOREIGN KEY(`OrderID`, `Travelers`)
REFERENCES `UserData` (`PlannedTrips`, `ID`);

ALTER TABLE `PlannedTrips` ADD CONSTRAINT `fk_PlannedTrips_locations` FOREIGN KEY(`locations`)
REFERENCES `Locations` (`locID`);

ALTER TABLE `CompletedTrips` ADD CONSTRAINT `fk_CompletedTrips_CTripID_Travelers` FOREIGN KEY(`CTripID`, `Travelers`)
REFERENCES `UserData` (`CompletedTrips`, `ID`);

ALTER TABLE `CompletedTrips` ADD CONSTRAINT `fk_CompletedTrips_locations` FOREIGN KEY(`locations`)
REFERENCES `Locations` (`locID`);

ALTER TABLE `Locations` ADD CONSTRAINT `fk_Locations_countryID` FOREIGN KEY(`countryID`)
REFERENCES `Countries` (`ID`);

CREATE INDEX `idx_User_username`
ON `User` (`username`);

