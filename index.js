//pull in required pakages
const inquirer = require('inquirer');
const mysql = require('mysql2');

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

//present user with option menu for tasks
//then depending on user choice, call task related function
function options() {
  inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "delete a department",
        "delete a role",
        "delte an employee",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.options) {
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

//create each task related function
//show department table contents
function viewDepartments() {
  const sql = "SELECT * FROM department";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Showing all departments");
    console.table(result);
    options();
  });
}

//show role table contents
function viewRoles() {
  const sql = "SELECT * FROM role";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Showing all roles");
    console.table(result);
    options();
  });
}

// show employee table contents
function viewEmployees() {
  const sql = "SELECT * FROM employee";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Showing all employee information");
    console.table(result);
    options();
  });
}

//add a department to the database company_db
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "Enter the department name you want to add to the database",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Must enter a deartment name");
          }
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (named) VALUE ('${answer.department}')`;

      db.query(sql, (err) => {
        if (err) throw err;
        console.log(
          `${answer.department} department has successfully been added`
        );
        options();
      });
    });
}

//add a role (title, salary, and department id) to the database company_db
function addRole() {
  const sql = "SELECT * FROM department";
  db.query(sql, (err, results) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Enter the title of the new role you wish you add",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              console.log("Must enter the role's title");
            }
          },
        },
        {
          name: "salary",
          type: "input",
          message: "Enter thr new role's salary",
          validate: (value) => {
            if (isNaN(value) === false) {
              return true;
            }
            console.log("Must enter a number");
          },
        },
        {
          name: "department_ID",
          type: "rawlist",
          choices: () => {
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(results[i].name);
            }
            return choiceArray;
          },
          message: "Assign the new role to a department",
        },
      ])
      .then((answer) => {
        let chosenDept;
        for (let i = 0; i < results.length; i++) {
          if (results[i].name === answer.department_ID) {
            chosenDept = results[i];
          }
        }

        const sql = `INSERT INTO role (title, salary, department_id) 
          VALUE ('${answer.title}','${answer.salary}','${chosenDept.id}')`;

        db.query(sql, (err) => {
          if (err) throw err;
          console.log(`The new role ${answer.title} has successfully been added`);
          options();
        });
      });
  });
}

//add employee (name, role, manager) to the company_db database
function addEmployee() {
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "Please enter the employee's first name",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Must enter a first name");
          }
        }
      },
      {
        name: "lastName",
        type: "input",
        message: "Please enter the employee's last name",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Must have a last name");
          }
        }
      },
      {
        name: "role_id",
        type: "number",
        message: "Enter a role id",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Must enter a role id.");
          }
        }
      },
      {
        name: "manager_id",
        type: "input",
        message: "Enter the employee's manager id?(If no manger, just skip)",
      }
    ]).then(answer => {
      let manager_id;
      if (answer.manager_id === '') {
        manager_id = null;
      } else {
        manager_id = answer.manager_id;
      }
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.role_id}, ${manager_id})`;
  
      db.query(sql, (err) => {
        if (err) throw err;
        console.log(`New employee ${answer.firstName} ${answer.lastName} has successfully been added`);
        options();
      })
    });
  }

  //select an employee to update and their new role (updated in the company_db database)
function updateRole() {
    inquirer.prompt([
      {
        name: "employee_id",
        type: "number",
        message: "Enter the employee ID of the employee you want to update",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Must enter an employee id.");
          }
        }
      },
      {
        name: "role_id",
        type: "number",
        message: "Enter the new role ID",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Must enter the employee new role id.");
          }
        }
      }
    ]).then(answer => {
      const sql = `UPDATE employee SET role_id = '${answer.role_id}' WHERE id = '${answer.employee_id}'`
  
      db.query(sql, (err) => {
        if (err) throw err;
        console.log(`No.${answer.employee_id} employee role has successfully been updated`);
        options();
      })
    })
  }

// ------------------ Bouns -------------------
// enter the id of the department you wish you delete from the company_db database
function deleteDepartment() {
    inquirer.prompt([
      {
        name: "department_ID",
        type: "number",
        message: "Enter the department ID you want to DELETE",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Must enter the department id.");
          }
        }
      }
    ]).then(answer => {
      const sql = `DELETE from department where id = '${answer.department_ID}'`;
  
      db.query(sql, (err) => {
        if (err) throw err;
        console.log(`No.${answer.department_ID} department has successfully been deleted`);
        options();
      })
    });
  }
  
  // enter the id of the role user wishes to delete from company_db database
  function deleteRole() {
    inquirer.prompt([
      {
        name: "role_ID",
        type: "number",
        message: "Enter the role ID you want to DELETE",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Must enter the role id.");
          }
        }
      }
    ]).then(answer => {
      const sql = `DELETE from role where id = '${answer.role_ID}'`;
  
      db.query(sql, (err) => {
        if (err) throw err;
        console.log(`NO.${answer.role_ID} role has successfully been deleted`);
        options();
      })
    });
  }
  
  // enter the id of the employee and that employee is deleted from the database
  function deleteEmployee() {
    inquirer.prompt([
      {
        name: "employee_ID",
        type: "number",
        message: "Enter the role ID you want to DELETE",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Must enter the role id.");
          }
        }
      }
    ]).then(answer => {
      const sql = `DELETE from employee where id = '${answer.employee_ID}'`;
  
      db.query(sql, (err) => {
        if (err) throw err;
        console.log(`NO.${answer.employee_ID} employee has successfully been deleted`);
        options();
      })
    });
  }
  
  //calls options function and prompts user with question menu
  options();