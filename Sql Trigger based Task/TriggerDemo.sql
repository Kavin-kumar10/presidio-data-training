create database mydemodatabase

CREATE TABLE employee_source (
    EmployeeID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(50),
    Department VARCHAR(50),
    CreatedDate DATETIME
)


CREATE TABLE employee_destination (
    EmployeeHistoryID INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeID INT,
    Name VARCHAR(50),
    Department VARCHAR(50),
    CreatedDate DATETIME,
    IsDeleted BIT DEFAULT 0
)

/* Alter table for date*/

ALTER TABLE employee_destination
ADD CONSTRAINT DF_employee_destination_CreatedDate
DEFAULT GETDATE() FOR CreatedDate;




/* Insert trigger */

CREATE TRIGGER trigger_employee_source_to_destination_insert
ON employee_source
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO employee_destination (EmployeeID, Name, Department, CreatedDate)
    SELECT EmployeeID, Name, Department, CreatedDate
    FROM inserted;
END;

/*update trigger*/

CREATE TRIGGER trigger_employee_source_to_destination_update
ON employee_source
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO employee_destination (EmployeeID, Name, Department, CreatedDate)
    SELECT i.EmployeeID, i.Name, i.Department, GETDATE()
    FROM inserted i
    INNER JOIN deleted d ON i.EmployeeID = d.EmployeeID
    WHERE i.Name <> d.Name OR i.Department <> d.Department;
END;

/* Delete Trigger */

CREATE TRIGGER trigger_employee_source_to_destination_delete
ON employee_source
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE employee_destination
    SET IsDeleted = 1
    WHERE EmployeeID IN (SELECT EmployeeID FROM deleted);
END;


/* Work part */
SELECT * FROM employee_source
select * from employee_destination

INSERT INTO employee_source (Name, Department)
VALUES ('Buddha', 'CSE');

UPDATE employee_source
SET Name = 'Buddha updated', Department = 'IT'
WHERE EmployeeID = 4;

DELETE FROM employee_source where EmployeeID = 4


CREATE PROCEDURE get_Employee_data
    @debugflag INT
AS
BEGIN
    SET NOCOUNT ON;

    IF @debugflag = 1
    BEGIN
        SELECT * FROM employee_destination;
    END
    ELSE
    BEGIN
        SELECT * FROM employee_source;
    END
END;

EXEC get_Employee_data 1;