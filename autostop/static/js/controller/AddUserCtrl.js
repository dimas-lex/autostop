'use strict';

AutoApp.controller('AddUserCtrl',
    function($scope, $http, dataExchangeService, messageService) {
        $scope.master = {
            email: "email" + Number(Math.random() * 1000).toFixed(3) + "@ya.ru",
            password: "password" + Number(Math.random() * 1000).toFixed(3),
            age: 25
        };
        console.info($scope.user)
        $scope.processForm = function() {
            var user = $scope.user;
            if (user && user.password && user.email) {
                // $scope.account_model = account;
                var errorMsgOnDelete = "Во время выполнения запроса произошла ошибка. Запись не сохранена";

                var onFailSaving = function() {
                    messageService.error(errorMsgOnDelete);
                    dataExchangeService.post('loadData');
                };
                var saveServices = function(user) {
                    console.log('saveServices')
                    // $scope.service_model.account = account.id;
                    // $http.post("/rest/services/",
                    //     $scope.service_model

                    // ).success(function(response) {
                    //     if (response && (response.success || response.id)) {
                    //         messageService.show("Запись успешно сохранена");
                    dataExchangeService.post('loadData');
                    //     } else {
                    //         onFailSaving();
                    //     }

                    // })
                    // .error(onFailSaving);
                };

                $http.post("/api/v1/user/",
                    user
                ).success(function(response) {
                    if (response && (response.success || response.id)) {
                        saveServices(response);
                    } else {
                        onFailSaving();
                    }

                })
                    .error(onFailSaving);

            } else {

                // console.log($scope.serviceForm.$error)

                // angular
                //     .element(':input.ng-invalid')
                //     .first()
                //     .focus()
                //     .closest('.form-group')
                //     .addClass('has-error');
            }

        };

        $scope.reset = function() {
            $scope.user = angular.copy($scope.master);
        };
        $scope.reset();
    }
).$inject = ['$scope', '$http', 'dataExchangeService', 'messageService'];