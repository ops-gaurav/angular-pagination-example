var app = angular.module ('app', ['ui.router', 'ngMask', 'ngToast']);
/**
 * the routing configurtions
 */
app.config (['$stateProvider', 
            '$urlRouterProvider', 
            '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state ('/default', {
            url: '/',
            templateUrl: '/templates/register-template.html',
            controller: 'RegisterController'
        })
        .state ('/userList', {
            url: '/users',
            templateUrl: '/templates/user-list-template.html',
            controller: 'UsersListController'
        });

    $urlRouterProvider.otherwise ('/register');
    $locationProvider.html5Mode ({
        enabled: true,
        requireBase: false
    });
}]);

/**
 * the register controller containing the business logic
 * for the register related activities
 */
app.controller ('RegisterController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

    $scope.credentials = {};
    /**
     * authenticating the username on keydown event
     */
    $scope.usernameLookup = function () {
        if ($scope.credentials.username && $scope.credentials.username != '') {

            $http.get ('/user/hasUsername/'+ $scope.credentials.username).then (function (data) {
                var response = data.data;
                if (response.status == 'success') {
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
        // if the field contains some value
        if ($scope.credentials.email && $scope.credentials.email != '') {
            $http.get ('/user/hasEmail/'+ $scope.credentials.email). then (function (data) {
                if (data.data.status == 'success') {
                    // email exists
                    // invalidate field and show error
                    $scope.registerForm.email.$setValidity ('', false);
                    $scope.unavailableEmail = true;
                } else {
                    console.log (data.data.message);
                    // email does not exists
                    // validate field and hide error
                    $scope.registerForm.email.$setValidity ('', true);
                    $scope.unavailableEmail = false;
                }
            }, function (data) {
                console.error (data.data.message);
            });
        } else {
            // otherwise invalidate form and hide error message
            $scope.registerForm.email.$setValidity ('', false);
            $scope.unavailableEmail = false;
        }
    }

    /**
     * process the persistence of user data
     */
    $scope.submit = function () {
        if ($scope.registerForm.$valid) {
            $http.post ('/user/create', $scope.credentials). then (function (data) {
                if (data.data.status ='success'){
                    console.log ('saved user');
                    $rootScope.showToast ('User created sucessfully');
                    $scope.credentials = undefined;
                } else 
                    console.error (data.data.message);
            }, function (data) {
                console.error (data);
            });
        } else {
            console.log ('there are errors in the form');
        }
    }
}]);

app.controller ('UsersListController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $rootScope.showToast ('loaded users view');

    $scope.fetchUserPage = function (pageNumber) {
        $http.get ('/user/page/'+ pageNumber).then (function (data) {
            if (data.data.status == 'success') {
                $scope.data = data.data.data.raw;
                $scope.pagination = data.data.data.misc;
                
                console.log ($scope.data);
                console.log ($scope.pagination);
            } else {
                $rootScope.showToast (data.data.message);
            }
        }, function (data) {
            $rootScope.showToast (data.data.message);
        });
    };

    $scope.fetchUserPage (1);
}]);

app.controller ('AppMiscController', ['$rootScope','ngToast', function ($rootScope, ngToast){
    $rootScope.showToast = function (message) {
        $rootScope.customToast = ngToast.create ({
            className: 'success',
            content: message
        });

        setTimeout (2000, $rootScope.hideToast);
    }

    $rootScope.hideToast = function () {
        ngToast.dismiss ($rootScope.customToast);
    }

}]);
