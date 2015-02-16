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

        function getData(successCallback, errorCallback, params) {
            console.log(params);
            return $http.get(_url, {
                            method: 'GET',
                            params: params
                        })
                        .then(
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
