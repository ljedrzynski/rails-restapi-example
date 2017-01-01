var app = angular.module("jsApp", ['ngRoute']).config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('#!');
    $routeProvider.when('/car/list', {
        templateUrl: './partials/car/list.html',
        controller: 'carListCtrl'
    }).when("/car/new", {
        templateUrl: './partials/car/new.html',
        controller: 'newCarCtrl'
    }).when("/car/update", {
        templateUrl: './partials/car/update.html',
        controller: 'updateCarCtrl'
    }).otherwise({
        redirectTo: "/"
    });
}).controller('newCarCtrl', function ($scope, $http, $location) {
    $scope.car = {}
    $scope.add = function () {
        $http.post('http://localhost:3000/api/v1/cars', $scope.car)
            .then(function (response) {
                $location.path("/car/list");
                $scope.content = response.data;
            }, function (response) {
                //Second function handles error
                $scope.content = "Something went wrong";
            });
    };

}).controller('carListCtrl', function ($scope, $http, $location, CarStorageService) {
    $http.get("http://localhost:3000/api/v1/cars")
        .then(function (response) {
            $scope.carList = response.data;
        });

    $scope.removeCar = function (row) {
        var index = $scope.carList.indexOf(row);
        $http.delete('http://localhost:3000/api/v1/cars/' + row.id)
            .then(function (response) {
                $scope.carList.splice(index, 1);
                $route.reload();
            }, function (response) {
                //Second function handles error
                $scope.content = "Something went wrong";
            });
    }

    $scope.updateCar = function (row) {
        row.production_start = new Date(row.production_start);
        row.production_end = new Date(row.production_end);
        row.engine_capacity = parseFloat(row.engine_capacity);
        CarStorageService.setCar(row);
        $location.path("/car/update");
    }
}).controller('updateCarCtrl', function ($scope, $http, $location, CarStorageService) {
    $scope.car = CarStorageService.getCar();
    $scope.update = function () {
        $http.put('http://localhost:3000/api/v1/cars/' + $scope.car.id, $scope.car)
            .then(function (response) {
                $location.path("/car/list");
                $scope.content = response.data;
            }, function (response) {
                //Second function handles error
                $scope.content = "Something went wrong";
            });
    };
}).service('CarStorageService', function () {
    var car = {};
    var setCar = function (car) {
        this.car = car;
    };
    var getCar = function () {
        return this.car;
    };
    return {
        setCar: setCar,
        getCar: getCar
    };
});
;

