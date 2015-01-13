(function() {
    angular.module('d.Keyboard')
    .service('keyboardService', keyboardService);

    function keyboardService() {
        return {
            altPressed: false
        };
    }
})();
