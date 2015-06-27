app.factory('CoffeeType', function(){
	var CoffeeType = function (){
		this.id = 0;
		this.name = '';
		this.pricePerKg = 0;
	};

	CoffeeType.prototype.Set = function(coffeeType) {
		this.id = coffeeType.id;
		this.name = coffeeType.name;
		this.pricePerKg = coffeeType.price;
	};

	CoffeeType.prototype.update = function(callback) {
		callback();
	};

	return CoffeeType;
});