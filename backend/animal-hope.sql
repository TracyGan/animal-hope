DROP TABLE Appointment;
DROP TABLE AnimalTypes;
DROP TABLE Walks;
DROP TABLE Feed;
DROP TABLE VetVisit;
DROP TABLE TreatedBy;
DROP TABLE Client;
-- DROP TABLE Fosters;
-- DROP TABLE Adopts;
-- DROP TABLE Makes;
DROP TABLE Orders;
-- DROP TABLE Donation;
DROP TABLE Animal;
DROP TABLE Food;
DROP TABLE Volunteer;
DROP TABLE PaidStaff;


CREATE TABLE Volunteer(
    ID INTEGER PRIMARY KEY,
    Name VARCHAR2(20) NOT NULL
);

CREATE TABLE Food(
    Brand VARCHAR2(20),
    Name VARCHAR2(80),
    AmountInStock INTEGER NOT NULL,
    Price FLOAT NOT NULL,
    PRIMARY KEY(Brand, Name)
);

CREATE TABLE Appointment(
    ID INTEGER PRIMARY KEY,
    DateTime TIMESTAMP NOT NULL,
    Location VARCHAR2(100) NOT NULL
);

CREATE TABLE AnimalTypes(
    Breed VARCHAR2(50) PRIMARY KEY,
    Type VARCHAR2(20) NOT NULL
);

CREATE TABLE Animal(
    ID INTEGER PRIMARY KEY,
    Name VARCHAR2(20) NOT NULL,
    ArrivalDate TIMESTAMP NOT NULL,
    Age INTEGER NOT NULL,
    Breed VARCHAR2(50) NOT NULL
);

CREATE TABLE Walks(
    ID INTEGER PRIMARY KEY,
    Animal_ID INTEGER NOT NULL,
    Volunteer_ID INTEGER NOT NULL,
    Duration FLOAT,
    DateTime TIMESTAMP NOT NULL,
    FOREIGN KEY(Animal_ID) REFERENCES Animal(ID) ON DELETE CASCADE,
    FOREIGN KEY(Volunteer_ID) REFERENCES Volunteer(ID) ON DELETE CASCADE
);

CREATE TABLE PaidStaff(
    Username VARCHAR2(20) PRIMARY KEY,
    Password VARCHAR2(20) NOT NULL,
    Name VARCHAR2(20) NOT NULL,
    Salary FLOAT NOT NULL,
    Age INT,
    OfficeNumber INT,
    TrainingID INT,
    University VARCHAR2(70),
    CHECK (OfficeNumber IS NOT NULL OR TrainingID IS NOT NULL OR University IS NOT NULL), 
    CHECK ((OfficeNumber IS NOT NULL AND TrainingID IS NULL AND University IS NULL) OR 
    (OfficeNumber IS NULL AND TrainingID IS NOT NULL AND University IS NULL) OR 
    (OfficeNumber IS NULL AND TrainingID IS NULL AND University IS NOT NULL))
);

CREATE TABLE Feed(
    ID INTEGER PRIMARY KEY,
    Animal_ID INTEGER NOT NULL,
    PaidStaff_Username VARCHAR2(20) NOT NULL,
    Food_Brand VARCHAR2(20) NOT NULL,
    Food_Name VARCHAR2(80) NOT NULL,
    DateTime TIMESTAMP NOT NULL,
    FOREIGN KEY(Animal_ID) REFERENCES Animal(ID) ON DELETE CASCADE,
    FOREIGN KEY(PaidStaff_Username) REFERENCES PaidStaff(Username) ON DELETE CASCADE,
    FOREIGN KEY(Food_Brand, Food_Name) REFERENCES Food(Brand, Name) ON DELETE CASCADE
);

CREATE TABLE VetVisit(
    ID INTEGER PRIMARY KEY,
    Animal_ID INTEGER NOT NULL,
    DateTime TIMESTAMP NOT NULL,
    FOREIGN KEY(Animal_ID) REFERENCES Animal(ID) ON DELETE CASCADE
);

CREATE TABLE TreatedBy(
    Animal_ID INTEGER,
    PaidStaff_Username VARCHAR2(20) NOT NULL,
    DateTime TIMESTAMP,
    FOREIGN KEY(Animal_ID) REFERENCES Animal(ID) ON DELETE CASCADE,
    FOREIGN KEY(PaidStaff_Username) REFERENCES PaidStaff(Username) ON DELETE CASCADE,
    PRIMARY KEY (DateTime, Animal_ID)
);

