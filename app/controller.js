var app = angular.module("app", ['ui.bootstrap']).controller('AppCtrl',
    function AppCtrl($scope, $http) {
        $scope.dogs = [
            {
                name: "סנופי",
                age: 4,
                num: 2562,
                gender: "זכר",
                loc: "כלבייה",
                status: "טופל",
                descrip: "נמצא נטוש בירכא"
            },
            {
                name: "לאקי",
                age: 1,
                num: 2575,
                gender: "נקבה",
                loc: "אומנה",
                status: "פתוח",
                descrip: "אושפזה עקב קדחת קרציות"
            }
        ];

    });