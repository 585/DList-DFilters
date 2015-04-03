(function() {
    angular.module('d.Filters')
    .directive('dCustomFilters', filtersDirective);

    filtersDirective.$inject = ['$rootScope'];

    function filtersDirective($rootScope) {
        return {
            templateUrl: 'custom-filters.tpl.html',
            replace: true,
            transclude: true,
            scope: {
                listName: '@',
                autoSubmit: '@'
            },
            bindToController: true,
            controller: listController,
            controllerAs: '$filters'
        };

        function listController($scope) {
            var $filters = this;

            $scope.go = function() {
                console.log('go');
            }

            $filters.e = 'eee';
            console.log($filters, $scope);
            $filters.$model = {};

            $filters.submit = submit;

            if ($filters.autoSubmit) {
                $scope.$watch('$filters.$model', submit, true);
            }

            function submit() {
                //broadcasts event for list to reload
                $rootScope.$broadcast($filters.listName + 'Reload', $filters.$model);
            }

        }
    }
})();
