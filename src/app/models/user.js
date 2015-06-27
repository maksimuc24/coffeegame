app.factory('User', 
	['UserEquipment', 'Employee', 'CoffeeType', 'CoffeePrice', 'userService',
	function(UserEquipment, Employee, CoffeeType, CoffeePrice, userService){
	var User = function (authUser){
		this.id = authUser.id;
		this.cafeName = authUser.cafeName;

		this.balance = -1;

		this.displayBalance = function () {
			return this.balance - this.equipment.TotalAmount();
		};

		this.equipment = new UserEquipment();
		this.employee = new Employee();
		this.coffee = {
			type: new CoffeeType(),
			price: new CoffeePrice()
		};
	};

	User.prototype.getBalance = function() {
		var self = this;

		return userService.getBalance()
				.success(function(data){
					self.balance = data;
				});
	};

	User.prototype.isAuthenticated = function() {
		return this.id != '' && this.id != undefined;
	};

	User.prototype.canBuyEquipment = function(name, item) {
		var existingItemPrice = this.equipment.getItemPrice(name);
		var existingEmployeePrice = this.employee.pricePerMonth ? parseFloat(this.employee.pricePerMonth) : 0;
		var existingCoffeeTypePrice = this.coffee.type.pricePerKg ? parseFloat(this.coffee.type.pricePerKg) : 0;
		return (this.balance - this.equipment.TotalAmount() + existingItemPrice - existingEmployeePrice - existingCoffeeTypePrice) > item.price;
	};

	User.prototype.canBuyEmployee = function(price) {
		var existingEmployeePrice = this.employee.pricePerMonth ? parseFloat(this.employee.pricePerMonth) : 0;
		var existingCoffeeTypePrice = this.coffee.type.pricePerKg ? parseFloat(this.coffee.type.pricePerKg) : 0;
		return (this.balance - this.equipment.TotalAmount() - existingEmployeePrice - existingCoffeeTypePrice) > price;
	};

	User.prototype.canBuyCoffeeType = function(price) {
		var existingEmployeePrice = this.employee.pricePerMonth ? parseFloat(this.employee.pricePerMonth) : 0;
		var existingCoffeeTypePrice = this.coffee.type.pricePerKg ? parseFloat(this.coffee.type.pricePerKg) : 0;
		return (this.balance - this.equipment.TotalAmount() - existingEmployeePrice - existingCoffeeTypePrice) > price;
	};

	User.prototype.update = function(callback) {
		if(this.equipment.items.length == 3
			&& this.employee.id != 0
			&& this.coffee.type.id != 0
			&& this.coffee.price.id != 0)
		{
			callback();
		}
	};

	return User;
}]);