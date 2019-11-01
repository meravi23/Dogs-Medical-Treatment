var app = angular.module("dogsMed", ['ui.bootstrap'])
    .controller('AppCtrl', function AppCtrl($scope, $http) {

        $scope.dogSearch = "";
        $scope.sizes = ["זעיר", "קטן", "קטן-בינוני", "בינוני", "בינוני-גדול", "גדול", "ענק"];

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

        // $scope.calculateAge = function (birthday) {
        //     let bday = new Date(birthday);
        //     var ageDifMs = Date.now() - bday.getTime();
        //     var ageDate = new Date(ageDifMs); // miliseconds from epoch
        //     return Math.abs(ageDate.getUTCFullYear() - 1970);
        // }



    });

app.filter('ageFilter', function () {
    function calculateAge(birthday) { // birthday is a date string
        let bday = new Date(birthday);
        let ageDifferenceMilSec = Date.now() - bday.getTime();
        let ageDate = new Date(ageDifferenceMilSec); // miliseconds from epoch

        // var yearDob = bday.getYear();
        // var monthDob = bday.getMonth();
        // let now = new Date();        
        // let yearNow = now.getYear();
        // let monthNow = now.getMonth()+1;

        // yearAge = yearNow - yearDob;

        // if (monthNow >= monthDob)
        //     var monthAge = monthNow - monthDob;
        // else {
        //     yearAge--;
        //     var monthAge = 12 + monthNow -monthDob;
        // }

        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    function monthDiff(d1, d2) {
        if (d1 < d2) {
            let months = d2.getMonth() - d1.getMonth();
            return months <= 0 ? 0 : months;
        }
        return 0;
    }
    return function (birthdate) {
        let age = calculateAge(birthdate);
        if (age === 0) {
            let bday = new Date(birthdate);
            return monthDiff(bday, new Date()) + ' חודשים';
        }
        return age;
    };
});