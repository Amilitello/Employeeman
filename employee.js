const inquirer = require("inquirer");
const { async } = require("rxjs");
const { addEmployee, addDepartment, addRole } = require("./db");
const db = require("./db");
require ("console.table");
start ()
function start (){
    main ()
}
async function main (){
    const {option} = await inquirer.prompt ([
        {
            type: "list",
            name: "option",
            choices: [
                {
                    name: "view all employees",
                    value: "view-employees",

                },
                {
                    name: "view all departments",
                    value: "view-departments",

                },
                {
                    name: "view all roles",
                    value: "view-roles",
                },
                {
                    name: "add employee",
                    value: "add-employee",
                },
                {
                    name: "add department",
                    value: "add-department",

                },
                {
                    name: "add role",
                    value: "add-role",
                },
                {
                    name: "update employee role",
                    value: "update-employee-role",
                },
                {
                    name: "quit",
                    value: "quit",
                }
            ]
        }
    ]);
    switch (option) {
        case "view-employees":
        return viewEmployees ()
        case "view-departments":
        return viewDepartments ()
        case "view-roles":
        return viewRoles ()
        case "add-employee":
        return addEmployees ()
        case "add-department":
        return addDepartments ()
        case "add-role":
        return addRoles ()
        case "update-employee-role":
        return updateEmploeeRole ()
        default:
        return quit ()
    }
}


async function viewEmployees (){
    const employees = await db.viewEmployee ()
    console.table (employees)
    main ()

}

async function viewDepartments (){
    const departments = await db.viewDepartment ()
    console.table (departments)
    main ()

}

async function viewRoles (){
    const roles = await db.viewRole ()
    console.table (roles)
    main()
}

async function addEmployees (){
    const roles = await db.viewRole ()
    const employee = await db.viewEmployee ()
    const employeeQuestion = await inquirer.prompt ([
        {
            name: "first_name",
            message: "what is the employee's first name?"
        },
        {
            name: "last_name",
            message: "what is the employee's last name?"
        }
    ])

    const roleChoices = roles.map (({id, title}) => ({
        name: title, value: id
    }) )
    const {roleId} = await inquirer.prompt ([
        {
            type: "list",
            name: "roleId",
            message: "what is the employee's role?",
            choices: roleChoices
        }
    ])
    employeeQuestion.role_id = roleId

    await db.addEmployee (employeeQuestion)
main()
}

//  use for delete department async function addDepartment (){
//     const departments = await db.viewDepartment ()
//     const departmentChoices = departments.map (({id, name}) => ({
//         name: name,
//         value: id
//     }))

//     const {departmentId} = await inquirer.prompt ({
//         type: "list",
//         name: "departmentId",
//         message: "what department would you like to delete",
//         choices: departmentChoices
//     })
//     await db.

// }

async function addDepartments () {
    const department = await inquirer.prompt ([
        {
            name: "name",
            message: "what is the name of the department?"
        }
    ])
    await db.addDepartment (department)
    main ()
}

async function addRoles () {
    const departments = await db.viewDepartment()
    const departmentMap = departments.map(({id,name}) => ({
        name: name, value: id
    }))
    const role = await inquirer.prompt ([
        {
            name: "title",
            message: "what is the name of the role?"
        },
        {
            name: "salary",
            message: "what is the salary of the role?"
        },
        {
            name: "department_id",
            message: "what is the department of the role?",
            type: "list",
            choices: departmentMap
        },

    ])
    await db.addRole (role)
    main ()
}

async function updateEmploeeRole () {
    var employees = await db.viewEmployee()
    const employeeMap = employees.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
}))

const {id} = await inquirer.prompt ([
    {
        type: "list",
        name: "id",
        message: "What employee do you want to update?",
        choices: employeeMap
    }
])
const roles = await db.viewRole()
const roleMap = roles.map(({id, title}) => ({
    name: title,
    value: id
}))
const {roleId} = await inquirer.prompt([
    {
        type: "list",
        name: "roleId",
        message: "Which role do you want assign to the employee?",
        choices: roleMap
    }
])
await db.updateEmployeeRole(id, roleId)
main ()
}