// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        this.position = "Engineer";
        this.github = github;
    }

    getGithub(){
        return this.github;
    }

    getPosition(){
        return this.position;
    }
}

module.exports = Engineer;