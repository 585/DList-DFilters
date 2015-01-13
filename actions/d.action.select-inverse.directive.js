(function() {

    angular.module('d.Actions')
    .directive('actionSelectInverse', actionSelectInverseDirective);

    actionSelectInverseDirective.$inject = ['dCheckboxesService'];

    function actionSelectInverseDirective(dCheckboxesService) {
        return {
            templateUrl: 'action.select-inverse.tpl.html',
            replace: true,
            controller: actionSelectInverseController,
            controllerAs: 'sivm'
        };

        function actionSelectInverseController($scope) {
            var sivm = this;
            sivm.selectInverse = selectInverse;

            $scope.$watch('$parent.vm.elements', function(n) {
                sivm.elements = n;
            });

            function selectInverse() {
                angular.forEach(sivm.elements, function(element) {
                    dCheckboxesService.invert(element);
                });
            }
        }
    }
})();
