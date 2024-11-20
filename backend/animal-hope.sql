DROP TABLE PaidStaff;

CREATE TABLE PaidStaff(
    Username CHAR(20) PRIMARY KEY,
    Password CHAR(20) NOT NULL,
    Name CHAR(20) NOT NULL,
    Salary FLOAT NOT NULL,
    Age INT,
    OfficeNumber INT,
    TrainingID INT,
    University VARCHAR,
    CHECK (OfficeNumber IS NOT NULL OR TrainingID IS NOT NULL OR University IS NOT NULL), 
    CHECK ((OfficeNumber IS NOT NULL AND TrainingID IS NULL AND University IS NULL) OR 
    (OfficeNumber IS NULL AND TrainingID IS NOT NULL AND University IS NULL) OR 
    (OfficeNumber IS NULL AND TrainingID IS NULL AND University IS NOT NULL))
);


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
