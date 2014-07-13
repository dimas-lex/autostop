AutoApp.controller('AlertDemoCtrl', function($scope, $timeout, dataExchangeService) {

    $scope.$on('show', function(_event, args) {
        args._uid = Utils.createUUID();
        $scope.alerts.push(args);

        $timeout(function() {
            var chld  = $('#alert_container:first-child');
            chld.fadeOut(500);
        }, Math.max(String(args.msg).length,  5000));

    });

    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    // $timeout(function() {
    //     console.log("test alert");
    //     messageService.show("test")
    // }, 4000);

}).$inject = ['$scope', '$timeout', 'dataExchangeService'];

// AutoApp.controller('AutoBaseCtrl', ['$scope',
// //     function($scope) {
// //         $("input[name*='date']").datepicker({
// //             'data-format': "dd.mm.yyyy",
// //             pickTime: false,
// //             language: "ru-RU",
// //             format: "dd.mm.yyyy",
// //             autoclose: true,
// //             clearBtn: true,
// //             orientation: "top right",
// //             weekStart: 1
// //         });
// //     }
// ]);