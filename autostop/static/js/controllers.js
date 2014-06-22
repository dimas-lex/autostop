AutoApp.controller('AlertDemoCtrl', function($scope, $timeout, dataExchangeService) {

    $scope.$on('show', function(_event, agrs) {
        $scope.alerts.push(agrs);
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