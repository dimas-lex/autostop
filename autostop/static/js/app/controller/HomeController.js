// 'use strict';
AutoApp.controller('HomeController', function($scope) {

    $scope.slides = [{
        image: 'static/images/hitchhiking_01.png',
        text: 'Image 00'
    }, {
        image: 'static/images/hitchhiking_02.png',
        text: 'Image 00'
    }, {
        image: 'static/images/hitchhiking_03.png',
        text: 'Image 00'
    }, {
        image: 'static/images/hitchhiking_04.png',
        text: 'Image 00'
    }, {
        image: 'static/images/hitchhiking_05.png',
        text: 'Image 00'
    }];

    $scope.myInterval = 5000;
    var slides = $scope.slides;
    $scope.addSlide = function(url, text) {

        slides.push({
            image: url,
            text: text
        });
    };


});
AutoApp.controller('TabsUserCtrl', function($scope) {
    $scope.customer = {
        name: 'bla',
        address: 'bla -la'
    };

    $scope.tabs = [{
        title: 'Dynamic Title 1',
        content: 'Dynamic content 1'
    }];

});