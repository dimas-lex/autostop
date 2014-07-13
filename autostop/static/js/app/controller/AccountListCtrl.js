'use strict';

var AccountListCtrl = AutoApp.controller('AccountListCtrl',
    function($scope, $http, dataExchangeService, messageService) {

        $scope.loadData = function(offset) {
            $http.get('/api/v1/user/', {
                params: {
                    offset: offset && offset > 0 ? offset : 0
                }

            }).success(function(data) {
                $scope.users = data.objects;
                $scope.meta = data.meta;
            }).error(function() {
                messageService.error("Во время загрузки произошла ошибка. Вам  необходимо обновить страницу для повторения запроса.");
            });
        };

        $scope.deleteUser = function(user) {
            bootbox.confirm(
                "Вы хотите удалить  '{0}' {1}".format(user.first_name, user.last_name),
                function(wantToDelete) {
                    if (wantToDelete) {
                        var errorMsgOnDelete = "Во время Удаления произошла ошибка. Запись возможно не удалена";
                        $http.delete(user.resource_uri).success(function(response) {
                            if (response && response.success) {
                                messageService.show("Запись успешно удалена");
                            } else {
                                messageService.error(errorMsgOnDelete);
                            }
                            $scope.loadData();
                        }).error(function() {
                            $scope.loadData();
                            messageService.error(errorMsgOnDelete);
                        });

                    }
                }
            );
        };

        $scope.$on('loadData', function() {
            $scope.loadData();
            $('#add_model_window').modal('hide');
        });
        $scope.openUserAddUpdateWnd = function(user) {
            $('#add_model_window').modal({});
            dataExchangeService.post('updateAccountModel', user || {});
            // accountFormValidator.resetForm();
        };

        $scope.loadData();
    }
);
AccountListCtrl.$inject = ['$scope', '$http', 'dataExchangeService', 'messageService'];