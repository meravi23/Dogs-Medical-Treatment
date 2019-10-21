applic.controller('AppCtrl', function AppCtrl($scope, $http) {
    $scope.name = "";
    $scope.num = null;
    $scope.status = "";
   
    
    $scope.dogs = [{
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