DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

drop table if exists department;
drop table if exists roles;
drop table if exists employees;

create table department (
    id INT not null auto_increment,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

create table roles (
    id int not null auto_increment, 
    title VARCHAR(30) not null,
    salary decimal not null,
    department_id int not null,
    PRIMARY KEY (id)
);

create table employees (
    id int not null auto_increment,
    first_name VARCHAR(30) not null,
    last_name VARCHAR(30) not null,
    role_id VARCHAR(30) not null,
    manager_id int,
    PRIMARY KEY (id)
);