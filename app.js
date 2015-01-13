(function() {
    angular.module('d.Filters', []);
    angular.module('d.Actions', []);
    angular.module('d.List', []);
    angular.module('d.Keyboard', []);
    angular.module('d', ['d.Filters', 'd.Actions', 'd.List', 'd.Keyboard', 'ngSanitize']);
})();