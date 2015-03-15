(function() {
    angular.module('d.Filters')
    .directive('dFilters', filtersDirective);

    function filtersDirective() {
        return {
            templateUrl: 'filters.tpl.html',
            replace: true,
            scope: {
                listName: '@',
                $setup: '&setup',
                $fields: '&fields',
                autoSubmit: '@'
            },
            bindToController: true,
            controller: listController,
            controllerAs: '$filters'
        };

        function listController($scope) {
            var _pageAndSortData = {};
            var $filters = this;
            $filters.$model = {};

            $filters.submit = submit;

            if ($filters.autoSubmit) {
                $scope.$watch('$filters.$model', submit, true);
            }

            function submit() {
                if ($filters.$setup() && $filters.$setup().filters && $filters.$setup().filters.onChange) {
                    $filters.$setup().filters.onChange(angular.extend({}, $filters.$model, _pageAndSortData));
                }
            }

            $scope.$on($filters.listName + 'SetPageAndSort', function(event, data) {
                _pageAndSortData = data;
                submit();
            });
        }
    }
})();
