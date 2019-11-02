var app = angular.module("dogsMed", ['ui.bootstrap'])
    .controller('AppCtrl', function AppCtrl($scope, $http) {

        $scope.dogSearch = "";
        $scope.sizes = ["זעיר", "קטן", "קטן-בינוני", "בינוני", "בינוני-גדול", "גדול", "ענק"];
        $scope.isPuppiesFilterActive = false;


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
                .then(function () {
                    refresh();
                });
        };

        $scope.remove = function (id) {
            console.log(id);
            $http.delete('/dogs/' + id).then(function () {
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

        $scope.activateFilterPuppies = function () {
            if ($scope.isPuppiesFilterActive) {
                $scope.isPuppiesFilterActive = false
            } else {
                $scope.isPuppiesFilterActive = true;
            }
        };

        $scope.filterPuppies = function (dog) {
            if (!$scope.isPuppiesFilterActive) {
                return true;
            } else {
                let today = new Date();
                let todayDay = today.getDate();
                let todayMonth = today.getMonth()+1;
                let todayYear = today.getFullYear();
                let now = new Date(todayYear, todayMonth, todayDay);

                if (dog.birthday) {
                    let bYear = "20" + dog.birthday.substring(6);
                    let bMonth = dog.birthday.substring(3, 5);
                    let bDay = dog.birthday.substring(0, 2);
                    bday = new Date(bYear, bMonth, bDay);
                }

                calculateDiff = (d1, d2) => {
                    let diff = Math.abs(d1 - d2);
                    const diffInDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
                    console.log(dog.name + " הפרש: " + diffInDays);
                    return diffInDays;
                }
                
                diffDays = calculateDiff(now, bday);

            }
            

            if (diffDays < 210) { // puppies here are dogs up to 7-months-old
                return true;
            } else {
                return false;
            }
            
        }
    });



app.filter('ageFilter', function () {
    function calculateAge(birthday) { // birthday is a date string
        if (birthday) {
            let bYear = "20" + birthday.substring(6);
            let bMonth = birthday.substring(3, 5);
            let bDay = birthday.substring(0, 2);
            let bday = new Date(bYear, bMonth, bDay);
            let now = new Date();

            let yearDob = bday.getYear();
            let monthDob = bday.getMonth() + 1;
            let dayDob = bday.getDate(); // N.B. - *not* getDay() (== Sunday, Monday...)
            let yearNow = now.getYear();
            let monthNow = now.getMonth() + 1;
            let dayNow = now.getDate();

            let ageInYears = yearNow - yearDob;
            let monthDiff = 0;
            let dayDiff = 0;

            if (monthNow >= monthDob) {
                monthDiff = monthNow - monthDob;
            } else {
                ageInYears--;
                monthDiff = 12 + monthNow - monthDob;
            }

            if (dayNow >= dayDob) {
                dayDiff = dayNow - dayDob;
            } else {
                dayDiff = 30 + dayNow - dayDob;
            }

            if (dayDiff >= 25 || dayDiff < 5) {
                monthDiff++;
            } else if (dayDiff >= 10 && dayDiff < 25) {
                monthDiff += 0.5;
            }

            if (ageInYears >= 1) {
                return (`${ageInYears} שנים ${monthDiff} חודשים`);
            } else {
                return (`${monthDiff} חודשים`);
            }
        }
    }

    // function monthDiff(d1, d2) {
    //     if (d1 < d2) {
    //         let months = d2.getMonth() - d1.getMonth();
    //         return months <= 0 ? 0 : months;
    //     }
    //     return 0;
    // }

    return function (birthdate) {
        let age = calculateAge(birthdate);
        // if (age === 0) {
        //     let bday = new Date(birthdate);
        //     return monthDiff(bday, new Date()) + ' חודשים';
        // }
        return age;
    };
});