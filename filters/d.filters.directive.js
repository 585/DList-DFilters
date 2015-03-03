(function() {
    angular.module('d.Filters')
    .directive('dFilters', filtersDirective);

    function filtersDirective() {
        return {
            templateUrl: 'filters.tpl.html',
            replace: true,
            bindToController: true,
            scope: {
                listName: '@',
                $setup: '&setup',
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
                if ($filters.$setup() && $filters.$setup().filters && $filters.$setup().filters.onChange) {
                    $filters.$setup().filters.onChange($filters.$model);
                }
            }
        }
    }
})();
