'use strict';

AutoApp.controller('AddUserCtrl',
    function($scope, $http, dataExchangeService, messageService) {
        $scope._getMockData = function() {
            return {
                email: "email" + Number(Math.random() * 1000).toFixed(0) + "@ya.ru",
                password: "password" + Number(Math.random() * 1000).toFixed(0),
                first_name: "first_name" + Number(Math.random() * 1000).toFixed(0),
                last_name: "last_name" + Number(Math.random() * 1000).toFixed(0),
                age: Number(Math.random() * 100).toFixed(0),
                is_driver: (Number(Math.random() * 10).toFixed(0) % 2) === 0
            };
        };


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
                    console.log(response);

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
            // $scope.user = angular.copy($scope.master);
            $scope.user = $scope._getMockData();
        };
        $scope.reset();
    }
).$inject = ['$scope', '$http', 'dataExchangeService', 'messageService'];