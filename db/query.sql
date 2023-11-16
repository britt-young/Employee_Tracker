SELECT named
FROM departmentLEFT JOIN role
ON department.id = role.department_id;

SELECT title, salary, department_id
FROM role
LEFT JOIN department
ON role.department_id = department.id;

SELECT first_name, last_name, role_id, manager_id
FROM employee
JOIN role
ON employee.role_id=role.id;