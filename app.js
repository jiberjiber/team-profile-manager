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
const { async } = require("rxjs/internal/scheduler/async");
const Employee = require("./lib/Employee");

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
        name: "email",
        message: "Engineer's email: "
    },
    {
        type: "input",
        name: "github",
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
        name: "email",
        message: "Intern's email: "
    },
    {
        type: "input",
        name: "school",
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
    });
}

function createManager(){
    inquirer.prompt(managerQuestions)
    .then(answers => {
        var newUser = new Manager(answers.name, userList.length + 1, answers.email, answers.office);

        userList.push(newUser);
        console.log(`Manager ${answers.name} created!`);
        mainMenu();
    });
}

function creatEngineer(){
    inquirer.prompt(engineerQuestions)
    .then(answers => {
        var newUser = new Engineer(answers.name, userList.length + 1, answers.email, answers.github);

        userList.push(newUser);
        console.log(`Engineer ${answers.name} created!`);
        mainMenu();
    });
}

function createIntern(){
    inquirer.prompt(internQuestions)
    .then(answers => {
        var newUser = new Intern(answers.name, userList.length + 1, answers.email, answers.school);

        userList.push(newUser);
        console.log(`Intern ${answers.name} created!`);
        mainMenu();
    });
}

function generateHTML(){
    fs.writeFileSync(outputPath, render(userList), function(err){
        if(err) throw err;
    });

    mainMenu();
}

function deleteUser(){
    if(userList.length < 1){
        console.log("No users exist!");
        return;
    }
    let tempList = [];
    for(let i = 0; i < userList.length; i++){
        let tempName = userList[i].getName;
        console.log(tempName);
        tempList.push(tempName);
    }

    inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "Choose a user to delete: ",
            choices: tempList
        }
    ])
    .then(answers => {
        for(let i = 0; i < userList.length; i++){
            if(userList[i].name === answers.name){
                userList.splice(i,1);
            }
        }

        console.log(`User ${answers.name} removed!`);
        mainMenu();
    });

    
}



// Call main menu ===================================================================
mainMenu();

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
