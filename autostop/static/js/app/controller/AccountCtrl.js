'use strict';
AutoApp.controller('AccountCtrl',
    function($scope, $http, dataExchangeService, messageService, $timeout) {

        $scope.$on('updateAccountModel', function(_event, user) {
            user = angular.isObject(user) ? user : {};
            $scope.user = user;

            angular
                .element('div.has-error')
                .removeClass('has-error');

        });
        $("#reset_button").click(function() {
            $('#add_model_window').modal('hide');
        });
        $scope.processForm = function() {

            console.log($scope.user)
            if ($scope.accountForm.$valid && $scope.serviceForm.$valid) {

                var errorMsgOnDelete = "Во время выполнения запроса произошла ошибка. Запись не сохранена";

                var onFailSaving = function() {
                    messageService.error(errorMsgOnDelete);
                    dataExchangeService.post('loadData');
                };
                var saveServices = function(account) {
                    dataExchangeService.post('loadData');
                };

                $http.put("/api/v1/user/",
                    $scope.account_model

                ).success(function(response) {
                    if (response && (response.success || response.id)) {
                        saveServices(response);
                    } else {
                        onFailSaving();
                    }

                })
                    .error(onFailSaving);

            } else {

                console.log($scope.serviceForm.$error)

                angular
                    .element(':input.ng-invalid')
                    .first()
                    .focus()
                    .closest('.form-group')
                    .addClass('has-error');
            }
        };
    }
).$inject = ['$scope', '$http', 'dataExchangeService', 'messageService', '$timeout'];