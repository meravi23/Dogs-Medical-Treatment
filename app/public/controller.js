var app = angular.module("dogsMed", ['ui.bootstrap'])
    .controller('AppCtrl', function AppCtrl($scope, $http) {

    $scope.dogSearch = "";
    $scope.sizes = ["זעיר","קטן", "קטן-בינוני", "בינוני", "בינוני-גדול", "גדול", "ענק"];

    let refresh = function () {
        $http.get('/dogs').then(function (res) {
            console.log(res.data);
            $scope.dogs = res.data;
            $scope.dog = null;
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
        $http.get('/dogs/' + id).then(function (res) {
            $scope.dog = res.data;
            console.log("editing " + $scope.dog.name);
        });
    }

    $scope.update = function () {
        console.log("updating: " + $scope.dog.name);
        console.log("dog id: " + $scope.dog._id);
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
        $scope.dogSearch = null;
    };

    $scope.filterByName = function (dog) {
        if ($scope.dogSearch === "") {
            return true;
        } else if (dog.name.startsWith($scope.dogSearch)) {
            return true;
        } else {
            return false;
        }
    }

    // $scope.age = function (bday) { // birthday is a date
    //     if (bday) {
    //         console.log(bday);
    //         let birthday = Date(bday);
    //         console.log((typeof birthday));
            

    //         var today = new Date();
    //         var yearNow = today.getFullYear();
    //         var yearBday = bday.getFullYear();
    //         var age = yearNow - yearBday;
    //     }
    //     return age;
        // var ageDifMs = Date.now() - birthday.getTime();
        // var ageDate = new Date(ageDifMs); // miliseconds from epoch
        // return Math.abs(ageDate.getUTCFullYear() - 1970);
    //    }

});