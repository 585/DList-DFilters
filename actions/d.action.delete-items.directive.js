(function() {
    angular.module('d.List')
    .directive('actionDelete', actionDeleteDirective);

    function actionDeleteDirective() {
        return {
            restrict: 'E',
            controller: actionDeleteController,
            controllerAs: 'vm',
            templateUrl: 'action.delete-items.tpl.html',
            replace: true
        };

        function actionDeleteController($scope) {

            var vm = this;
            vm.deleteItems = deleteItems;

            function deleteItems() {
                var indexes = [];
                angular.forEach(vm.elements, function(element, index) {
                    if (element.$checked) {
                        indexes.push(index);
                    }
                });

                if (indexes.length > 0) {
                    angular.forEach(indexes, function(index) {
                        vm.elements.splice(index, 1);
                    });
                }
            }

            $scope.$watch('$parent.vm.elements', function(n) {
                vm.elements = n;
            });

        }
    }
})();
