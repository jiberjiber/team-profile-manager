// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github){
        this.name = name;
        this.position = "Engineer";
        this.id = id;
        this.email = email;
        this.github = github;
    }
}

Engineer.prototype.getGithub = function(){
    return this.github;
}

module.exports = Engineer;