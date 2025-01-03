DROP TABLE AnimalTypes;
DROP TABLE Walks;
DROP TABLE Feed;
DROP TABLE VetVisit;
DROP TABLE TreatedBy;
DROP TABLE Fosters;
DROP TABLE Adopts;
DROP TABLE Makes;
DROP TABLE Appointment;
DROP TABLE Donation;
DROP TABLE Client;
DROP TABLE Orders;
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
    PRIMARY KEY(Name)
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
    FOREIGN KEY(Food_Name) REFERENCES Food(Name) ON DELETE CASCADE
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
    Name VARCHAR(20) NOT NULL,
    EmailAddress VARCHAR2(80) NOT NULL,
    FosterPersonCertificationID INTEGER UNIQUE,
    AdopterPersonCertificationID INTEGER UNIQUE
);

CREATE TABLE Fosters(
    Client_ID INTEGER,
    Animal_ID INTEGER,
    StartDate TIMESTAMP NOT NULL,
    EndDate TIMESTAMP,
    PRIMARY KEY(Client_ID, Animal_ID),
    FOREIGN KEY(Client_ID) REFERENCES Client(ID) ON DELETE CASCADE,
    FOREIGN KEY(Animal_ID) REFERENCES Animal(ID) ON DELETE CASCADE
);

CREATE TABLE Adopts(
    Client_ID INTEGER,
    Animal_ID INTEGER,
    AdoptionDate TIMESTAMP NOT NULL,
    Fee FLOAT NOT NULL,
    PRIMARY KEY(Client_ID, Animal_ID),
    FOREIGN KEY(Client_ID) REFERENCES Client(ID) ON DELETE CASCADE,
    FOREIGN KEY(Animal_ID) REFERENCES Animal(ID) ON DELETE CASCADE
);
---- 

CREATE TABLE Makes(
    Appointment_ID INTEGER,
    PaidStaff_Username VARCHAR2(20),
    Client_ID INTEGER,
    FOREIGN KEY (Appointment_ID) REFERENCES Appointment(ID) ON DELETE CASCADE,
    FOREIGN KEY (Client_ID) REFERENCES Client(ID) ON DELETE CASCADE,
    PRIMARY KEY(Appointment_ID, PaidStaff_Username, Client_ID)
);

CREATE TABLE Orders(
    Food_Name VARCHAR2(80),
    Food_Brand VARCHAR2(20),
    PaidStaff_Username VARCHAR2(20),
    DateTime TIMESTAMP NOT NULL,
    FOREIGN KEY (Food_Name) REFERENCES Food(Name) ON DELETE CASCADE,
    FOREIGN KEY (PaidStaff_Username) REFERENCES PaidStaff(Username) ON DELETE CASCADE,
    PRIMARY KEY(Food_Name, PaidStaff_Username)
);

CREATE TABLE Donation(
    ID INTEGER PRIMARY KEY,
    DonationDate DATE NOT NULL,
    Amount FLOAT NOT NULL,
    Client_ID INTEGER,
    FOREIGN KEY(Client_ID) REFERENCES Client(ID)
);



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

-- Appointment
INSERT INTO Appointment
VALUES (3000, TO_DATE('2020-10-12 15:30:21', 'yyyy-MM-dd HH24:MI:SS'), 'Kennels');

INSERT INTO Appointment
VALUES (3001, TO_DATE('2020-10-13 09:59:27', 'yyyy-MM-dd HH24:MI:SS'), 'Cattery');

INSERT INTO Appointment
VALUES (3002, TO_DATE('2010-01-01 14:28:30', 'yyyy-MM-dd HH24:MI:SS'), 'Aquarium');

INSERT INTO Appointment
VALUES (3003, TO_DATE('2021-01-01 14:28:31', 'yyyy-MM-dd HH24:MI:SS'), 'Barn');

INSERT INTO Appointment
VALUES (3004, TO_DATE('2022-05-24 10:56:01', 'yyyy-MM-dd HH24:MI:SS'), 'Kennels');


-- AnimalTypes
INSERT INTO AnimalTypes
VALUES ('Golden Retriever', 'Dog');

INSERT INTO AnimalTypes
VALUES ('Corgi', 'Dog');

