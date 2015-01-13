(function() {
    angular.module('d.List')
    .directive('editModeButton', editModeButtonDirective);

    editModeButtonDirective.$inject = ['$rootScope'];

    function editModeButtonDirective($rootScope) {
        return {
            templateUrl: 'edit-mode-button.tpl.html',
            replace: true,
            link: editModeButtonLink,
            controller: editModeButtonController,
            controllerAs: 'vm'
        };

        function editModeButtonLink(scope, element, attrs) {
            scope.size = attrs.size;
        }

        function editModeButtonController($scope) {
            var vm = this;

            vm.changeEditMode = changeEditMode;
            vm.saveEditData = saveEditData;
            vm.cancelEditData = cancelEditData;

            function changeEditMode() {
                $scope.$parent.$list.$edit = !$scope.$parent.$list.$edit;
            }

            function cancelEditData() {
                $rootScope.$broadcast('dList.cancelEditData');
                changeEditMode();
            }

            function saveEditData() {
                $rootScope.$broadcast('dList.saveEditData');
                changeEditMode();
            }
        }
    }
})();
