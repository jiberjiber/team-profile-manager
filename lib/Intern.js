// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email);
        this.position = "Intern";
        this.school = school;
    }

    getSchool(){
        return this.school;
    }

    getPosition(){
        return this.position;
    }
}

module.exports = Intern;