INSERT INTO AnimalTypes
VALUES ('Arabian', 'Horse');

INSERT INTO AnimalTypes
VALUES ('Siamese', 'Cat');

INSERT INTO AnimalTypes
VALUES ('Flemish Giant', 'Rabbit');

INSERT INTO AnimalTypes
VALUES ('Rottweiler', 'Dog');

-- Animal
INSERT INTO Animal
VALUES (4000, 'Max', TO_DATE('2024-10-16 10:30:00', 'yyyy-MM-dd HH24:MI:SS'), 2, 'Corgi');

INSERT INTO Animal
VALUES (4001, 'Moose', TO_DATE('2010-10-12 19:45:00', 'yyyy-MM-dd HH24:MI:SS'), 10, 'Arabian');

INSERT INTO Animal
VALUES (4002, 'Ruff', TO_DATE('2022-05-24 10:56:01', 'yyyy-MM-dd HH24:MI:SS'), 2, 'Siamese');

INSERT INTO Animal
VALUES (4003, 'Meep', TO_DATE('2020-10-12 15:30:21', 'yyyy-MM-dd HH24:MI:SS'), 1, 'Flemish Giant');

INSERT INTO Animal
VALUES (4004, 'Hensem', TO_DATE('2024-10-12 08:30:21', 'yyyy-MM-dd HH24:MI:SS'), 4, 'Rottweiler');

INSERT INTO Animal
VALUES (4005, 'Runn', TO_DATE('2023-10-12 09:35:21','yyyy-MM-dd HH24:MI:SS'),  2, 'Golden Retriever');

INSERT INTO Animal
VALUES (4006, 'Runn', TO_DATE('2023-10-12 09:35:21','yyyy-MM-dd HH24:MI:SS'), 2, 'Arabian');


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

-- Client
INSERT INTO Client
VALUES (8000, 'Sam', 'sam2004@mail.com', 5831, NULL);

INSERT INTO Client
VALUES (8001, 'Carly', 'icarly@mail.com', NULL, 3410);

INSERT INTO Client
VALUES (8002, 'Cat', 'cat123@mail.com', NULL, 9123);

INSERT INTO Client
VALUES (8003, 'Tori', 'victorious@mail.com', 8391, NULL);

INSERT INTO Client
VALUES (8004, 'Jade', 'jade@mail.com', 2309, 3212);

-- Feed
INSERT INTO Feed
VALUES (6000, 4002, 'HarryStyles', 'Purina', 'Pro Plan Live Clear', TO_TIMESTAMP('2024-10-13 10:30:00', 'yyyy-MM-dd HH24:MI:SS'));

INSERT INTO Feed
VALUES (6001, 4006, 'HarryStyles', 'Nutrena', 'SafeChoice Original Horse Feed', TO_TIMESTAMP('2024-09-29 19:45:00', 'yyyy-MM-dd HH24:MI:SS'));

INSERT INTO Feed
VALUES (6002, 4003, 'HarryStyles', 'ADM Animal Nutrition', 'Pen Pals Rabbit Feed', TO_TIMESTAMP('2024-02-29 09:15:00', 'yyyy-MM-dd HH24:MI:SS'));

INSERT INTO Feed
VALUES (6003, 4005, 'HarryStyles', 'Purina', 'Layena Crumbles', TO_TIMESTAMP('2023-11-28 12:45:00', 'yyyy-MM-dd HH24:MI:SS'));

INSERT INTO Feed
VALUES (6004, 4005, 'HarryStyles', 'Royal Canin', 'Feline Health Nutrition Indoor', TO_TIMESTAMP('2022-07-08 08:30:00', 'yyyy-MM-dd HH24:MI:SS'));

-- Donation
INSERT INTO Donation
VALUES (1300, TO_DATE('2024-10-16', 'yyyy-MM-dd'), 1000.0, 8001);

INSERT INTO Donation
VALUES (1301, TO_DATE('2024-10-23', 'yyyy-MM-dd'), 150.0, 8002);

INSERT INTO Donation
VALUES (1302, TO_DATE('2024-10-03', 'yyyy-MM-dd'), 10.5, 8003);

INSERT INTO Donation
VALUES (1303, TO_DATE('2024-11-24', 'yyyy-MM-dd'), 503.2, 8004);

