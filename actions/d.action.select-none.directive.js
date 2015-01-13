(function() {

    angular.module('d.Actions')
    .directive('actionSelectNone', actionSelectNoneDirective);

    actionSelectNoneDirective.$inject = ['dCheckboxesService'];

    function actionSelectNoneDirective(dCheckboxesService) {
        return {
            templateUrl: 'action.select-none.tpl.html',
            replace: true,
            controller: actionSelectNoneController,
            controllerAs: 'snvm'
        };

        function actionSelectNoneController($scope) {
            var snvm = this;
            snvm.selectNone = selectNone;

            $scope.$watch('$parent.vm.elements', function(n) {
                snvm.elements = n;
            });

            function selectNone() {
                angular.forEach(snvm.elements, function(element) {
                    dCheckboxesService.unselect(element);
                });
            }
        }
    }
})();
