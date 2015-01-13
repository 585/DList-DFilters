(function() {
    angular.module('d.List')
    .directive('editInput', editInput);

    editInput.$inject = ['keyboardService', '$http'];

    function editInput(keyboardService, $http) {
        return {
            templateUrl: 'edit-input.tpl.html',
            replace: true,
            controller: editInputController,
            controllerAs: 'vm',
            link: editInputLink,
            scope: {
                value: '=',
                setup: '&'
            }
        };

        function editInputController($scope) {
            var vm = this;
            vm.selectDataOptions = [];
            vm.editValue = $scope.value;
            vm.setup = $scope.setup();

            var killWatch = $scope.$watch('setup', function(n, o) {
                if (n()) {
                    setData();
                    killWatch();
                }
            });

            function setData() {
                if (vm.setup.dataUrl) {
                    $http.get(vm.setup.dataUrl).then(
                        function success(response) {
                            //TODO: connect to real response
                            vm.selectDataOptions = ['Newton', 'Barry','Night'];
                        },
                        function error(response) {
                            console.log('CAUTION: Error while loading external select options from ' + vm.setup.dataUrl);
                        }
                    );
                } else if (vm.setup.data) {
                    vm.selectDataOptions = vm.setup.data;
                }
            }

            $scope.$on('dList.saveEditData', function() {
                $scope.value = vm.editValue;
            });

            $scope.$on('dList.cancelEditData', function() {
                vm.editValue = $scope.value;
            });
        }

        function editInputLink(scope, element, attrs) {

            element.bind('keyup', function(e) {
                if (e.keyCode === 18) {
                    keyboardService.altPressed = false;
                }
            });

            element.bind('keydown', function(e) {
                if (e.keyCode === 18) {
                    keyboardService.altPressed = true;
                }

                if (keyboardService.altPressed) {
                    var el, select, input;
                    switch (e.keyCode) {
                        case 37:
                            el = angular.element(element.parent().parent()[0].previousElementSibling);
                            break;
                            case 38:
                                var el = angular.element(angular.element(element.parent().parent().parent()[0].previousElementSibling)
                                .find('td')[element.parent().parent()[0].cellIndex]);
                                break;
                                case 39:
                                    var el = element.parent().parent().next();
                                    break;
                                    case 40:
                                        var el = angular.element(element.parent().parent().parent().next()
                                        .find('td')[element.parent().parent()[0].cellIndex]);
                                        break;
                                    }
                                    select = el.find('select')[0];
                                    input = el.find('input')[0];
                                    if (select) select.focus();
                                    if (input) input.focus();

                                }
                            });
                        }
                    }
                })();