INSERT INTO Donation
VALUES (1304, TO_DATE('2024-11-21', 'yyyy-MM-dd'), 500.0, 8002);

INSERT INTO Donation
VALUES (1305, TO_DATE('2024-11-24', 'yyyy-MM-dd'), 500.0, 8002);

INSERT INTO Donation
VALUES (1306, TO_DATE('2024-09-20', 'yyyy-MM-dd'), 2000, 8003);

-- Fosters
INSERT INTO Fosters
VALUES (8000, 4000, TO_DATE('2024-08-17', 'yyyy-MM-dd'), TO_DATE('2024-09-01', 'yyyy-MM-dd'));

INSERT INTO Fosters
VALUES (8001, 4000, TO_DATE('2024-10-10', 'yyyy-MM-dd'), null);

INSERT INTO Fosters
VALUES (8001, 4002,  TO_DATE('2022-03-01', 'yyyy-MM-dd'), TO_DATE('2023-09-01', 'yyyy-MM-dd'));

INSERT INTO Fosters
VALUES (8002, 4002, TO_DATE('2023-11-21', 'yyyy-MM-dd'), TO_DATE('2024-05-21', 'yyyy-MM-dd'));

INSERT INTO Fosters
VALUES (8003, 4003, TO_DATE('2024-09-12', 'yyyy-MM-dd'), null);


-- Adopts
INSERT INTO Adopts
VALUES (8000, 4002, TO_DATE('2024-06-27', 'yyyy-MM-dd'), 80.50);

INSERT INTO Adopts
VALUES (8000, 4004, TO_DATE('2024-01-11', 'yyyy-MM-dd'), 45);

INSERT INTO Adopts
VALUES (8003, 4001, TO_DATE('2023-12-01', 'yyyy-MM-dd'), 30.15);

INSERT INTO Adopts
VALUES (8003, 4005, TO_DATE('2022-05-30', 'yyyy-MM-dd'), 75);

INSERT INTO Adopts
VALUES (8003, 4006, TO_DATE('2021-07-30', 'yyyy-MM-dd'), 50);


-- Makes
INSERT INTO Makes
VALUES (3000, 'ZaynMalik', 8004);

INSERT INTO Makes
VALUES (3001, 'ZaynMalik', 8002);

INSERT INTO Makes
VALUES (3002, 'NiallHoran', 8001);

INSERT INTO Makes
VALUES (3003, 'ZaynMalik', 8000);

INSERT INTO Makes
VALUES (3004, 'NiallHoran', 8001);


-- Orders
INSERT INTO Orders
VALUES ('Pro Plan Live Clear', 'Purina', 'ZaynMalik', TO_DATE('2024-06-14 13:45:00', 'yyyy-MM-dd HH24:MI:SS'));

INSERT INTO Orders
VALUES('Feline Health Nutrition Indoor', 'Royal Canin', 'NiallHoran', TO_DATE('2024-07-30 15:10:00', 'yyyy-MM-dd HH24:MI:SS'));

INSERT INTO Orders
VALUES ('Pro Plan Live Clear', 'Purina', 'NiallHoran', TO_DATE('2024-09-18 13:00:00', 'yyyy-MM-dd HH24:MI:SS'));

INSERT INTO Orders
VALUES ('Layena Crumbles', 'Purina', 'ZaynMalik', TO_DATE('2024-10-01 16:53:00', 'yyyy-MM-dd HH24:MI:SS'));

INSERT INTO Orders
VALUES('Feline Health Nutrition Indoor', 'Royal Canin', 'ZaynMalik', TO_DATE('2024-10-04 12:00:00', 'yyyy-MM-dd HH24:MI:SS'));


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
VALUES (5001, 4001, 101, 1, TIMESTAMP '2024-11-30 14:20:34');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5002, 4004, 102, 0.5, TIMESTAMP '2024-09-18 13:59:19');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5003, 4001, 101, NULL, TIMESTAMP '2024-07-01 12:24:42');

INSERT INTO Walks(ID, Animal_ID, Volunteer_ID, Duration, DateTime)
VALUES (5004, 4004, 104, 2.5, TIMESTAMP '2024-04-25 11:31:01');

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