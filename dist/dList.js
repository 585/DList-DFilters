(function() {
    angular.module('d.Filters', []);
    angular.module('d.Actions', []);
    angular.module('d.List', []);
    angular.module('d.Keyboard', []);
    angular.module('d.Helpers', []);
})();

angular.module("d.Filters").run(["$templateCache", function($templateCache) {$templateCache.put("action-box.tpl.html","<div class=\"btn-group\">\n	<button class=\"btn btn-default btn-{{size}} dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-expanded=\"false\" bs-drop-down>\n		<span class=\"glyphicon glyphicon-{{icon}}\" aria-hidden=\"true\"></span> <span ng-bind=\"label\"></span> <span class=\"caret\"></span>\n	</button>\n	<ul class=\"dropdown-menu\" role=\"menu\" ng-transclude></ul>\n</div>\n");
$templateCache.put("action.add-item.tpl.html","<li>\n    <a href=\"\" ng-click=\"savm.selectAll()\"><i class=\"glyphicon glyphicon-plus\"></i> Add item</a>\n</li>");
$templateCache.put("action.delete-items.tpl.html","<li>\n    <a href=\"\" ng-click=\"vm.deleteItems()\"><i class=\"glyphicon glyphicon-remove\"></i> Delete</a>\n</li>");
$templateCache.put("action.select-all.tpl.html","<li>\n    <a href=\"\" ng-click=\"savm.selectAll()\">Select All</a>\n</li>");
$templateCache.put("action.select-inverse.tpl.html","<li>\n    <a href=\"\" ng-click=\"sivm.selectInverse()\">Select Inverse</a>\n</li>");
$templateCache.put("action.select-none.tpl.html","<li>\n    <a href=\"\" ng-click=\"snvm.selectNone()\">Select None</a>\n</li>");
$templateCache.put("filters.tpl.html","<form role=\"form\" class=\"row d-filters\">\n    <div ng-repeat=\"field in $filters.$fields()\" ng-switch=\"field.type\">\n        <div ng-switch-when=\"text\" class=\"form-group col-xs-{{field.size[0]}} col-sm-{{field.size[1]}} col-md-{{field.size[2]}} col-lg-{{field.size[3]}} d-filters__text-field\">\n            <label for=\"{{field.ngModel}}\">{{field.label}}</label>\n            <input type=\"text\" name=\"{{field.ngModel}}\" class=\"form-control\" ng-model=\"$filters.$model[field.ngModel]\"\n                ng-model-options=\"{ updateOn: \'default blur\', debounce: {\'default\': 500, \'blur\': 0} }\" />\n        </div>\n        <div ng-switch-when=\"select\" class=\"form-group col-xs-{{field.size[0]}} col-sm-{{field.size[1]}} col-md-{{field.size[2]}} col-lg-{{field.size[3]}} d-filters__select-box\">\n            <label for=\"{{field.ngModel}}\">{{field.label}}</label>\n            <select name=\"{{field.ngModel}}\" class=\"form-control\" ng-model=\"$filters.$model[field.ngModel]\" ng-options=\"option.key as option.value for option in field.ngOptions\">\n            </select>\n        </div>\n        <div ng-switch-when=\"checkbox\" class=\"checkbox col-xs-{{field.size[0]}} col-sm-{{field.size[1]}} col-md-{{field.size[2]}} col-lg-{{field.size[3]}} d-filters__checkbox\">\n            <label>\n                <input type=\"checkbox\" ng-model=\"$filters.$model[field.ngModel]\"/>{{field.label}}\n            </label>\n        </div>\n        <div ng-switch-when=\"selectize\" class=\"col-xs-{{field.size[0]}} col-sm-{{field.size[1]}} col-md-{{field.size[2]}} col-lg-{{field.size[3]}} d-filters__selectize\">\n            <label for=\"{{field.ngModel}}\">{{field.label}}</label>\n            <selectize ng-model=\"$filters.$model[field.ngModel]\" config=\"field.config\"></selectize>\n        </div>\n        <div ng-switch-when=\"datePicker\" class=\"col-xs-{{field.size[0]}} col-sm-{{field.size[1]}} col-md-{{field.size[2]}} col-lg-{{field.size[3]}} d-filters__date-picker\">\n            <label for=\"{{field.ngModel}}\">{{field.label}}</label>\n            <input type=\"text\" class=\"form-control\" model=\"$filters.$model[field.ngModel]\" date-picker editable/>\n        </div>\n    </div>\n    <button ng-if=\"!$filters.autoSubmit\" class=\"btn btn-primary d-filters__submit\" ng-click=\"$filters.submit()\">Submit</button>\n</form>\n");
$templateCache.put("edit-input.tpl.html","<div class=\"form-group\">\n    <select ng-if=\"vm.setup.type === \'select\'\" ng-model=\"vm.editValue\" ng-options=\"option for option in vm.selectDataOptions\" class=\"form-control\">\n    </select>\n    <input ng-if=\"vm.setup.type !== \'select\'\" type=\"text\" class=\"form-control\" ng-model=\"vm.editValue\">\n</div>");
$templateCache.put("edit-mode-button.tpl.html","<span class=\"pull-right\">\n    <button class=\"btn btn-{{size}} btn-primary\" ng-if=\"!$parent.$list.$edit\" type=\"button\" ng-click=\"vm.changeEditMode()\">\n        <span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span> \n        <span>Edit</span>\n    </button>\n    \n    <button class=\"btn btn-{{size}} btn-success\" ng-if=\"$parent.$list.$edit\" type=\"button\" ng-click=\"vm.saveEditData()\">\n        <span class=\"glyphicon glyphicon-floppy-saved\" aria-hidden=\"true\"></span> \n        <span>Save</span>\n    </button>\n    \n    <button class=\"btn btn-{{size}} btn-default\" ng-if=\"$parent.$list.$edit\" type=\"button\" ng-click=\"vm.cancelEditData()\">\n        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> \n        <span>Cancel</span>\n    </button>\n</span>");
$templateCache.put("list.tpl.html","<div class=\"d-list\">\n    <div ng-transclude class=\"d-list__multi-actions\"></div>\n    <table ng-if=\"!responsiveMode\" class=\"d-list-table\">\n        <thead class=\"d-list-table__headers\" ng-if=\"$list.$setup.enable.header\">\n            <tr>\n                <th class=\"d-list-table__header\" ng-if=\"$list.$setup.enable.checkboxes\"></th>\n                <th class=\"d-list-table__header\" ng-repeat=\"header in $list.$headers\">\n                    <a href=\"\" ng-if=\"$list.headerIsSortable(header)\" ng-click=\"$list.sortBy(header)\" class=\"d-list-table__header-sortable\">\n                        {{$list.getHeaderLabel(header) | capitalize}}\n                        <i ng-if=\"$list.$sort.by === header\" class=\"glyphicon\" ng-class=\"{\'glyphicon-chevron-down\': $list.$sort.order === \'desc\', \'glyphicon-chevron-up\': $list.$sort.order === \'asc\'}\" style=\"font-size: 10px; margin: 4px 0 0 4px\"></i>\n                    </a>\n                    <span ng-if=\"!$list.headerIsSortable(header)\">\n                        {{$list.getHeaderLabel(header) | capitalize}}\n                    </span>\n                </th>\n            </tr>\n        </thead>\n        <tfoot class=\"d-list-table__footer\" ng-if=\"$list.$setup.enable.footer\">\n        </tfoot>\n        <tbody class=\"d-list-table__body\">\n            <tr ng-repeat=\"element in $list.$elements\" class=\"d-list-table__body-row\">\n                <td ng-if=\"$list.$setup.enable.checkboxes\" class=\"d-list-table__body-cell d-list-table__body-cell-checkbox\">\n                    <input type=\"checkbox\" ng-model=\"element.$checked\" />\n                </td>\n                <td ng-hide=\"$list.$edit\" ng-repeat=\"header in $list.$headers\" class=\"d-list-table__body-cell\">\n                    <div ng-if=\"!$list.$setup.templates[header]\">{{element[header]}}</div>\n                    <div ng-if=\"$list.$setup.templates[header]\">\n                        <item data-template=\"$list.$setup.templates[header]\" data-model=\"element[header]\"></item>\n                    </div>\n                </td>\n                <td ng-show=\"$list.$edit\" ng-repeat=\"header in $list.$headers\" class=\"d-list-table__body-cell--edit\">\n                    <div class=\"form-group\">\n                        <edit-input data-value=\"element[header]\" data-setup=\"$list.$setup.edit[header]\"></edit-input>\n                    </div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n\n    <table ng-if=\"responsiveMode\" class=\"d-list-table-small\" ng-repeat=\"element in $list.$elements\">\n        <tbody>\n            <tr ng-repeat=\"header in $list.$headers\" class=\"d-list-table-small__row\">\n                <td class=\"d-list-table-small__header\">\n                    <a href=\"\" ng-if=\"$list.headerIsSortable(header)\" ng-click=\"$list.sortBy(header)\" class=\"d-list-table-small__header-sortable\">\n                        {{$list.getHeaderLabel(header) | capitalize}}\n                        <i ng-if=\"$list.$sort.by === header\" class=\"glyphicon\" ng-class=\"{\'glyphicon-chevron-down\': $list.$sort.order === \'desc\', \'glyphicon-chevron-up\': $list.$sort.order === \'asc\'}\" style=\"font-size: 10px; margin: 4px 0 0 4px\"></i>\n                    </a>\n                    <span ng-if=\"!$list.headerIsSortable(header)\">\n                        {{$list.getHeaderLabel(header) | capitalize}}\n                    </span>\n                </td>\n                <td ng-hide=\"$list.$edit\" class=\"d-list-table-small__body-cell\">\n                    <div ng-if=\"!$list.$setup.templates[header]\">{{element[header]}}</div>\n                    <div ng-if=\"$list.$setup.templates[header]\">\n                        <item data-template=\"$list.$setup.templates[header]\" data-model=\"element[header]\"></item>\n                    </div>\n                </td>\n\n                <td ng-show=\"$list.$edit\" class=\"d-list-table-small__body-cell--edit\">\n                    <div class=\"form-group\">\n                        <edit-input data-value=\"element[header]\" data-setup=\"$list.$setup.edit[header]\"></edit-input>\n                    </div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n\n    <section ng-if=\"$list.$setup.enable.pagination\" class=\"d-list-pagination\">\n        <div class=\"input-group d-list-pagination__page-links\">\n            <span ng-bind=\"$list.$setup.i18n.pagination.prev\" ng-click=\"$list.$pagination.pageDown()\"\n                ng-disabled=\"$list.$pagination.data.page === 1\" class=\"input-group-addon btn btn-default d-list-pagination__prev\"></span>\n            <input type=\"text\" class=\"form-control\" ng-blur=\"$list.$pagination.ensureValidPage()\"\n                ng-model=\"$list.$pagination.data.page\" class=\"d-list-pagination__number\"/>\n            <span ng-bind=\"$list.$setup.i18n.pagination.next\" ng-click=\"$list.$pagination.pageUp()\"\n                ng-disabled=\"$list.$pagination.data.page === $list.$pagination.totalPages()\"\n                class=\"input-group-addon btn btn-default d-list-pagination__next\"></span>\n        </div>\n        <div class=\"d-list-pagination-summary\">\n            <div class=\"d-list-pagination-summary__items-number\">Showing items: {{$list.$pagination.fromItem()}} - {{$list.$pagination.toItem()}} of {{$list.$pagination.data.total}}</div>\n            <div class=\"d-list-pagination-summary__selected\">Selected: {{$list.selected()}}</div>\n            <div class=\"d-list-pagination-summary__total-pages\">Total pages: {{$list.$pagination.totalPages()}}</div>\n            <br/>\n            <div ng-if=\"$list.$pagination.data.pageSizeOptions\" class=\"d-list-pagination-summary__items-number-select btn-group\">\n                <button ng-repeat=\"pageSizeOption in $list.$pagination.data.pageSizeOptions\"\n                    ng-class=\"{active: pageSizeOption === $list.$pagination.data.pageSize}\"\n                    ng-click=\"$list.$pagination.setPageSize(pageSizeOption)\"\n                    type=\"button\" class=\"btn btn-default\">{{pageSizeOption}}</button>\n            </div>\n        </div>\n    </section>\n</div>\n");}]);
(function() {
    angular.module('d', ['d.Filters', 'd.Actions', 'd.List', 'd.Keyboard', 'd.Helpers', 'ngSanitize', 'bsDropDown'])
        .controller('MainController', mainController);

    mainController.$inject = [];

    function mainController() {
        var vm = this;
        vm.url = 'http://api.icndb.com/jokes/random/38';
        vm.els = [];
        vm.setup = {
            enable: {
                header: true,
                footer: false,
                sorting: true,
                pagination: true,
                filters: true,
                checkboxes: true
            },
            defaults: {
                sort: {
                    order: 'asc',
                    by: 'surname'
                },
                pagination: {
                    pageSize: 2,
                    page: 1,
                    pageSizeOptions: [2, 5, 10]
                }
            },
            templates: {
                name: '<div>This is a custom template for <b>{{$item.value}}</b></div>'
            },
            edit: {
                name: {
                    type: 'select',
                    data: ['Olivia', 'Alex', 'Susanne', 'Winston']
                },
                surname: {
                    type: 'select',
                    dataUrl: 'http://api.icndb.com/jokes/random/1'
                }
            },
            columns: {
                include: ['name', 'surname', 'age'],
                exclude: ['age'],
                order: [],
                sortables: ['surname'],
                labels: {
                    name: 'Name own label'
                }
            }
        };

        vm.elements = [{
            id: 1,
            name: 'Olivia',
            surname: 'Newton',
            age: 32
        }, {
            id: 2,
            name: 'Oliver',
            surname: 'Night',
            age: 12
        }, {
            id: 3,
            name: 'Felicia',
            surname: 'Low',
            age: 43
        }, {
            id: 4,
            name: 'Alex',
            surname: 'Night'
        }, {
            id: 5,
            name: 'Martin',
            surname: 'Fair',
            age: 54
        }];

        vm.fields = [{
            type: 'text',
            label: 'Name',
            ngModel: 'name'
        }, {
            type: 'select',
            label: 'Sex',
            ngModel: 'sex',
            ngOptions: [{
                key: 'male',
                value: 'Male'
            }, {
                key: 'female',
                value: 'Female'
            }]
        }, {
            type: 'checkbox',
            label: 'Single?',
            ngModel: 'single'
        }];
    }
})();

