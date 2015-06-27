app.factory('CoffeePrice', function(){
	var CoffeePrice = function (){
		this.id = 0;
		this.price = 0;
	};

	CoffeePrice.prototype.Set = function(coffeePrice) {
		this.id = coffeePrice.id;
		this.price = coffeePrice.price;
	};

	CoffeePrice.prototype.update = function(callback) {
		callback(); 
	};

	return CoffeePrice;
});