var app = angular.module("app", []).controller('AppCtrl',
    function AppCtrl($scope, $http) {
        console.log('Hello from controller!');
        $scope.test = "blabla";
    });