CREATE TABLE Client(
    ID INTEGER PRIMARY KEY,
    Name CHAR(20) NOT NULL,
    EmailAddress VARCHAR(20) NOT NULL,
    FosterPersonCertificationID INTEGER UNIQUE,
    AdopterPersonCertificationID INTEGER UNIQUE
);

-- CREATE TABLE Fosters(
--     Client_ID INTEGER,
--     Animal_ID INTEGER,
--     StartDate DATE NOT NULL,
--     EndDate DATE,
--     PRIMARY KEY(Client_ID, Animal_ID),
--     FOREIGN KEY(Client_ID) REFERENCES Client(ID) ON DELETE CASCADE,
--     FOREIGN KEY(Animal_ID) REFERENCES Animal(ID) ON DELETE CASCADE
-- );

-- CREATE TABLE Adopts(
--     Client_ID INTEGER,
--     Animal_ID INTEGER,
--     AdoptionDate DATE NOT NULL,
--     Fee FLOAT NOT NULL,
--     PRIMARY KEY(Client_ID, Animal_ID),
--     FOREIGN KEY(Client_ID) REFERENCES Client(ID) ON DELETE CASCADE,
--     FOREIGN KEY(Animal_ID) REFERENCES Animal(ID) ON DELETE CASCADE
-- );
------ 

-- CREATE TABLE Makes(
--     Appointment_ID INTEGER,
--     PaidStaff_Username INTEGER,
--     Client_ID INTEGER,
--     FOREIGN KEY (Appointment_ID) REFERENCES Appointment(ID) ON DELETE CASCADE,
--     FOREIGN KEY (Client_ID) REFERENCES Client(ID) ON DELETE CASCADE,
--     PRIMARY KEY(Appointment_ID, PaidStaff_Username, Client_ID)
-- );

CREATE TABLE Orders(
    Food_Brand VARCHAR2(20),
    Food_Name VARCHAR2(80),
    PaidStaff_Username VARCHAR2(20),
    DateTime TIMESTAMP NOT NULL,
    FOREIGN KEY (Food_Brand, Food_Name) REFERENCES Food(Brand, Name) ON DELETE CASCADE,
    FOREIGN KEY (PaidStaff_Username) REFERENCES PaidStaff(Username) ON DELETE CASCADE,
    PRIMARY KEY(Food_Brand, Food_Name, PaidStaff_Username)
);


-- CREATE TABLE Donation(
--     ID INTEGER PRIMARY KEY,
--     Date DATE NOT NULL,
--     Amount FLOAT NOT NULL,
--     Client_ID INTEGER,
--     FOREIGN KEY(Client_ID) REFERENCES Client(ID)
-- );


-- Food
INSERT INTO Food
VALUES ('Purina', 'Pro Plan Live Clear', 10, 40.0);

INSERT INTO Food
VALUES ('Royal Canin', 'Feline Health Nutrition Indoor', 2, 18.0);

INSERT INTO Food
VALUES ('Nutrena', 'SafeChoice Original Horse Feed', 10, 20.5);

INSERT INTO Food
VALUES ('ADM Animal Nutrition', 'Pen Pals Rabbit Feed', 1, 45.0);

INSERT INTO Food
VALUES ('Purina', 'Layena Crumbles', 2, 20.0);


-- PaidStaff
INSERT INTO PaidStaff
VALUES ('ZaynMalik', 'Password123', 'Zayn Malik', 55000.0, 20, 1, NULL, NULL);

INSERT INTO PaidStaff
VALUES ('HarryStyles', 'WatermelonSugar1', 'Harry Styles', 45000.0, 25, NULL, 1, NULL);

INSERT INTO PaidStaff
VALUES ('LouisTomlinson', 'LT1991', 'Louis Tomlinson', 150000.0, 35, NULL, NULL, 'University of Cambridge');

INSERT INTO PaidStaff
VALUES ('NiallHoran', 'Nice2MeetYa', 'Niall Horan', 45000.0, 40, 2, NULL, NULL);

INSERT INTO PaidStaff
VALUES ('LiamPayne', 'LiamPayne111', 'Liam Payne', 150000.0, 50, NULL, NULL, 'University of London');


