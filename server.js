const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // mysql username
    user: 'root',
    // mysql password
    password: 'Rz8NZ8JR4', 
    database: 'employees_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected as id ' + connection.threadId + '\n');
    start();
});

const start = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'querySelect',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Exit']
        }
    ])
    .then((answer) => {
        switch (answer.querySelect){
            case 'View All Departments':
                readDepartments();
                break;
            case 'View All Roles':
                readRoles();
                break;
            case 'View All Employees':
                readEmployees();
                break;
            case 'Exit':
                exit();
                break;
        }
    });
};

const readDepartments = () => {
    console.log('Selecting all Departments... \n');
    connection.query(`SELECT * FROM department`, function(err, res) {
        if (err) throw err;
        // log all the results of the select statement
        console.table(res);
        start();
    });
};

const readRoles = () => {
    console.log('Selecting all Roles... \n');
    connection.query(`SELECT roles.id, roles.title, roles.salary, department.name AS department_name FROM roles LEFT JOIN department ON roles.department_id = department.id;`, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

const readEmployees = () => {
    console.log('Selecting all Employees... \n');
    connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, department.name AS Dept_name
                    FROM employees
                    RIGHT JOIN roles ON employees.role_id = roles.id
                    RIGHT JOIN department ON roles.department_id = department.id`, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

const exit = () => {
    connection.end();
};