(function() {
    angular.module('bsDropDown', [])
    .directive('bsDropDown', bsDropDown);

    function bsDropDown() {
        return {
            restrict: 'A',
            link: bsDropDownLink
        };

        function bsDropDownLink(scope, element) {
            element.on('click', function() {
                $('.dropdown-menu').not(element.next()).hide();
                $(element).next().toggle();
            })
        }
    }
})();

(function() {
    angular.module('d.Helpers')
    .filter('capitalize', function() {
        return function(input, all) {
            return ( !! input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : '';
        };
    });
})();

(function() {
    angular.module('d.Keyboard')
    .service('keyboardService', keyboardService);

    function keyboardService() {
        return {
            altPressed: false
        };
    }
})();

(function() {

    angular.module('d.Actions')
    .directive('actionBox', actionBoxDirective);

    function actionBoxDirective() {
        actionBoxController.$inject = ['$scope'];
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

(function() {
    angular.module('d.List')
    .directive('actionAddItem', actionAddItemDirective);

    function actionAddItemDirective() {
        actionAddItemController.$inject = ['$scope'];
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

(function() {
    angular.module('d.List')
    .directive('actionDelete', actionDeleteDirective);

    function actionDeleteDirective() {
        actionDeleteController.$inject = ['$scope'];
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

(function() {

    angular.module('d.Actions')
    .directive('actionSelectAll', actionSelectAllDirective);

    actionSelectAllDirective.$inject = ['dCheckboxesService'];

    function actionSelectAllDirective(dCheckboxesService) {
        actionSelectAllController.$inject = ['$scope'];
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

(function() {

    angular.module('d.Actions')
    .directive('actionSelectInverse', actionSelectInverseDirective);

    actionSelectInverseDirective.$inject = ['dCheckboxesService'];

    function actionSelectInverseDirective(dCheckboxesService) {
        actionSelectInverseController.$inject = ['$scope'];
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

(function() {

    angular.module('d.Actions')
    .directive('actionSelectNone', actionSelectNoneDirective);

    actionSelectNoneDirective.$inject = ['dCheckboxesService'];

    function actionSelectNoneDirective(dCheckboxesService) {
        actionSelectNoneController.$inject = ['$scope'];
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

(function() {
    angular.module('d.Filters')
    .directive('dFilters', filtersDirective);

    function filtersDirective() {
        listController.$inject = ['$scope'];
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

(function() {
    angular.module('d.Helpers')
    .service('dCheckboxesService', checkboxesService);

    function checkboxesService() {
        return {
            select: select,
            unselect: unselect,
            invert: invert,
            isChecked: isChecked
        };

        function select(element) {
            element.$checked = true;
        }

        function unselect(element) {
            element.$checked = false;
        }

        function invert(element) {
            element.$checked = !element.$checked;
        }

        function isChecked(element) {
            return element.$checked;
        }
    }
})();

(function() {
    angular.module('d.List')
    .directive('editModeButton', editModeButtonDirective);

    editModeButtonDirective.$inject = ['$rootScope'];

    function editModeButtonDirective($rootScope) {
        editModeButtonController.$inject = ['$scope'];
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

(function() {
    angular.module('d.List')
    .directive('editInput', editInput);

    editInput.$inject = ['keyboardService', '$http'];

    function editInput(keyboardService, $http) {
        editInputController.$inject = ['$scope'];
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

(function() {
    angular.module('d.List')
    .directive('item', itemDirective);

    itemDirective.$inject = ['$compile'];

    function itemDirective($compile) {
        return {
            link: function(scope, element, attrs) {
                element.html(scope.template());
                $compile(element.contents())(scope);
            },
            scope: {
                template: '&',
                value: '&model'
            },
            controller: ['$scope', function($scope) {
                var $item = this;
                $item.value = $scope.value();
            }],
            controllerAs: '$item'
        };
    }
})();

(function() {
    angular.module('d.List')
    .directive('dList', listDirective);

    listDirective.$inject = ['$http', '$filter', '$compile', 'dListService', 'dCheckboxesService', 'dListSetup'];

    function listDirective($http, $filter, $compile, dListService, dCheckboxesService, dListSetup) {
            listController.$inject = ['$scope'];
        return {
            templateUrl: 'list.tpl.html',
            replace: true,
            transclude: true,
            scope: {
                elements: '&',
                setup: '&',
                url: '&',
                name: '@',
                responsiveMode: '=responsive'
            },
            controller: listController,
            controllerAs: '$list'
        };

        function listController($scope) {
            var $list = this,
            _elements = [];

            dListService.setUrl($scope.url());

            $list.$name = $scope.name;
            $list.selected = selected;
            $list.$edit = false;
            $list.sortBy = sortBy;
            $list.$setup = angular.extend({}, dListSetup.getSetup(), $scope.setup() ? $scope.setup() : {});

            $list.$headerLabels = $list.$setup.columns && $list.$setup.columns.labels ? $list.$setup.columns.labels : {};
            $list.$sort = $list.$setup && $list.$setup.defaults ? $list.$setup.defaults.sort : {};

            $list.$pagination = {
                data: {
                    pageSize: $list.$setup.defaults.pagination.pageSize,
                    page: $list.$setup.defaults.pagination.page,
                    pageSizeOptions: $list.$setup.defaults.pagination.pageSizeOptions,
                    total: null
                },
                pageUp: function pageUp() {
                    if (this.data.page === this.totalPages()) {
                        return;
                    }
                    this.data.page++;
                    _loadModel();
                },
                pageDown: function pageDown() {
                    if (this.data.page === 1) {
                        return;
                    }
                    this.data.page--;
                    _loadModel();
                },
                ensureValidPage: function ensureValidPage() {
                    if (this.data.page < 1) {
                        this.data.page = 1;
                    } else if (this.data.page > this.totalPages()) {
                        this.data.page = this.totalPages();
                    }
                    _loadModel();
                },
                totalPages: function totalPages() {
                    return Math.round(this.data.total / this.data.pageSize);
                },
                fromItem: function fromItem() {
                    if ((this.data.page - 1) * this.data.pageSize === 0) {
                        return 1;
                    } else {
                        return (this.data.page - 1) * this.data.pageSize;
                    }
                },
                toItem: function toItem() {
                    if (this.data.page * this.data.pageSize > this.data.total) {
                        return this.data.total;
                    } else {
                        return this.data.page * this.data.pageSize;
                    }
                },
                setPageSize: function setPageSize(size) {
                    this.data.pageSize = size;
                    this.data.page = 1;
                    _loadModel();
                }
            };

            $list.headerIsSortable = headerIsSortable;
            $list.getHeaderLabel = getHeaderLabel;

            /**
             * Checks wheter a provided header key should be sortable or not
             * @param {String} header Represents the key name of the header to be checked
             * @return {Boolean}
             */
            function headerIsSortable(headerKey) {
                return !$list.$setup.columns ||
                    !$list.$setup.columns.sortables ||
                    $list.$setup.columns.sortables.indexOf(headerKey) > -1;
            }

            /**
             * [getHeaderLabel description]
             */
            function getHeaderLabel(headerKey) {
                if (!$list.$headerLabels) {
                    return headerKey;
                } else {
                    return $list.$headerLabels[headerKey] ? $list.$headerLabels[headerKey] : headerKey;
                }
            }

            function _getHeaders(element) {
                var headers = [];
                for (var key in element) {
                    if (element.hasOwnProperty(key) && key[0] !== '$') {
                        if ($list.$setup.columns) {
                            if (!$list.$setup.columns.include) {
                                // if no setup for include columns is provided, then add all keys as headers
                                headers.push(key);
                            } else {
                                // otherwise add only include keys to headers
                                if ($list.$setup.columns.include && $list.$setup.columns.include.indexOf(key) > -1) {
                                    //if header is found in the 'include' list
                                    headers.push(key);
                                }
                            }
                            //if header is found in the 'exclude' list, remove it
                            if ($list.$setup.columns.exclude && $list.$setup.columns.exclude.indexOf(key) > -1) {
                                if (headers.indexOf(key) > -1) {
                                    headers.splice(headers.indexOf(key), 1);
                                }
                            }
                        } else {
                            headers.push(key);
                        }
                    }
                }
                return headers;
            }

            function selected() {
                var total = 0;
                angular.forEach($list.$elements, function(e) {
                    if (dCheckboxesService.isChecked(e)) {
                        total++;
                    }
                });
                return total;
            }

            function _loadModel(data) {
                if ($scope.url()) {
                    var postData = angular.extend({}, data, $list.$sort, $list.$pagination.data);
                    dListService.getData($list.$setup.data.onSuccess, $list.$setup.data.onError, postData).then(function(response) {
                        _elements = $filter('orderBy')(response, $list.$sort.by, $list.$sort.order === 'desc');
                        _addElementsCheckboxes();
                        $list.$pagination.data.total = _elements.length;
                        _fillModel();
                    });
                } else {
                    _elements = $filter('orderBy')($scope.elements(), $list.$sort.by, $list.$sort.order === 'desc');
                    _addElementsCheckboxes();
                    $list.$pagination.data.total = _elements.length;
                    _fillModel();
                }
            }

            function _addElementsCheckboxes() {
                angular.forEach(_elements, function(e) {
                    angular.extend(e, {$checked: false});
                });
            }

            function _fillModel() {
                $list.$elements = _elements.slice(
                    (($list.$pagination.data.page - 1) * $list.$pagination.data.pageSize),
                    $list.$pagination.data.pageSize * $list.$pagination.data.page);
                }

                function sortBy(key) {
                    $list.$sort.by = key;
                    if ($list.$sort.order) {
                        $list.$sort.order = $list.$sort.order === 'asc' ? 'desc' : 'asc';
                    } else {
                        $list.$sort.order = 'asc';
                    }
                    $list.$sort.order = $list.$sort.order;
                    _loadModel();
                }

                $scope.$watch(angular.bind($list, function() {
                    return $list.$elements;
                }), function(n, o) {
                    if (n && n[0]) {
                        $list.$headers = _getHeaders(n[0]);
                    }
                });

                $scope.$on($list.$name + 'Reload', function(event, data) {
                    _loadModel(data);
                });

                _loadModel();

            }
        }
    })();

(function() {
    angular.module('d.List')
    .provider('dListSetup', dListSetupProvider);

    function dListSetupProvider() {
        this.setup = {
            enable: {
                header: true,
                footer: false,
                sorting: true,
                pagination: true,
                filters: true,
                checkboxes: true
            },
            defaults: {
                sort: {
                    order: 'asc',
                    by: 'surname'
                },
                pagination: {
                    pageSize: 10,
                    page: 1,
                    pageSizeOptions: [10, 15, 20, 50]
                }
            },
            i18n: {
                locale: 'en_US',
                pagination: {
                    next: 'Next',
                    prev: 'Previous',
                    start: 'Start',
                    end: 'End'
                }
            },
            data: {
                onSuccess: function(response) {
                    return response.value;
                },
                onError: function(response) {
                    return response;
                }
            }
        }

        this.$get = $get;

        function $get() {
            var self = this;
            return {
                getSetup: function getSetup() {
                    return self.setup;
                }
            }
        }
    }
})();

(function() {
    angular.module('d.List')
    .service('dListService', dListService);

    dListService.$inject = ['$http'];

    function dListService($http) {
        var _url;

        return {
            setUrl: setUrl,
            getUrl: getUrl,
            getData: getData
        };

        function setUrl(url) {
            _url = url;
        }

        function getUrl() {
            return _url;
        }

        function getData(successCallback, errorCallback, params) {
            return $http.get(_url, {
                            method: 'GET',
                            params: params
                        })
                        .then(
                            function success(response) {
                                return successCallback(response.data);
                            },
                            function error(response) {
                                return errorCallback(response.data);
                            }
                        );
        }
    }
})();
