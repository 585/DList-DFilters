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
                setup: '&',
                fields: '&'
            },
            controller: listController,
            controllerAs: '$filters'
        };

        function listController($scope) {
            var $filters = this;
            $filters.$fields = $scope.fields();
            $filters.$model = {};
            $filters.submit = submit;

            function submit() {
                $rootScope.$broadcast($scope.listName + 'Reload', $filters.$model);
            }
        }
    }
})();
