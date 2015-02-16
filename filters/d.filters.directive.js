(function() {
    angular.module('d.Filters')
    .directive('dFilters', filtersDirective);

    filtersDirective.$inject = ['$rootScope'];

    function filtersDirective($rootScope) {
        return {
            templateUrl: 'filters.tpl.html',
            replace: true,
            bindToController: true,
            scope: {
                listName: '@',
                setup: '&',
                $fields: '&fields',
                autoSubmit: '@'
            },
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
                console.log($filters.$model);
                $rootScope.$broadcast($filters.listName + 'Reload', $filters.$model);
            }
        }
    }
})();
