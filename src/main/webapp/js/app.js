var myApp = angular.module('DemoApp', ['ngRoute']);

myApp.factory('CarFactory', function () {
    var cars = [
        {id: 1, year: 1997, registered: new Date(1999, 3, 15), make: 'Ford', model: 'E350', description: 'ac, abs, moon', price: 3000}
        , {id: 2, year: 1999, registered: new Date(1996, 3, 12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900}
        , {id: 3, year: 2000, registered: new Date(199, 12, 22), make: 'Chevy', model: 'Venture', description: '', price: 5000}
        , {id: 4, year: 1996, registered: new Date(2002, 3, 15), make: 'Jeep', model: 'Grand Cherokee', description: 'Moon roof', price: 4799}]
    var nextId = 5;

    this.cars = cars;
    this.newcar = newcar;
    var getCars = function () {
        return cars;
    };
    
    
    var deleteCar = function (id) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                cars.splice(i, 1);
                return;
            }
        }
    };
//    var addEditCar = function (newcar) {
//        if (newcar.id === null) {
//            newcar.id = nextId++;
//            cars.push(this.newcar);
//        } else {
//            for (var i = 0; i < cars.length; i++) {
//                if (cars[i].id === newcar.id) {
//                    cars[i] = newcar;
//                    break;
//                }
//            }
//        }
//    };
    return {
        getCars: getCars,
        deleteCar: deleteCar
       
     
    };
});
var newcar = {};
myApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: "all.html"
           
        }).when('/AddCar', {
            templateUrl: "addEdit.html"
           
        });
    }]);

myApp.controller('ViewCarController', ["CarFactory", function (CarFactory) {
        var self = this;
        
        self.cars = CarFactory.getCars();

        
     
    }]);

myApp.controller('EditAddCarController', ["CarFactory", function (CarFactory) {
        var self = this;
        
        self.cars = CarFactory.getCars();
        self.newcar = {};
        
        self.edit = function (id) {
            
            for (var i in CarFactory.getCars()) {
                
                if (CarFactory.getCars()[i].id === id) {
                   
                    self.newcar = angular.copy(CarFactory.getCars()[i]);
                    CarFactory.getCars()[i] = self.newcar;
                }
            }
        };
        self.add = function() {
         
            if (self.newcar.id == null) {
              
            self.newcar.id = CarFactory.nextId++;
           
            self.cars.push(self.newcar);
           
        }
    };
        self.deleteCar = function (id) {
            var length = CarFactory.getCars().length;
            for (var i = 0; i < length; i++) {

                if (CarFactory.getCars()[i].id === id) {
                    CarFactory.getCars().splice(i, 1);
                    return;
                }
            }
        };
//        this.addEditCar = CarFactory.addEditCar(CarFactory.newcar);

    }]);
