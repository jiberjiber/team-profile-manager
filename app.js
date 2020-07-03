const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { createSecureServer } = require("http2");

// Variable creation ==========================================================
let userList = [];
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "Manager's name: "
    },
    {
        type: "input",
        name: "id",
        message: "Manager's id: "
    },
    {
        type: "input",
        name: "email",
        message: "Manager's email: "
    },
    {
        type: "input",
        name: "office",
        message: "Manager's office number: "
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "Engineer's name: "
    },
    {
        type: "input",
        name: "id",
        message: "Engineer's id: "
    },
    {
        type: "input",
        name: "email",
        message: "Engineer's email: "
    },
    {
        type: "input",
        name: "office",
        message: "Engineer's github username: "
    }
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "Intern's name: "
    },
    {
        type: "input",
        name: "id",
        message: "Intern's id: "
    },
    {
        type: "input",
        name: "email",
        message: "Intern's email: "
    },
    {
        type: "input",
        name: "office",
        message: "Intern's school: "
    }
];

// Function creation =========================================================

function mainMenu(){
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: [
                "Create a user",
                "Generate HTML",
                "Delete a user",
                "Exit dashboard"
            ]
        }
    ])
    .then(answers => {
        switch(answers.option){
            case "Create a user":
                createUser();
                break;
            
            case "Generate HTML":
                generateHTML();
                break;
    
            case "Delete a user":
                deleteUser();
                break;

            case "Exit dashboard":
                return;
        }
    });
}

function createUser(){
    inquirer.prompt([
        {
            type: "list",
            name: "userType",
            message: "Type of user to create: ",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ])
    .then(answers => {
        switch(answers.userType){
            case "Manager":
                createManager();
                break;
            
            case "Engineer":
                creatEngineer();
                break;

            case "Intern":
                createIntern();
                break;
        }

        mainMenu();
    });
}

function createManager(){
    inquirer.prompt(managerQuestions)
    .then(answers => {
        var newUser = new Manager(answers.name, userList.length + 1, answers.email, answers.office);

        userList.push(newUser);
        console.log(`Manager ${answers.name} created!`);
    });
}

function creatEngineer(){
    inquirer.prompt(engineerQuestions)
    .then(answers => {
        var newUser = new Engineer(answers.name, userList.length + 1, answers.email, answers.github)
    });
}

function createIntern(){
    inquirer.prompt(internQuestions)
    .then(answers => {
        
    });
}

function generateHTML(){
    render(userList);
}

function deleteUser(){

}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
