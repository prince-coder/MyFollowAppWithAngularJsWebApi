angular.module('MyApp', [])
.controller('AdminController', function ($scope, $http,$window) {
    debugger;
    $scope.Login = function () {
        debugger;
        $http.post('/api/Admin',this.Admin).success(function (data) {
            debugger;
            alert("Login Successful");
            $window.location.href = "Home/Index";
        })
        .error(function (data) {
            debugger;
            alert($scope.error);
        });
    };
});