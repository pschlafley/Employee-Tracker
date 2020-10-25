const mysql = require('mysql2');
const inquirer = require('inquirer');
const data = [];

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
    welcomePrompt();
});

const welcomePrompt = () => {
    console.log(`
    ,-----------------------------------------------------.
    |                                                     |
    |     _____                 _                         |
    |    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |
    |    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
    |    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |
    |    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
    |                    |_|            |___/             |
    |                                                     |
    |     __  __                                          |
    |    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
    |    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       |
    |    | |  | | (_| | | | | (_| | (_| |  __/ |          |
    |    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
    |                              |___/                  |
    |                                                     |
    \`-----------------------------------------------------'
    `);
    // connection.query(`SELECT * FROM employees`, function(err, res) {
        // if (err) throw err;
        // console.log(res);
        // for (let i = 0; i < res.length; i++) {
        //     let empName = res[i].first_name;
        //     data.push(empName);
        //     console.log(data);
        // }
    // });
    start();
};

const start = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'querySelect',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee', 'Exit']
        }
    )
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
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update Employee':
                updateEmployee();
                break;
        }
    });
};

const readDepartments = () => {
    console.log('Selecting all Departments... \n');
    connection.query(`SELECT * FROM department;`, function(err, res) {
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
    connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, department.name AS Dept_name, 
                    employees.manager_id AS manager
                    FROM employees
                    RIGHT JOIN roles ON employees.role_id = roles.id
                    RIGHT JOIN department ON roles.department_id = department.id
                    ORDER BY employees.id;`, 
                function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

const addDepartment = () => {
    console.log('Adding Department to the Database... \n');
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What Department would you like to add?'
        }
    ]) 
    .then(answer => {
        connection.query(`
            INSERT INTO department SET ?;`,
            {
                name: answer.department
            },
            function(err, res) {
                if(err) throw err;
                console.log(res.affectedRows + ' Department Added! Please View all Departments to verify.');
                start();
            }
        )
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'What Role would you like to add?'
        },
        {
            name: 'salary',
            type: 'number',
            message: 'What is the salary for this role?'
        },
        {
            name: 'roleDept',
            type: 'input',
            message: 'What is the Department id for this role? \n (To see the Department id numbers click the "View All Departments") \n'
        }
    ])
    .then(answer => {
        connection.query(`
            INSERT INTO roles SET ?;`,
            {
                title: answer.role,
                salary: answer.salary,
                department_id: answer.roleDept
            },
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + ' Role Added! Please View all Roles to verify.');      
                start();          
            }
        )
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "What is this Employee's First Name?"
        },
        {
            name: 'lastName',
            type: 'input',
            message: "What is this Employee's Last Name?"
        },
        {
            name: 'role',
            type: 'input',
            message: `What is this Emplopyee's Role ID? \n (1) EHS associate \n (2) EHS manager \n (3) Research Scientist \n (4) Research Manager 
 (5) Process Scientist \n (6) Process Manager \n (7) Ops Associate \n (8) Ops Manager \n (9) Sales Person \n (10) CEO \n (11) Accountant \n (12) Lawyer \n`
            // validate: function(value) {
            //     var valid = !isNaN(parseFloat(value));
            //     return valid || `Please enter the Employee's Role Id Number`;
            // },
            // filter: Number
        },
        {
            name: 'manager',
            type: 'number',
            message: `Who is this employee's manager? Please Enter the Manager's id number \n EHS Manager(2) \n Research Manager (4) \n Process Manager (6) \n Ops Manager (8) \n`
            // validate: function(value) {
            //     var valid = !isNaN(parseFloat(value));
            //     return valid || `Please enter the Employee's Role Id Number`;
            // },
            // filter: Number
        }
    ])
    .then((answer) => {
        connection.query(`INSERT INTO employees SET ?;`,
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role,
            manager_id: answer.manager
        },
        function(err, res) {
            if(err) throw err;
            console.log(res.affectedRows + ' Employee added! View All Employees to Verify')
            start();
        });
    });
};

// const updateEmployee = (rows) => {
//     console.log('Updating Employee... \n');
//     connection.query(`SELECT CONCAT(employees.first_name, " ", employees.last_name) AS Employee_name FROM employees;`)
//     connection.query(`SELECT * FROM employees;`)
//     .then(
//         console.log(rows),
//         inquirer.prompt(
//             {
//                 type: 'list',
//                 name: 'selectedEmp',
//                 message: 'Which employee do you want to update?',
//                 choices: [rows]
//             }
//         )
//     )
//     .then((answer) => {
//         let selectedEmp = answer;
//         inquirer.prompt([
//             {
//                 type: 'input',
//                 name: 'empRoleUpdate',
//                 message: `What is the new role for ${selectedEmp}?`
//             }
//         ])
//     })
//     .then(connection.query(`UPDATE employees SET role_id VALUES ? WHERE CONCAT(employees.first_name, " ", employees.last_name) = `))
// };

const exit = () => {
    connection.end();
};