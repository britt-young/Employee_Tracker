# SQL Employee Tracker
![badmath](https://img.shields.io/badge/License-MIT-blue)
## Description

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation
* Install MySQL [here](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide) and add to package.json with the command ```npm install mysql2 --save```
* Setup node.js by running ```npm init -y``` and ```npm install``` to install the npm packages
* Require the Inquirer package and MySQL in your index.js file ```npm i inquirer@8.2.4```


## Usage
* Create a database by entering ```mysql -u <username> -p <password>``` in the terminal to login
* Enter the command ```SOURCE db/schema.sql```, ```SOURCE db/seeds.sql```, and ```SOURCE db/query.sql``` to populate and deploy the database
* Invoke the application using the command ```node index.js```

Click on the [walk-through video demonstration](assets\SQL_EmployeeTrackerDemoVideo.webm) for more information regarding usage
    

## License
Copyright (c) 2023 Brittney Young. This project is MIT licensed.
