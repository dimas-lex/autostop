AutoApp.filter('range', function() {
    return function(input, total) {
        total = parseInt(total, 10);
        for (var i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    };
});

/**
 * dataExchangeService - Services for exchanging of different events between different controllers
 *
 */
AutoApp.factory('dataExchangeService', function($rootScope) {
    return {
        post: function(_event, account) {
            $rootScope.$broadcast(_event || 'loadAccount', account || {});
        }
    };
});

/**
 * messageService - Services for exchanging of different events between different controllers
 *
 */
AutoApp.factory('messageService',
    function($rootScope, dataExchangeService) {
        var messageService = {
            show: function(params) {

                if (!angular.isObject(params)) {
                    params = {
                        msg: params || 'Ошибка',
                        type: 'danger'
                    };
                }
                dataExchangeService.post("show", params);
            }, //success
            warn: function(msg) {
                messageService.show({
                    msg: msg,
                    type: 'warning'
                });
            },
            success: function(msg) {
                messageService.show({
                    msg: msg,
                    type: 'success'
                });
            },
            error: function(msg) {
                messageService.show({
                    msg: msg,
                    type: 'danger'
                });
            }
        };
        return messageService;
    }).$inject = ['dataExchangeService'];