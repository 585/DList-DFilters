(function() {
    angular.module('d.Filters')
    .directive('dFilters', filtersDirective);

    filtersDirective.$inject = ['$rootScope'];

    function filtersDirective($rootScope) {
        return {
            templateUrl: 'filters.tpl.html',
            replace: true,
            scope: {
                listName: '@',
                $fields: '&fields',
                autoSubmit: '@'
            },
            bindToController: true,
            controller: listController,
            controllerAs: '$filters'
        };

        function listController($scope) {
            var $filters = this;
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
