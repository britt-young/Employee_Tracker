/* --join ALL of the department table info and role table only at related "id" column */
SELECT named
FROM department
LEFT JOIN role
ON department.id = role.department_id;

/* -- join ALL of the role table info and department table only at related "id" column */
SELECT title, salary, department_id
FROM role
LEFT JOIN department
ON role.department_id = department.id;

/* --join ALL of the employee table info and role table only at related "id" column */
SELECT first_name, last_name, role_id, manager_id
FROM employee
JOIN role
ON employee.role_id = role.id;