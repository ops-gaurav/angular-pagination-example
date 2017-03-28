var app = angular.module ('app', ['ui.router', 'ngMask']);
app.config (['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider.state ('/default', {
        url: '/',
        templateUrl: '/templates/register-template.html',
        controller: 'RegisterController'
    });

    $urlRouterProvider.otherwise ('/register');
    $locationProvider.html5Mode ({
        enabled: true,
        requireBase: false
    });
}]);

app.controller ('RegisterController', ['$scope', '$http', function ($scope, $http) {

    $scope.credentials = {};

    /**
     * authenticating the username on keydown event
     */
    $scope.usernameLookup = function () {
        if ($scope.credentials.username && $scope.credentials.username != '') {
            console.log ('looking for '+ $scope.credentials.username);

            $http.get ('/user/hasUsername/'+ $scope.credentials.username).then (function (data) {
                var response = data.data;
                if (response.status == 'success') {
                    console.log ('username exists');
                    // invalidate the form's username input field
                    $scope.registerForm.username.$setValidity ('', false);
                    $scope.unavailableUsername = true;
                }else {
                    // validate the form's username input field
                    $scope.registerForm.username.$setValidity ('', true);
                    console.log (response.message);
                    $scope.unavailableUsername = false;
                }
            }, function (data) {
                console.error (data.data.message);
            });
        } else {
            $scope.registerForm.username.$setValidity ('', false);
            $scope.unavailableUsername = false;
        }
    }

    /**
     * validating the email address on the keydown
     */
    $scope.emailLookup = function () {
        if ($scope.credentials.email && $scope.credentials.email != '') {
            console.log ('looking for email '+ $scope.credentials.email);
            $http.get ('/user/hasEmail/'+ $scope.credentials.email). then (function (data) {
                if (data.data.status == 'success') {
                    console.log ('email exists');

                    $scope.registerForm.email.$setValidity ('', false);
                    $scope.unavailableEmail = true;
                } else {
                    console.log (data.data.message);

                    $scope.registerForm.email.$setValidity ('', true);
                    $scope.unavailableEmail = false;
                }
            }, function (data) {
                console.error (data.data.message);
            });
        } else {
            $scope.registerForm.email.$setValidity ('', false);
            $scope.unavailableEmail = false;
        }
    }

    /**
     * process the persistence of user data
     */
    $scope.submit = function () {
        alert ('submit');
    }
}]);