-- AnimalTypes
INSERT INTO AnimalTypes(Breed, Type) VALUES ('Golden Retriever', 'Dog'); 
INSERT INTO AnimalTypes(Breed, Type) VALUES ('Corgi', 'Dog');
INSERT INTO AnimalTypes(Breed, Type) VALUES ('Arabian', 'Horse');
INSERT INTO AnimalTypes(Breed, Type) VALUES ('Siamese', 'Cat');
INSERT INTO AnimalTypes(Breed, Type) VALUES ('Flemish Giant', 'Rabbit');
INSERT INTO AnimalTypes(Breed, Type) VALUES ('Lionhead', 'Rabbit');
INSERT INTO AnimalTypes(Breed, Type) VALUES ('Rottweiler', 'Dog');
INSERT INTO AnimalTypes(Breed, Type) VALUES ('Tuxedo', 'Cat');

-- Animal
INSERT INTO Animal(ID, Name, ArrivalDate, Age, Breed)
VALUES (4000, 'Max', TIMESTAMP '2020-10-12 15:30:21', 2, 'Corgi'); 

INSERT INTO Animal(ID, Name, ArrivalDate, Age, Breed)
VALUES (4001, 'Moose', TIMESTAMP '2010-10-12 10:20:18', 10, 'Arabian');

INSERT INTO Animal(ID, Name, ArrivalDate, Age, Breed)
VALUES (4002, 'Ruff', TIMESTAMP '2022-05-24 10:56:01', 2, 'Siamese');

INSERT INTO Animal(ID, Name, ArrivalDate, Age, Breed)
VALUES (4003, 'Meep', TIMESTAMP '2020-10-12 15:30:21', 1, 'Flemish Giant');

INSERT INTO Animal(ID, Name, ArrivalDate, Age, Breed)
VALUES (4004, 'Hensem', TIMESTAMP '2024-10-12 08:30:21', 4, 'Rottweiler');

INSERT INTO Animal(ID, Name, ArrivalDate, Age, Breed)
VALUES (4005, 'Runn', TIMESTAMP '2023-10-12 09:35:21', 2, 'Golden Retriever');

INSERT INTO Animal(ID, Name, ArrivalDate, Age, Breed)
VALUES (4006, 'Runn', TIMESTAMP '2023-10-12 09:35:21', 2, 'Arabian');

-- Client
INSERT INTO Client(ID, Name, EmailAddress, FosterPersonCertificationID, AdopterPersonCertificationID)
VALUES (8000, 'Sam', 'sam2004@mail.com', 5831, 1234);

INSERT INTO Client(ID, Name, EmailAddress, FosterPersonCertificationID, AdopterPersonCertificationID)
VALUES (8001, 'Carly', 'icarly@mail.com', 1234, 3410);

INSERT INTO Client(ID, Name, EmailAddress, FosterPersonCertificationID, AdopterPersonCertificationID)
VALUES (8002, 'Cat', 'cat123@mail.com', 123, 9123);

INSERT INTO Client(ID, Name, EmailAddress, FosterPersonCertificationID, AdopterPersonCertificationID)
VALUES (8003, 'Tori', 'victorious@mail.com', 8391, 12);

INSERT INTO Client(ID, Name, EmailAddress, FosterPersonCertificationID, AdopterPersonCertificationID)
VALUES (8004, 'Jade', 'jade@mail.com', 2309, 1);

-- Volunteer
INSERT INTO Volunteer(ID, Name)
VALUES (100, 'Tracy');

INSERT INTO Volunteer(ID, Name)
VALUES (101, 'Sydney');

INSERT INTO Volunteer(ID, Name)
VALUES (102, 'Kelly');

INSERT INTO Volunteer(ID, Name)
VALUES (103, 'Amy');

INSERT INTO Volunteer(ID, Name)
VALUES (104, 'Tracy');

-- Walks
INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5000, 4000, 100, 1.5, TIMESTAMP '2024-10-12 15:30:21');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5002, 4004, 102, 0.5, TIMESTAMP '2024-09-18 13:59:19');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5004, 4004, 104, 2.5, TIMESTAMP '2024-04-25 11:31:01');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5003, 4000, 101, NULL, TIMESTAMP '2024-07-01 12:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5005, 4001, 101, NULL, TIMESTAMP '2024-07-01 12:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5006, 4002, 101, NULL, TIMESTAMP '2024-07-01 13:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5007, 4003, 101, NULL, TIMESTAMP '2024-07-01 14:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5008, 4004, 101, NULL, TIMESTAMP '2024-07-01 15:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5009, 4005, 101, NULL, TIMESTAMP '2024-07-01 16:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5010, 4006, 101, NULL, TIMESTAMP '2024-07-01 17:24:42');

