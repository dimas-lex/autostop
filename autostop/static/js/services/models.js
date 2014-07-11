'use strict';

AutoApp.factory('AUser', ['$http',
    function($http) {
        var url = 'api/user/';
        function AUser(userData) {
            if (userData) {
                this.setData(userData);
            }
            // Some other initializations related to user
        }

        AUser.prototype = {
            setData: function(userData) {
                angular.extend(this, userData);
            },
            delete: function() {
                $http.delete(url + this.id);
            },
            update: function() {
                $http.put(url + this.id, this);
            },
            getImageUrl: function(width, height) {
                return 'images/service/' + this.id + '/' + width + '/'+ height;
            }
        };
        return AUser;
}]);