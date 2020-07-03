// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, office){
        this.name = name;
        this.position = "Manager";
        this.id = id;
        this.email = email;
        this.office = office;
    }
}

Manager.prototype.getOffice = function(){
    return this.office;
}

module.exports = Manager;