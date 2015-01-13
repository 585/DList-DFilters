(function() {

    angular.module('d.Actions')
    .directive('actionSelectAll', actionSelectAllDirective);

    actionSelectAllDirective.$inject = ['dCheckboxesService'];

    function actionSelectAllDirective(dCheckboxesService) {
        return {
            templateUrl: 'action.select-all.tpl.html',
            replace: true,
            controller: actionSelectAllController,
            controllerAs: 'savm'
        };

        function actionSelectAllController($scope) {
            var savm = this;
            savm.selectAll = selectAll;

            $scope.$watch('$parent.vm.elements', function(n) {
                savm.elements = n;
            });

            function selectAll() {
                angular.forEach(savm.elements, function(element) {
                    dCheckboxesService.select(element);
                });
            }
        }
    }
})();
