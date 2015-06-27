app.factory('Employee', function(){
	var Employee = function (){
		this.id = 0;
		this.pricePerMonth = 0;
		this.name = '';
	};

	Employee.prototype.Set = function(employee) {
		this.id = employee.id;
		this.pricePerMonth = employee.price;
		this.name = employee.name;
	};

	Employee.prototype.update = function(callback) {
		callback();
	};

	return Employee;
});