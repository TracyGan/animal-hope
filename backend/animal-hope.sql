DROP TABLE Appointment;
DROP TABLE AnimalTypes;
DROP TABLE Walks;
DROP TABLE Feed;
DROP TABLE VetVisit;
DROP TABLE TreatedBy;
-- DROP TABLE Client;
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

-- CREATE TABLE Client(
--     ID INTEGER PRIMARY KEY,
--     Name CHAR(20) NOT NULL,
--     EmailAddress VARCHAR NOT NULL,
--     FosterPersonCertificationID INTEGER UNIQUE,
--     AdopterPersonCertificationID INTEGER UNIQUE
-- );
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


