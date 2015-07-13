(function() {
        'use strict'


        angular
                .module('coffeeGame')
                .factory('UserEquipment', UserEquipment);

        UserEquipment.$inject = ['gameSettingsService'];

        function UserEquipment(gameSettingsService) {
                var UserEquipment = function() {
                        this.items = [];
                };

                UserEquipment.prototype.Add = function(name, item) {
                        //save to the database
                        gameSettingsService.setUserEquipment(item.id,item.equipment_type_id,parseFloat(item.price));

                        if (this.Exists(name)) {
                                var index = this.IndexOf(name);
                                this.items[index].name = name;
                                this.items[index].id = item.id;
                                this.items[index].price = parseFloat(item.price);
                                this.items[index].item = item.item;
                        } else {
                                this.items.push({
                                        'name': name,
                                        'id': item.id,
                                        'price': parseFloat(item.price),
                                        'item': item
                                });
                        }
                };

                UserEquipment.prototype.Exists = function(name, id) {
                        for (var i = 0; i < this.items.length; i++) {
                                if (this.items[i].name == name && (!id || this.items[i].id == id)) {
                                        return true;
                                }
                        };
                };

                UserEquipment.prototype.IndexOf = function(name, id) {
                        for (var i = 0; i < this.items.length; i++) {
                                if (this.items[i].name == name && (!id || this.items[i].id == id)) {
                                        return i;
                                }
                        };
                };

                UserEquipment.prototype.getItemPrice = function(name) {
                        if (this.Exists(name)) {
                                var index = this.IndexOf(name);
                                return parseFloat(this.items[index].price);
                        } else {
                                return 0;
                        }
                };

                UserEquipment.prototype.TotalAmount = function() {
                        var total = 0;
                        for (var i = 0; i < this.items.length; i++) {
                                total += parseFloat(this.items[i].price);
                        };
                        return total;
                };

                UserEquipment.prototype.update = function(callback) {
                        callback();
                };

                return UserEquipment;
        };
})();
