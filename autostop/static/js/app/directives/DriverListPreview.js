// AutoApp.directive('driverListPreview', function() {
//     return {
//         template: 'Name: {{customer.name}} Address: {{customer.address}}'
//     };
// });

'use strict';

AutoApp.directive('driverListPreview', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        template: '<h3>Hello World!!</h3>'
    };
});