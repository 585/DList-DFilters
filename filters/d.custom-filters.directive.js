(function() {
    angular.module('d.Filters')
    .directive('dCustomFilters', filtersDirective);

    filtersDirective.$inject = ['$rootScope', '$compile'];

    function filtersDirective($rootScope, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'custom-filters.tpl.html',
            replace: true,
            transclude: true,
            link: filtersLink,
            scope: {
                listName: '@',
                autoSubmit: '@'
            },
            bindToController: true,
            controller: filtersController,
            controllerAs: '$filters'
        };

        function filtersLink(scope, element, attrs, ctrl, $transcludeFn) {
            element.append(new $transcludeFn(scope, function(clonedelem, newscope) {
                $compile(clonedelem)(newscope);
            }));
        }

        function filtersController($scope) {
            var $filters = this;
            $filters.$model = {};

            $filters.submit = submit;

            if ($filters.autoSubmit) {
                $scope.$watch('$filters.$model', submit, true);
            }

            function submit() {
                console.log('submit');
                //broadcasts event for list to reload
                $rootScope.$broadcast($filters.listName + 'Reload', $filters.$model);
            }

        }
    }
})();
