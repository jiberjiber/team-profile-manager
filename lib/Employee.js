// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email){
        this.name = name;
        this.position = "Employee";
        this.id = id;
        this.email = email;
    }
}

Employee.prototype.getName = function() {
    return this.name;
}

Employee.prototype.getPosition = function() {
    return this.position;
}

Employee.prototype.getId = function() {
    return this.id;
}

Employee.prototype.getEmail = function() {
    return this.email;
}

module.exports = Employee;