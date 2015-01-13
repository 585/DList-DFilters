(function() {

    angular.module('d.Actions')
    .directive('actionBox', actionBoxDirective);

    function actionBoxDirective() {
        return {
            transclude: true,
            templateUrl: 'action-box.tpl.html',
            replace: true,
            controller: actionBoxController,
            scope: {
                label: '@',
                size: '@',
                icon: '@'
            },
            controllerAs: 'vm'
        };

        function actionBoxController($scope) {
            var vm = this;
            $scope.$watch('$parent.$parent.$list.$elements', function(n) {
                vm.elements = n;
            });
        }
    }
})();
