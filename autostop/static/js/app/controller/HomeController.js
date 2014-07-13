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
    $scope.addSlide = function() {

        var newWidth = 600 + slides.length;
        slides.push({
            image: 'http://placekitten.com/' + newWidth + '/300',
            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });

        console.log(slides)
    };
    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }

});
// AutoApp.controller('SliderController', function($scope) {
//     $scope.initPic = 0;

// });

function CarouselDemoCtrl($scope) {

}