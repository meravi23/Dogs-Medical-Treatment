var app = angular.module("dogsMed", ['ui.bootstrap']).controller('AppCtrl', function AppCtrl($scope, $http) {
    $scope.name = "";
    $scope.num = null;
    $scope.status = "";
    $scope.dogs = [];


    let refresh = function () {
        $http.get('/doglist').then(function (res) {
            console.log(res.data);
            $scope.dogs = res.data;
            $scope.dog = null;
        });
    };
    refresh();



    $scope.addDog = function () {
        $scope.dog._id = null; // this way whenever a new contact is added it is always assigned a new id by the database
        console.log($scope.dog);
        $http.post('/doglist', $scope.dog).then(function (res) {
            console.log(res);
            refresh();
        });
    };


    $scope.filterByName = function (dog) {
        if ($scope.name === "") {
            return true;
        } else if (dog.name.startsWith($scope.name)) {
            return true;
        } else {
            return false;
        }
    }

});