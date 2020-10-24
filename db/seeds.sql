INSERT INTO department 
(name)
VALUES  
('EHS'),
('Research Dev'),
('Process Dev'),
('Manufacturing'),
('Corporate');

INSERT INTO roles 
(title, salary, department_id)
VALUES  
('ehs associate', 10000, 1),
('ehs manager', 20000, 1),
('research scientist', 10000, 2),
('research manager', 20000, 2),
('process scientist', 10000, 3),
('process manager', 20000, 3),
('ops associate', 10000, 4),
('ops manager', 20000, 4),
('salesperson', 10000, 5),
('CEO', 100000, 5);

INSERT INTO employees 
(first_name, last_name, role_id, manager_id)
VALUES 
('Saurmia', 'Spellaire', 1, 1),
('Marcel', 'Galien', 2, null),
('Ginadura', 'Belvani', 3, 4),
('Fastred', 'Ingmarkesen', 4, null),
('Neddrir', 'Kjiksen', 5, 6),
('Ekhi', 'Bjadsen', 6, null),
('Ghamorz', 'Grocromgog', 7, 8),
('Arnora', 'Duilis', 8, null),
('Sulesa', 'Melarg', 9, 10),
('Lathon', 'Aldwyr', 10, null);
-- ('Thalfin', 'Willow'),
-- ('Rianis', 'River'),
-- ('Nanir', 'Barabus'),
-- ('Andrana', 'Highbinder'),
-- ('Gandela', 'Saram');