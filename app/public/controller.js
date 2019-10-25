var app = angular.module("dogsMed", ['ui.bootstrap']).controller('AppCtrl', function AppCtrl($scope, $http) {
    $scope.name = "";
    $scope.num = null;
    $scope.status = "";
    $scope.gender = "";
    $scope.dogs = [];


    let refresh = function () {
        $http.get('/dogs').then(function (res) {
            console.log(res.data);
            $scope.dogs = res.data;
        });
    };
    refresh();

    $scope.addDog = function () {
        $scope.dog._id = null; // this way whenever a new contact is added it is always assigned a new id by the database
        console.log($scope.dog);
        $http.post('/dogs', $scope.dog).then(function (res) {
            console.log(res);
            refresh();
        });
    };

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/dogs/' + id).then(function(res) {
          $scope.dog = res.data;
        });
    } 
    
    $scope.update = function () {
        console.log($scope.dog._id);
        $http.put('/dogs/' + $scope.dog._id, $scope.dog)
            .then(function (res) {
                refresh();
            });
    };

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/dogs/' + id).then(function (res) {
            refresh();
        });
    }

    $scope.clear = function () {
        $scope.dog = null;
    };

    // $scope.filterByName = function (dog) {
    //     if ($scope.name === "") {
    //         return true;
    //     } else if (dog.name.startsWith($scope.name)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

});