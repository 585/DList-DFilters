(function() {
    angular.module('d.List')
    .service('dListService', dListService);

    dListService.$inject = ['$http'];

    function dListService($http) {
        var _url;

        return {
            setUrl: setUrl,
            getUrl: getUrl,
            getData: getData
        };

        function setUrl(url) {
            _url = url;
        }

        function getUrl() {
            return _url;
        }

        function getData(successCallback, errorCallback, postData) {
            var request = postData ? $http.post(_url, postData) : $http.get(_url);
            return request.then(
                function success(response) {
                    return successCallback(response.data);
                },
                function error(response) {
                    return errorCallback(response.data);
                }
            );
        }
    }
})();
