(function() {
    angular.module('d.List')
    .directive('actionAddItem', actionAddItemDirective);

    function actionAddItemDirective() {
        return {
            restrict: 'E',
            controller: actionAddItemController,
            templateUrl: 'action.add-item.tpl.html',
            replace: true
        };

        function actionAddItemController($scope) {
            var vm = this;
        }
    }
})();