--
INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5013, 4000, 102, NULL, TIMESTAMP '2024-08-01 12:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5015, 4001, 102, NULL, TIMESTAMP '2024-08-01 12:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5016, 4002, 102, NULL, TIMESTAMP '2024-08-01 13:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5017, 4003, 102, NULL, TIMESTAMP '2024-08-01 14:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5018, 4004, 102, NULL, TIMESTAMP '2024-08-01 15:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5019, 4005, 102, NULL, TIMESTAMP '2024-08-01 16:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5020, 4006, 102, NULL, TIMESTAMP '2024-08-01 17:24:42');




-- Feed
INSERT INTO Feed(ID, Animal_ID, PaidStaff_Username, Food_Brand, Food_Name, DateTime)
VALUES (6000, 4002, 'HarryStyles', 'Purina', 'Pro Plan Live Clear', TIMESTAMP '2024-10-13 10:30:00');

INSERT INTO Feed(ID, Animal_ID, PaidStaff_Username, Food_Brand, Food_Name, DateTime)
VALUES (6001, 4006, 'HarryStyles', 'Nutrena', 'SafeChoice Original Horse Feed', TIMESTAMP '2024-09-29 19:45:00');

INSERT INTO Feed(ID, Animal_ID, PaidStaff_Username, Food_Brand, Food_Name, DateTime)
VALUES (6002, 4003, 'HarryStyles', 'ADM Animal Nutrition', 'Pen Pals Rabbit Feed', TIMESTAMP '2024-02-29 09:15:00');

INSERT INTO Feed(ID, Animal_ID, PaidStaff_Username, Food_Brand, Food_Name, DateTime)
VALUES (6003, 4005, 'HarryStyles', 'Purina', 'Layena Crumbles', TIMESTAMP '2023-11-28 12:45:00');

INSERT INTO Feed(ID, Animal_ID, PaidStaff_Username, Food_Brand, Food_Name, DateTime)
VALUES (6004, 4005, 'HarryStyles', 'Royal Canin', 'Feline Health Nutrition Indoor', TIMESTAMP '2022-07-08 08:30:00');

-- Vet Visit
INSERT INTO VetVisit(ID, Animal_ID, DateTime)
VALUES (7000, 4001, TIMESTAMP '2023-10-13 10:30:00');

INSERT INTO VetVisit(ID, Animal_ID, DateTime)
VALUES (7001, 4002, TIMESTAMP '2024-03-21 13:45:00');

INSERT INTO VetVisit(ID, Animal_ID, DateTime)
VALUES (7002, 4001, TIMESTAMP '2022-04-08 10:39:00');

INSERT INTO VetVisit(ID, Animal_ID, DateTime)
VALUES (7003, 4000, TIMESTAMP '2023-11-28 12:45:00');

INSERT INTO VetVisit(ID, Animal_ID, DateTime)
VALUES (7004, 4004, TIMESTAMP '2022-12-25 09:30:00');

-- TreatedBy
INSERT INTO TreatedBy(Animal_ID, PaidStaff_Username, DateTime)
VALUES (4001, 'LiamPayne', TIMESTAMP '2023-10-13 10:30:00');

INSERT INTO TreatedBy(Animal_ID, PaidStaff_Username, DateTime)
VALUES (4002, 'LouisTomlinson', TIMESTAMP '2024-03-21 13:45:00');

INSERT INTO TreatedBy(Animal_ID, PaidStaff_Username, DateTime)
VALUES (4001, 'LouisTomlinson', TIMESTAMP '2022-04-08 10:39:00');

INSERT INTO TreatedBy(Animal_ID, PaidStaff_Username, DateTime)
VALUES (4000, 'LouisTomlinson', TIMESTAMP '2023-11-28 12:45:00');

INSERT INTO TreatedBy(Animal_ID, PaidStaff_Username, DateTime)
VALUES (4004, 'LiamPayne', TIMESTAMP '2022-12-25 09:30:00');

Commit;

