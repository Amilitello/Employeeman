USE employees;


INSERT INTO department (name)
VALUES ("legal"), ("engineering"), ("sales"), ("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("salesman", 40000, 3), ("hr rep", 37000, 4), ("engineer", 80000, 2), ("lawyer", 120000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Anthony", "Militello", 4), ("Jon", "Doe", 3), ("Jane", "Doe", 2), ("James", "Kelly", 1);

