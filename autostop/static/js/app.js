'use strict';


// configure our routes
AutoApp.config(function($routeProvider, $interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');

    $routeProvider.when('/', {
        templateUrl: 'pages/home.html',
        controller: 'HomeController'
    })

    // // route for the about page
    // .when('/about', {
    //     templateUrl: 'pages/about.html',
    //     controller: 'aboutController'
    // })

    // // route for the contact page
    // .when('/contact', {
    //     templateUrl: 'pages/contact.html',
    //     controller: 'contactController'
    // });
});

AutoApp.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRFToken'] = AutoApp._csrf_token;
        // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        // $httpProvider.defaults.transformRequest = [

        //     function(data) {
        //         /**
        //          * The workhorse; converts an object to x-www-form-urlencoded serialization.
        //          * @param {Object} obj
        //          * @return {String}
        //          */
        //         var param = function(obj) {
        //             var query = '';
        //             var name, value, fullSubName, subName, subValue, innerObj, i;

        //             for (name in obj) {
        //                 value = obj[name];

        //                 if (value instanceof Array) {
        //                     for (i = 0; i < value.length; ++i) {
        //                         subValue = value[i];
        //                         fullSubName = name + '[' + i + ']';
        //                         innerObj = {};
        //                         innerObj[fullSubName] = subValue;
        //                         query += param(innerObj) + '&';
        //                     }
        //                 } else if (value instanceof Object) {
        //                     for (subName in value) {
        //                         subValue = value[subName];
        //                         fullSubName = name + '[' + subName + ']';
        //                         innerObj = {};
        //                         innerObj[fullSubName] = subValue;
        //                         query += param(innerObj) + '&';
        //                     }
        //                 } else if (value !== undefined && value !== null) {
        //                     query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        //                 }
        //             }

        //             return query.length ? query.substr(0, query.length - 1) : query;
        //         };

        //         return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        //     }
        // ]; test
    }
]);