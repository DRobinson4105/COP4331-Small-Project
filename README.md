# Glasses8P
Glasses8P is a personal contact manager that allows users to create an account and securely store their contacts. Each contact includes a first name, last name, email address, and phone number, making it easy to organize and access essential information.

## Installation
This application uses the LAMP stack so [Apache](https://httpd.apache.org/docs/current/install.html), [MySQL](https://www.oracle.com/mysql/technologies/mysql-enterprise-edition-downloads.html), and [PHP](https://www.php.net/manual/en/install.php) need to be already installed.
```bash
git clone https://github.com/DRobinson4105/COP4331-Small-Project.git
cd bookmate
```

## Database Creation
```sql
create database database_name;
use database_name;

CREATE TABLE `database_name`.`Users`
(
`ID` INT NOT NULL AUTO_INCREMENT ,
`DateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
`DateLastLoggedIn` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
`FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
`LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
`Login` VARCHAR(50) NOT NULL DEFAULT '' ,
`Password` VARCHAR(50) NOT NULL DEFAULT '' ,
PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE `COP4331`.`Contacts`
(
`ID` INT NOT NULL AUTO_INCREMENT ,
`FullName` VARCHAR(50) NOT NULL DEFAULT '' ,
`FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
`LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
`Phone` VARCHAR(50) NOT NULL DEFAULT '' ,
`Email` VARCHAR(50) NOT NULL DEFAULT '' ,
`UserID` INT NOT NULL DEFAULT '0' ,
PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
```

## Running the Application
On Windows:
```bash
start index.html
```

On Mac:
```bash
open index.html
```

On Linux:
```bash
xdg-open index.html
```

## Contributions
If you'd like to report a bug, request a feature, or contribute code, please submit an issue or pull request