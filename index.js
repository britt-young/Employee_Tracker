//pull in required pakages
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "1data_Pirate",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

function menu() {
  inquirer
    .prompt({
      name: 'menu',
      type: 'list',
      message: "What would you like to do?",
      choices: [
        'view all departments',
        'view all roles',
        'view all employees',
        'add a department',
        'add a role',
        'add an employee',
        'update an employee role',
        'delete a department',
        'delete a role',
        'delte an employee',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.menu) {
        case "view all departments":
          viewDepartments();
          break;

        case "view all roles":
          viewRoles();
          break;

        case "view all employees":
          viewEmployees();
          break;

        case "add a department":
          addDepartment();
          break;

        case "add a role":
          addRole();
          break;

        case "add an employee":
          addEmployee();
          break;

        case "update an employee role":
          updateRole();
          break;

        case "delete a department":
          deleteDepartment();
          break;

        case "delete a role":
          deleteRole();
          break;

        case "delte an employee":
          deleteEmployee();
          break;

        case "Exit":
          break;
      }
    });
}
