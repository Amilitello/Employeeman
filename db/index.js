const connection = require ("./connection")

class Employees {
    constructor (connection) {
        this.connection = connection
    }
    addEmployee (employee) {
        return this.connection.query (
            "INSERT INTO employee SET ?", employee
        )
    }
    addRole (role) {
        return this.connection.query (
            "INSERT INTO role SET ?", role
        )
    }
    addDepartment (department) {
        return this.connection.query (
            "INSERT INTO department SET ?", department
        )
    }
    viewEmployee () {
        return this.connection.query (
           "SELECT * FROM employee" 
        )
        
    }
    viewRole () {
        return this.connection.query (
            "SELECT * FROM role"
        )
    }
    viewDepartment () {
        return this.connection.query (
            "SELECT * FROM department"
        )
    }
    updateEmployeeRole (employeeId, roleId) {
        return this.connection.query (
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        )
    }
}

module.exports = new Employees (connection)